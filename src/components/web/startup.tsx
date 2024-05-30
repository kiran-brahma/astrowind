import * as React from 'react';

import InvertColorsRoundedIcon from '@mui/icons-material/Security';
import HandymanRoundedIcon from '@mui/icons-material/HandymanRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import AccessibilityNewRounded from '@mui/icons-material/AccessibilityNewRounded';

import BusinessIcon from '@mui/icons-material/Business';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import Link from '@mui/material/Link';



const content = [
  {
    icon: <InvertColorsRoundedIcon fontSize="small" color="primary" />,
    title: 'Security Services',
    link: "/services/security",
  },
  {
    icon: <HandymanRoundedIcon fontSize="small" color="primary" />,
    title: 'Intergrated Facility Management',
    link: "/services/facility",
  },
  {
    icon: <AccessibilityNewRounded fontSize="small" color="primary" />,
    title: 'Employee Staffing',
    link: "/services/staffing",
  },
  {
    icon: <ArticleRoundedIcon fontSize="small" color="primary" />,
    title: 'Payroll Management',
    link: "/services/payroll",
  },
  {
    icon: <BusinessIcon fontSize="small" color="primary" />,
    title: 'Fulfillment Services',
    link: "/services/biz-sol/fulfilment"
  },
  {
    icon: <FactCheckIcon fontSize="small" color="primary" />,
    title: 'Employee Verification',
    link: "/services/verification",
  },
];
const ValueProposition = () => {
  return (
    <div className="py-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {content.map(({ icon, title, link }) => (
            <div key={title} className="p-4 border border-gray-300 rounded-lg">
              <div className="flex items-center mb-2">
                {icon}
                <h3 className="font-bold text-primary ml-2">
                  <Link href={link}>
                    {title}
                  </Link>
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ValueProposition;
