import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import InvertColorsRoundedIcon from '@mui/icons-material/Security';
import AccessibilityNewRounded from '@mui/icons-material/AccessibilityNewRounded';
import Link from '@mui/material/Link';


const content = [
    {
      icon: <InvertColorsRoundedIcon fontSize="small" color="primary" />,
      title: 'Knighthood Security System ',
      link: "/security/intro",
      
    },
  
    {
      icon: <AccessibilityNewRounded fontSize="small" color="primary" />,
      title: 'Knighthood Compliance Management',
      link: "/docs/intro",
      
    },
 

  ];
  
  const ValueProposition = () => {
    return (
      <Container sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
        <Grid container spacing={5}>
          {content.map(({ icon, title, link}) => (
            <Grid key={title} item xs={30} sm={10} md={4}>
              <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  {icon}
                  <Typography
                    fontWeight="bold"
                    component="h3"
                    color="text.primary"
                    variant="body2"
                    sx={{ ml: 1 }}
                  >
                    <Link href={link}>
                    {title}
                    </Link>
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  };
  
  export default ValueProposition;


  