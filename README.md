# 🏛️ Nagrik Setu Frontend

The **Nagrik Setu Frontend** is the user-facing layer of the Nagrik Setu ecosystem — designed to empower citizens and administrators through a clean, responsive, and intuitive interface.

It provides a seamless experience for **reporting civic issues, tracking complaint status, and managing resolutions**, acting as the visual bridge between citizens and government authorities.

---

## 📑 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [How It Works](#how-it-works)
- [Setup Instructions](#setup-instructions)
- [Citizen App Interface](#citizen-app-interface)
- [Admin Dashboard Interface](#admin-dashboard-interface)
- [Future Enhancements](#future-enhancements)
- [Contributions](#contributions)

---

## 🔍 Overview <a id="overview"></a>

The Nagrik Setu Frontend delivers a **modern, accessible, and scalable UI** that connects directly with the Nagrik Setu Backend APIs.

It serves two primary user roles:

- 📱 **Citizens** – report and track civic issues
- 🗂️ **Administrators** – review, manage, and resolve complaints

The frontend emphasizes **clarity, speed, transparency, and trust**, ensuring every interaction feels simple and purposeful.

---

## ⭐ Key Features <a id="key-features"></a>

### 🧑‍💻 Citizen-Facing Features

- Secure user registration & login
- Complaint submission with:
  - Image upload
  - Category & description

- Real-time complaint tracking
- Status indicators (Filed → In Progress → Resolved)
- Personal complaint history dashboard

### 🛠️ Admin-Facing Features

- Secure admin authentication
- Centralized complaint listing
- Filter complaints by:
  - Status
  - Category

- Update complaint status
- Visual dashboards for quick insights

### 🎨 UI & UX

- Fully responsive design (mobile-first)
- Clean, minimal layout for civic clarity
- Consistent color system symbolizing trust & governance
- Smooth transitions and intuitive navigation

---

## 🧰 Tech Stack <a id="tech-stack"></a>

### Frontend Framework

- React.js
- Vite (fast development & build)

### Styling

- Tailwind CSS
- Custom utility-based design system

### Routing

- React Router DOM

### State Management

- React Context API

### API Communication

- Axios

### Icons & UI Enhancements

- Lucide React
- Toast notifications for user feedback

---

## 🔄 How it works <a id="how-it-works"></a>

### Citizen Flow

1. Citizen logs in or registers
2. Submits a complaint with image & details
3. Complaint is sent to backend APIs
4. Citizen tracks real-time status updates
5. Resolution status is reflected instantly

### Admin Flow

1. Admin logs into dashboard
2. Views all submitted complaints
3. Filters & reviews issues
4. Updates complaint status
5. Citizens receive updated information

The frontend acts as a **real-time visual layer**, ensuring transparency between users and authorities.

---

## ⚙️ Setup Instructions <a id="setup-instructions"></a>

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/NJayantRao/Nagrik_Setu_Frontend.git
cd Nagrik_Setu_Frontend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run the Development Server

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

---

## 📱 Citizen App Interface <a id="citizen-app-interface"></a>

The Citizen Interface focuses on **simplicity and accessibility**, enabling users to raise issues in just a few steps.

Citizens can:

- Register & log in securely
- Upload images directly from their device
- Track all submitted complaints
- Receive clear visual status updates

The goal is to **reduce friction** and encourage civic participation.

---

## 🖥️ Admin Dashboard Interface <a id="admin-dashboard-interface"></a>

The Admin Dashboard provides a **central command panel** for authorities to efficiently manage issues.

Admins can:

- View all citizen complaints
- Monitor real-time status updates
- Filter & sort issues
- Update complaint resolution stages
- Maintain accountability and transparency

All admin actions are protected using **JWT-based authentication** via the backend.

---

## 🎨 Design Philosophy

Nagrik Setu’s frontend is designed around:

- **Trust** – calm colors & structured layouts
- **Clarity** – minimal UI, zero clutter
- **Accessibility** – responsive, readable, inclusive
- **Scalability** – modular components & clean architecture

The visual identity symbolizes a **bridge (Setu)** — connecting citizens and governance seamlessly.

---

## 🚀 Future Enhancements <a id="future-enhancements"></a>

- Dark mode support
- Real-time notifications using WebSockets
- Advanced analytics dashboards for admins
- Map-based issue visualization
- Staff-specific dashboards
- Progressive Web App (PWA) support

---

## 🤝 Contributions <a id="contributions"></a>

Contributions are always welcome!

If you’d like to improve the frontend:

1. Fork the repository
2. Create a feature or fix branch
3. Commit clean, well-documented changes
4. Submit a pull request with a clear description

All UI/UX, performance, and accessibility improvements are highly appreciated.
