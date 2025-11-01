import { z } from "zod";

// Admin User Schema
export const adminUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type AdminUser = z.infer<typeof adminUserSchema>;

// Skills Schema
export const skillSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
});

export const insertSkillSchema = skillSchema.omit({ id: true });
export type Skill = z.infer<typeof skillSchema>;
export type InsertSkill = z.infer<typeof insertSkillSchema>;

// Projects Schema
export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  technologies: z.array(z.string()),
  liveUrl: z.string().optional(),
  githubUrl: z.string().optional(),
});

export const insertProjectSchema = projectSchema.omit({ id: true });
export type Project = z.infer<typeof projectSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;

// Certifications Schema
export const certificationSchema = z.object({
  id: z.string(),
  name: z.string(),
  issuer: z.string(),
  date: z.string(),
  image: z.string().optional(),
});

export const insertCertificationSchema = certificationSchema.omit({ id: true });
export type Certification = z.infer<typeof certificationSchema>;
export type InsertCertification = z.infer<typeof insertCertificationSchema>;

// Training Schema
export const trainingSchema = z.object({
  id: z.string(),
  name: z.string(),
  provider: z.string(),
  date: z.string(),
  description: z.string().optional(),
});

export const insertTrainingSchema = trainingSchema.omit({ id: true });
export type Training = z.infer<typeof trainingSchema>;
export type InsertTraining = z.infer<typeof insertTrainingSchema>;

// Experience Schema
export const experienceSchema = z.object({
  id: z.string(),
  title: z.string(),
  company: z.string(),
  duration: z.string(),
  description: z.array(z.string()),
});

export const insertExperienceSchema = experienceSchema.omit({ id: true });
export type Experience = z.infer<typeof experienceSchema>;
export type InsertExperience = z.infer<typeof insertExperienceSchema>;

// Blog Schema
export const blogSchema = z.object({
  id: z.string(),
  title: z.string(),
  excerpt: z.string(),
  image: z.string(),
  category: z.string(),
  date: z.string(),
  readTime: z.string(),
  slug: z.string(),
  content: z.string().optional(),
});

export const insertBlogSchema = blogSchema.omit({ id: true });
export type Blog = z.infer<typeof blogSchema>;
export type InsertBlog = z.infer<typeof insertBlogSchema>;

// Social Links Schema
export const socialLinkSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
  icon: z.string(),
});

export const insertSocialLinkSchema = socialLinkSchema.omit({ id: true });
export type SocialLink = z.infer<typeof socialLinkSchema>;
export type InsertSocialLink = z.infer<typeof insertSocialLinkSchema>;

// Contact Info Schema
export const contactInfoSchema = z.object({
  email: z.string().email(),
  phone: z.string(),
  location: z.string(),
});

export type ContactInfo = z.infer<typeof contactInfoSchema>;

// Contact Form Schema
export const contactFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  message: z.string(),
});

export type ContactForm = z.infer<typeof contactFormSchema>;

// Profile Info Schema
export const profileInfoSchema = z.object({
  name: z.string(),
  title: z.string(),
  bio: z.string(),
  profilePhoto: z.string(),
  heroBackground: z.string(),
});

export type ProfileInfo = z.infer<typeof profileInfoSchema>;

// Navigation Menu Schema
export const navMenuItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  href: z.string(),
  order: z.number(),
});

export const insertNavMenuItemSchema = navMenuItemSchema.omit({ id: true });
export type NavMenuItem = z.infer<typeof navMenuItemSchema>;
export type InsertNavMenuItem = z.infer<typeof insertNavMenuItemSchema>;

// SMTP Configuration Schema
export const smtpConfigSchema = z.object({
  host: z.string().min(1, "SMTP host is required"),
  port: z.number().min(1).max(65535, "Port must be between 1 and 65535"),
  secure: z.boolean(), // true for SSL/TLS (port 465), false for STARTTLS (port 587)
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  fromEmail: z.string().email("Valid email address is required"),
  fromName: z.string().min(1, "Sender name is required"),
});

export type SMTPConfig = z.infer<typeof smtpConfigSchema>;
