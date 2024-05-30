import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Pantry from '@mui/icons-material/AccountCircle';
import Agent from '@mui/icons-material/Payment';
import Scan from '@mui/icons-material/ReceiptLong';
import Room from '@mui/icons-material/AddReaction';
import Store from '@mui/icons-material/GroupRemove';
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
        <Item><Clean/> Long Term and Short Term Hiring </Item>
        <Item><Pantry/> Employee Management</Item>
        <Item><Agent/> Payroll Management</Item>
        <Item><Scan /> Compliance Management</Item>
        <Item><Room/> Employee Engagement</Item>
        <Item><Store /> Exit Formalities</Item>

        
        
      </Stack>    

    </div>
  );
}
