export default function DirectionStack() {
  const items = [
    { image: '/sol1.svg', alt: 'Business Solutions 1', title: 'Business Solutions 1' },
    { image: '/time.svg', alt: 'Business Solutions 2', title: 'Business Solutions 2' },
    { image: '/sol3.svg', alt: 'Business Solutions 3', title: 'Business Solutions 3' },
    { image: '/sol4.svg', alt: 'Business Solutions 4', title: 'Business Solutions 4' },
  ];

  return (
    <section className="py-12"> 
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-8">
          {items.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center rounded-lg overflow-hidden shadow-md">
              <a href="/services"> 
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-48 object-contain hover:scale-110 transition-transform duration-300" 
                />
              </a>
          
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
