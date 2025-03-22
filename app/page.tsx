"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight, Settings, PenTool, User2, Zap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  // Define your services to display in the auto-scrolling carousel.
  const services = [
    {
      title: "Industrial Automation",
      description:
        "Designing and implementing automation systems using PLC, SCADA, and microcontrollers for enhanced productivity.",
      icon: <Settings className="h-6 w-6 text-primary" />,
    },
    {
      title: "Special-Purpose Machines",
      description:
        "Custom-designed machines tailored to meet unique industrial requirements.",
      icon: <PenTool className="h-6 w-6 text-primary" />,
    },
    {
      title: "Precision Engineering & Fabrication",
      description:
        "Delivering high-quality components using state-of-the-art CNC, milling, and welding technologies.",
      icon: <Zap className="h-6 w-6 text-primary" />,
    },
    {
      title: "Integrated Engineering Design",
      description:
        "Comprehensive design services across mechanical, electrical, and software disciplines.",
      icon: <PenTool className="h-6 w-6 text-primary" />,
    },
    {
      title: "Consultancy Services",
      description:
        "Professional support for research and development projects across industries.",
      icon: <User2 className="h-6 w-6 text-primary" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative overflow-hidden bg-background py-20 sm:py-32">
        {/* Background Image */}
        <Image
          src="/home_bg.png"
          alt="Fabrication background"
          fill
          className="absolute inset-0 object-cover dark:opacity-20"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-black/30" />
        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl text-gray-300 font-bold tracking-tighter sm:text-6xl">
              Empowering Industries with Innovative Engineering
            </h1>
            <p className="mt-6 text-gray-400 text-lg leading-8">
              YVS Mechatronics is a trusted name in industrial automation, special-purpose machines, and precision engineering solutions.
            </p>
            <div className="mt-10 flex flex-col lg:flex-row items-center justify-center gap-x-6 gap-3">
              <Button size="lg" asChild>
                <Link href="/services">
                  Explore Our Solutions
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold">About YVS Mechatronics</h2>
            <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
              We at YVS Mechatronics are at the forefront of science, engineering, and technology. Based in Cherlapally, Hyderabad, our facility is equipped with state-of-the-art tools and machinery, including 5 CNC machines, 2 milling machines, 2 lathes, and advanced TIG & ARC welding setups. We specialize in industrial automation, special-purpose machines, precision engineering components, and offer comprehensive fabrication services.
            </p>
          </div>
        </div>
      </section>

      {/* Auto-Scrolling Services Section (Video-like UI) */}
      <section id="services" className="py-20 bg-muted/50 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Services</h2>
          <motion.div
            className="flex gap-6"
            initial={{ x: "100%" }}
            animate={{ x: "-100%" }}
            transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
          >
            {services.map((service, index) => (
              <div key={index} className="flex-none w-[350px] bg-card p-6 shadow-lg rounded-lg">
                <div className="mb-4 inline-block bg-primary/10 p-3 rounded-full">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio & Clients Section */}
      <section id="portfolio" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold">Our Portfolio &amp; Clients</h2>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
              We have partnered with prestigious organizations to deliver innovative solutions.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-card p-6 shadow-lg">
              <h3 className="mb-3 text-xl font-semibold">Nuclear Fuel Complex (NFC)</h3>
              <p className="text-muted-foreground">
                Trusted partner in delivering precise engineering components.
              </p>
            </div>
            <div className="rounded-lg bg-card p-6 shadow-lg">
              <h3 className="mb-3 text-xl font-semibold">Hindustan Aeronautics Limited (HAL)</h3>
              <p className="text-muted-foreground">
                Collaborated on advanced automation and engineering solutions.
              </p>
            </div>
            <div className="rounded-lg bg-card p-6 shadow-lg">
              <h3 className="mb-3 text-xl font-semibold">DRDO</h3>
              <p className="text-muted-foreground">
                Partnered on projects requiring high precision and advanced fabrication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team & Owner Information Section */}
      <section id="team" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold">Our Team</h2>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
              Powered by a dedicated team of 20+ professionals, our experts in mechanical design, electrical engineering, software development, and skilled welding ensure every project is a success.
            </p>
            <div className="mt-8">
              <h3 className="text-xl font-semibold">M. Sai Kiran</h3>
              <p className="mt-2 text-muted-foreground">
                Founder &amp; visionary leader, driving innovation and excellence in engineering solutions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
