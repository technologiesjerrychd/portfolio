import SkillsSection from "../SkillsSection";

export default function SkillsSectionExample() {
  const mockSkills = [
    { name: "AWS", category: "Cloud Platforms" },
    { name: "Docker", category: "DevOps Tools" },
    { name: "Kubernetes", category: "DevOps Tools" },
    { name: "Terraform", category: "Infrastructure as Code" },
    { name: "Jenkins", category: "CI/CD" },
  ];

  return <SkillsSection skills={mockSkills} />;
}
