import { pgTable, text, serial, integer, boolean, timestamp, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  location: text("location"),
  level: integer("level").default(1),
  points: integer("points").default(0),
  totalHarvest: integer("total_harvest").default(0),
  totalEarnings: integer("total_earnings").default(0),
  completedCourses: integer("completed_courses").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  location: true,
});

// Devices table
export const devices = pgTable("devices", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  type: text("type").notNull(), // 'band' or 'station'
  status: text("status").notNull(),
  batteryLevel: text("battery_level"),
  soilMoisture: text("soil_moisture"),
  temperature: text("temperature"),
  humidity: text("humidity"),
  soilPH: text("soil_ph"),
  pestLevel: text("pest_level"),
  location: text("location"),
  lastUpdate: text("last_update"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertDeviceSchema = createInsertSchema(devices).pick({
  userId: true,
  name: true,
  type: true,
  status: true,
  batteryLevel: true,
  soilMoisture: true,
  temperature: true,
  humidity: true,
  soilPH: true,
  pestLevel: true,
  location: true,
});

// Tasks table
export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  description: text("description"),
  status: text("status").notNull(), // 'completed', 'pending', 'important'
  time: text("time"),
  hasVideo: boolean("has_video").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertTaskSchema = createInsertSchema(tasks).pick({
  userId: true,
  title: true,
  description: true,
  status: true,
  time: true,
  hasVideo: true,
});

// Weather table
export const weather = pgTable("weather", {
  id: serial("id").primaryKey(),
  temperature: text("temperature").notNull(),
  condition: text("condition").notNull(),
  humidity: text("humidity").notNull(),
  wind: text("wind").notNull(),
  rainfall: text("rainfall").notNull(),
  alert: text("alert"),
  updated: text("updated").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertWeatherSchema = createInsertSchema(weather).pick({
  temperature: true,
  condition: true,
  humidity: true,
  wind: true,
  rainfall: true,
  alert: true,
  updated: true,
});

// Advisory table
export const advisories = pgTable("advisories", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // 'positive', 'warning', 'alert'
  hasVideo: boolean("has_video").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAdvisorySchema = createInsertSchema(advisories).pick({
  title: true,
  description: true,
  type: true,
  hasVideo: true,
});

// Courses table
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  level: integer("level").default(1),
  progress: integer("progress").default(0),
  lessons: integer("lessons").default(1),
  icon: text("icon"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCourseSchema = createInsertSchema(courses).pick({
  title: true,
  description: true,
  level: true,
  progress: true,
  lessons: true,
  icon: true,
});

// Market table
export const markets = pgTable("markets", {
  id: serial("id").primaryKey(),
  lastSale: text("last_sale").notNull(),
  currentProduct: text("current_product").notNull(),
  price: text("price").notNull(),
  groupSaleTitle: text("group_sale_title").notNull(),
  groupSaleDescription: text("group_sale_description").notNull(),
  participated: integer("participated").default(0),
  total: integer("total").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertMarketSchema = createInsertSchema(markets).pick({
  lastSale: true,
  currentProduct: true,
  price: true,
  groupSaleTitle: true,
  groupSaleDescription: true,
  participated: true,
  total: true,
});

// Products table
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: text("price").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertProductSchema = createInsertSchema(products).pick({
  name: true,
  description: true,
  price: true,
});

// Government Schemes table
export const schemes = pgTable("schemes", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  status: text("status").notNull(), // 'open' or 'eligible'
  statusText: text("status_text").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSchemeSchema = createInsertSchema(schemes).pick({
  title: true,
  description: true,
  status: true,
  statusText: true,
});

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Device = typeof devices.$inferSelect;
export type InsertDevice = z.infer<typeof insertDeviceSchema>;

export type Task = typeof tasks.$inferSelect;
export type InsertTask = z.infer<typeof insertTaskSchema>;

export type Weather = typeof weather.$inferSelect;
export type InsertWeather = z.infer<typeof insertWeatherSchema>;

export type Advisory = typeof advisories.$inferSelect;
export type InsertAdvisory = z.infer<typeof insertAdvisorySchema>;

export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;

export type MarketInfo = {
  lastSale: string;
  currentProduct: string;
  price: string;
  groupSale: {
    title: string;
    description: string;
    participated: number;
    total: number;
  }
};

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type Scheme = typeof schemes.$inferSelect;
export type InsertScheme = z.infer<typeof insertSchemeSchema>;
