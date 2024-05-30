
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Flight from '@mui/icons-material/FlightTakeoffTwoTone';
import Bank from '@mui/icons-material/AccountBalanceTwoTone';
import Retail from '@mui/icons-material/ProductionQuantityLimitsTwoTone';
import Tower from '@mui/icons-material/CellTowerTwoTone';
import Warehouse from '@mui/icons-material/Warehouse';
import Manufacture from '@mui/icons-material/PrecisionManufacturing';
import Commerce from '@mui/icons-material/AddShoppingCart';
import Health from '@mui/icons-material/MedicationLiquid';
import School from '@mui/icons-material/School';
import Engineering from '@mui/icons-material/Engineering';
import Govern from '@mui/icons-material/AssuredWorkload';
import Auto from '@mui/icons-material/Commute';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function RowAndColumnSpacing() {
  return (
    <Box sx={{ width: 'flex' }}>
      <Grid container rowSpacing={5} columnSpacing={{ xs: 2, sm: 2, md: 4 , lg: 5 }}>
        <Grid item xs={8} sm={3}>
          <Item><Flight/> <h4>Aviation</h4></Item>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Item><Bank/><h4>Banking</h4></Item>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Item><Retail/><h4>Retail</h4></Item>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Item><Tower/><h4>Telecom</h4></Item>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Item><Warehouse/><h4>Logistics</h4></Item>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Item><Manufacture/><h4> Manufacturing</h4></Item>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Item><Commerce/> <h4>e-Commerce</h4></Item>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Item><Health/><h4> Manufacturing</h4></Item>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Item><School/> <h4>Education</h4></Item>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Item><Engineering/><h4>Construction</h4></Item>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Item><Govern/> <h4>Government</h4></Item>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Item><Auto/><h4>Automotive</h4></Item>
        </Grid>
      </Grid>
    </Box>
  );
}