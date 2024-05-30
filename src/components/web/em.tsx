import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Badge from '@mui/icons-material/Badge';
import Check from '@mui/icons-material/Check';
import Doc from '@mui/icons-material/AssignmentTurnedIn';
import Manage from '@mui/icons-material/ManageAccounts';
import Policy from '@mui/icons-material/Policy';
import Exit from '@mui/icons-material/ExitToApp';

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
        <Item> <Check/> Employee Verification</Item>
        <Item> <Doc/> Document Validation</Item>
        <Item> <Manage/> Leave and Attendance Management</Item>
        <Item> <Policy/> Employee Policy Management</Item>
        <Item> <Exit/> Employee Exit Management</Item>
      
        
      </Stack>    
      
      
      

    </div>
  );
}
