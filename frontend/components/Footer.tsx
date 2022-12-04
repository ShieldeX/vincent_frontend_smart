import { Box, Grid } from '@mui/material';
import Link from 'next/link';
import React from 'react';

function Footer() {
  return (
    <Box
      style={{
        position: 'fixed',
        marginTop: 'calc(10% + 60px)',
        bottom: 0,
        lineHeight: '1rem',
      }}
    >
      <Grid container>
        <Grid item>
          <Box ml={4} fontFamily="Archivo Expanded Bold">
            <p>
              <Box
                component="span"
                style={{
                  textTransform: 'uppercase',
                  fontSize: '0.58rem',
                  padding: '0.1rem',
                  backgroundColor: '#000000',
                  color: '#EDE62D',
                  letterSpacing: '0.1rem',
                }}
              >
                Powered BY
              </Box>
              <br />
              <Box
                component="span"
                fontWeight="bold"
                style={{
                  textTransform: 'uppercase',
                  fontSize: '0.6rem',
                  letterSpacing: '0.1rem',
                }}
              >
                {/* <Link href=""> */}
                {/* <a target="_blank" rel="noopener noreferrer"> */}
                Ethereum
                {/* </a> */}
                {/* </Link> */}
              </Box>
            </p>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Footer;
