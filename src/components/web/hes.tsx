import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Hands from '@mui/icons-material/Construction';
import Pantry from '@mui/icons-material/AcUnit';
import Agent from '@mui/icons-material/Bolt';
import Scan from '@mui/icons-material/LocalFireDepartment';
import Room from '@mui/icons-material/Escalator';
import Store from '@mui/icons-material/Plumbing';
import Clean from '@mui/icons-material/Power';

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
        height='flex'
        width='flex'
      >
        <Item><Clean/> Electrical Systems Installation and Management </Item>
        <Item><Pantry/> HVAC Systems</Item>
        <Item><Agent/> DG Set and UPS Management</Item>
        
        
      </Stack>    
      <Stack
        direction="column"
        height='flex'
        width='flex'
      >

        <Item><Scan /> Fire Detection</Item>
        <Item><Room/> Lifts & Elevators</Item>
        <Item><Store /> Plumbing & Water Management</Item>
        
        
      </Stack>    
      <Stack
        direction="column"
        height='flex'
        width='flex'
      >

        <Item><Hands />Minor Civil & Carpentry</Item>
        
        
      </Stack>    
      
      

    </div>
  );
}
