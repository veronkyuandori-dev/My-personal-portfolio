import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { insertMessageSchema, type InsertMessage } from '@shared/schema';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, MapPin, Phone, Github, Linkedin, Twitter, Send, Link as LinkIcon, Copy, Check, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import AnimationWrapper from './AnimationWrapper';
import { useState, useEffect } from 'react';

// CAPTCHA Component
function CAPTCHAField() {
  const [captcha, setCaptcha] = useState<{ num1: number; num2: number; operator: '+' | '-' | '*'; answer: string } | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 50) + 1;
    const num2 = Math.floor(Math.random() * 50) + 1;
    const operators: ('+' | '-' | '*')[] = ['+', '-', '*'];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let answer: number;
    switch (operator) {
      case '+':
        answer = num1 + num2;
        break;
      case '-':
        answer = num1 - num2;
        break;
      case '*':
        answer = num1 * num2;
        break;
    }

    setCaptcha({ num1, num2, operator, answer: answer.toString() });
    setUserAnswer('');
    setIsValid(null);
  };

  const validateCaptcha = (value: string) => {
    setUserAnswer(value);
    if (captcha && value === captcha.answer) {
      setIsValid(true);
    } else if (value.length > 0) {
      setIsValid(false);
    } else {
      setIsValid(null);
    }
  };

  return {
    question: captcha ? `${captcha.num1} ${captcha.operator} ${captcha.num2}` : '',
    userAnswer,
    setUserAnswer: validateCaptcha,
    isValid,
    regenerate: generateCaptcha,
  };
}


const CATEGORIES = [
  {
    label: "Software Development",
    items: ["Web Application", "Mobile App (Android / iOS)", "Desktop Application", "Custom Software", "API Development"]
  },
  {
    label: "Web & Digital",
    items: ["Website Development", "E-commerce Website", "Landing Page", "Website Redesign", "CMS (WordPress, Webflow, etc.)"]
  },
  {
    label: "Mobile",
    items: ["Android App", "iOS App", "Cross-platform App (Flutter / React Native)"]
  },
  {
    label: "UI / UX & Design",
    items: ["UI/UX Design", "Wireframing / Prototyping", "Graphic Design", "Branding"]
  },
  {
    label: "Cloud & Infrastructure",
    items: ["Cloud Setup (AWS, Azure, GCP)", "DevOps / CI-CD", "Server Setup & Maintenance", "System Architecture"]
  },
  {
    label: "Cybersecurity",
    items: ["Security Audit", "Penetration Testing", "Data Protection", "Compliance (ISO, GDPR, etc.)"]
  },
  {
    label: "Data & AI",
    items: ["Data Analytics", "Business Intelligence", "Machine Learning / AI", "Automation / Chatbots"]
  },
  {
    label: "IT Support & Consulting",
    items: ["IT Consultation", "System Integration", "Maintenance & Support", "ERP / CRM Implementation"]
  },
  {
    label: "Testing & QA",
    items: ["Software Testing", "QA Automation", "Bug Fixing"]
  },
  {
    label: "Academic / Training",
    items: ["Capstone / Thesis Project", "School System", "Training Platform / LMS"]
  }
];

export default function ContactSection() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const captcha = CAPTCHAField();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Email address copied to clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };
  
  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      category: '',
      message: '',
      fileUrl: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertMessage) => {
      // Verify CAPTCHA before sending
      if (captcha.isValid !== true) {
        throw new Error('Please solve the CAPTCHA correctly');
      }
      const response = await apiRequest('POST', '/api/contact', data);
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Message Sent!',
        description: 'Thank you for reaching out. I\'ll get back to you soon.',
      });
      form.reset();
      captcha.regenerate();
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'veronqueandrei@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+63 923 588 316' },
    { icon: MapPin, label: 'Location', value: 'Cabuyao, Laguna, Philippines (Region 4-A CALABARZON)' },
  ];

  return (
    <section id="contact" className="relative py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <AnimationWrapper type="fade">
          <p className="font-mono text-xs text-primary uppercase tracking-[0.3em] mb-3">07 / CONTACT</p>
          <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight animate-section-rise">
            Get In Touch
          </h2>
          <p className="mt-4 text-muted-foreground mb-16 max-w-xl">
            Have a project in mind? Let's work together to bring your ideas to life
          </p>
        </AnimationWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <AnimationWrapper type="slide" direction="right">
              <div>
                <h3 className="text-3xl font-bold mb-4">Let's Work Together</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I'm always interested in hearing about new projects and opportunities.
                  Whether you have a question or just want to say hi, feel free to reach out!
                </p>
              </div>

              <div className="space-y-6 mt-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4 group" data-testid={`contact-${info.label.toLowerCase()}`}>
                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-all">
                      <info.icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-primary uppercase tracking-widest mb-1">{info.label}</p>
                      {info.label === 'Email' ? (
                        <div className="flex items-center gap-2">
                          <a
                            href={`mailto:${info.value}`}
                            className="text-lg font-medium hover:text-primary transition-colors"
                          >
                            {info.value}
                          </a>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all"
                            onClick={() => copyToClipboard(info.value)}
                            data-testid="button-copy-email"
                          >
                            {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      ) : info.label === 'Phone' ? (
                        <a
                          href={`tel:${info.value.replace(/\\D/g, '')}`}
                          className="text-lg font-medium hover:text-primary transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-lg font-medium">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8">
                <p className="font-bold text-sm text-muted-foreground uppercase tracking-widest mb-4">Social Presence</p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-xl hover-elevate active-elevate-2 border-primary/20 bg-primary/5 text-primary hover:bg-primary/10"
                    asChild
                  >
                    <a href="https://github.com/andrieVerdev" target="_blank" rel="noopener noreferrer">
                      <Github className="h-5 w-5" />
                    </a>
                  </Button>
                  {[Linkedin, Twitter].map((Icon, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      size="icon"
                      className="rounded-xl hover-elevate active-elevate-2 border-primary/20 bg-primary/5 text-primary hover:bg-primary/10"
                      data-testid={`social-${idx + 1}`}
                    >
                      <Icon className="h-5 w-5" />
                    </Button>
                  ))}
                </div>
              </div>
            </AnimationWrapper>
          </div>

          <AnimationWrapper type="slide" direction="left">
            <Card className="hover-elevate bg-background/40 backdrop-blur-xl border-primary/20 shadow-2xl shadow-primary/5 overflow-visible">
              <CardContent className="p-6 md:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold flex justify-between">
                              Name
                              <span className="text-[10px] text-muted-foreground font-normal italic">Ilagay ang iyong buong pangalan</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your full name"
                                className="rounded-xl border-primary/20 bg-muted/20 focus-visible:ring-primary"
                                {...field}
                                data-testid="input-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold flex justify-between">
                              Email
                              <span className="text-[10px] text-muted-foreground font-normal italic">Saan kita pwedeng kontakin?</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="your@email.com"
                                className="rounded-xl border-primary/20 bg-muted/20 focus-visible:ring-primary"
                                {...field}
                                data-testid="input-email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold">Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="rounded-xl border-primary/20 bg-muted/20 focus:ring-primary">
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="max-h-[300px]">
                                {CATEGORIES.map((group) => (
                                  <SelectGroup key={group.label}>
                                    <SelectLabel className="font-bold text-primary px-2 py-1.5">{group.label}</SelectLabel>
                                    {group.items.map((item) => (
                                      <SelectItem key={item} value={item}>
                                        {item}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold flex justify-between">
                              Subject
                              <span className="text-[10px] text-muted-foreground font-normal italic">Ano ang pakay ng mensahe?</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Project inquiry / Internship"
                                className="rounded-xl border-primary/20 bg-muted/20 focus-visible:ring-primary"
                                {...field}
                                data-testid="input-subject"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="fileUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold">File Link / Reference</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Paste link to your files/photos (Google Drive, Dropbox, etc.)"
                                className="pl-10 rounded-xl border-primary/20 bg-muted/20 focus-visible:ring-primary"
                                {...field}
                                value={field.value ?? ''}
                                data-testid="input-file-url"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold flex justify-between">
                            Message
                            <span className="text-[10px] text-muted-foreground font-normal italic">I-detalye ang iyong mensahe</span>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Dito mo ilagay ang detalye ng iyong project o katanungan..."
                              className="rounded-xl border-primary/20 bg-muted/20 focus-visible:ring-primary min-h-[120px]"
                              {...field}
                              data-testid="input-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* CAPTCHA Section */}
                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                      <div className="flex items-center gap-2 mb-3">
                        <Shield className="h-4 w-4 text-primary" />
                        <p className="text-xs font-bold text-primary uppercase tracking-widest">Anti-Spam Verification</p>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 justify-between">
                          <p className="text-sm font-semibold text-foreground">
                            Solve: <span className="text-primary font-mono text-lg">{captcha.question} = ?</span>
                          </p>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={captcha.regenerate}
                            className="text-xs h-7 text-muted-foreground hover:text-primary"
                            data-testid="button-refresh-captcha"
                          >
                            Refresh
                          </Button>
                        </div>
                        <Input
                          type="text"
                          placeholder="Your answer"
                          value={captcha.userAnswer}
                          onChange={(e) => captcha.setUserAnswer(e.target.value)}
                          className={`rounded-lg border-primary/20 bg-muted/30 focus-visible:ring-primary text-center font-mono text-lg ${
                            captcha.isValid === true ? 'border-green-500/50 bg-green-500/10' :
                            captcha.isValid === false ? 'border-red-500/50 bg-red-500/10' : ''
                          }`}
                          data-testid="input-captcha"
                        />
                        {captcha.isValid === true && (
                          <p className="text-xs text-green-500 flex items-center gap-1">
                            <Check className="h-3 w-3" /> Correct!
                          </p>
                        )}
                        {captcha.isValid === false && (
                          <p className="text-xs text-red-500">Incorrect. Please try again.</p>
                        )}
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={mutation.isPending || captcha.isValid !== true}
                      className="w-full rounded-xl py-6 font-extrabold text-lg hover-elevate active-elevate-2 shadow-lg shadow-primary/20"
                      data-testid="button-submit"
                    >
                      {mutation.isPending ? 'Sending...' : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </AnimationWrapper>
        </div>
      </div>
    </section>
  );
}
