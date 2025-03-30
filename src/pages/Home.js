import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  LinearProgress,
  Paper,
  IconButton,
  Badge,
  useTheme
} from '@mui/material';
import {
  Home as HomeIcon,
  LiveTv as LiveIcon,
  Lightbulb as AwarenessIcon,
  Build as ToolsIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const motivationalQuotes = [
  "Discipline is the bridge between goals and accomplishment.",
  "The only way to do great work is to love what you do.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "Everything you can imagine is real."
];

const Home = ({ user, darkMode, toggleDarkMode, changeLanguage }) => {
  const [progress, setProgress] = useState(0);
  const [userData, setUserData] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUserData(userData);
      setProgress(userData.progress || 0);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleNavigation = (path) => {
    navigate(path);
    setShowMenu(false);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            mb: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography variant="h4" gutterBottom>
            {t('welcome')}, {userData?.username}!
          </Typography>
          
          <Typography variant="body1" sx={{ mb: 2, textAlign: 'center' }}>
            {motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]}
          </Typography>

          <Box sx={{ width: '100%', mb: 3 }}>
            <Typography variant="body2" gutterBottom>
              {t('progress')}: {progress}%
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              sx={{ height: 10, borderRadius: 5 }}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                startIcon={<HomeIcon />}
                onClick={() => handleNavigation('/')}
                disabled
              >
                {t('home')}
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                startIcon={<LiveIcon />}
                onClick={() => handleNavigation('/live')}
                disabled={progress < 100}
                color={progress >= 100 ? "primary" : "default"}
              >
                {t('live')}
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                startIcon={<AwarenessIcon />}
                onClick={() => handleNavigation('/awareness')}
              >
                {t('awareness')}
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                startIcon={<ToolsIcon />}
                onClick={() => handleNavigation('/tools')}
              >
                {t('tools')}
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <IconButton onClick={toggleDarkMode} color="inherit">
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <IconButton onClick={handleLogout} color="inherit">
                <LogoutIcon />
              </IconButton>
            </motion.div>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Home; 