"use client";

import { motion } from "framer-motion";
import { 
  Settings, 
  Cpu, 
  Gauge,
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
      title: "CNC Machining Centers",
      description: "High-precision CNC machines for complex manufacturing requirements",
      features: ["5-axis capability", "Advanced tooling system", "Real-time monitoring"],
      image: "https://th.bing.com/th/id/OIP.oS2FEUSHZdbDibbgv8ToGQHaE4?rs=1&pid=ImgDetMain"
    },
    {
      title: "Robotic Automation Systems",
      description: "Integrated robotic solutions for manufacturing automation",
      features: ["Flexible programming", "Safety systems", "Quick deployment"],
      image: "https://th.bing.com/th/id/OIP.ZOdTL-mq2aozrb6T7CFk_wHaEK?rs=1&pid=ImgDetMain"
    },
    {
      title: "Special Purpose Machines",
      description: "Custom-designed machines for specific manufacturing needs",
      features: ["Tailored solutions", "Industry 4.0 ready", "High efficiency"],
      image: "https://th.bing.com/th/id/OIP.99LpDZBFmb0kbXrWHlP_fAHaFB?rs=1&pid=ImgDetMain"
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
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Our Products</h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Innovative automation solutions designed for the future of manufacturing
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

      {/* Product Categories */}
      <section className="py-16">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Settings className="mx-auto h-12 w-12 text-primary" />
              <h3 className="mt-4 text-xl font-bold">Special Purpose Machines</h3>
              <p className="mt-2 text-muted-foreground">
                Custom-designed solutions for specific manufacturing needs
              </p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Cpu className="mx-auto h-12 w-12 text-primary" />
              <h3 className="mt-4 text-xl font-bold">CNC Solutions</h3>
              <p className="mt-2 text-muted-foreground">
                High-precision machining for complex components
              </p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Gauge className="mx-auto h-12 w-12 text-primary" />
              <h3 className="mt-4 text-xl font-bold">Automation Systems</h3>
              <p className="mt-2 text-muted-foreground">
                Integrated solutions for manufacturing automation
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
