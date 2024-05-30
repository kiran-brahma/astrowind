import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const data = [
  { title: '150+', metadata: 'Organisations We Work With Across India' },
  { title: '30+', metadata: 'Industries We Serve' },
  { title: '10,000+', metadata: 'Security Personnel deployed across India' },
  { title: '80+', metadata: 'Cities where we Operate' },
  { title: '18+', metadata: 'States with PSARA License' },
  { title: '90%', metadata: 'Customer Retention over last 5 years' },
  { title: '0%', metadata: 'Statutory Compliance failure across India' },
  { title: '99.9%', metadata: 'SLA for past 3 years' },
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