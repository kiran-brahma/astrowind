import { Image } from 'astro:assets';

export default function DirectionStack() {
  const items = [
    { image: '/s3.svg', alt: 'Security', title: 'Static Guarding' },
    { image: '/s4.svg', alt: 'Security', title: 'Facility Security' },
    { image: '/s2.svg', alt: 'Security', title: 'Electronic Surveillance' },
    { image: '/s0.svg', alt: 'Security', title: 'Electronic Security Solutions' },
  ];

  return (
    <section className="py-12"> {/* Add padding for spacing */}
      <div className="container mx-auto"> {/* Center the container */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-8"> {/* Responsive grid layout */}
          {items.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center rounded-lg shadow-md overflow-hidden">
              <Image 
                src={item.image} 
                alt={item.alt} 
                width={300}
                height={300}
            
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-center">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
