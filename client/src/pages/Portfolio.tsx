import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import WhatIDoCard from "@/components/WhatIDoCard";
import SkillsSection from "@/components/SkillsSection";
import ProjectCard from "@/components/ProjectCard";
import CertificationCard from "@/components/CertificationCard";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import TrainingCard from "@/components/TrainingCard";
import BlogCard from "@/components/BlogCard";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import type { Skill, Project, Certification, Experience, Training, Blog } from "@shared/schema";

import devopsIcon from "@assets/generated_images/DevOps_automation_icon_illustration_bcf93f49.png";
import cloudIcon from "@assets/generated_images/Cloud_infrastructure_icon_illustration_6659a876.png";
import securityIcon from "@assets/generated_images/Cybersecurity_shield_icon_illustration_e80de0e4.png";
import sreIcon from "@assets/generated_images/SRE_monitoring_icon_illustration_3ace36a4.png";

const whatIDo = [
  {
    id: "1",
    title: "DevOps Engineer",
    description: "I enjoy improving the speed and quality of delivery, automating processes and achieving CI/CD excellence",
    icon: devopsIcon,
  },
  {
    id: "2",
    title: "Cloud Engineer",
    description: "I design, secure and maintain cloud-based infrastructure and applications across multiple platforms",
    icon: cloudIcon,
  },
  {
    id: "3",
    title: "Cybersecurity Specialist",
    description: "I implement security best practices and protect systems from threats and vulnerabilities",
    icon: securityIcon,
  },
  {
    id: "4",
    title: "SRE",
    description: "I ensure the scalability, reliability and availability of software systems through monitoring and automation",
    icon: sreIcon,
  },
];

export default function Portfolio() {
  const { data: skills = [], isLoading: skillsLoading } = useQuery<Skill[]>({
    queryKey: ["/api/skills"],
  });

  const { data: projects = [], isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const { data: certifications = [], isLoading: certificationsLoading } = useQuery<Certification[]>({
    queryKey: ["/api/certifications"],
  });

  const { data: experiences = [], isLoading: experiencesLoading } = useQuery<Experience[]>({
    queryKey: ["/api/experience"],
  });

  const { data: trainings = [], isLoading: trainingsLoading } = useQuery<Training[]>({
    queryKey: ["/api/training"],
  });

  const { data: blogs = [], isLoading: blogsLoading } = useQuery<Blog[]>({
    queryKey: ["/api/blogs"],
  });

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center">What I Do</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {whatIDo.map((item) => (
              <WhatIDoCard
                key={item.id}
                title={item.title}
                description={item.description}
                icon={item.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {skillsLoading ? (
        <div className="py-20 text-center">Loading skills...</div>
      ) : (
        <SkillsSection skills={skills} />
      )}

      <section id="projects" className="py-20 px-6 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center">Projects</h2>
          {projectsLoading ? (
            <div className="text-center">Loading projects...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  technologies={project.technologies}
                  liveUrl={project.liveUrl}
                  githubUrl={project.githubUrl}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="certifications" className="py-20 px-6 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center">Certifications</h2>
          {certificationsLoading ? (
            <div className="text-center">Loading certifications...</div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {certifications.map((cert) => (
                <CertificationCard
                  key={cert.id}
                  name={cert.name}
                  issuer={cert.issuer}
                  date={cert.date}
                  image={cert.image}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {experiencesLoading ? (
        <div className="py-20 text-center">Loading experience...</div>
      ) : (
        <ExperienceTimeline experiences={experiences} />
      )}

      <section id="training" className="py-20 px-6 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center">Training & Courses</h2>
          {trainingsLoading ? (
            <div className="text-center">Loading training...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trainings.map((training) => (
                <TrainingCard
                  key={training.id}
                  name={training.name}
                  provider={training.provider}
                  date={training.date}
                  description={training.description}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="blog" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center">Latest Blog Posts</h2>
          {blogsLoading ? (
            <div className="text-center">Loading blogs...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  title={blog.title}
                  excerpt={blog.excerpt}
                  image={blog.image}
                  category={blog.category}
                  date={blog.date}
                  readTime={blog.readTime}
                  slug={blog.slug}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <ContactForm />
      <Footer />
    </div>
  );
}
