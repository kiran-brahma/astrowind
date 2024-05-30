
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const data = [
  { title: '200+', metadata: 'Organisations We Work With Across India' },
  { title: '80+ Cities', metadata: 'Where We Provide Our Services' },
  { title: '99.4%', metadata: 'Our SLA For Last 3 Years' },
  { title: '10%', metadata: 'Average Cost Savings To Our Customers in the past year' },
  { title: '34,000+', metadata: 'Associates Who Work With Us' },
  { title: '100%', metadata: 'Timely Payment to our Associates' },
];

export default function MuiStatistics() {
  return (
    <Grid item xs={12} md={6} container spacing={8}>
      {data.map((item) => (
        <Grid key={item.title} item xs={6}>
          <Box
            sx={{
              height: '100%',
              p: 0.5,
              pl: 2,
              borderLeft: '2px solid',
              borderColor: (theme) =>
                theme.palette.mode === 'dark' ? 'primaryDark.600' : 'primary.100',
            }}
          >
            <Typography
              component="div"
              variant="h4"
              color={(theme) => (theme.palette.mode === 'dark' ? 'primary.200' : 'primary.main')}
              fontWeight="bold"
            >
              {item.title}
            </Typography>
            <Typography
              color={(theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800')}
            >
              {item.metadata}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}