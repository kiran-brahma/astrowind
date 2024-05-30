
import * as React from 'react';
import Analytics from '@mui/icons-material/Analytics';
import Pantry from '@mui/icons-material/Dvr';
import Room from '@mui/icons-material/Duo';
import Clean from '@mui/icons-material/CameraOutdoor';
import Sensor from '@mui/icons-material/Sensors';



export default function DividerStack() {
  return (
    <div className="text-slate-900 grid-cols-1 bg-white dark:bg-slate-600">

        <li><Analytics/> <a href="/services/security/ess/video_analytics">Video Analytics</a></li>
        <li><Clean/> <a href="/services/security/ess/cctv"> CCTV Access and Intruder Alarm System </a></li>
        <li><Pantry/> <a href="/services/security/ess/digitize"> Digitization of Security Records</a></li>  
       <li><Room/> <a href="/services/security/ess/remote">Central / Remote Video Monitoring</a></li>
       <li><Sensor/><a href="/services/security/ess/sensors">Motion Sensors</a></li>

    </div>
  );
}
