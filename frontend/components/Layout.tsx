import { Box } from '@mui/material';
import React from 'react';
import Footer from './Footer';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      <Box>{children}</Box>
      <Footer />
    </Box>
  );
}

export default Layout;
