import { useQuery } from "@tanstack/react-query";
import { Github, Linkedin, Facebook, Twitter, Instagram, MessageCircle, Mail, Globe } from "lucide-react";
import type { SocialLink, ContactInfo, ProfileInfo } from "@shared/schema";

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

const quickLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  const { data: socialLinks = [] } = useQuery<SocialLink[]>({
    queryKey: ["/api/social-links"],
  });

  const { data: contactInfo } = useQuery<ContactInfo>({
    queryKey: ["/api/contact-info"],
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
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">{profile?.name || "Gourav Arora"}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {profile?.bio || "DevOps, Cloud, and Cybersecurity specialist passionate about building scalable and secure infrastructure solutions."}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = iconMap[social.icon] || Globe;
                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-md hover-elevate active-elevate-2 transition-all"
                    data-testid={`link-footer-${social.name.toLowerCase()}`}
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-nav-${link.name.toLowerCase()}`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{contactInfo?.email || "gourav.arora@example.com"}</li>
              <li>{contactInfo?.phone || "+1 (555) 123-4567"}</li>
              <li>{contactInfo?.location || "Available for remote opportunities"}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} {profile?.name || "Gourav Arora"}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
