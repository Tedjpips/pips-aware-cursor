import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper
} from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { auth, db } from '../config/firebase';
import { 
  GoogleAuthProvider, 
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const SignUp = ({ changeLanguage }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [showUsernameForm, setShowUsernameForm] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Check if user already exists
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (!userDoc.exists()) {
        setShowUsernameForm(true);
      } else {
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('No user found');
      }

      // Check if username is already taken
      const usernameQuery = await getDoc(doc(db, 'usernames', username));
      if (usernameQuery.exists()) {
        setError(t('usernameTaken'));
        return;
      }

      // Create user document
      await setDoc(doc(db, 'users', user.uid), {
        username,
        email: user.email,
        googleId: user.uid,
        signUpDate: new Date().toISOString(),
        progress: 0,
        completedLessons: [],
        lastLogin: new Date().toISOString()
      });

      // Create username document
      await setDoc(doc(db, 'usernames', username), {
        userId: user.uid
      });

      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              Pips Aware
            </Typography>

            <FormControl sx={{ minWidth: 200, mb: 3 }}>
              <InputLabel>{t('language')}</InputLabel>
              <Select
                onChange={(e) => changeLanguage(e.target.value)}
                label={t('language')}
                defaultValue="en"
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="fr">Français</MenuItem>
                <MenuItem value="ar">العربية</MenuItem>
              </Select>
            </FormControl>

            {!showUsernameForm ? (
              <Button
                variant="contained"
                startIcon={<GoogleIcon />}
                onClick={handleGoogleSignIn}
                sx={{ mt: 2 }}
              >
                {t('signUp')} with Google
              </Button>
            ) : (
              <Box component="form" onSubmit={handleUsernameSubmit} sx={{ width: '100%' }}>
                <TextField
                  fullWidth
                  label={t('createUsername')}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  sx={{ mb: 2 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                >
                  {t('createUsername')}
                </Button>
              </Box>
            )}

            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
          </Paper>
        </motion.div>
      </Box>
    </Container>
  );
};

export default SignUp; 