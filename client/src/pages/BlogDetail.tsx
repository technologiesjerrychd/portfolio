import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import type { Blog } from "@shared/schema";

export default function BlogDetail() {
  const params = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  
  const { data: blogs = [] } = useQuery<Blog[]>({
    queryKey: ["/api/blogs"],
  });

  const blog = blogs.find(b => b.slug === params.slug);

  if (!blog) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The blog post you're looking for doesn't exist.
            </p>
            <Button onClick={() => setLocation("/")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <article className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            className="mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Button>

          <Badge variant="secondary" className="mb-4">
            {blog.category}
          </Badge>

          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            {blog.title}
          </h1>

          <div className="flex items-center gap-6 text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{blog.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{blog.readTime}</span>
            </div>
          </div>

          {blog.image && (
            <div className="aspect-video overflow-hidden rounded-lg mb-8">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {blog.excerpt}
            </p>
            
            <div className="whitespace-pre-wrap">
              {blog.content}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t">
            <Button onClick={() => setLocation("/")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Button>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
