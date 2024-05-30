
import * as React from 'react';
import Hands from '@mui/icons-material/FireExtinguisher';
import Pantry from '@mui/icons-material/Stars';
import Agent from '@mui/icons-material/AddShoppingCart';
import Scan from '@mui/icons-material/ManageSearch';
import Room from '@mui/icons-material/AirportShuttle';
import Store from '@mui/icons-material/EmergencyShare';
import Clean from '@mui/icons-material/Shield';
import Train from '@mui/icons-material/ModelTraining';
import Event from '@mui/icons-material/CalendarViewMonth';
import Traffic from '@mui/icons-material/Warehouse';



export default function DividerStack() {
  return (
    <div className="text-slate-900 grid-cols-1 bg-white dark:bg-slate-600">
      <li>  <Clean/> <a className="mx-5" href="/services/security/iss/static-guarding">Security Guard</a></li>
      <li><Pantry/> <a className="mx-5"href="/services/security/iss/pso">VIP Protection/Bouncers</a></li>
      <li> <Agent/> < a className="mx-5"href="/services/security/iss/e-commerce">E-Commerce Secure Solutions</a></li>
      <li> <Scan /> < a className="mx-5" href="/services/security/iss/corp-inv">Corporate Investigations</a></li>
      <li><Room/> < a className="mx-5" href="/services/security/iss/patrol">Patrolling Services</a></li>
      <li> <Store /> <a className="mx-5" href="/services/security/iss/emergency">Emergency Response</a></li>
      <li><Hands />< a className="mx-5" href="/services/security/iss/fire">Fire & Safety Service</a></li>
      <li> <Train />< a className="mx-5" href="/services/security/iss/training">Training Services</a></li>
      <li><Event />< a className="mx-5" href="/services/security/iss/event">Event Security Management</a></li>
      <li><Traffic /><a className="mx-5"href="/services/security/iss/warehouse">Warehouse Security Solutions</a></li>
    </div>
  );
}
