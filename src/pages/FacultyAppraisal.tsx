import { useState, useEffect } from 'react';
import LoginPage from '@/components/LoginPage';
import Dashboard from '@/components/Dashboard';

const FacultyAppraisal = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      const saved = sessionStorage.getItem("isLoggedIn");
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (isLoggedIn) sessionStorage.setItem("isLoggedIn", JSON.stringify(true));
      else sessionStorage.removeItem("isLoggedIn");
    } catch {}
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    try {
      sessionStorage.removeItem("isLoggedIn");
      localStorage.removeItem("dashboardView");
    } catch {}
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <Dashboard onLogout={handleLogout} />;
};

export default FacultyAppraisal;
