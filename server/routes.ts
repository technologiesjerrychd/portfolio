import type { Express } from "express";
import { createServer, type Server } from "http";
import express from "express";
import multer from "multer";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import path from "path";
import { storage } from "./storage";
import {
  insertSkillSchema,
  insertProjectSchema,
  insertCertificationSchema,
  insertTrainingSchema,
  insertExperienceSchema,
  insertBlogSchema,
  insertSocialLinkSchema,
  contactInfoSchema,
  contactFormSchema,
  profileInfoSchema,
} from "@shared/schema";

// Whitelist of allowed upload types (using Set for security)
const ALLOWED_UPLOAD_TYPES = new Set([
  "blog",
  "projects",
  "certifications",
  "training",
  "profile",
]);

// Allowed MIME types for images
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];

// Multer configuration for file uploads
const storageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    const type = req.body.type;
    
    // Validate that type is in the allowlist and is a string
    if (!type || typeof type !== "string" || !ALLOWED_UPLOAD_TYPES.has(type)) {
      return cb(new Error("Invalid upload type"), "");
    }
    
    // Use the validated type directly (already validated as safe)
    cb(null, path.join(process.cwd(), "public", "images", type));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, uniqueSuffix + ext);
  },
});

const upload = multer({
  storage: storageEngine,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
  fileFilter: (req, file, cb) => {
    // Validate MIME type
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      return cb(new Error("Invalid file type. Only images are allowed."));
    }
    
    // Validate file extension
    const ext = path.extname(file.originalname).toLowerCase();
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
    if (!allowedExtensions.includes(ext)) {
      return cb(new Error("Invalid file extension. Only image files are allowed."));
    }
    
    cb(null, true);
  },
});

// Admin credentials (hardcoded as per requirements)
const ADMIN_USERNAME = "xnexus";
const ADMIN_PASSWORD_HASH = bcrypt.hashSync("a@ora123$#", 10);

// Simple in-memory session storage
const sessions = new Map<string, { username: string; expiresAt: number }>();

// Middleware to check admin authentication
function requireAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const sessionId = req.headers.authorization?.replace("Bearer ", "");
  if (!sessionId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const session = sessions.get(sessionId);
  if (!session || session.expiresAt < Date.now()) {
    sessions.delete(sessionId);
    return res.status(401).json({ error: "Session expired" });
  }

  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Admin Authentication
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (username !== ADMIN_USERNAME || !bcrypt.compareSync(password, ADMIN_PASSWORD_HASH)) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const sessionId = Math.random().toString(36).substring(2);
      const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
      sessions.set(sessionId, { username, expiresAt });

      res.json({ sessionId, expiresAt });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/admin/logout", requireAuth, (req, res) => {
    const sessionId = req.headers.authorization?.replace("Bearer ", "");
    if (sessionId) {
      sessions.delete(sessionId);
    }
    res.json({ success: true });
  });

  app.get("/api/admin/verify", requireAuth, (req, res) => {
    res.json({ valid: true });
  });

  // Skills Routes
  app.get("/api/skills", async (req, res) => {
    try {
      const skills = await storage.getSkills();
      res.json(skills);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch skills" });
    }
  });

  app.post("/api/skills", requireAuth, async (req, res) => {
    try {
      const data = insertSkillSchema.parse(req.body);
      const skill = await storage.createSkill(data);
      res.json(skill);
    } catch (error) {
      res.status(400).json({ error: "Invalid skill data" });
    }
  });

  app.put("/api/skills/:id", requireAuth, async (req, res) => {
    try {
      const skill = await storage.updateSkill(req.params.id, req.body);
      if (!skill) {
        return res.status(404).json({ error: "Skill not found" });
      }
      res.json(skill);
    } catch (error) {
      res.status(400).json({ error: "Failed to update skill" });
    }
  });

  app.delete("/api/skills/:id", requireAuth, async (req, res) => {
    try {
      const deleted = await storage.deleteSkill(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Skill not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete skill" });
    }
  });

  // Projects Routes
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.post("/api/projects", requireAuth, async (req, res) => {
    try {
      const data = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(data);
      res.json(project);
    } catch (error) {
      res.status(400).json({ error: "Invalid project data" });
    }
  });

  app.put("/api/projects/:id", requireAuth, async (req, res) => {
    try {
      const project = await storage.updateProject(req.params.id, req.body);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(400).json({ error: "Failed to update project" });
    }
  });

  app.delete("/api/projects/:id", requireAuth, async (req, res) => {
    try {
      const deleted = await storage.deleteProject(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete project" });
    }
  });

  // Certifications Routes
  app.get("/api/certifications", async (req, res) => {
    try {
      const certs = await storage.getCertifications();
      res.json(certs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch certifications" });
    }
  });

  app.post("/api/certifications", requireAuth, async (req, res) => {
    try {
      const data = insertCertificationSchema.parse(req.body);
      const cert = await storage.createCertification(data);
      res.json(cert);
    } catch (error) {
      res.status(400).json({ error: "Invalid certification data" });
    }
  });

  app.put("/api/certifications/:id", requireAuth, async (req, res) => {
    try {
      const cert = await storage.updateCertification(req.params.id, req.body);
      if (!cert) {
        return res.status(404).json({ error: "Certification not found" });
      }
      res.json(cert);
    } catch (error) {
      res.status(400).json({ error: "Failed to update certification" });
    }
  });

  app.delete("/api/certifications/:id", requireAuth, async (req, res) => {
    try {
      const deleted = await storage.deleteCertification(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Certification not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete certification" });
    }
  });

  // Training Routes
  app.get("/api/training", async (req, res) => {
    try {
      const trainings = await storage.getTrainings();
      res.json(trainings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch trainings" });
    }
  });

  app.post("/api/training", requireAuth, async (req, res) => {
    try {
      const data = insertTrainingSchema.parse(req.body);
      const training = await storage.createTraining(data);
      res.json(training);
    } catch (error) {
      res.status(400).json({ error: "Invalid training data" });
    }
  });

  app.put("/api/training/:id", requireAuth, async (req, res) => {
    try {
      const training = await storage.updateTraining(req.params.id, req.body);
      if (!training) {
        return res.status(404).json({ error: "Training not found" });
      }
      res.json(training);
    } catch (error) {
      res.status(400).json({ error: "Failed to update training" });
    }
  });

  app.delete("/api/training/:id", requireAuth, async (req, res) => {
    try {
      const deleted = await storage.deleteTraining(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Training not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete training" });
    }
  });

  // Experience Routes
  app.get("/api/experience", async (req, res) => {
    try {
      const experiences = await storage.getExperiences();
      res.json(experiences);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch experiences" });
    }
  });

  app.post("/api/experience", requireAuth, async (req, res) => {
    try {
      const data = insertExperienceSchema.parse(req.body);
      const exp = await storage.createExperience(data);
      res.json(exp);
    } catch (error) {
      res.status(400).json({ error: "Invalid experience data" });
    }
  });

  app.put("/api/experience/:id", requireAuth, async (req, res) => {
    try {
      const exp = await storage.updateExperience(req.params.id, req.body);
      if (!exp) {
        return res.status(404).json({ error: "Experience not found" });
      }
      res.json(exp);
    } catch (error) {
      res.status(400).json({ error: "Failed to update experience" });
    }
  });

  app.delete("/api/experience/:id", requireAuth, async (req, res) => {
    try {
      const deleted = await storage.deleteExperience(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Experience not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete experience" });
    }
  });

  // Blogs Routes
  app.get("/api/blogs", async (req, res) => {
    try {
      const blogs = await storage.getBlogs();
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blogs" });
    }
  });

  app.post("/api/blogs", requireAuth, async (req, res) => {
    try {
      const data = insertBlogSchema.parse(req.body);
      const blog = await storage.createBlog(data);
      res.json(blog);
    } catch (error) {
      res.status(400).json({ error: "Invalid blog data" });
    }
  });

  app.put("/api/blogs/:id", requireAuth, async (req, res) => {
    try {
      const blog = await storage.updateBlog(req.params.id, req.body);
      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }
      res.json(blog);
    } catch (error) {
      res.status(400).json({ error: "Failed to update blog" });
    }
  });

  app.delete("/api/blogs/:id", requireAuth, async (req, res) => {
    try {
      const deleted = await storage.deleteBlog(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Blog not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete blog" });
    }
  });

  // Social Links Routes
  app.get("/api/social", async (req, res) => {
    try {
      const links = await storage.getSocialLinks();
      res.json(links);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch social links" });
    }
  });

  app.post("/api/social", requireAuth, async (req, res) => {
    try {
      const data = insertSocialLinkSchema.parse(req.body);
      const link = await storage.createSocialLink(data);
      res.json(link);
    } catch (error) {
      res.status(400).json({ error: "Invalid social link data" });
    }
  });

  app.put("/api/social/:id", requireAuth, async (req, res) => {
    try {
      const link = await storage.updateSocialLink(req.params.id, req.body);
      if (!link) {
        return res.status(404).json({ error: "Social link not found" });
      }
      res.json(link);
    } catch (error) {
      res.status(400).json({ error: "Failed to update social link" });
    }
  });

  app.delete("/api/social/:id", requireAuth, async (req, res) => {
    try {
      const deleted = await storage.deleteSocialLink(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Social link not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete social link" });
    }
  });

  // Contact Info Routes
  app.get("/api/contact-info", async (req, res) => {
    try {
      const info = await storage.getContactInfo();
      res.json(info);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contact info" });
    }
  });

  app.put("/api/contact-info", requireAuth, async (req, res) => {
    try {
      const data = contactInfoSchema.parse(req.body);
      const info = await storage.updateContactInfo(data);
      res.json(info);
    } catch (error) {
      res.status(400).json({ error: "Invalid contact info data" });
    }
  });

  // Profile Info Routes
  app.get("/api/profile", async (req, res) => {
    try {
      const profile = await storage.getProfileInfo();
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  });

  app.put("/api/profile", requireAuth, async (req, res) => {
    try {
      const profile = await storage.updateProfileInfo(req.body);
      res.json(profile);
    } catch (error) {
      res.status(400).json({ error: "Failed to update profile" });
    }
  });

  // File Upload Route with error handling
  app.post("/api/upload", requireAuth, (req, res) => {
    upload.single("file")(req, res, (err) => {
      if (err) {
        // Handle Multer errors
        if (err instanceof multer.MulterError) {
          if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({ error: "File too large. Maximum size is 5MB" });
          }
          return res.status(400).json({ error: `Upload error: ${err.message}` });
        }
        // Handle custom errors from fileFilter or storage
        return res.status(400).json({ error: err.message || "File upload failed" });
      }
      
      try {
        if (!req.file) {
          return res.status(400).json({ error: "No file uploaded" });
        }
        
        // Validate type against allowlist (already validated in multer, but double-check)
        const type = req.body.type;
        if (!type || typeof type !== "string" || !ALLOWED_UPLOAD_TYPES.has(type)) {
          return res.status(400).json({ error: "Invalid upload type" });
        }
        
        // Use the validated type directly
        const url = `/images/${type}/${req.file.filename}`;
        res.json({ url });
      } catch (error) {
        res.status(500).json({ error: "File upload failed" });
      }
    });
  });

  // Contact Form Email Route
  app.post("/api/contact", async (req, res) => {
    try {
      const data = contactFormSchema.parse(req.body);

      // Configure nodemailer (using a test account for demo purposes)
      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: "test@ethereal.email",
          pass: "test123",
        },
      });

      const courseInfo = data.course && data.course !== 'none' 
        ? `<p><strong>Interested Course:</strong> ${data.course}</p>` 
        : '';

      await transporter.sendMail({
        from: data.email,
        to: "gourav.arora@example.com",
        subject: `Portfolio Contact: ${data.subject}`,
        text: `From: ${data.name} (${data.email})\n${data.course ? `Course: ${data.course}\n` : ''}\n${data.message}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>From:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${courseInfo}
          <p><strong>Subject:</strong> ${data.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message}</p>
        `,
      });

      res.json({ success: true });
    } catch (error) {
      console.error("Email error:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  // Courses Routes
  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await storage.getCourses();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch courses" });
    }
  });

  app.post("/api/courses", requireAuth, async (req, res) => {
    try {
      const data = req.body;
      const course = await storage.createCourse(data);
      res.json(course);
    } catch (error) {
      res.status(400).json({ error: "Invalid course data" });
    }
  });

  app.put("/api/courses/:id", requireAuth, async (req, res) => {
    try {
      const course = await storage.updateCourse(req.params.id, req.body);
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }
      res.json(course);
    } catch (error) {
      res.status(400).json({ error: "Failed to update course" });
    }
  });

  app.delete("/api/courses/:id", requireAuth, async (req, res) => {
    try {
      const deleted = await storage.deleteCourse(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Course not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete course" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
