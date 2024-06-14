import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Home',
      href: getPermalink('/'),
      
    },
    
    {
      text: 'Services',
      href: getPermalink('/services'),
      
    },
    {
      text: 'Pricing',
      href: getPermalink('/pricing'),

    },
    {
      text: 'Blog',
      href: getBlogPermalink(),
        
    },
    {
      text: 'Contact',
      href: getPermalink('/contact'),
    },
  ],
  
};

export const footerData = {
  links: [
    {
      title: 'Our Solutions',
      links: [
        { text: 'Security', href: '/services/security' },
        { text: 'Facility Management', href: '/services/facility' },
        { text: 'Staffing ', href: '/services/staffing' },
        { text: 'Payroll', href: '/services/payroll' },
        { text: 'Employee Verification', href: '/services/verification' },
        { text: 'Pricing', href: '/pricing' },
        { text: 'Success Stories', href: '/case' },
      ],
    },
    {
      title: 'Support & Media',
      links: [
        { text: 'Blog', href: '/blog' },
        { text: 'Latest Updates', href: '/updates' },
        { text: 'Employee Support', href: '/support/employee' },
        { text: 'Customer Support', href: '/support/customer' },
        { text: 'Security Hiring Guide', href: '/marketing/hire-security-guards' },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About Us', href: '/about' },
        { text: 'Careers', href: 'https://careers.knighthood.co' },
        { text: 'Work Opportunities', href: 'https://careers.knighthood.co/employment-opportunities' },
        { text: 'Resources', href: '/docs' },
        { text: 'Contact', href: '/contact' },
      ],
    },
    
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: 'https://x.com/kncorps' },
    { ariaLabel: 'Linkedin', icon: 'tabler:brand-linkedin', href: 'https://www.linkedin.com/company/kncorp' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `
    <img class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 rtl:mr-0 rtl:ml-1.5 float-left rtl:float-right rounded-sm" src="/logo.png" alt="onWidget logo" loading="lazy"></img>
    Knighthood Corporate Services Pvt Ltd. All rights reserved.
  `,
};
