import fs from "fs/promises";
import path from "path";
import type {
  Skill,
  InsertSkill,
  Project,
  InsertProject,
  Certification,
  InsertCertification,
  Training,
  InsertTraining,
  Experience,
  InsertExperience,
  Blog,
  InsertBlog,
  SocialLink,
  InsertSocialLink,
  ContactInfo,
  ProfileInfo,
} from "@shared/schema";
import { randomUUID } from "crypto";

const DATA_DIR = path.join(process.cwd(), "data");

export interface IStorage {
  // Skills
  getSkills(): Promise<Skill[]>;
  getSkill(id: string): Promise<Skill | undefined>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  updateSkill(id: string, skill: Partial<InsertSkill>): Promise<Skill | undefined>;
  deleteSkill(id: string): Promise<boolean>;

  // Projects
  getProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;

  // Certifications
  getCertifications(): Promise<Certification[]>;
  getCertification(id: string): Promise<Certification | undefined>;
  createCertification(cert: InsertCertification): Promise<Certification>;
  updateCertification(id: string, cert: Partial<InsertCertification>): Promise<Certification | undefined>;
  deleteCertification(id: string): Promise<boolean>;

  // Training
  getTrainings(): Promise<Training[]>;
  getTraining(id: string): Promise<Training | undefined>;
  createTraining(training: InsertTraining): Promise<Training>;
  updateTraining(id: string, training: Partial<InsertTraining>): Promise<Training | undefined>;
  deleteTraining(id: string): Promise<boolean>;

  // Experience
  getExperiences(): Promise<Experience[]>;
  getExperience(id: string): Promise<Experience | undefined>;
  createExperience(exp: InsertExperience): Promise<Experience>;
  updateExperience(id: string, exp: Partial<InsertExperience>): Promise<Experience | undefined>;
  deleteExperience(id: string): Promise<boolean>;

  // Blogs
  getBlogs(): Promise<Blog[]>;
  getBlog(id: string): Promise<Blog | undefined>;
  createBlog(blog: InsertBlog): Promise<Blog>;
  updateBlog(id: string, blog: Partial<InsertBlog>): Promise<Blog | undefined>;
  deleteBlog(id: string): Promise<boolean>;

  // Social Links
  getSocialLinks(): Promise<SocialLink[]>;
  getSocialLink(id: string): Promise<SocialLink | undefined>;
  createSocialLink(link: InsertSocialLink): Promise<SocialLink>;
  updateSocialLink(id: string, link: Partial<InsertSocialLink>): Promise<SocialLink | undefined>;
  deleteSocialLink(id: string): Promise<boolean>;

  // Contact Info
  getContactInfo(): Promise<ContactInfo>;
  updateContactInfo(info: ContactInfo): Promise<ContactInfo>;

  // Profile Info
  getProfileInfo(): Promise<ProfileInfo>;
  updateProfileInfo(info: Partial<ProfileInfo>): Promise<ProfileInfo>;
}

export class FileStorage implements IStorage {
  private async readJSON<T>(filename: string): Promise<T> {
    const filePath = path.join(DATA_DIR, filename);
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  }

  private async writeJSON<T>(filename: string, data: T): Promise<void> {
    const filePath = path.join(DATA_DIR, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  }

  // Skills
  async getSkills(): Promise<Skill[]> {
    return this.readJSON<Skill[]>("skills.json");
  }

  async getSkill(id: string): Promise<Skill | undefined> {
    const skills = await this.getSkills();
    return skills.find((s) => s.id === id);
  }

  async createSkill(skill: InsertSkill): Promise<Skill> {
    const skills = await this.getSkills();
    const newSkill: Skill = { ...skill, id: randomUUID() };
    skills.push(newSkill);
    await this.writeJSON("skills.json", skills);
    return newSkill;
  }

  async updateSkill(id: string, skill: Partial<InsertSkill>): Promise<Skill | undefined> {
    const skills = await this.getSkills();
    const index = skills.findIndex((s) => s.id === id);
    if (index === -1) return undefined;
    skills[index] = { ...skills[index], ...skill };
    await this.writeJSON("skills.json", skills);
    return skills[index];
  }

  async deleteSkill(id: string): Promise<boolean> {
    const skills = await this.getSkills();
    const filtered = skills.filter((s) => s.id !== id);
    if (filtered.length === skills.length) return false;
    await this.writeJSON("skills.json", filtered);
    return true;
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    return this.readJSON<Project[]>("projects.json");
  }

  async getProject(id: string): Promise<Project | undefined> {
    const projects = await this.getProjects();
    return projects.find((p) => p.id === id);
  }

  async createProject(project: InsertProject): Promise<Project> {
    const projects = await this.getProjects();
    const newProject: Project = { ...project, id: randomUUID() };
    projects.push(newProject);
    await this.writeJSON("projects.json", projects);
    return newProject;
  }

  async updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined> {
    const projects = await this.getProjects();
    const index = projects.findIndex((p) => p.id === id);
    if (index === -1) return undefined;
    projects[index] = { ...projects[index], ...project };
    await this.writeJSON("projects.json", projects);
    return projects[index];
  }

  async deleteProject(id: string): Promise<boolean> {
    const projects = await this.getProjects();
    const filtered = projects.filter((p) => p.id !== id);
    if (filtered.length === projects.length) return false;
    await this.writeJSON("projects.json", filtered);
    return true;
  }

  // Certifications
  async getCertifications(): Promise<Certification[]> {
    return this.readJSON<Certification[]>("certifications.json");
  }

  async getCertification(id: string): Promise<Certification | undefined> {
    const certs = await this.getCertifications();
    return certs.find((c) => c.id === id);
  }

  async createCertification(cert: InsertCertification): Promise<Certification> {
    const certs = await this.getCertifications();
    const newCert: Certification = { ...cert, id: randomUUID() };
    certs.push(newCert);
    await this.writeJSON("certifications.json", certs);
    return newCert;
  }

  async updateCertification(id: string, cert: Partial<InsertCertification>): Promise<Certification | undefined> {
    const certs = await this.getCertifications();
    const index = certs.findIndex((c) => c.id === id);
    if (index === -1) return undefined;
    certs[index] = { ...certs[index], ...cert };
    await this.writeJSON("certifications.json", certs);
    return certs[index];
  }

  async deleteCertification(id: string): Promise<boolean> {
    const certs = await this.getCertifications();
    const filtered = certs.filter((c) => c.id !== id);
    if (filtered.length === certs.length) return false;
    await this.writeJSON("certifications.json", filtered);
    return true;
  }

  // Training
  async getTrainings(): Promise<Training[]> {
    return this.readJSON<Training[]>("training.json");
  }

  async getTraining(id: string): Promise<Training | undefined> {
    const trainings = await this.getTrainings();
    return trainings.find((t) => t.id === id);
  }

  async createTraining(training: InsertTraining): Promise<Training> {
    const trainings = await this.getTrainings();
    const newTraining: Training = { ...training, id: randomUUID() };
    trainings.push(newTraining);
    await this.writeJSON("training.json", trainings);
    return newTraining;
  }

  async updateTraining(id: string, training: Partial<InsertTraining>): Promise<Training | undefined> {
    const trainings = await this.getTrainings();
    const index = trainings.findIndex((t) => t.id === id);
    if (index === -1) return undefined;
    trainings[index] = { ...trainings[index], ...training };
    await this.writeJSON("training.json", trainings);
    return trainings[index];
  }

  async deleteTraining(id: string): Promise<boolean> {
    const trainings = await this.getTrainings();
    const filtered = trainings.filter((t) => t.id !== id);
    if (filtered.length === trainings.length) return false;
    await this.writeJSON("training.json", filtered);
    return true;
  }

  // Experience
  async getExperiences(): Promise<Experience[]> {
    return this.readJSON<Experience[]>("experience.json");
  }

  async getExperience(id: string): Promise<Experience | undefined> {
    const experiences = await this.getExperiences();
    return experiences.find((e) => e.id === id);
  }

  async createExperience(exp: InsertExperience): Promise<Experience> {
    const experiences = await this.getExperiences();
    const newExp: Experience = { ...exp, id: randomUUID() };
    experiences.push(newExp);
    await this.writeJSON("experience.json", experiences);
    return newExp;
  }

  async updateExperience(id: string, exp: Partial<InsertExperience>): Promise<Experience | undefined> {
    const experiences = await this.getExperiences();
    const index = experiences.findIndex((e) => e.id === id);
    if (index === -1) return undefined;
    experiences[index] = { ...experiences[index], ...exp };
    await this.writeJSON("experience.json", experiences);
    return experiences[index];
  }

  async deleteExperience(id: string): Promise<boolean> {
    const experiences = await this.getExperiences();
    const filtered = experiences.filter((e) => e.id !== id);
    if (filtered.length === experiences.length) return false;
    await this.writeJSON("experience.json", filtered);
    return true;
  }

  // Blogs
  async getBlogs(): Promise<Blog[]> {
    return this.readJSON<Blog[]>("blogs.json");
  }

  async getBlog(id: string): Promise<Blog | undefined> {
    const blogs = await this.getBlogs();
    return blogs.find((b) => b.id === id);
  }

  async createBlog(blog: InsertBlog): Promise<Blog> {
    const blogs = await this.getBlogs();
    const newBlog: Blog = { ...blog, id: randomUUID() };
    blogs.push(newBlog);
    await this.writeJSON("blogs.json", blogs);
    return newBlog;
  }

  async updateBlog(id: string, blog: Partial<InsertBlog>): Promise<Blog | undefined> {
    const blogs = await this.getBlogs();
    const index = blogs.findIndex((b) => b.id === id);
    if (index === -1) return undefined;
    blogs[index] = { ...blogs[index], ...blog };
    await this.writeJSON("blogs.json", blogs);
    return blogs[index];
  }

  async deleteBlog(id: string): Promise<boolean> {
    const blogs = await this.getBlogs();
    const filtered = blogs.filter((b) => b.id !== id);
    if (filtered.length === blogs.length) return false;
    await this.writeJSON("blogs.json", filtered);
    return true;
  }

  // Social Links
  async getSocialLinks(): Promise<SocialLink[]> {
    return this.readJSON<SocialLink[]>("social.json");
  }

  async getSocialLink(id: string): Promise<SocialLink | undefined> {
    const links = await this.getSocialLinks();
    return links.find((l) => l.id === id);
  }

  async createSocialLink(link: InsertSocialLink): Promise<SocialLink> {
    const links = await this.getSocialLinks();
    const newLink: SocialLink = { ...link, id: randomUUID() };
    links.push(newLink);
    await this.writeJSON("social.json", links);
    return newLink;
  }

  async updateSocialLink(id: string, link: Partial<InsertSocialLink>): Promise<SocialLink | undefined> {
    const links = await this.getSocialLinks();
    const index = links.findIndex((l) => l.id === id);
    if (index === -1) return undefined;
    links[index] = { ...links[index], ...link };
    await this.writeJSON("social.json", links);
    return links[index];
  }

  async deleteSocialLink(id: string): Promise<boolean> {
    const links = await this.getSocialLinks();
    const filtered = links.filter((l) => l.id !== id);
    if (filtered.length === links.length) return false;
    await this.writeJSON("social.json", filtered);
    return true;
  }

  // Contact Info
  async getContactInfo(): Promise<ContactInfo> {
    return this.readJSON<ContactInfo>("contact.json");
  }

  async updateContactInfo(info: ContactInfo): Promise<ContactInfo> {
    await this.writeJSON("contact.json", info);
    return info;
  }

  // Profile Info
  async getProfileInfo(): Promise<ProfileInfo> {
    return this.readJSON<ProfileInfo>("profile.json");
  }

  async updateProfileInfo(info: Partial<ProfileInfo>): Promise<ProfileInfo> {
    const current = await this.getProfileInfo();
    const updated = { ...current, ...info };
    await this.writeJSON("profile.json", updated);
    return updated;
  }
}

export const storage = new FileStorage();
