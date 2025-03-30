import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useTranslation } from 'react-i18next';
import './i18n';

// Import pages
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Awareness from './pages/Awareness';
import Live from './pages/Live';
import Tools from './pages/Tools';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const { i18n } = useTranslation();
  const [user, setUser] = useState(null);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
    typography: {
      fontFamily: i18n.language === 'ar' ? 'Cairo, sans-serif' : 'Roboto, sans-serif',
    },
    direction: i18n.language === 'ar' ? 'rtl' : 'ltr',
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={
              user ? (
                <Home 
                  user={user} 
                  darkMode={darkMode} 
                  toggleDarkMode={toggleDarkMode}
                  changeLanguage={changeLanguage}
                />
              ) : (
                <SignUp changeLanguage={changeLanguage} />
              )
            } 
          />
          <Route 
            path="/awareness" 
            element={
              <Awareness 
                user={user}
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                changeLanguage={changeLanguage}
              />
            } 
          />
          <Route 
            path="/live" 
            element={
              <Live 
                user={user}
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                changeLanguage={changeLanguage}
              />
            } 
          />
          <Route 
            path="/tools" 
            element={
              <Tools 
                user={user}
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                changeLanguage={changeLanguage}
              />
            } 
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 