import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  IconButton,
  Button,
  useTheme
} from '@mui/material';
import {
  Home as HomeIcon,
  LiveTv as LiveIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import { auth, db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Live = ({ user, darkMode, toggleDarkMode, changeLanguage }) => {
  const [userData, setUserData] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();

  useEffect(() => {
    const fetchUserData = async () => {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
        if (userDoc.data().progress < 100) {
          navigate('/');
        }
      }
    };
    fetchUserData();
  }, [user.uid, navigate]);

  useEffect(() => {
    // Fetch upcoming live events
    const fetchEvents = async () => {
      // This would be replaced with actual Firebase query
      const mockEvents = [
        {
          id: '1',
          title: 'Advanced Trading Strategies',
          date: '2024-03-20T15:00:00Z',
          duration: 120,
          description: 'Learn advanced trading strategies from industry experts.'
        },
        {
          id: '2',
          title: 'Market Analysis Workshop',
          date: '2024-03-25T14:00:00Z',
          duration: 90,
          description: 'Deep dive into current market trends and analysis.'
        }
      ];
      setUpcomingEvents(mockEvents);
    };
    fetchEvents();
  }, []);

  const handleNotificationToggle = async (eventId) => {
    // Implement notification toggle logic
    console.log('Toggle notification for event:', eventId);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4">
              {t('live')}
            </Typography>
            <IconButton onClick={() => navigate('/')}>
              <HomeIcon />
            </IconButton>
          </Box>

          <Typography variant="body1" sx={{ mb: 4 }}>
            {t('liveDescription')}
          </Typography>

          <Grid container spacing={3}>
            {upcomingEvents.map((event) => (
              <Grid item xs={12} md={6} key={event.id}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Paper
                    sx={{
                      p: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <LiveIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6">
                        {event.title}
                      </Typography>
                    </Box>

                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {formatDate(event.date)}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {Math.floor(event.duration / 60)} {t('minutes')}
                    </Typography>

                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {event.description}
                    </Typography>

                    <Box sx={{ mt: 'auto', display: 'flex', gap: 2 }}>
                      <Button
                        variant="contained"
                        startIcon={<LiveIcon />}
                        fullWidth
                      >
                        {t('join')}
                      </Button>
                      <IconButton
                        color="primary"
                        onClick={() => handleNotificationToggle(event.id)}
                      >
                        <NotificationsIcon />
                      </IconButton>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default Live; 