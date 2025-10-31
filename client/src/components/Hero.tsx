import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Facebook, Twitter, Instagram, MessageCircle, Mail, Globe } from "lucide-react";
import type { SocialLink, ProfileInfo } from "@shared/schema";

const iconMap: Record<string, any> = {
  Github,
  Linkedin,
  Facebook,
  Twitter,
  Instagram,
  MessageCircle,
  Mail,
  Globe,
};

export default function Hero() {
  const { data: socialLinks = [] } = useQuery<SocialLink[]>({
    queryKey: ["/api/social-links"],
  });

  const { data: profile } = useQuery<ProfileInfo>({
    queryKey: ["/api/profile"],
  });

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-6 pt-20 pb-12 relative overflow-hidden"
    >
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${profile?.heroBackground || '/images/profile/hero-bg.png'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/95 via-background/90 to-background dark:from-background/98 dark:via-background/95 dark:to-background" />
      
      <div className="max-w-6xl w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              {profile?.name || "Gourav Arora"}
            </h1>
            <p className="text-xl lg:text-2xl font-semibold text-foreground mb-6">
              {profile?.title || "DevOps • Cloud Engineer • Cybersecurity Specialist"}
            </p>
            <p className="text-base lg:text-lg text-muted-foreground mb-8 leading-relaxed">
              {profile?.bio || "A passionate and skilled professional with expertise in infrastructure provisioning, automation, and security. Specializing in AWS, Docker, Kubernetes, and modern DevOps practices to deliver scalable and reliable solutions."}
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Button
                size="lg"
                onClick={() => scrollToSection("#projects")}
                data-testid="button-view-projects"
              >
                View Projects
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("#contact")}
                data-testid="button-contact"
              >
                Contact Me
              </Button>
            </div>

            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = iconMap[social.icon] || Globe;
                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-md hover-elevate active-elevate-2 transition-colors"
                    data-testid={`link-social-${social.name.toLowerCase()}`}
                    aria-label={social.name}
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-600/20 rounded-full blur-3xl"></div>
              <img
                src={profile?.profilePhoto || '/images/profile/profile.png'}
                alt={profile?.name || "Gourav Arora"}
                className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full object-cover border-4 border-primary/20 shadow-2xl"
                data-testid="img-profile"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
