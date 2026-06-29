import { useState, useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const KONAMI = [
  'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
  'b','a',
];

const KONAMI_UPPER = [
  'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
  'B','A',
];

const COLS = 20;
const ROWS = 20;
const CELL = 20;

type Dir = { x: number; y: number };
type Point = { x: number; y: number };

const DIRS: Record<string, Dir> = {
  ArrowUp:    { x: 0,  y: -1 },
  ArrowDown:  { x: 0,  y:  1 },
  ArrowLeft:  { x: -1, y:  0 },
  ArrowRight: { x: 1,  y:  0 },
};

function randomFood(snake: Point[]): Point {
  let f: Point;
  do {
    f = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
  } while (snake.some(s => s.x === f.x && s.y === f.y));
  return f;
}

function initState() {
  const snake: Point[] = [{ x: 10, y: 10 }];
  return { snake, food: randomFood(snake), dir: { x: 1, y: 0 }, score: 0, dead: false };
}

export default function SnakeEasterEgg() {
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState(initState);
  const [running, setRunning] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const konamiRef = useRef<string[]>([]);
  const dirRef = useRef<Dir>({ x: 1, y: 0 });
  const runningRef = useRef(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const close = useCallback(() => {
    setVisible(false);
    setRunning(false);
    runningRef.current = false;
    setState(initState());
    dirRef.current = { x: 1, y: 0 };
  }, []);

  const startGame = useCallback(() => {
    const s = initState();
    setState(s);
    dirRef.current = { x: 1, y: 0 };
    setRunning(true);
    runningRef.current = true;
  }, []);

  const openGame = useCallback(() => {
    konamiRef.current = [];
    setVisible(true);
    setRunning(false);
    runningRef.current = false;
    setState(initState());
    dirRef.current = { x: 1, y: 0 };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key;
      konamiRef.current = [...konamiRef.current, key].slice(-KONAMI.length);
      const seq = konamiRef.current.join(',');
      if (seq === KONAMI.join(',') || seq === KONAMI_UPPER.join(',')) {
        openGame();
      }

      if (runningRef.current && DIRS[key]) {
        e.preventDefault();
        const cur = dirRef.current;
        const next = DIRS[key];
        if (next.x !== -cur.x || next.y !== -cur.y) {
          dirRef.current = next;
        }
      }
      if (key === 'Escape') close();
    };
    const onUnlock = () => openGame();
    window.addEventListener('keydown', onKey);
    window.addEventListener('snake-unlock', onUnlock);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('snake-unlock', onUnlock);
    };
  }, [close, openGame]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setState(prev => {
        if (prev.dead) return prev;
        const head = {
          x: (prev.snake[0].x + dirRef.current.x + COLS) % COLS,
          y: (prev.snake[0].y + dirRef.current.y + ROWS) % ROWS,
        };
        const hit = prev.snake.some(s => s.x === head.x && s.y === head.y);
        if (hit) {
          setRunning(false);
          runningRef.current = false;
          setHighScore(h => Math.max(h, prev.score));
          return { ...prev, dead: true };
        }
        const ate = head.x === prev.food.x && head.y === prev.food.y;
        const newSnake = ate ? [head, ...prev.snake] : [head, ...prev.snake.slice(0, -1)];
        return {
          snake: newSnake,
          food: ate ? randomFood(newSnake) : prev.food,
          dir: dirRef.current,
          score: ate ? prev.score + 10 : prev.score,
          dead: false,
        };
      });
    }, 120);
    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#020c02';
    ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL);

    ctx.strokeStyle = 'rgba(34,197,94,0.06)';
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= COLS; x++) {
      ctx.beginPath(); ctx.moveTo(x * CELL, 0); ctx.lineTo(x * CELL, ROWS * CELL); ctx.stroke();
    }
    for (let y = 0; y <= ROWS; y++) {
      ctx.beginPath(); ctx.moveTo(0, y * CELL); ctx.lineTo(COLS * CELL, y * CELL); ctx.stroke();
    }

    state.snake.forEach((seg, i) => {
      const alpha = i === 0 ? 1 : Math.max(0.25, 1 - i * 0.04);
      ctx.fillStyle = i === 0 ? '#22c55e' : `rgba(34,197,94,${alpha})`;
      ctx.shadowBlur = i === 0 ? 12 : 4;
      ctx.shadowColor = '#22c55e';
      const pad = i === 0 ? 1 : 2;
      ctx.fillRect(seg.x * CELL + pad, seg.y * CELL + pad, CELL - pad * 2, CELL - pad * 2);
    });
    ctx.shadowBlur = 0;

    const { food } = state;
    ctx.fillStyle = '#f97316';
    ctx.shadowBlur = 14;
    ctx.shadowColor = '#f97316';
    ctx.beginPath();
    ctx.arc(food.x * CELL + CELL / 2, food.y * CELL + CELL / 2, CELL / 2 - 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }, [state]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative border border-primary/40 rounded-xl overflow-hidden shadow-2xl shadow-primary/20"
        style={{ background: '#020c02' }}>

        <div className="flex items-center justify-between px-4 py-2 border-b border-primary/20 bg-black/60">
          <div className="flex items-center gap-2">
            <span className="font-mono text-primary text-xs tracking-widest">[ SNAKE.EXE ]</span>
            <span className="font-mono text-xs text-muted-foreground">— EASTER EGG UNLOCKED</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-primary/70">SCORE: <span className="text-primary font-bold">{state.score}</span></span>
            <span className="font-mono text-xs text-primary/50">BEST: <span className="text-primary/70">{highScore}</span></span>
            <Button variant="ghost" size="icon" onClick={close} className="h-6 w-6">
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <div className="relative">
          <canvas
            ref={canvasRef}
            width={COLS * CELL}
            height={ROWS * CELL}
            className="block"
          />

          {!running && !state.dead && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70">
              <p className="font-mono text-primary text-lg font-bold mb-1 tracking-widest">SNAKE.EXE</p>
              <p className="font-mono text-xs text-muted-foreground mb-6">Use arrow keys to move</p>
              <button
                onClick={startGame}
                className="font-mono text-xs border border-primary/60 text-primary px-6 py-2 rounded hover-elevate tracking-widest"
              >
                [ START ]
              </button>
              <p className="font-mono text-[10px] text-muted-foreground mt-4 opacity-60">ESC to close</p>
            </div>
          )}

          {state.dead && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80">
              <p className="font-mono text-red-400 text-lg font-bold mb-1 tracking-widest">GAME OVER</p>
              <p className="font-mono text-xs text-muted-foreground mb-1">Score: <span className="text-primary">{state.score}</span></p>
              {state.score >= highScore && state.score > 0 && (
                <p className="font-mono text-[10px] text-yellow-400 mb-4">✦ NEW HIGH SCORE ✦</p>
              )}
              {!(state.score >= highScore && state.score > 0) && <div className="mb-4" />}
              <button
                onClick={startGame}
                className="font-mono text-xs border border-primary/60 text-primary px-6 py-2 rounded hover-elevate tracking-widest"
              >
                [ RETRY ]
              </button>
            </div>
          )}
        </div>

        <div className="px-4 py-2 border-t border-primary/10 bg-black/40 flex justify-center">
          <p className="font-mono text-[10px] text-muted-foreground/40 tracking-widest">
            ↑↑↓↓←→←→BA — YOU FOUND THE SECRET
          </p>
        </div>
      </div>
    </div>
  );
}
