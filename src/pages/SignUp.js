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
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const SignUp = ({ changeLanguage }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSignIn = async () => {
    try {
      // Here you would implement your authentication logic
      // For now, we'll just simulate a successful sign-in
      localStorage.setItem('user', JSON.stringify({
        username,
        email: 'user@example.com',
        signUpDate: new Date().toISOString(),
        progress: 0,
        completedLessons: []
      }));
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

            <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSignIn(); }} sx={{ width: '100%' }}>
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
                {t('signUp')}
              </Button>
            </Box>

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