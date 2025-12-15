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

## 🗂️ Project Structure

```
selfapp/
├── src/                    # React frontend source
│   ├── components/         # UI components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── Dashboard.tsx
│   │   ├── LoginPage.tsx
│   │   └── ...
│   ├── pages/             # Page-level components
│   ├── hooks/             # Custom React hooks
│   └── lib/               # Utilities
├── public/                # Static assets
├── app.py                 # Flask backend server
├── requirements.txt       # Python dependencies
├── package.json           # Node.js dependencies
├── docker-compose.yml     # Docker orchestration
├── Backend.Dockerfile     # Backend container config
├── Frontend.Dockerfile    # Frontend container config
└── README.md             # This file
```

## 📜 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Backend
- `python app.py` - Start Flask server

## 🔐 Authentication

Default login credentials:
- **Username:** Any username
- **Password:** `admin`

> ⚠️ **Security Note:** Change the authentication logic in production!

## 🌐 API Endpoints

- `POST /login` - User authentication
- `POST /upload` - File upload for appraisal data
- Additional endpoints documented in `app.py`

## 🐳 Docker Configuration

The application includes Docker support with separate containers for frontend and backend:

- **Backend Container**: Python 3.9 with Flask
- **Frontend Container**: Node.js with Vite dev server
- **Networking**: Internal `appnet` network for service communication

## 📝 Configuration

### Environment Variables

See `.env.example` for available configuration options:

- `FLASK_ENV` - Flask environment (development/production)
- `FLASK_APP` - Flask application entry point
- `VITE_PORT` - Vite development server port
- `VITE_API_URL` - Backend API URL (for Docker)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🐛 Troubleshooting

### Port Already in Use
If ports 5000 or 5173/8080 are in use:
- Change the port in the respective config files
- Or stop the conflicting process

### CORS Issues
Ensure backend CORS settings include your frontend URL

### Docker Build Fails
- Clear Docker cache: `docker-compose build --no-cache`
- Check Docker daemon is running

## 📧 Support

For issues or questions, please open an issue in the repository.

---

Built with ❤️ using React, TypeScript, Flask, and shadcn/ui


