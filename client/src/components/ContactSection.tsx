import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { insertMessageSchema, type InsertMessage } from '@shared/schema';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, MapPin, Phone, Github, Linkedin, Twitter, Send, Upload, Link as LinkIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import AnimationWrapper from './AnimationWrapper';

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
      const response = await apiRequest('POST', '/api/contact', data);
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Message Sent!',
        description: 'Thank you for reaching out. I\'ll get back to you soon.',
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-center mb-4 bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
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
                            <FormLabel className="font-bold">Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your name"
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
                            <FormLabel className="font-bold">Email</FormLabel>
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
                            <FormLabel className="font-bold">Subject</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Project inquiry"
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
                          <FormLabel className="font-bold">Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell me about your project details..."
                              className="rounded-xl border-primary/20 bg-muted/20 focus-visible:ring-primary min-h-[120px]"
                              {...field}
                              data-testid="input-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={mutation.isPending}
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
