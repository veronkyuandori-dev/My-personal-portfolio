import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CoverflowItem {
  image: string;
  title: string;
  subtitle?: string;
  badge?: string;
}

interface Props {
  items: CoverflowItem[];
  onSelect?: (index: number) => void;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  cardWidth?: number;
  cardHeight?: number;
  imageFit?: 'cover' | 'contain';
}

export default function CoverflowCarousel({
  items,
  onSelect,
  autoPlay = true,
  autoPlayInterval = 3500,
  cardWidth = 280,
  cardHeight = 380,
  imageFit = 'cover',
}: Props) {
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragDelta = useRef(0);
  const autoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const n = items.length;

  const normalise = (i: number) => ((i % n) + n) % n;

  const go = useCallback(
    (dir: 1 | -1) => {
      setActive((prev) => normalise(prev + dir));
      if (autoTimer.current) clearTimeout(autoTimer.current);
    },
    [n],
  );

  // Auto-play
  useEffect(() => {
    if (!autoPlay) return;
    autoTimer.current = setTimeout(() => setActive((p) => normalise(p + 1)), autoPlayInterval);
    return () => { if (autoTimer.current) clearTimeout(autoTimer.current); };
  }, [active, autoPlay, autoPlayInterval, n]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  // Drag / swipe
  const startDrag = (x: number) => {
    setDragging(true);
    dragStartX.current = x;
    dragDelta.current = 0;
    if (autoTimer.current) clearTimeout(autoTimer.current);
  };
  const moveDrag = (x: number) => {
    if (!dragging) return;
    dragDelta.current = x - dragStartX.current;
  };
  const endDrag = () => {
    if (!dragging) return;
    setDragging(false);
    if (dragDelta.current < -60) go(1);
    else if (dragDelta.current > 60) go(-1);
  };

  // Offset from active (shortest path on the ring)
  const getOffset = (i: number) => {
    let o = i - active;
    if (o > n / 2) o -= n;
    if (o < -n / 2) o += n;
    return o;
  };

  const VISIBLE = 3; // show ±3 from center
  const SPACING = cardWidth * 0.52;
  const DEPTH = 110;
  const TILT = 42;
  const SCALE_STEP = 0.13;
  const OPACITY_STEP = 0.22;

  return (
    <div className="relative w-full select-none" style={{ height: cardHeight + 60 }}>
      {/* Perspective container */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: '1100px', perspectiveOrigin: '50% 45%' }}
        onMouseDown={(e) => startDrag(e.clientX)}
        onMouseMove={(e) => moveDrag(e.clientX)}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onTouchStart={(e) => startDrag(e.touches[0].clientX)}
        onTouchMove={(e) => moveDrag(e.touches[0].clientX)}
        onTouchEnd={endDrag}
      >
        {items.map((item, i) => {
          const offset = getOffset(i);
          const absOffset = Math.abs(offset);
          if (absOffset > VISIBLE) return null;

          const tx = offset * SPACING;
          const tz = -absOffset * DEPTH;
          const ry = -offset * TILT;
          const scale = Math.max(0.4, 1 - absOffset * SCALE_STEP);
          const opacity = Math.max(0.2, 1 - absOffset * OPACITY_STEP);
          const zIndex = VISIBLE + 1 - absOffset;
          const isCenter = offset === 0;

          return (
            <div
              key={i}
              onClick={() => {
                if (isCenter) {
                  onSelect?.(i);
                } else {
                  setActive(i);
                  if (autoTimer.current) clearTimeout(autoTimer.current);
                }
              }}
              style={{
                position: 'absolute',
                width: cardWidth,
                height: cardHeight,
                transform: `translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) scale(${scale})`,
                opacity,
                zIndex,
                transition: dragging ? 'none' : 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.5s ease',
                cursor: isCenter ? 'pointer' : 'pointer',
                transformOrigin: 'center center',
              }}
            >
              {/* Card */}
              <div
                className={`w-full h-full rounded-2xl overflow-hidden shadow-2xl relative bg-black/40 transition-transform duration-300 ease-out hover:scale-[1.04] ${
                  isCenter
                    ? 'ring-2 ring-primary/70 shadow-[0_0_40px_rgba(34,197,94,0.4)] hover:shadow-[0_0_60px_rgba(34,197,94,0.6)]'
                    : 'shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-full h-full ${imageFit === 'contain' ? 'object-contain p-2' : 'object-cover'}`}
                  draggable={false}
                />
                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isCenter
                      ? 'bg-gradient-to-t from-black/80 via-black/10 to-transparent'
                      : 'bg-gradient-to-t from-black/90 via-black/50 to-black/20'
                  }`}
                />
                {/* Text */}
                <div className="absolute bottom-0 left-0 right-0 p-4 space-y-1">
                  {item.badge && (
                    <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/30 rounded-full px-2 py-0.5">
                      {item.badge}
                    </span>
                  )}
                  <p
                    className={`font-heading font-bold leading-tight text-white transition-all duration-300 ${
                      isCenter ? 'text-base' : 'text-xs'
                    }`}
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical' as const,
                      overflow: 'hidden',
                    }}
                  >
                    {item.title}
                  </p>
                  {item.subtitle && isCenter && (
                    <p className="text-[11px] text-white/70 truncate">{item.subtitle}</p>
                  )}
                </div>

                {/* Center glow dot */}
                {isCenter && (
                  <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.9)]" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Left arrow */}
      <button
        onClick={() => go(-1)}
        className="absolute left-1 top-1/2 -translate-y-1/2 z-50 p-2 rounded-full bg-black/50 border border-white/10 text-white/70 hover:text-primary hover:border-primary/40 transition-all"
        data-testid="carousel-prev"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Right arrow */}
      <button
        onClick={() => go(1)}
        className="absolute right-1 top-1/2 -translate-y-1/2 z-50 p-2 rounded-full bg-black/50 border border-white/10 text-white/70 hover:text-primary hover:border-primary/40 transition-all"
        data-testid="carousel-next"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-1.5 flex-wrap px-12">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => { setActive(i); if (autoTimer.current) clearTimeout(autoTimer.current); }}
            className={`rounded-full transition-all duration-300 ${
              i === active ? 'w-5 h-1.5 bg-primary' : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
