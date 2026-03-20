import { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageSquare, Send, X, Bot } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { ScrollArea } from '@/components/ui/scroll-area';

function BotCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.5;
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.15;
      meshRef.current.position.y = Math.sin(t * 0.8) * 0.12;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.4;
      ringRef.current.rotation.x = t * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
      {/* Core sphere — no attach prop to avoid applyProps bug */}
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.4}>
        <MeshDistortMaterial
          color="#22C55E"
          distort={0.35}
          speed={2.5}
          roughness={0.15}
          metalness={0.9}
          emissive="#0a3a1a"
          emissiveIntensity={0.4}
        />
      </Sphere>
      {/* Orbital ring */}
      <mesh ref={ringRef} scale={[1.9, 1.9, 1.9]}>
        <torusGeometry args={[1, 0.04, 16, 80]} />
        <meshStandardMaterial color="#22C55E" emissive="#22C55E" emissiveIntensity={0.6} transparent opacity={0.6} />
      </mesh>
    </Float>
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
        const { done, value } = await reader.read();
        if (done) break;
        // Process stream if needed for real-time UI
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
      const conv = await createConvMutation.mutateAsync();
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
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="h-40 bg-black/40 relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Bot className="h-12 w-12 text-primary/20 animate-pulse" />
            </div>
            <Suspense fallback={null}>
              <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
                <ambientLight intensity={1.5} />
                <pointLight position={[10, 10, 10]} intensity={2} />
                <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
                <BotCore />
                <OrbitControls enableZoom={false} enablePan={false} />
              </Canvas>
            </Suspense>
            <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-background to-transparent pointer-events-none" />
          </div>

          <ScrollArea className="flex-1 p-4">
            <div ref={scrollRef} className="space-y-4">
              <div className="bg-primary/10 rounded-2xl rounded-tl-none p-3 max-w-[80%] text-sm">
                Kamusta! Ako si V-AI. Paano kita matutulungan ngayong araw tungkol sa portfolio ni Veronque?
              </div>
              {conversation?.messages?.map((m: any, i: number) => (
                <div
                  key={i}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`rounded-2xl p-3 max-w-[80%] text-sm ${
                      m.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-tr-none'
                        : 'bg-primary/10 rounded-tl-none'
                    }`}
                  >
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
            />
            <Button type="submit" size="icon" disabled={messageMutation.isPending} className="rounded-xl shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
}
