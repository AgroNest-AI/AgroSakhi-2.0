import { 
  users, type User, type InsertUser,
  devices, type Device, type InsertDevice,
  tasks, type Task, type InsertTask,
  weather, type Weather, type InsertWeather,
  advisories, type Advisory, type InsertAdvisory,
  courses, type Course, type InsertCourse,
  markets, type MarketInfo, 
  products, type Product, type InsertProduct,
  schemes, type Scheme, type InsertScheme
} from "@shared/schema";

// Interface for all storage operations
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, userData: Partial<User>): Promise<User | undefined>;
  
  // Device methods
  getDevices(userId: number): Promise<Device[]>;
  getDevice(id: number): Promise<Device | undefined>;
  createDevice(device: InsertDevice): Promise<Device>;
  updateDevice(id: number, deviceData: Partial<Device>): Promise<Device | undefined>;
  getDeviceHistory(deviceId: number): Promise<any>;
  
  // Task methods
  getTasks(userId: number): Promise<Task[]>;
  getTask(id: number): Promise<Task | undefined>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: number, taskData: Partial<Task>): Promise<Task | undefined>;
  startTask(id: number): Promise<Task | undefined>;
  
  // Weather methods
  getWeather(): Promise<Weather | undefined>;
  updateWeather(weatherData: InsertWeather): Promise<Weather>;
  
  // Advisory methods
  getAdvisories(): Promise<Advisory[]>;
  getAdvisory(id: number): Promise<Advisory | undefined>;
  createAdvisory(advisory: InsertAdvisory): Promise<Advisory>;
  
  // Course methods
  getCourses(): Promise<Course[]>;
  getCourse(id: number): Promise<Course | undefined>;
  getCurrentCourse(): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  
  // Market methods
  getMarketInfo(): Promise<MarketInfo | undefined>;
  
  // Product methods
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Scheme methods
  getSchemes(): Promise<Scheme[]>;
  getScheme(id: number): Promise<Scheme | undefined>;
  createScheme(scheme: InsertScheme): Promise<Scheme>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private devices: Map<number, Device>;
  private tasks: Map<number, Task>;
  private weatherData: Weather | undefined;
  private advisoryList: Map<number, Advisory>;
  private courseList: Map<number, Course>;
  private productList: Map<number, Product>;
  private schemeList: Map<number, Scheme>;
  
  private userCurrentId: number = 1;
  private deviceCurrentId: number = 1;
  private taskCurrentId: number = 1;
  private advisoryCurrentId: number = 1;
  private courseCurrentId: number = 1;
  private productCurrentId: number = 1;
  private schemeCurrentId: number = 1;

  constructor() {
    this.users = new Map();
    this.devices = new Map();
    this.tasks = new Map();
    this.advisoryList = new Map();
    this.courseList = new Map();
    this.productList = new Map();
    this.schemeList = new Map();
    
    // Initialize with sample data
    this.initializeData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const now = new Date();
    const user: User = { 
      ...insertUser, 
      id, 
      level: 1, 
      points: 0, 
      totalHarvest: 0, 
      totalEarnings: 0, 
      completedCourses: 0,
      createdAt: now
    };
    this.users.set(id, user);
    return user;
  }
  
  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  // Device methods
  async getDevices(userId: number): Promise<Device[]> {
    return Array.from(this.devices.values()).filter(
      (device) => device.userId === userId
    );
  }
  
  async getDevice(id: number): Promise<Device | undefined> {
    return this.devices.get(id);
  }
  
  async createDevice(insertDevice: InsertDevice): Promise<Device> {
    const id = this.deviceCurrentId++;
    const now = new Date();
    const device: Device = { ...insertDevice, id, createdAt: now };
    this.devices.set(id, device);
    return device;
  }
  
  async updateDevice(id: number, deviceData: Partial<Device>): Promise<Device | undefined> {
    const device = await this.getDevice(id);
    if (!device) return undefined;
    
    const updatedDevice = { ...device, ...deviceData };
    this.devices.set(id, updatedDevice);
    return updatedDevice;
  }
  
  async getDeviceHistory(deviceId: number): Promise<any> {
    // In a real implementation, this would query historical device readings
    return {
      deviceId,
      history: [
        // This would be actual historical data
      ]
    };
  }
  
  // Task methods
  async getTasks(userId: number): Promise<Task[]> {
    return Array.from(this.tasks.values()).filter(
      (task) => task.userId === userId
    );
  }
  
  async getTask(id: number): Promise<Task | undefined> {
    return this.tasks.get(id);
  }
  
  async createTask(insertTask: InsertTask): Promise<Task> {
    const id = this.taskCurrentId++;
    const now = new Date();
    const task: Task = { ...insertTask, id, createdAt: now };
    this.tasks.set(id, task);
    return task;
  }
  
  async updateTask(id: number, taskData: Partial<Task>): Promise<Task | undefined> {
    const task = await this.getTask(id);
    if (!task) return undefined;
    
    const updatedTask = { ...task, ...taskData };
    this.tasks.set(id, updatedTask);
    return updatedTask;
  }
  
  async startTask(id: number): Promise<Task | undefined> {
    const task = await this.getTask(id);
    if (!task) return undefined;
    
    if (task.status === 'pending') {
      return this.updateTask(id, { status: 'completed' });
    }
    
    return task;
  }
  
  // Weather methods
  async getWeather(): Promise<Weather | undefined> {
    return this.weatherData;
  }
  
  async updateWeather(weatherData: InsertWeather): Promise<Weather> {
    const id = 1; // Single weather record
    const now = new Date();
    this.weatherData = { ...weatherData, id, createdAt: now };
    return this.weatherData;
  }
  
  // Advisory methods
  async getAdvisories(): Promise<Advisory[]> {
    return Array.from(this.advisoryList.values());
  }
  
  async getAdvisory(id: number): Promise<Advisory | undefined> {
    return this.advisoryList.get(id);
  }
  
  async createAdvisory(insertAdvisory: InsertAdvisory): Promise<Advisory> {
    const id = this.advisoryCurrentId++;
    const now = new Date();
    const advisory: Advisory = { ...insertAdvisory, id, createdAt: now };
    this.advisoryList.set(id, advisory);
    return advisory;
  }
  
  // Course methods
  async getCourses(): Promise<Course[]> {
    return Array.from(this.courseList.values());
  }
  
  async getCourse(id: number): Promise<Course | undefined> {
    return this.courseList.get(id);
  }
  
  async getCurrentCourse(): Promise<Course | undefined> {
    // Get the first course as current in this simple implementation
    const courses = Array.from(this.courseList.values());
    return courses.length > 0 ? courses[0] : undefined;
  }
  
  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = this.courseCurrentId++;
    const now = new Date();
    const course: Course = { ...insertCourse, id, createdAt: now };
    this.courseList.set(id, course);
    return course;
  }
  
  // Market methods
  async getMarketInfo(): Promise<MarketInfo | undefined> {
    return {
      lastSale: "₹ 45,280",
      currentProduct: "धान: 280 kg",
      price: "22",
      groupSale: {
        title: "महिला किसान संघ की सामूहिक बिक्री",
        description: "अपने संघ के साथ मिलकर 2000 किलो धान की सामूहिक बिक्री करके 8% अधिक कीमत प्राप्त करें।",
        participated: 12,
        total: 15
      }
    };
  }
  
  // Product methods
  async getProducts(): Promise<Product[]> {
    return Array.from(this.productList.values());
  }
  
  async getProduct(id: number): Promise<Product | undefined> {
    return this.productList.get(id);
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productCurrentId++;
    const now = new Date();
    const product: Product = { ...insertProduct, id, createdAt: now };
    this.productList.set(id, product);
    return product;
  }
  
  // Scheme methods
  async getSchemes(): Promise<Scheme[]> {
    return Array.from(this.schemeList.values());
  }
  
  async getScheme(id: number): Promise<Scheme | undefined> {
    return this.schemeList.get(id);
  }
  
  async createScheme(insertScheme: InsertScheme): Promise<Scheme> {
    const id = this.schemeCurrentId++;
    const now = new Date();
    const scheme: Scheme = { ...insertScheme, id, createdAt: now };
    this.schemeList.set(id, scheme);
    return scheme;
  }
  
  // Initialize sample data for development
  private initializeData() {
    // Create a sample user
    const user: User = {
      id: this.userCurrentId++,
      username: "सुनीता देवी",
      password: "password123", // This would be hashed in a real application
      location: "राजस्थान, भारत",
      level: 2,
      points: 125,
      totalHarvest: 1250,
      totalEarnings: 72500,
      completedCourses: 8,
      createdAt: new Date()
    };
    this.users.set(user.id, user);
    
    // Create sample devices
    const device1: Device = {
      id: this.deviceCurrentId++,
      userId: user.id,
      name: "AgroSakhi Band™",
      type: "band",
      status: "connected",
      batteryLevel: "85%",
      soilMoisture: "42%",
      temperature: "32°C",
      humidity: "68%",
      soilPH: "",
      pestLevel: "",
      location: "",
      lastUpdate: "10:45 AM",
      createdAt: new Date()
    };
    this.devices.set(device1.id, device1);
    
    const device2: Device = {
      id: this.deviceCurrentId++,
      userId: user.id,
      name: "SakhiSense™ स्टेशन",
      type: "station",
      status: "online",
      batteryLevel: "",
      soilMoisture: "45%",
      temperature: "34°C",
      humidity: "65%",
      soilPH: "6.5",
      pestLevel: "कम",
      location: "दक्षिण खेत",
      lastUpdate: "11:15 AM",
      createdAt: new Date()
    };
    this.devices.set(device2.id, device2);
    
    // Create sample tasks
    const task1: Task = {
      id: this.taskCurrentId++,
      userId: user.id,
      title: "धान के फसल में खाद डालना",
      description: "सुबह 7:00 बजे से धान के फसल में खाद डालें",
      status: "completed",
      time: "सुबह 7:00",
      hasVideo: false,
      createdAt: new Date()
    };
    this.tasks.set(task1.id, task1);
    
    const task2: Task = {
      id: this.taskCurrentId++,
      userId: user.id,
      title: "खेत की सिंचाई करें",
      description: "दोपहर में खेत की सिंचाई करें",
      status: "pending",
      time: "दोपहर 2:00",
      hasVideo: false,
      createdAt: new Date()
    };
    this.tasks.set(task2.id, task2);
    
    const task3: Task = {
      id: this.taskCurrentId++,
      userId: user.id,
      title: "कीट नियंत्रण सप्ताह की शुरुआत",
      description: "कीट नियंत्रण के लिए आवश्यक उपाय करें",
      status: "important",
      time: "आज शाम",
      hasVideo: true,
      createdAt: new Date()
    };
    this.tasks.set(task3.id, task3);
    
    // Create weather data
    this.weatherData = {
      id: 1,
      temperature: "32°C",
      condition: "साफ आसमान",
      humidity: "65%",
      wind: "12 km/h",
      rainfall: "0%",
      alert: "अगले 3 दिनों में वर्षा की संभावना है। फसलों की कटाई में जल्दी करें।",
      updated: "30 मिनट पहले",
      createdAt: new Date()
    };
    
    // Create sample advisories
    const advisory1: Advisory = {
      id: this.advisoryCurrentId++,
      title: "धान के पौधे स्वस्थ दिख रहे हैं",
      description: "आपकी फसल अच्छी तरह से बढ़ रही है। अगले 3 दिनों में वर्षा के पूर्वानुमान के कारण, अभी अतिरिक्त सिंचाई की आवश्यकता नहीं है।",
      type: "positive",
      hasVideo: false,
      createdAt: new Date()
    };
    this.advisoryList.set(advisory1.id, advisory1);
    
    const advisory2: Advisory = {
      id: this.advisoryCurrentId++,
      title: "कीट चेतावनी: ब्राउन प्लांट हॉपर",
      description: "आसपास के क्षेत्रों में बढ़ रहे है। निवारक उपाय के लिए नीम आधारित स्प्रे का उपयोग करें। SakhiShakti अकादमी पर वीडियो देखें।",
      type: "warning",
      hasVideo: true,
      createdAt: new Date()
    };
    this.advisoryList.set(advisory2.id, advisory2);
    
    // Create sample courses
    const course1: Course = {
      id: this.courseCurrentId++,
      title: "आज का पाठ: संतुलित फसल उर्वरक",
      description: "फसलों के लिए सही मात्रा में उर्वरक का उपयोग कैसे करें। वीडियो देखकर 20 अंक कमाएं।",
      level: 2,
      progress: 65,
      lessons: 12,
      icon: "eco",
      createdAt: new Date()
    };
    this.courseList.set(course1.id, course1);
    
    const course2: Course = {
      id: this.courseCurrentId++,
      title: "जैविक कीट नियंत्रण",
      description: "जैविक तरीकों से कीट नियंत्रण कैसे करें",
      level: 2,
      progress: 30,
      lessons: 8,
      icon: "pest_control",
      createdAt: new Date()
    };
    this.courseList.set(course2.id, course2);
    
    const course3: Course = {
      id: this.courseCurrentId++,
      title: "फसल चक्र और मिट्टी का स्वास्थ्य",
      description: "फसल चक्र का उपयोग करके मिट्टी के स्वास्थ्य को बनाए रखें",
      level: 1,
      progress: 20,
      lessons: 10,
      icon: "cyclone",
      createdAt: new Date()
    };
    this.courseList.set(course3.id, course3);
    
    const course4: Course = {
      id: this.courseCurrentId++,
      title: "मौसम आधारित खेती",
      description: "मौसम पूर्वानुमान के आधार पर कृषि निर्णय लेना",
      level: 3,
      progress: 10,
      lessons: 6,
      icon: "cloudy_snowing",
      createdAt: new Date()
    };
    this.courseList.set(course4.id, course4);
    
    // Create sample products
    const product1: Product = {
      id: this.productCurrentId++,
      name: "धान",
      description: "उच्च गुणवत्ता वाला बासमती धान",
      price: "24",
      createdAt: new Date()
    };
    this.productList.set(product1.id, product1);
    
    const product2: Product = {
      id: this.productCurrentId++,
      name: "गेहूं",
      description: "जैविक तरीके से उगाया गया गेहूं",
      price: "18",
      createdAt: new Date()
    };
    this.productList.set(product2.id, product2);
    
    const product3: Product = {
      id: this.productCurrentId++,
      name: "दाल",
      description: "मसूर दाल, उच्च प्रोटीन वाली",
      price: "32",
      createdAt: new Date()
    };
    this.productList.set(product3.id, product3);
    
    const product4: Product = {
      id: this.productCurrentId++,
      name: "सब्जियां",
      description: "ताजी हरी सब्जियां, बिना रसायन के उगाई गई",
      price: "15",
      createdAt: new Date()
    };
    this.productList.set(product4.id, product4);
    
    // Create sample schemes
    const scheme1: Scheme = {
      id: this.schemeCurrentId++,
      title: "प्रधानमंत्री किसान सम्मान निधि",
      description: "किसानों को प्रति वर्ष ₹6,000 की आर्थिक सहायता प्रदान की जाती है।",
      status: "open",
      statusText: "आवेदन खुला",
      createdAt: new Date()
    };
    this.schemeList.set(scheme1.id, scheme1);
    
    const scheme2: Scheme = {
      id: this.schemeCurrentId++,
      title: "किसान क्रेडिट कार्ड",
      description: "कम ब्याज दर पर किसानों को ऋण प्रदान करने की योजना।",
      status: "eligible",
      statusText: "पात्र",
      createdAt: new Date()
    };
    this.schemeList.set(scheme2.id, scheme2);
  }
}

export const storage = new MemStorage();
