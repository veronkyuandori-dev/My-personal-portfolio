import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Send, X, Bot } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

function BotOrb() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <style>{`
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
          position: relative; z-index: 10;
        }
        .orb-ring {
          position: absolute; border-radius: 50%;
          border: 1.5px solid rgba(34,197,94,0.55);
          box-shadow: 0 0 8px rgba(34,197,94,0.4);
        }
        .orb-ring-1 { width: 100px; height: 100px; animation: ring-spin-1 3s linear infinite; }
        .orb-ring-2 { width: 120px; height: 120px; border-color: rgba(34,197,94,0.35); animation: ring-spin-2 4.5s linear infinite; }
        .orb-ring-3 { width: 90px; height: 90px; border-color: rgba(134,239,172,0.45); animation: ring-spin-3 2.8s linear infinite; }
        .orb-particle {
          position: absolute; width: 4px; height: 4px; border-radius: 50%;
          background: #4ade80; box-shadow: 0 0 6px rgba(34,197,94,0.9);
        }
      `}</style>
      <div style={{ position: 'relative', width: 130, height: 130, display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '300px' }}>
        <div className="orb-ring orb-ring-1" style={{ position: 'absolute' }} />
        <div className="orb-ring orb-ring-2" style={{ position: 'absolute' }} />
        <div className="orb-ring orb-ring-3" style={{ position: 'absolute' }} />
        <div className="orb-core" />
        {[
          { top: '8px',   left: '55px',  delay: '0s' },
          { top: '55px',  left: '108px', delay: '0.6s' },
          { top: '100px', left: '60px',  delay: '1.1s' },
          { top: '50px',  left: '5px',   delay: '1.7s' },
        ].map((p, i) => (
          <div key={i} className="orb-particle"
            style={{ top: p.top, left: p.left, animation: `particle-float 2.5s ease-in-out ${p.delay} infinite` }} />
        ))}
      </div>
    </div>
  );
}

interface Message { role: 'user' | 'assistant'; content: string; }

const qa: { keywords: string[]; answer: string }[] = [
  {
    keywords: ['hi', 'hello', 'hey', 'kumusta', 'kamusta', 'musta', 'helo', 'oi', 'sup'],
    answer: 'Kamusta! Ako si V-AI, ang assistant ni Veronque Andrie. Maaari kang magtanong tungkol sa kanyang skills, projects, certifications, o kung paano siya makontaka. Paano kita matutulungan?',
  },
  {
    keywords: ['sino', 'who', 'about', 'tungkol', 'sarili', 'ikaw', 'veronque', 'andrie', 'va'],
    answer: 'Si Veronque Andrie ay isang BS Information Technology student sa University of Cabuyao (Laguna, Philippines). Passionate siya sa full-stack development, IoT systems, cloud technologies, at cybersecurity. Available siya para sa freelance work.',
  },
  {
    keywords: ['skill', 'technology', 'tech', 'alam', 'kaya', 'stack', 'programming', 'language', 'code'],
    answer: 'Ang mga pangunahing skills ni Veronque:\n\n• Frontend: React, TypeScript, HTML/CSS, Tailwind\n• Backend: Node.js, Express, Python\n• Cloud: Microsoft Azure, AWS, Google Cloud\n• Tools: Git, GitHub, Docker, VS Code\n• Others: IoT, Computer Vision, Robotics',
  },
  {
    keywords: ['project', 'gawa', 'portfolio', 'work', 'app', 'website', 'ginawa', 'nagawa'],
    answer: 'Ilan sa mga projects ni Veronque:\n\n• QR Attendance System — real-time dashboard, role-based login\n• Library Management System — book CRUD, borrow/return tracking\n• School Attendance System — student profiles, class scheduling\n• Facial Recognition AI — TensorFlow.js, real-time identification\n• Laguna Tourist Guide — interactive maps at reviews\n• Flappy Bird Clone — pure HTML/CSS/JS browser game\n\nMakita ang lahat sa Projects section!',
  },
  {
    keywords: ['cert', 'certification', 'azure', 'aws', 'microsoft', 'training', 'diploma', 'licensed'],
    answer: 'Mga certifications ni Veronque:\n\n• Microsoft Azure Fundamentals (AZ-900)\n• Trigger GitHub Actions with feature-based development\n• Transformer architecture & LLMs in Azure ML\n• Azure Monitor Agent — guest OS monitoring\n• Microsoft Trainee — Cloud computing & productivity\n• AWS Skill Builder Trainee — Cloud architecture\n• AWS Educate Member — EC2, S3, IAM, serverless\n• GitHub Student Developer Pack',
  },
  {
    keywords: ['school', 'university', 'college', 'estudyante', 'student', 'education', 'pag-aaral', 'cabuyao', 'uc'],
    answer: 'Si Veronque ay nag-aaral ng BS Information Technology sa University of Cabuyao (UC) sa Cabuyao, Laguna, Philippines. Graduating student siya at aktibo sa iba\'t ibang tech organizations.',
  },
  {
    keywords: ['contact', 'email', 'message', 'hire', 'work', 'freelance', 'available', 'tanggapin', 'offer'],
    answer: 'Makakausap si Veronque sa pamamagitan ng:\n\n• Email: veronqueandrei@gmail.com\n• GitHub: github.com/andrieVerdev\n• LinkedIn: makita sa portfolio\n\nAvailable siya para sa freelance projects at collaboration. Mag-fill out ng contact form sa Contact section!',
  },
  {
    keywords: ['github', 'repo', 'repository', 'open source', 'code'],
    answer: 'Ang GitHub account ni Veronque ay @andrieVerdev. Marami siyang private at public repositories kasama na ang mga school projects at personal experiments. Bisitahin ang github.com/andrieVerdev para makita ang kanyang mga code!',
  },
  {
    keywords: ['jmrsp', 'organization', 'club', 'org', 'member'],
    answer: 'Si Veronque ay miyembro ng JMRSP noong 2025 — isang tech organization na nagbibigay ng oportunidad para sa mga estudyante sa IT field.',
  },
  {
    keywords: ['iot', 'robotics', 'hardware', 'sensor', 'arduino', 'raspberry'],
    answer: 'Passionate si Veronque sa IoT at Robotics! Pinag-aaralan niya ang integration ng sensors at cloud services para sa real-time monitoring systems. Isa ito sa kanyang core interests kasama ang computer vision at intelligent systems.',
  },
];

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const item of qa) {
    if (item.keywords.some(k => lower.includes(k))) {
      return item.answer;
    }
  }
  return 'Pasensya, hindi ko masagot ang tanong na iyon nang detalyado. Maaari kang magtanong tungkol sa skills, projects, certifications, education, o contact info ni Veronque. O kaya direkta siyang makausap sa contact form!';
}

export default function ChatBot3D() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = input.trim();
    if (!content) return;
    setInput('');

    const userMsg: Message = { role: 'user', content };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    await new Promise(r => setTimeout(r, 700 + Math.random() * 600));

    const answer = getResponse(content);
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'assistant', content: answer }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <Button
          size="icon"
          className="h-14 w-14 rounded-full shadow-2xl shadow-primary/40 bg-primary"
          onClick={() => setIsOpen(true)}
          data-testid="button-open-chat"
        >
          <Bot className="h-7 w-7" />
        </Button>
      )}

      {isOpen && (
        <Card className="w-[350px] sm:w-[400px] h-[500px] flex flex-col bg-background/80 backdrop-blur-2xl border-primary/20 shadow-2xl overflow-hidden rounded-2xl">
          {/* Header */}
          <div className="p-4 border-b border-primary/20 flex justify-between items-center bg-primary/10">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-heading font-bold text-sm leading-none">V-AI Assistant</p>
                <p className="text-[10px] text-primary/60 font-mono mt-0.5">● Online</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} data-testid="button-close-chat">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Orb */}
          <div className="h-40 bg-black/40 relative overflow-hidden">
            <BotOrb />
            <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-background to-transparent pointer-events-none" />
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div ref={scrollRef} className="space-y-4">
              {/* Welcome message */}
              <div className="bg-primary/10 rounded-2xl rounded-tl-none p-3 max-w-[85%] text-sm leading-relaxed">
                Kamusta! Ako si V-AI. Magtanong ka tungkol sa portfolio ni Veronque — skills, projects, certs, o contact info.
              </div>

              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`rounded-2xl p-3 max-w-[85%] text-sm leading-relaxed whitespace-pre-line ${
                    m.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-tr-none'
                      : 'bg-primary/10 rounded-tl-none'
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-primary/10 rounded-2xl rounded-tl-none p-3 text-sm flex gap-1 items-center">
                    <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 border-t border-primary/20 bg-primary/5 flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Magtanong dito..."
              className="rounded-xl border-primary/20 bg-background/50"
              data-testid="input-chat"
            />
            <Button type="submit" size="icon" disabled={isTyping} className="rounded-xl shrink-0" data-testid="button-send-chat">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
}