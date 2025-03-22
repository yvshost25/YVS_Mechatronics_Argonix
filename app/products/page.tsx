"use client";

import { motion } from "framer-motion";
import { 
  Settings, 
  Cpu, 
  Gauge,
  LucidePenTool,
  Lightbulb,
  Edit3,
  ArrowRight
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
  const products = [
    {
      title: "Industrial Automation Systems",
      description: "State-of-the-art automation systems designed using PLC, SCADA, and microcontrollers for seamless manufacturing.",
      features: ["Optimized performance", "Real-time monitoring", "Scalable architecture"],
      image: "/precision.png"
    },
    {
      title: "Special-Purpose Machines",
      description: "Custom-designed machines tailored to unique industrial needs, ensuring high efficiency.",
      features: ["Tailored solutions", "Industry 4.0 ready", "Robust performance"],
      image: "./special.png"
    },
    {
      title: "Precision Engineering Components",
      description: "High-quality components crafted with advanced CNC and milling technologies for exceptional precision.",
      features: ["Quality craftsmanship", "Advanced CNC", "Tight tolerances"],
      image: "/cnc.png"
    },
    {
      title: "Fabrication Services",
      description: "Comprehensive fabrication solutions including TIG & ARC welding for durable and precise production.",
      features: ["Expert welding", "High-quality fabrication", "Custom solutions"],
      image: "/fabrication.png"
    },
    {
      title: "Design Services",
      description: "Complete mechanical, electrical, and software design services for integrated engineering solutions.",
      features: ["Innovative designs", "Integrated approach", "Customized solutions"],
      image: "/design_services.png"
    },
    {
      title: "Consultancy Services",
      description: "Professional consultancy support for research and development projects across industries.",
      features: ["Expert advice", "Strategic planning", "Innovative solutions"],
      image: "/consultancy.png"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Our Products & Services</h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Discover our innovative solutions designed for the future of manufacturing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="py-16 bg-muted/50 relative">
        <div className="container px-4 sm:px-6 lg:px-8 relative">
          <Carousel className="mx-auto max-w-5xl relative">
            {/* Allow overflow so the arrows aren’t clipped */}
            <CarouselContent className="overflow-visible">
              {products.map((product, index) => (
                // On mobile, force full width to avoid content clipping issues
                <CarouselItem key={index} className="w-full sm:w-auto">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <div className="grid gap-6 md:grid-cols-2">
                          <div className="space-y-4">
                            <h2 className="text-2xl font-bold">{product.title}</h2>
                            <p className="text-muted-foreground">{product.description}</p>
                            <ul className="space-y-2">
                              {product.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-2">
                                  <ArrowRight className="h-4 w-4 text-primary" />
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
                      </CardContent>
                      <CardFooter className="p-6">
                        <Button className="w-full">Learn More</Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Position navigation icons for optimal visibility on mobile */}
            <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20" />
            <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20" />
          </Carousel>
        </div>
      </section>

      {/* Product Categories / Services Offered */}
      <section className="py-16">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Row 1 */}
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
            {/* Row 2 */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <LucidePenTool className="mx-auto h-12 w-12 text-primary" />
              <h3 className="mt-4 text-xl font-bold">Fabrication Services</h3>
              <p className="mt-2 text-muted-foreground">
                TIG &amp; ARC welding and precision fabrication.
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
