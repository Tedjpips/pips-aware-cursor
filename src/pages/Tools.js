import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  IconButton,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme
} from '@mui/material';
import {
  Home as HomeIcon,
  Calculate as CalculateIcon,
  Timeline as TimelineIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Tools = ({ user, darkMode, toggleDarkMode, changeLanguage }) => {
  const [selectedTool, setSelectedTool] = useState(null);
  const [calculatorInputs, setCalculatorInputs] = useState({
    entryPrice: '',
    stopLoss: '',
    takeProfit: '',
    positionSize: ''
  });
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();

  const tools = [
    {
      id: 'risk-calculator',
      title: t('riskCalculator'),
      icon: <CalculateIcon />,
      description: t('riskCalculatorDescription')
    },
    {
      id: 'position-sizer',
      title: t('positionSizer'),
      icon: <TimelineIcon />,
      description: t('positionSizerDescription')
    },
    {
      id: 'profit-calculator',
      title: t('profitCalculator'),
      icon: <AssessmentIcon />,
      description: t('profitCalculatorDescription')
    }
  ];

  const handleToolSelect = (tool) => {
    setSelectedTool(tool);
  };

  const handleCalculatorInputChange = (field) => (event) => {
    setCalculatorInputs({
      ...calculatorInputs,
      [field]: event.target.value
    });
  };

  const calculateRisk = () => {
    const { entryPrice, stopLoss, positionSize } = calculatorInputs;
    if (!entryPrice || !stopLoss || !positionSize) return null;

    const riskAmount = Math.abs(entryPrice - stopLoss) * positionSize;
    const riskPercentage = (riskAmount / (entryPrice * positionSize)) * 100;

    return {
      riskAmount,
      riskPercentage
    };
  };

  const renderToolContent = () => {
    switch (selectedTool?.id) {
      case 'risk-calculator':
        return (
          <Box sx={{ p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={t('entryPrice')}
                  type="number"
                  value={calculatorInputs.entryPrice}
                  onChange={handleCalculatorInputChange('entryPrice')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={t('stopLoss')}
                  type="number"
                  value={calculatorInputs.stopLoss}
                  onChange={handleCalculatorInputChange('stopLoss')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={t('positionSize')}
                  type="number"
                  value={calculatorInputs.positionSize}
                  onChange={handleCalculatorInputChange('positionSize')}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={calculateRisk}
                >
                  {t('calculate')}
                </Button>
              </Grid>
            </Grid>
            {calculateRisk() && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6">
                  {t('results')}
                </Typography>
                <Typography>
                  {t('riskAmount')}: ${calculateRisk().riskAmount.toFixed(2)}
                </Typography>
                <Typography>
                  {t('riskPercentage')}: {calculateRisk().riskPercentage.toFixed(2)}%
                </Typography>
              </Box>
            )}
          </Box>
        );
      default:
        return (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">
              {t('selectTool')}
            </Typography>
          </Box>
        );
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4">
              {t('tools')}
            </Typography>
            <IconButton onClick={() => navigate('/')}>
              <HomeIcon />
            </IconButton>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {tools.map((tool) => (
                  <motion.div
                    key={tool.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Paper
                      sx={{
                        p: 2,
                        cursor: 'pointer',
                        bgcolor: selectedTool?.id === tool.id ? 'primary.light' : 'background.paper'
                      }}
                      onClick={() => handleToolSelect(tool)}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        {tool.icon}
                        <Typography variant="h6" sx={{ ml: 1 }}>
                          {tool.title}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {tool.description}
                      </Typography>
                    </Paper>
                  </motion.div>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Paper sx={{ height: '100%' }}>
                {renderToolContent()}
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default Tools; 