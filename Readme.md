# ShopSphere [**🔗Live Link**](https://shopsphere-7mfa.onrender.com/)

ShopSphere is a modern e-commerce platform built using the **PERN stack** (PostgreSQL, Express, React, Node.js) with **TailwindCSS** and **Daisy UI** for styling. It includes advanced features such as **rate limiting, bot detection, global state management, and error handling** to ensure a seamless shopping experience.

## 📸 Screenshot
![Screenshot 2025-02-12 124825](https://github.com/user-attachments/assets/aefcf5b5-ca93-4593-8c1f-5f5bff56636e)

## 🚀 Features

- **Tech Stack:** PERN + TailwindCSS + Daisy UI
- **Rate Limiting & Bot Detection** (via Arcjet)
- **Global State Management with Zustand**
- **Error Handling** on both server and client
- **Deployment on Render (Backend serves the frontend)**
- **Fully Responsive & Modern UI**

## 🛠️ Tech Stack

### **Backend:**

- Node.js
- Express.js
- PostgreSQL (Neon Database)
- Arcjet for bot protection and rate limiting
- Helmet for security
- Morgan for logging

### **Frontend:**

- React
- React Router DOM
- Zustand for state management
- TailwindCSS & Daisy UI for styling
- Axios for API calls
- React Hot Toast for notifications

## 🏗️ Installation & Setup

### 1️⃣ Clone the repository

```sh
git clone https://github.com/Varunyadavgithub/ShopSphere.git
cd shopsphere
```

### 2️⃣ Set up the backend

```sh
cd server
npm install
cp .env.example .env  # Configure your environment variables
npm run dev  # Start the backend
```

### 3️⃣ Set up the frontend

```sh
cd ../client
npm install
npm run dev  # Start the frontend
```

## 🛠 Environment Variables Setup

Create a `.env` file inside the `server/` directory and configure it as follows:

```ini
PORT=3000
PGUSER='your_postgres_user'
PGPASSWORD='your_postgres_password'
PGHOST='your_postgres_host'
PGDATABASE='your_postgres_database'
ARCJET_KEY='your_arcjet_key'
```

Make sure to replace the placeholders with your actual credentials.

## 📌 Available Scripts

### Backend:

```sh
npm run dev      # Start development server with nodemon
npm run start    # Start production server
npm run build    # Install dependencies and build frontend
```

### Frontend:

```sh
npm run dev      # Start frontend in development mode
npm run build    # Build frontend for production
```

## 🌐 Deployment

The backend is deployed on **Render**, serving the frontend directly.

## 📬 Contact & Contribution

We welcome contributions! If you have suggestions, feature requests, or bug reports, feel free to:

- Open an **issue** on GitHub
- Submit a pull **request** with your improvements
- Connect with us for discussions and ideas

Your contributions help make **ShopSphere** better! 🚀

## 📄 License

This project is licensed under the ISC License.

💙 **Happy Coding!** 🚀
