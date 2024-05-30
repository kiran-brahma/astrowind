import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Pantry from '@mui/icons-material/AccountCircle';
import Agent from '@mui/icons-material/Warehouse';
import Scan from '@mui/icons-material/DeliveryDining';
import Room from '@mui/icons-material/SensorOccupied';
import Clean from '@mui/icons-material/PeopleOutline';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

export default function DividerStack() {
  return (
    <div>
      <Stack
        direction="column"
        justifyContent="flex"
        alignItems="left"
        height='flex'
        width='flex'
      >
        <Item><Clean/> Security Guard </Item>
        <Item><Pantry/> Housekeeping</Item>
        <Item><Agent/> Warehouse Loaders and Packers</Item>
        <Item><Scan /> Delivery Personnel</Item>
        <Item><Room/> Drivers</Item>

        
        
      </Stack>    

    </div>
  );
}
