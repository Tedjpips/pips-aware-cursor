import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  IconButton,
  LinearProgress,
  useTheme
} from '@mui/material';
import {
  Home as HomeIcon,
  Lock as LockIcon,
  LockOpen as LockOpenIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { auth, db } from '../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const lessons = {
  level1: [
    { id: '1-1', title: 'Introduction to Awareness', videoId: 'VIDEO_ID_1', duration: 300 },
    { id: '1-2', title: 'Basic Principles', videoId: 'VIDEO_ID_2', duration: 600 },
    { id: '1-3', title: 'Getting Started', videoId: 'VIDEO_ID_3', duration: 900 }
  ],
  level2: [
    { id: '2-1', title: 'Advanced Concepts', videoId: 'VIDEO_ID_4', duration: 1200 },
    { id: '2-2', title: 'Practical Applications', videoId: 'VIDEO_ID_5', duration: 1500 },
    { id: '2-3', title: 'Integration Techniques', videoId: 'VIDEO_ID_6', duration: 1800 }
  ],
  level3: [
    { id: '3-1', title: 'Mastery Level 1', videoId: 'VIDEO_ID_7', duration: 2100 },
    { id: '3-2', title: 'Mastery Level 2', videoId: 'VIDEO_ID_8', duration: 2400 },
    { id: '3-3', title: 'Final Integration', videoId: 'VIDEO_ID_9', duration: 2700 }
  ]
};

const Awareness = ({ user, darkMode, toggleDarkMode, changeLanguage }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [videoProgress, setVideoProgress] = useState(0);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();

  useEffect(() => {
    const fetchUserData = async () => {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
        setCompletedLessons(userDoc.data().completedLessons || []);
      }
    };
    fetchUserData();
  }, [user.uid]);

  const handleLessonClick = (lesson) => {
    setCurrentLesson(lesson);
  };

  const handleVideoProgress = (progress) => {
    setVideoProgress(progress);
  };

  const handleLessonComplete = async () => {
    if (!currentLesson) return;

    const updatedLessons = [...completedLessons, currentLesson.id];
    setCompletedLessons(updatedLessons);

    // Calculate total progress
    const totalLessons = Object.values(lessons).flat().length;
    const progress = (updatedLessons.length / totalLessons) * 100;

    // Update user progress in Firebase
    await updateDoc(doc(db, 'users', user.uid), {
      completedLessons: updatedLessons,
      progress: Math.min(progress, 100)
    });

    setCurrentLesson(null);
  };

  const isLessonCompleted = (lessonId) => {
    return completedLessons.includes(lessonId);
  };

  const isLessonLocked = (level, index) => {
    if (level === 1) return false;
    const previousLevel = lessons[`level${level - 1}`];
    return !isLessonCompleted(previousLevel[previousLevel.length - 1].id);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4">
              {t('awareness')}
            </Typography>
            <IconButton onClick={() => navigate('/')}>
              <HomeIcon />
            </IconButton>
          </Box>

          {currentLesson ? (
            <Box>
              <Typography variant="h6" gutterBottom>
                {currentLesson.title}
              </Typography>
              <Box sx={{ position: 'relative', paddingTop: '56.25%', mb: 2 }}>
                <iframe
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none'
                  }}
                  src={`https://www.youtube.com/embed/${currentLesson.videoId}?enablejsapi=1&rel=0`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Box>
              <LinearProgress variant="determinate" value={videoProgress} sx={{ mb: 2 }} />
              <Button
                variant="contained"
                onClick={handleLessonComplete}
                disabled={videoProgress < 100}
              >
                {t('complete')}
              </Button>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {Object.entries(lessons).map(([level, levelLessons]) => (
                <Grid item xs={12} key={level}>
                  <Typography variant="h5" gutterBottom>
                    {t('level')} {level.slice(-1)}
                  </Typography>
                  <Grid container spacing={2}>
                    {levelLessons.map((lesson, index) => (
                      <Grid item xs={12} sm={6} md={4} key={lesson.id}>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Paper
                            sx={{
                              p: 2,
                              cursor: isLessonLocked(parseInt(level.slice(-1)), index) ? 'not-allowed' : 'pointer',
                              opacity: isLessonLocked(parseInt(level.slice(-1)), index) ? 0.7 : 1
                            }}
                            onClick={() => !isLessonLocked(parseInt(level.slice(-1)), index) && handleLessonClick(lesson)}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              {isLessonLocked(parseInt(level.slice(-1)), index) ? (
                                <LockIcon color="disabled" />
                              ) : isLessonCompleted(lesson.id) ? (
                                <CheckCircleIcon color="success" />
                              ) : (
                                <LockOpenIcon color="primary" />
                              )}
                              <Typography variant="subtitle1" sx={{ ml: 1 }}>
                                {lesson.title}
                              </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              {Math.floor(lesson.duration / 60)} {t('minutes')}
                            </Typography>
                          </Paper>
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              ))}
            </Grid>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default Awareness; 