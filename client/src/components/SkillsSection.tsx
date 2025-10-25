import { Badge } from "@/components/ui/badge";

interface Skill {
  name: string;
  category: string;
}

interface SkillsSectionProps {
  skills: Skill[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const categories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <section id="skills" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center">
          Technical Skills
        </h2>
        <div className="space-y-8">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="text-xl font-semibold mb-4">{category}</h3>
              <div className="flex flex-wrap gap-3">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill) => (
                    <Badge
                      key={skill.name}
                      variant="secondary"
                      className="px-4 py-2 text-sm"
                      data-testid={`badge-skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {skill.name}
                    </Badge>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
