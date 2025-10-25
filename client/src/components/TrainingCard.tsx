import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap } from "lucide-react";

interface TrainingCardProps {
  name: string;
  provider: string;
  date: string;
  description?: string;
}

export default function TrainingCard({
  name,
  provider,
  date,
  description,
}: TrainingCardProps) {
  return (
    <Card className="p-6 hover-elevate transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-primary/10 rounded-lg">
          <GraduationCap className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold mb-1">{name}</h3>
          <p className="text-sm text-muted-foreground mb-2">{provider}</p>
          {description && <p className="text-sm text-muted-foreground mb-2">{description}</p>}
          <Badge variant="secondary" className="text-xs">
            {date}
          </Badge>
        </div>
      </div>
    </Card>
  );
}
