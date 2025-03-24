import Image from "next/image";
import React from "react";

export async function generateStaticParams() {
  return [
    { id: "industrial-automation-systems" },
    { id: "special-purpose-machines" },
    { id: "precision-engineering-components" },
    { id: "fabrication-services" },
    { id: "design-services" },
    { id: "consultancy-services" },
  ];
}

interface ServiceDetailPageProps {
  params: Promise<{ id: string }>;
}

const serviceData: Record<string, {
  title: string;
  image: string;
  description: string;
  features: string[];
  details: string;
}> = {
  "industrial-automation-systems": {
    title: "Industrial Automation Systems",
    image: "/precision.png",
    description:
      "Our Industrial Automation Systems provide comprehensive solutions that seamlessly integrate advanced PLC, SCADA, and robotics. Designed to optimize manufacturing efficiency, our systems offer real-time monitoring, predictive maintenance, and adaptive control to ensure minimal downtime and maximum throughput.",
    features: [
      "Integrated PLC and SCADA",
      "Real-time data monitoring",
      "Predictive maintenance",
      "Scalable architecture",
      "Customizable interfaces",
    ],
    details:
      "With years of industry expertise, our industrial automation systems have been implemented across various manufacturing sectors, including automotive, pharmaceuticals, and food processing. Our solutions are tailored to meet the specific needs of each client, ensuring enhanced operational efficiency, improved product quality, and reduced operational costs.",
  },
  "special-purpose-machines": {
    title: "Special-Purpose Machines",
    image: "/special.png",
    description:
      "Our Special-Purpose Machines are engineered to meet unique industrial requirements. Each machine is custom-designed using advanced engineering techniques and high-quality materials to deliver robust performance, reliability, and efficiency in even the most challenging conditions.",
    features: [
      "Custom-engineered design",
      "Robust construction",
      "Energy efficient",
      "Industry 4.0 compatible",
      "Rapid prototyping",
    ],
    details:
      "We collaborate closely with our clients to develop machines that address their specific production challenges. Our expert team leverages cutting-edge technology to create innovative solutions that not only boost productivity but also ensure safety and compliance with industry standards.",
  },
  "precision-engineering-components": {
    title: "Precision Engineering Components",
    image: "/cnc.png",
    description:
      "Our Precision Engineering Components are manufactured with state-of-the-art CNC machines and advanced milling technology. These components boast exceptional accuracy, superior finish, and durability, making them ideal for critical applications in aerospace, automotive, and high-tech industries.",
    features: [
      "Advanced CNC machining",
      "Tight tolerances",
      "High-quality materials",
      "Superior surface finish",
      "Customized dimensions",
    ],
    details:
      "Quality and precision are at the core of our component manufacturing process. We utilize the latest in machining technology to produce components that meet rigorous quality standards, ensuring reliability and performance in even the most demanding applications.",
  },
  "fabrication-services": {
    title: "Fabrication Services",
    image: "/fabrication.png",
    description:
      "Our Fabrication Services encompass a wide range of processes including TIG & ARC welding, metal forming, and CNC cutting. We specialize in creating durable and precise fabrication solutions that cater to various industrial applications.",
    features: [
      "Expert welding",
      "Custom metal fabrication",
      "Precision cutting",
      "Quality control",
      "Rapid turnaround",
    ],
    details:
      "Leveraging modern fabrication technologies, we deliver high-quality products that meet exact specifications. Our experienced team ensures that every project is executed with utmost precision, from design to final production, making us a trusted partner in the fabrication industry.",
  },
  "design-services": {
    title: "Design Services",
    image: "/design_services.png",
    description:
      "Our Design Services offer comprehensive solutions covering mechanical, electrical, and software design. We focus on innovation, integration, and customization to develop designs that are both functional and aesthetically appealing.",
    features: [
      "Innovative design solutions",
      "3D modeling and simulation",
      "Integrated systems design",
      "Rapid prototyping",
      "Cost-effective engineering",
    ],
    details:
      "Our design process is collaborative and client-focused, ensuring that every detail is tailored to meet your specific requirements. With a strong emphasis on research and development, we consistently push the boundaries of design to deliver solutions that are both efficient and forward-thinking.",
  },
  "consultancy-services": {
    title: "Consultancy Services",
    image: "/consultancy.png",
    description:
      "Our Consultancy Services provide expert guidance in research and development, strategic planning, and technological innovation. We work closely with clients to identify opportunities for improvement and to develop strategies that drive success.",
    features: [
      "Expert industry advice",
      "Strategic planning",
      "Innovative problem solving",
      "Market analysis",
      "Project management",
    ],
    details:
      "With decades of combined experience, our consultants are well-equipped to help your organization navigate complex challenges. We offer personalized consultancy that not only addresses immediate needs but also sets the foundation for long-term growth and success.",
  },
};

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { id } =  await params;
  const service = serviceData[id];

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">Service Not Found</h1>
        <p className="mt-4">We couldn't find the requested service details.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">{service.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{service.description}</p>
      </div>
      <div className="mb-8">
        <Image
          src={service.image}
          alt={service.title}
          width={300}
          height={300}
          className="w-full h-[500px] object-cover rounded-lg shadow-lg"
        />
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Key Features</h2>
        <ul className="mt-4 list-disc list-inside">
          {service.features.map((feature, i) => (
            <li key={i} className="text-muted-foreground">
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-2xl font-semibold">Detailed Overview</h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">{service.details}</p>
      </div>
    </div>
  );
}