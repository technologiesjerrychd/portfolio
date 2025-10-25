import ExperienceTimeline from "../ExperienceTimeline";

export default function ExperienceTimelineExample() {
  const mockExperiences = [
    {
      id: "1",
      title: "Senior DevOps Engineer",
      company: "Tech Corp",
      duration: "2022 - Present",
      description: [
        "Led cloud infrastructure migration to AWS",
        "Implemented CI/CD pipelines using Jenkins and GitLab",
        "Reduced deployment time by 60%",
      ],
    },
    {
      id: "2",
      title: "Cloud Engineer",
      company: "Cloud Solutions Inc",
      duration: "2020 - 2022",
      description: [
        "Managed multi-cloud environments (AWS, Azure)",
        "Automated infrastructure provisioning with Terraform",
        "Implemented monitoring solutions using Datadog",
      ],
    },
  ];

  return <ExperienceTimeline experiences={mockExperiences} />;
}
