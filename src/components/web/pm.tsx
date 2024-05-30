import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Badge from '@mui/icons-material/Badge';
import Manage from '@mui/icons-material/ManageAccounts';
import Pay from '@mui/icons-material/Payments';
import Dvr from '@mui/icons-material/Dvr';


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
     
        <Item> <Badge/> Employee Onboarding </Item>
        <Item><Manage/> Employee Management </Item>
        <Item> <Pay/> Salary Disbursement</Item>
        <Item> <Dvr/> Statutory Compliances</Item>
        
        
      </Stack>    
      
      
      

    </div>
  );
}
