import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Blog } from "@shared/schema";
import AnimationWrapper from "./AnimationWrapper";
import { Calendar, ChevronRight } from "lucide-react";

export default function BlogSection() {
  const { data: blogs, isLoading } = useQuery<Blog[]>({
    queryKey: ["/api/blogs"],
  });

  if (isLoading) {
    return (
      <section id="blog" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-12 w-48 bg-muted rounded mx-auto" />
            <div className="h-6 w-96 bg-muted rounded mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 bg-muted/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <AnimationWrapper type="fade">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-center mb-4 bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
            Technical Blog
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            Insights into my latest technical explorations and engineering updates.
          </p>
        </AnimationWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs?.map((blog, index) => (
            <AnimationWrapper key={blog.id} type="slide" direction={index % 2 === 0 ? "up" : "down"} delay={index * 0.1}>
              <Card className="h-full flex flex-col group hover-elevate bg-background/50 backdrop-blur-xl border-primary/10 overflow-hidden shadow-xl">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={blog.imageUrl || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97"}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-primary/20 backdrop-blur-md border-primary/20 text-primary font-bold">
                      {blog.category}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="flex-1">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <Calendar className="h-3 w-3" />
                    {blog.date}
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors leading-tight">
                    {blog.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
                    {blog.excerpt}
                  </p>
                  <Button variant="ghost" className="p-0 text-primary hover:text-primary/80 group/btn" data-testid={`button-read-blog-${blog.id}`}>
                    Read Full Article 
                    <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </AnimationWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
