import ProjectCard from "../ProjectCard";
import projectImage from "@assets/generated_images/Portfolio_website_project_screenshot_cb7b3dcc.png";

export default function ProjectCardExample() {
  return (
    <ProjectCard
      title="Portfolio Website"
      description="A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS"
      image={projectImage}
      technologies={["React", "TypeScript", "Tailwind CSS"]}
      liveUrl="https://example.com"
      githubUrl="https://github.com/example"
    />
  );
}
