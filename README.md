# AgroSakhi 2.0 🌾

<p align="center">
  <img src="generated-icon.png" alt="AgroSakhi Logo" width="150" />
</p>

**Empowering Young Rural Women Through Agri-Tech**

AgroSakhi 2.0 is an AI-powered agricultural platform designed specifically for rural women farmers in India. With extensive multilingual support and a voice-first interface, it bridges the digital divide to deliver cutting-edge agricultural technology to underserved communities.

## 🌟 Features

### 🗣️ Multilingual Support
- Full support for 11+ Indian languages with proper font rendering
- Hindi-first interface with accurate translations
- Language-specific UI components for proper text display

### 🤖 AI-Powered Agricultural Advisory
- Crop health analysis through image recognition
- AI weather prediction with region-specific farming advice
- Market price forecasting with sale timing recommendations
- Soil health analysis with fertilizer recommendations

### 📱 Voice-First Interface
- Voice commands in local dialects
- Voice-based queries and responses
- Accessibility for users with limited literacy

### 🔌 IoT Integration
- **AgroSakhi Band™**: Wearable device for field workers
- **SakhiSense™**: Field monitoring stations that track:
  - Soil moisture levels
  - Temperature and humidity
  - Rainfall measurements
  - Pest detection

### 📚 Education Platform (SakhiShakti Academy)
- Localized agricultural training content
- Skill development courses
- Certification programs
- Financial literacy modules

### 💰 Digital Marketplace (AgroChain)
- Fair price discovery through blockchain
- Direct farm-to-consumer connections
- Group purchasing for better rates
- Integration with government subsidy programs

## 🏗️ Technical Architecture

### Front-End
- React.js with Tailwind CSS
- Shadcn/UI components
- Responsive design optimized for both smartphone and feature phone use
- Offline-first approach for rural connectivity challenges

### Back-End
- Node.js/Express server
- Drizzle ORM for database operations
- RESTful API design
- WebSocket for real-time IoT data

### AI/ML
- OpenAI integration for image analysis and natural language processing
- Fine-tuned models for agricultural applications
- Local language model adaptations

### Data Storage
- PostgreSQL for relational data
- Time-series databases for IoT sensor data

### Security
- End-to-end encryption for sensitive farmer data
- Role-based access control
- Compliance with data protection regulations

## 🚀 Deployment Strategy

### Phase 1: Village-Level MVP
- Raspberry Pi deployment with local LoRaWAN
- 5-10 AgroSakhi Bands and 1-2 field stations
- 25-50 users per village

### Phase 2: District Rollout
- AWS-backed infrastructure with regional edge servers
- Integration with government agricultural databases
- Expanded hardware deployment (100+ devices)

### Phase 3: State-Level Expansion
- Full cloud infrastructure
- Mobile network partnerships for data subsidies
- Advanced AI/ML model training with expanded data

### Future: National/Global Scaling
- Multi-region cloud deployment
- Adaptation for different agricultural zones
- Partnerships across developing nations

## 📱 Mobile Platform Support
- Progressive Web App (PWA) for smartphone users
- USSD and SMS fallback for feature phones
- Voice-based interaction for areas with limited connectivity or literacy

## 🔒 Requirements

To use AgroSakhi 2.0, you'll need:

1. Node.js (version 18.x or higher)
2. PostgreSQL database
3. OpenAI API key for AI features
4. Internet connection for initial setup

## 🛠️ Setup & Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/agrosakhi.git
   cd agrosakhi
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/agrosakhi
   OPENAI_API_KEY=your_openai_api_key
   PORT=5000
   ```

4. Run database migrations:
   ```
   npm run migrate
   ```

5. Start the development server:
   ```
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:5000`

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👩‍💻 Contributors

AgroSakhi 2.0 is developed by AgroNest Ventures with contribution from the rural farming community.

## 📞 Contact

For more information, please contact agrosakhi@agronest.in