import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { 
  Code, 
  FolderGit2, 
  Award, 
  GraduationCap, 
  Briefcase, 
  FileText, 
  Share2, 
  Mail, 
  User,
  LogOut,
  Menu,
  Server
} from "lucide-react";
import SkillsManager from "@/components/admin/SkillsManager";
import ProjectsManager from "@/components/admin/ProjectsManager";
import CertificationsManager from "@/components/admin/CertificationsManager";
import TrainingManager from "@/components/admin/TrainingManager";
import ExperienceManager from "@/components/admin/ExperienceManager";
import BlogsManager from "@/components/admin/BlogsManager";
import SocialLinksManager from "@/components/admin/SocialLinksManager";
import ContactInfoManager from "@/components/admin/ContactInfoManager";
import ProfileManager from "@/components/admin/ProfileManager";
import NavigationMenuManager from "@/components/admin/NavigationMenuManager";
import SMTPConfigManager from "@/components/admin/SMTPConfigManager";

const menuItems = [
  { title: "Skills", icon: Code, section: "skills" },
  { title: "Projects", icon: FolderGit2, section: "projects" },
  { title: "Certifications", icon: Award, section: "certifications" },
  { title: "Training", icon: GraduationCap, section: "training" },
  { title: "Experience", icon: Briefcase, section: "experience" },
  { title: "Blogs", icon: FileText, section: "blogs" },
  { title: "Social Links", icon: Share2, section: "social" },
  { title: "Contact Info", icon: Mail, section: "contact" },
  { title: "Profile", icon: User, section: "profile" },
  { title: "Navigation Menu", icon: Menu, section: "navigation" },
  { title: "SMTP Settings", icon: Server, section: "smtp" },
];

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("skills");
  const [isVerifying, setIsVerifying] = useState(true);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const verifySession = async () => {
      const sessionId = localStorage.getItem("adminSessionId");
      if (!sessionId) {
        setLocation("/nexus");
        return;
      }

      try {
        await apiRequest("GET", "/api/admin/verify", undefined, {
          Authorization: `Bearer ${sessionId}`,
        });
        setIsVerifying(false);
      } catch (error) {
        localStorage.removeItem("adminSessionId");
        setLocation("/nexus");
      }
    };

    verifySession();
  }, [setLocation]);

  const handleLogout = async () => {
    const sessionId = localStorage.getItem("adminSessionId");
    try {
      await apiRequest("POST", "/api/admin/logout", undefined, {
        Authorization: `Bearer ${sessionId}`,
      });
    } catch (error) {
      // Ignore error
    }
    localStorage.removeItem("adminSessionId");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    setLocation("/nexus");
  };

  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Verifying session...</p>
      </div>
    );
  }

  const renderSection = () => {
    switch (activeSection) {
      case "skills":
        return <SkillsManager />;
      case "projects":
        return <ProjectsManager />;
      case "certifications":
        return <CertificationsManager />;
      case "training":
        return <TrainingManager />;
      case "experience":
        return <ExperienceManager />;
      case "blogs":
        return <BlogsManager />;
      case "social":
        return <SocialLinksManager />;
      case "contact":
        return <ContactInfoManager />;
      case "profile":
        return <ProfileManager />;
      case "navigation":
        return <NavigationMenuManager />;
      case "smtp":
        return <SMTPConfigManager />;
      default:
        return <SkillsManager />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.section}>
                      <SidebarMenuButton
                        onClick={() => setActiveSection(item.section)}
                        isActive={activeSection === item.section}
                        data-testid={`nav-${item.section}`}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        
        <div className="flex flex-col flex-1">
          <header className="flex items-center justify-between p-4 border-b">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <Button 
              variant="outline" 
              onClick={handleLogout}
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </header>
          
          <main className="flex-1 overflow-auto p-6">
            {renderSection()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
