# Impact Health 🏥

> **Tailored, patient-first medical infrastructure and healthcare services across 200+ cities in India.**

Impact Health connects patients, doctors, lab networks, and pharmaceutical support programs into a unified healthcare platform. The platform powers chronic disease management, turnkey patient support programs, corporate wellness solutions, campus health infirmaries, and specialized practitioner tools.

---

## 🏗️ Repository Architecture

This repository is organized as a clean monorepo containing the decoupled frontend and backend services:

```text
.
├── backend/                  # Java Spring Boot REST API
│   ├── src/main/java/        # Application code, Controllers, Entities, Repositories, DTOs
│   ├── src/main/resources/   # Application properties & configuration
│   ├── pom.xml               # Maven project specification
│   └── mvnw / mvnw.cmd       # Maven wrapper scripts
│
├── frontend/                 # React (Vite) Single Page Application
│   ├── public/               # Static assets, logos, public icons
│   ├── src/
│   │   ├── admin/            # Admin CMS, blog reviews, approval desk
│   │   ├── doctor/           # Doctor portal & blog editor
│   │   ├── pages/            # Public healthcare service & content pages
│   │   ├── components/       # Shared UI components & design system primitives
│   │   └── api/              # Frontend API client services
│   ├── package.json          # Node dependencies and scripts
│   └── vite.config.js        # Vite build and development configuration
│
├── PRODUCT.md                # Detailed product specifications & clinical commitments
├── .gitignore                # Global git exclusion rules
└── README.md                 # Project documentation (this file)
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher ([Download Node.js](https://nodejs.org/))
- **Java JDK**: Version 17 or higher ([Download JDK](https://adoptium.net/))
- **Maven**: 3.8+ (or use the included `./mvnw` wrapper)
- **Database**: MySQL 8.0+ running locally or in the cloud (default schema: `impact_health`)

---

### 1. Backend Setup (Spring Boot)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Configure database credentials in `src/main/resources/application.properties` (or set environment variables):
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/impact_health?createDatabaseIfNotExist=true&useSSL=false
   spring.datasource.username=root
   spring.datasource.password=your_password
   ```

3. Run the Spring Boot application:
   ```bash
   # Using Maven Wrapper (Windows PowerShell)
   .\mvnw.cmd spring-boot:run

   # Using Maven Wrapper (macOS / Linux)
   ./mvnw spring-boot:run
   ```

4. The REST API will start on: **`http://localhost:8080`**

---

### 2. Frontend Setup (React + Vite)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser at: **`http://localhost:5173`**

---

## 🌟 Key Capabilities & Modules

| Module | Description | Audience |
| :--- | :--- | :--- |
| **Patient Support Programs (PSP)** | Turnkey disease management programs, therapy adherence, and home support. | Patients & Pharma Partners |
| **Corporate Health** | Executive health checkups, occupational compliance, and corporate wellness screenings. | B2B / Employers |
| **School Health Services** | Campus infirmary setups, pediatric screenings, and emergency medical response. | Educational Institutions |
| **Practitioner Network** | Clinical coordination, telemedicine referrals, and diagnostic ordering. | Healthcare Providers |
| **Content & CMS Hub** | Medical blog editorial desk with multi-tier approval workflow (Doctor -> Admin -> Published). | Clinical Writers & Admins |

---

## 📞 Support & Contacts

- **Central Care Coordination**: `connect@impacthealth.co.in`
- **Phone Support**: `+91 9667835909`
- **Headquarters**: 473/B1/P, Kokila Lane-4, Pokhariput, Bhubaneswar, Odisha 751020

---

## 📄 License

This repository and its contents are proprietary to **Impact Health**. All rights reserved.
