import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import { useLocation } from "wouter";

interface BlogCardProps {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  slug: string;
}

export default function BlogCard({
  title,
  excerpt,
  image,
  category,
  date,
  readTime,
  slug,
}: BlogCardProps) {
  const [, setLocation] = useLocation();

  return (
    <Card className="overflow-hidden hover-elevate transition-all duration-300">
      <div className="aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      <div className="p-6">
        <Badge variant="secondary" className="mb-3">
          {category}
        </Badge>
        <h3 className="text-xl font-semibold mb-2 line-clamp-2">{title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">{excerpt}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{readTime}</span>
          </div>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setLocation(`/blog/${slug}`)}
          data-testid={`button-read-blog-${slug}`}
        >
          Read More
        </Button>
      </div>
    </Card>
  );
}
