import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee"; 
import { Gauge, Settings, Cpu, LucidePenTool, Edit3, Lightbulb } from "lucide-react";

const services = [
  {
    name: "Industrial Automation",
    username: "@automation",
    body: "Advanced systems using PLC, SCADA, and microcontrollers.",
    icon: <Gauge className="h-12 w-12 text-primary" />,
  },
  {
    name: "Special-Purpose Machines",
    username: "@machines",
    body: "Custom machines tailored to unique industrial needs.",
    icon: <Settings className="h-12 w-12 text-primary" />,
  },
  {
    name: "Precision Components",
    username: "@precision",
    body: "High-quality components with advanced CNC and milling.",
    icon: <Cpu className="h-12 w-12 text-primary" />,
  },
  {
    name: "Fabrication Services",
    username: "@fabrication",
    body: "TIG & ARC welding and precision fabrication.",
    icon: <LucidePenTool className="h-12 w-12 text-primary" />,
  },
  {
    name: "Design Services",
    username: "@design",
    body: "Integrated mechanical, electrical, and software design.",
    icon: <Edit3 className="h-12 w-12 text-primary" />,
  },
  {
    name: "Consultancy Services",
    username: "@consultancy",
    body: "Expert guidance for R&D and strategic innovation.",
    icon: <Lightbulb className="h-12 w-12 text-primary" />,
  },
];

const firstRow = services.slice(0, services.length / 2);
const secondRow = services.slice(services.length / 2);

const ServiceCard = ({
  name,
  username,
  body,
  icon,
}: {
  name: string;
  username: string;
  body: string;
  icon: JSX.Element;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        {icon}
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">{name}</figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm text-muted-foreground">{body}</blockquote>
    </figure>
  );
};

export function MarqueeServices() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-16">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((service) => (
          <ServiceCard key={service.username} {...service} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((service) => (
          <ServiceCard key={service.username} {...service} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
