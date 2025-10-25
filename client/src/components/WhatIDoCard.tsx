import { Card } from "@/components/ui/card";

interface WhatIDoCardProps {
  title: string;
  description: string;
  icon: string;
}

export default function WhatIDoCard({ title, description, icon }: WhatIDoCardProps) {
  return (
    <Card className="p-6 hover-elevate transition-all duration-300">
      <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 mb-6">
          <img src={icon} alt={title} className="w-full h-full object-contain" />
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </Card>
  );
}
