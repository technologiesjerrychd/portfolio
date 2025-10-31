import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, BarChart, BookOpen } from "lucide-react";

interface CourseCardProps {
  name: string;
  category: string;
  description: string;
  duration: string;
  level: string;
  topics: string[];
  price?: string;
  onEnroll: () => void;
}

export default function CourseCard({
  name,
  category,
  description,
  duration,
  level,
  topics,
  price,
  onEnroll,
}: CourseCardProps) {
  return (
    <Card className="p-6 hover-elevate transition-all duration-300 flex flex-col h-full">
      <div className="flex-1">
        <Badge variant="secondary" className="mb-3">
          {category}
        </Badge>
        <h3 className="text-xl font-semibold mb-3">{name}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-primary" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <BarChart className="h-4 w-4 text-primary" />
            <span>{level}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-start gap-2 mb-2">
            <BookOpen className="h-4 w-4 text-primary mt-1" />
            <p className="text-sm font-semibold">Topics Covered:</p>
          </div>
          <ul className="ml-6 text-sm text-muted-foreground space-y-1">
            {topics.slice(0, 4).map((topic, index) => (
              <li key={index} className="list-disc">{topic}</li>
            ))}
            {topics.length > 4 && (
              <li className="list-disc italic">And more...</li>
            )}
          </ul>
        </div>

        {price && (
          <p className="text-sm font-semibold mb-4">{price}</p>
        )}
      </div>

      <Button
        className="w-full mt-4"
        onClick={onEnroll}
        data-testid={`button-enroll-${name.toLowerCase().replace(/\s+/g, '-')}`}
      >
        Enroll Now
      </Button>
    </Card>
  );
}
