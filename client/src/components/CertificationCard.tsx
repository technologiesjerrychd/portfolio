import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award } from "lucide-react";

interface CertificationCardProps {
  name: string;
  issuer: string;
  date: string;
  image?: string;
}

export default function CertificationCard({
  name,
  issuer,
  date,
  image,
}: CertificationCardProps) {
  return (
    <Card className="p-6 hover-elevate transition-all duration-300">
      <div className="flex flex-col items-center text-center">
        {image ? (
          <div className="w-20 h-20 mb-4">
            <img src={image} alt={name} className="w-full h-full object-contain" />
          </div>
        ) : (
          <div className="w-20 h-20 mb-4 flex items-center justify-center bg-primary/10 rounded-full">
            <Award className="h-10 w-10 text-primary" />
          </div>
        )}
        <h3 className="font-semibold mb-2">{name}</h3>
        <p className="text-sm text-muted-foreground mb-2">{issuer}</p>
        <Badge variant="secondary" className="text-xs">
          {date}
        </Badge>
      </div>
    </Card>
  );
}
