import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from '../../Components/CompLP/AppAppBar';
import AuthenticatedAppBar from '../../Components/CompLP/AuthenticatedAppBar';
import Hero from '../../Components/CompLP/Hero';
import Highlights from '../../Components/CompLP/Highlights';
import Features from '../../Components/CompLP/Features';
import Testimonials from '../../Components/CompLP/Testimonials';
import FAQ from '../../Components/CompLP/FAQ';
import Footer from '../../Components/CompLP/Footer';
import getLPTheme from './getLPTheme';
import { useAuth } from '../../Components/LoginAuth/AuthContext';

export default function LandingPage() {
  const [mode, setMode] = React.useState('dark');
  const LPtheme = createTheme(getLPTheme(mode));
  const { isAuthenticated } = useAuth();

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={LPtheme}>
      <CssBaseline />
      {isAuthenticated ? (
        <AuthenticatedAppBar mode={mode} toggleColorMode={toggleColorMode} />
      ) : (
        <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      )}
      <Hero />
      <Box sx={{ bgcolor: 'background.default' }}>
        <Features />
        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}