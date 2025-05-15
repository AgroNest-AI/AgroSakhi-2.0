import type { Express, Request, Response } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertTaskSchema, insertUserSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  const apiRouter = express.Router();
  
  // User routes
  apiRouter.get("/user", async (req: Request, res: Response) => {
    // In a real app, we would get the user ID from the session
    // For this example, we'll always return the first user
    const users = await storage.getUser(1);
    res.json(users);
  });
  
  apiRouter.post("/user", async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: "Invalid user data" });
    }
  });
  
  // Devices routes
  apiRouter.get("/devices", async (req: Request, res: Response) => {
    // In a real app, we would get the user ID from the session
    const devices = await storage.getDevices(1);
    res.json(devices);
  });
  
  apiRouter.get("/devices/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const device = await storage.getDevice(id);
    
    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }
    
    res.json(device);
  });
  
  apiRouter.get("/devices/history", async (req: Request, res: Response) => {
    // In a real implementation, we would get device history from a time-series database
    // For now, return a mock response
    res.json({
      history: {
        timestamps: ["10:00", "11:00", "12:00", "13:00", "14:00"],
        soilMoisture: [40, 42, 45, 44, 42],
        temperature: [30, 31, 32, 33, 32],
        humidity: [65, 64, 68, 70, 68]
      }
    });
  });
  
  // Tasks routes
  apiRouter.get("/tasks", async (req: Request, res: Response) => {
    // In a real app, we would get the user ID from the session
    const tasks = await storage.getTasks(1);
    res.json(tasks);
  });
  
  apiRouter.post("/tasks", async (req: Request, res: Response) => {
    try {
      const taskData = insertTaskSchema.parse(req.body);
      const task = await storage.createTask(taskData);
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ message: "Invalid task data" });
    }
  });
  
  apiRouter.post("/tasks/:id/start", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const updatedTask = await storage.startTask(id);
      
      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }
      
      res.json(updatedTask);
    } catch (error) {
      res.status(500).json({ message: "Failed to start task" });
    }
  });
  
  // Weather route
  apiRouter.get("/weather", async (req: Request, res: Response) => {
    const weather = await storage.getWeather();
    res.json(weather);
  });
  
  // Advisories route
  apiRouter.get("/advisories", async (req: Request, res: Response) => {
    const advisories = await storage.getAdvisories();
    res.json(advisories);
  });
  
  // Courses routes
  apiRouter.get("/courses", async (req: Request, res: Response) => {
    const courses = await storage.getCourses();
    res.json(courses);
  });
  
  apiRouter.get("/courses/current", async (req: Request, res: Response) => {
    const course = await storage.getCurrentCourse();
    
    if (!course) {
      return res.status(404).json({ message: "No current course found" });
    }
    
    res.json(course);
  });
  
  // Market route
  apiRouter.get("/market", async (req: Request, res: Response) => {
    const marketInfo = await storage.getMarketInfo();
    res.json(marketInfo);
  });
  
  // Products route
  apiRouter.get("/products", async (req: Request, res: Response) => {
    const products = await storage.getProducts();
    res.json(products);
  });
  
  // Government schemes route
  apiRouter.get("/schemes", async (req: Request, res: Response) => {
    const schemes = await storage.getSchemes();
    res.json(schemes);
  });
  
  // Speech recognition simulation for voice assistant
  apiRouter.post("/voice", async (req: Request, res: Response) => {
    try {
      const { transcript, language } = req.body;
      
      // In a real implementation, this would send the transcript to a natural language
      // processing service or AI model to generate a response
      
      // For now, return a simulated response
      const responses: Record<string, string> = {
        'hi': 'आपके धान के लिए NPK 15-15-15 उर्वरक की सिफारिश की जाती है। प्रति एकड़ 50 किलो का उपयोग करें।',
        'en': 'For your rice crop, NPK 15-15-15 fertilizer is recommended. Use 50 kg per acre.'
      };
      
      res.json({ 
        response: responses[language || 'hi'],
        recommendations: [
          { type: 'task', title: 'उर्वरक खरीदने के लिए बाजार जाएँ' },
          { type: 'weather', alert: 'वर्षा से पहले उर्वरक का प्रयोग करें' }
        ]
      });
    } catch (error) {
      res.status(400).json({ message: "Invalid voice request" });
    }
  });
  
  // Mount API router
  app.use("/api", apiRouter);

  const httpServer = createServer(app);

  return httpServer;
}
