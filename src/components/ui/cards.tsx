export default function SecurityServicesSection() {
    const services = [
      {
        title: "Integrated Security Services",
        image: "/guard.jpg",
        description: "Specialised Manned Security Services ensuring top-notch reliable security 24X7",
        href: "/services/security/iss",
      },
      {
        title: "Electronic Security Services",
        image: "/cctv-ware.webp",
        description: "New Age Technology enabled Security Solutions",
        href: "/services/security/ess",
      },
      {
        title: "Housing Security Services",
        image: "/housing.jpeg",
        description: "Security Solutions for Individual Home Owners and Communities",
        href: "/services/security/hss",
      },
    ];
  
    return (
      <section className="py-12">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex flex-col rounded-lg shadow-xl overflow-hidden"
              >
                <a href={service.href}>
                  <img
                    src={service.image}
                    alt={`${service.title} Image`}
                    className="w-full h-48 object-cover"
                  />
                </a>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-700">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  