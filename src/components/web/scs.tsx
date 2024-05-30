import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Hands from '@mui/icons-material/CleanHands';
import Pantry from '@mui/icons-material/EmojiFoodBeverage';
import Agent from '@mui/icons-material/SupportAgent';
import Scan from '@mui/icons-material/Scanner';
import Room from '@mui/icons-material/RoomService';
import Store from '@mui/icons-material/Store';
import Clean from '@mui/icons-material/CleaningServices';

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
        <Item><Clean/> Housekeeping, Cleaning & Janitorial Services </Item>
        <Item><Pantry/> Pantry Services</Item>
        <Item><Agent/> Reception Service</Item>
        <Item><Scan /> Reprographic Services</Item>
        <Item><Room/> Concierge Services</Item>
        <Item><Store /> Store Management</Item>
        <Item><Hands />Workspace Sanitisation</Item>
        
        
      </Stack>    

    </div>
  );
}
