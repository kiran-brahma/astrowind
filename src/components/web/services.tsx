
interface FeatureProps {
  title: string;
  image: string;
  description: React.ReactNode;
  href: string;
}

const FeatureList: FeatureProps[] = [
  {
    title: 'Security Solutions',
    image: '/Security.svg',
    description: (
      <>
        <p>Specialised Guarding and security Solutions designed to meet your needs</p>
      </>
    ),
    href: '/services/security',
  },
  {
    title: 'Facility Management',
    image: '/facility.svg',
    description: (
      <>
        <p>Ensuring proper functioning of business facilities everyday</p>
      </>
    ),
    href: '/services/facility',
  },
  {
    title: 'Staffing Solutions',
    image: '/staffing.svg',
    description: (
      <>
        <p>Ensuring your Contractual Workforce meets your business goals</p>
      </>
    ),
    href: '/services/staffing',
  },
  {
    title: 'Business Solutions',
    image: '/solutions.svg',
    description: (
      <>
        <p>Complete Suite of Services for Startups & MSME</p>
      </>
    ),
    href: '/services/biz-sol',
  },
  {
    title: 'Payroll Solutions',
    image: '/payroll.svg',
    description: (
      <>
        <p>Complete Employee lifecycle management </p>
      </>
    ),
    href: '/services/payroll',
  },
  {
    title: 'Employee Verification Solutions',
    image: '/verification.svg',
    description: (
      <>
        <p>Comprehensive profiling and screening of potential hires</p>
      </>
    ),
    href: '/services/verification',
  },
];

function Feature({ title, image, description, href }: FeatureProps) {
  return (
    <div className="card lg:card-side shadow-xl mx-2 my-2 image-half">
      <figure>
        <img src={image} alt={title} width={50} height={50} />
      </figure>
      <div className="card-body">
        <h3 className="card-title font-extrabold dark:text-slate-100">{title}</h3>
        <div className="font-semibold dark:text-slate-100">{description}</div>
        <div className="card-actions justify-end">
          <button className="btn bg-white dark:bg-slate-950">
            <a href={href} className=" dark:text-slate-50 text-xs link-primary">{title}</a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section>
      <div className="card bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50">
        <div className="card-body">
          <div className="lg:grid lg:grid-cols-2 md:grid md:grid-cols-1 grid-cols-1">
            {FeatureList.map((feature, idx) => (
              <Feature
                key={idx}
                title={feature.title}
                image={feature.image}
                description={feature.description}
                href={feature.href}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}