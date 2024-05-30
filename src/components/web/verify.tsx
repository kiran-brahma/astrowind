import { Cards, Card } from 'nextra-theme-docs';
import Badge from '@mui/icons-material/Badge';
import Add from '@mui/icons-material/PersonPinCircle';
import Past from '@mui/icons-material/ContentPaste';
import Pol from '@mui/icons-material/LocalPolice';
import Check from '@mui/icons-material/CheckCircleOutline';

export default function DirectionStack() {
  const items = [
    { icon: <Badge />, title: 'ID and Document Validation', href: '/security/verification/verification#confirming-identity' },
    { icon: <Add />, title: 'Physical Address Verification', href: '/security/verification/verification#confirming-identity' },
    { icon: <Past />, title: 'Past Employee Verification', href: '/security/verification/verification#prior-employer-reference' },
    { icon: <Pol />, title: 'Criminal Record and Police Verification', href: '/security/verification/verification#police-verification' },
    { icon: <Check />, title: 'Qualification Check', href: '/security/verification/verification#qualification-check' },
  ];
  
  return (
    <section>
      <div>

        <Cards num={4}>
        <div className="lg:grid lg:grid-cols-5 md:grid md:grid-cols-5  sm:grid sm:grid-cols-2 justify mx-10">

          {items && items.map((item, idx) => (
            <Card key={idx} icon={item.icon} title={item.title} href={item.href}>
            <p> </p>
            </Card>
          ))}
          </div>
        </Cards>
      </div>
    </section>
  );
}