"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Cpu,
  Gauge,
  LucidePenTool,
  Lightbulb,
  Edit3,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function ProductsPage() {
  // Track which product card is expanded (by its index)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const products = [
    {
      title: "Industrial Automation Systems",
      description:
        "State-of-the-art automation systems designed using PLC, SCADA, and microcontrollers for seamless manufacturing.",
      features: [
        "Optimized performance",
        "Real-time monitoring",
        "Scalable architecture",
      ],
      image: "/precision.png",
      details:
        "Our Industrial Automation Systems are engineered for maximum efficiency. They integrate robust PLC and SCADA frameworks with real-time monitoring to ensure scalable operations in any manufacturing setting. This solution minimizes downtime while boosting productivity.",
    },
    {
      title: "Special-Purpose Machines",
      description:
        "Custom-designed machines tailored to unique industrial needs, ensuring high efficiency.",
      features: [
        "Tailored solutions",
        "Industry 4.0 ready",
        "Robust performance",
      ],
      image: "./special.png",
      details:
        "Special-Purpose Machines are crafted to meet the specific demands of your operations. Using cutting-edge design principles and durable materials, these machines are fully compliant with Industry 4.0 standards, ensuring reliability even in the most challenging conditions.",
    },
    {
      title: "Precision Engineering Components",
      description:
        "High-quality components crafted with advanced CNC and milling technologies for exceptional precision.",
      features: [
        "Quality craftsmanship",
        "Advanced CNC",
        "Tight tolerances",
      ],
      image: "/cnc.png",
      details:
        "Our precision components are manufactured with state-of-the-art CNC and milling machines. We maintain extremely tight tolerances and superior craftsmanship, making these components ideal for critical applications in sectors like aerospace and automotive.",
    },
    {
      title: "Fabrication Services",
      description:
        "Comprehensive fabrication solutions including TIG & ARC welding for durable and precise production.",
      features: [
        "Expert welding",
        "High-quality fabrication",
        "Custom solutions",
      ],
      image: "/fabrication.png",
      details:
        "With our fabrication services, we offer comprehensive TIG and ARC welding solutions. Our team of welding experts ensures durability and precision in every project, delivering customized fabrication that meets stringent quality standards.",
    },
    {
      title: "Design Services",
      description:
        "Complete mechanical, electrical, and software design services for integrated engineering solutions.",
      features: [
        "Innovative designs",
        "Integrated approach",
        "Customized solutions",
      ],
      image: "/design_services.png",
      details:
        "Our design services cover mechanical, electrical, and software aspects. We offer innovative and integrated solutions that are tailored to your specific needs, ensuring a seamless design-to-production process for complex engineering challenges.",
    },
    {
      title: "Consultancy Services",
      description:
        "Professional consultancy support for research and development projects across industries.",
      features: [
        "Expert advice",
        "Strategic planning",
        "Innovative solutions",
      ],
      image: "/consultancy.png",
      details:
        "Our consultancy services offer expert advice and strategic planning for R&D projects. With a deep understanding of industry trends and technological advances, we help guide projects from conception to implementation, ensuring innovative and sustainable solutions.",
    },
  ];

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32 bg-cover bg-center" style={{ backgroundImage: "url('/services_bg.png')" }}>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-extrabold text-gray-400 tracking-tight sm:text-6xl">
              Our Services
            </h1>
            <p className="mt-6 text-lg text-gray-300">
              Discover our innovative solutions designed for the future of manufacturing. At YVS Mechatronics, we deliver cutting-edge industrial automation, custom special-purpose machines, and precision engineering services using advanced CNC, milling, and welding technologies. Our expert team crafts efficient, scalable, and reliable solutions tailored to your industrial needs.
            </p>

          </motion.div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="py-16 bg-muted/50 relative">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <Carousel className="mx-auto max-w-5xl relative">
            <CarouselContent className="overflow-visible">
              {products.map((product, index) => (
                <CarouselItem key={index} className="w-[500px] h-[500px]">
                  <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: "-100%" }}
                    transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                  >
                    <Card className="mb-4">
                      <CardContent className="p-6">
                        <div className="grid gap-6 md:grid-cols-2">
                          <div className="space-y-4">
                            <h2 className="text-2xl font-bold">{product.title}</h2>
                            <p className="text-muted-foreground">{product.description}</p>
                            <ul className="space-y-2">
                              {product.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4 text-primary" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="relative aspect-video overflow-hidden rounded-lg">
                            <img
                              src={product.image}
                              alt={product.title}
                              className="object-cover"
                            />
                          </div>
                        </div>
                        {/* Expanded Details Section */}
                        {expandedIndex === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 border-t pt-4"
                          >
                            <p className="text-muted-foreground">{product.details}</p>
                          </motion.div>
                        )}
                      </CardContent>
                      <CardFooter className="p-6">
                        <Button
                          className="w-full"
                          onClick={() => toggleExpand(index)}
                        >
                          {expandedIndex === index ? "Close" : "Learn More"}
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20" />
            <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20" />
          </Carousel>
        </div>
      </section>

      {/* Product Categories / Services Offered */}
      <section className="py-16">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Gauge className="mx-auto h-12 w-12 text-primary" />
              <h3 className="mt-4 text-xl font-bold">Industrial Automation</h3>
              <p className="mt-2 text-muted-foreground">
                Advanced systems using PLC, SCADA, and microcontrollers.
              </p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Settings className="mx-auto h-12 w-12 text-primary" />
              <h3 className="mt-4 text-xl font-bold">Special-Purpose Machines</h3>
              <p className="mt-2 text-muted-foreground">
                Custom machines tailored to unique industrial needs.
              </p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Cpu className="mx-auto h-12 w-12 text-primary" />
              <h3 className="mt-4 text-xl font-bold">Precision Components</h3>
              <p className="mt-2 text-muted-foreground">
                High-quality components with advanced CNC and milling.
              </p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <LucidePenTool className="mx-auto h-12 w-12 text-primary" />
              <h3 className="mt-4 text-xl font-bold">Fabrication Services</h3>
              <p className="mt-2 text-muted-foreground">
                TIG & ARC welding and precision fabrication.
              </p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <Edit3 className="mx-auto h-12 w-12 text-primary" />
              <h3 className="mt-4 text-xl font-bold">Design Services</h3>
              <p className="mt-2 text-muted-foreground">
                Integrated mechanical, electrical, and software design.
              </p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <Lightbulb className="mx-auto h-12 w-12 text-primary" />
              <h3 className="mt-4 text-xl font-bold">Consultancy Services</h3>
              <p className="mt-2 text-muted-foreground">
                Expert guidance for R&amp;D and strategic innovation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
