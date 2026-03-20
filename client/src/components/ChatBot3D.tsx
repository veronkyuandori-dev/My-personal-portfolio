import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Send, X, Bot } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { ScrollArea } from '@/components/ui/scroll-area';

function BotOrb() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <style>{`
        @keyframes orb-rotate {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes orb-pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50%       { transform: scale(1.08); opacity: 1; }
        }
        @keyframes ring-spin-1 {
          0%   { transform: rotateX(70deg) rotateZ(0deg); }
          100% { transform: rotateX(70deg) rotateZ(360deg); }
        }
        @keyframes ring-spin-2 {
          0%   { transform: rotateY(70deg) rotateZ(0deg); }
          100% { transform: rotateY(70deg) rotateZ(-360deg); }
        }
        @keyframes ring-spin-3 {
          0%   { transform: rotateX(30deg) rotateY(50deg) rotateZ(0deg); }
          100% { transform: rotateX(30deg) rotateY(50deg) rotateZ(360deg); }
        }
        @keyframes particle-float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
          33%       { transform: translateY(-8px) translateX(4px); opacity: 1; }
          66%       { transform: translateY(4px) translateX(-6px); opacity: 0.7; }
        }
        .orb-core {
          width: 70px; height: 70px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #4ade80, #22c55e 40%, #15803d 80%, #052e16);
          box-shadow: 0 0 30px rgba(34,197,94,0.7), 0 0 60px rgba(34,197,94,0.3), inset 0 0 20px rgba(255,255,255,0.15);
          animation: orb-pulse 2.5s ease-in-out infinite;
          position: relative;
          z-index: 10;
        }
        .orb-ring {
          position: absolute;
          border-radius: 50%;
          border: 1.5px solid rgba(34,197,94,0.55);
          box-shadow: 0 0 8px rgba(34,197,94,0.4);
        }
        .orb-ring-1 {
          width: 100px; height: 100px;
          animation: ring-spin-1 3s linear infinite;
        }
        .orb-ring-2 {
          width: 120px; height: 120px;
          border-color: rgba(34,197,94,0.35);
          animation: ring-spin-2 4.5s linear infinite;
        }
        .orb-ring-3 {
          width: 90px; height: 90px;
          border-color: rgba(134,239,172,0.45);
          animation: ring-spin-3 2.8s linear infinite;
        }
        .orb-particle {
          position: absolute;
          width: 4px; height: 4px;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 6px rgba(34,197,94,0.9);
        }
      `}</style>

      <div style={{ position: 'relative', width: 130, height: 130, display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '300px' }}>
        <div className="orb-ring orb-ring-1" style={{ position: 'absolute' }} />
        <div className="orb-ring orb-ring-2" style={{ position: 'absolute' }} />
        <div className="orb-ring orb-ring-3" style={{ position: 'absolute' }} />
        <div className="orb-core" />
        {[
          { top: '8px',  left: '55px', delay: '0s' },
          { top: '55px', left: '108px', delay: '0.6s' },
          { top: '100px',left: '60px', delay: '1.1s' },
          { top: '50px', left: '5px',  delay: '1.7s' },
        ].map((p, i) => (
          <div
            key={i}
            className="orb-particle"
            style={{ top: p.top, left: p.left, animation: `particle-float 2.5s ease-in-out ${p.delay} infinite` }}
          />
        ))}
      </div>
    </div>
  );
}

export default function ChatBot3D() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [conversationId, setConversationId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: conversation } = useQuery<any>({
    queryKey: ['/api/conversations', conversationId],
    enabled: !!conversationId,
  });

  const createConvMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST', '/api/conversations', { title: 'Visitor Chat' });
      return res.json();
    },
    onSuccess: (data) => setConversationId(data.id),
  });

  const messageMutation = useMutation({
    mutationFn: async (content: string) => {
      if (!conversationId) return;
      const res = await fetch(`/api/conversations/${conversationId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      const reader = res.body?.getReader();
      if (!reader) return;
      while (true) {
        const { done } = await reader.read();
        if (done) break;
      }
      await queryClient.invalidateQueries({ queryKey: ['/api/conversations', conversationId] });
    },
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversation?.messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const content = input;
    setInput('');
    if (!conversationId) {
      await createConvMutation.mutateAsync();
      await messageMutation.mutateAsync(content);
    } else {
      await messageMutation.mutateAsync(content);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <Button
          size="icon"
          className="h-14 w-14 rounded-full shadow-2xl shadow-primary/40 hover-elevate active-elevate-2 bg-primary"
          onClick={() => setIsOpen(true)}
          data-testid="button-open-chat"
        >
          <Bot className="h-7 w-7" />
        </Button>
      )}

      {isOpen && (
        <Card className="w-[350px] sm:w-[400px] h-[500px] flex flex-col bg-background/80 backdrop-blur-2xl border-primary/20 shadow-2xl overflow-hidden rounded-2xl">
          <div className="p-4 border-b border-primary/20 flex justify-between items-center bg-primary/10">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <span className="font-heading font-bold">V-AI Assistant</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} data-testid="button-close-chat">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="h-40 bg-black/40 relative overflow-hidden">
            <BotOrb />
            <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-background to-transparent pointer-events-none" />
          </div>

          <ScrollArea className="flex-1 p-4">
            <div ref={scrollRef} className="space-y-4">
              <div className="bg-primary/10 rounded-2xl rounded-tl-none p-3 max-w-[80%] text-sm">
                Kamusta! Ako si V-AI. Paano kita matutulungan ngayong araw tungkol sa portfolio ni Veronque?
              </div>
              {conversation?.messages?.map((m: any, i: number) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`rounded-2xl p-3 max-w-[80%] text-sm ${
                    m.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-tr-none'
                      : 'bg-primary/10 rounded-tl-none'
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {(messageMutation.isPending || createConvMutation.isPending) && (
                <div className="flex justify-start">
                  <div className="bg-primary/10 rounded-2xl rounded-tl-none p-3 animate-pulse text-sm">
                    Nagiisip...
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <form onSubmit={handleSend} className="p-4 border-t border-primary/20 bg-primary/5 flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Magtanong dito..."
              className="rounded-xl border-primary/20 bg-background/50"
              data-testid="input-chat"
            />
            <Button type="submit" size="icon" disabled={messageMutation.isPending} className="rounded-xl shrink-0" data-testid="button-send-chat">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
}
