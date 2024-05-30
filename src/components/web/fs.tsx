import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

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
        <h3>Dark Stores</h3>
        <Item> Seller & Warehouse pick-ups </Item>
        <Item>SKU Management</Item>
        <Item> DG Set and UPS Management</Item>
        <Item> Ambient & Temperature Control Zones</Item>
        <Item> Speedier Delivery Solution (within 15 mins)</Item>
        <Item> Return management</Item>
        <Item> System Integrations</Item>
        <Item> Pick Up Center Solutions</Item>
        <br></br>
        <h3>Pick Up Center Solutions</h3>
        <Item>Partner pick-up point</Item>
        <Item>Customer Experience Zone (CEZ)</Item>
        <Item>Sales Centre</Item>
        
      </Stack>    
      
      
      

    </div>
  );
}
