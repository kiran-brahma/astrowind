import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function SimpleAccordion() {
  return (
    <div>
      
          
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography><b>How do I update my Personal Details ?</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <p>Every person engaged with us is provided with contact info of the local Operational person. They are the right person to update all your personal information.</p>
          You can also raise a request in the below form also
          </Typography>
        </AccordionDetails>
      </Accordion>
      
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography><b>I have a query related to my PF. What should I do ?</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <p>Please contact our local operational personnel, who can help you in this regard.</p>
          <p>If you are an ex-employee, then raise a request in the below form</p>
                    </Typography>
        </AccordionDetails>
      </Accordion>
      
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography><b>I have a query related to my Full & Final Settlement. How do I get the details ?</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <p>We process your full and final settlement within 2 weeks of receiving resignation from workforce engaged by us. You can raise a request in the form below if required </p>
          
                    </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography><b>How do I apply for a Job in your company?</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          We are always open to hiring new people You can refer to our <a href="/careers"><b>careers section</b></a> to see what openings we have and apply from there
                    </Typography>
        </AccordionDetails>
      </Accordion>
      <br/>

 
    </div>
  );
}
