# Faculty Appraisal System

A full-stack web application for managing faculty appraisals with automated document generation. Built with React + TypeScript frontend and Flask backend.

## 🚀 Features

- **User Authentication** - Secure login system with role-based access
- **Dashboard Analytics** - Visual representation of appraisal data with charts
- **File Upload** - Support for Excel and Word document uploads
- **Automated Document Generation** - Generate appraisal reports from templates
- **Chatbot Interface** - Interactive AI assistant for queries
- **Responsive Design** - Built with TailwindCSS and shadcn/ui components

## 📋 Prerequisites

- **Node.js** (v18+ recommended)
- **Python** (v3.8+)
- **npm** or **yarn**
- **Docker** (optional, for containerized deployment)

## 🛠️ Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- shadcn/ui components
- React Router
- React Query
- Recharts

### Backend
- Flask
- Flask-CORS
- pandas
- python-docx
- openpyxl

## 📦 Installation

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd selfapp
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment Setup**
   
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration if needed.

### Running the Application

#### Option 1: Local Development

**Start Backend (Terminal 1):**
```bash
python app.py
```
Backend runs on `http://localhost:5000`

**Start Frontend (Terminal 2):**
```bash
npm run dev
```
Frontend runs on `http://localhost:5173`

#### Option 2: Docker Compose (Recommended)

Run both frontend and backend with Docker:

```bash
docker-compose up --build
```

- Frontend: `http://localhost:8080`
- Backend: `http://localhost:5000`

To stop:
```bash
docker-compose down
```



Built with ❤️ using React, TypeScript, Flask, and shadcn/ui


