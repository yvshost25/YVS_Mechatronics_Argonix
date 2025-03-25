"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Settings,
  Cpu,
  Gauge,
  LucidePenTool,
  Lightbulb,
  Edit3,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MarqueeServices } from "./_components/MarqueeServices";

export default function ProductsPage() {
  const router = useRouter();

  // Define your products array with an added slug property.
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
      slug: "industrial-automation-systems",
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
      image: "/special.png",
      slug: "special-purpose-machines",
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
      slug: "precision-engineering-components",
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
      slug: "fabrication-services",
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
      slug: "design-services",
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
      slug: "consultancy-services",
    },
  ];

  // Carousel state: activeIndex controls the visible slide.
  const [activeIndex, setActiveIndex] = useState(0);
  // Delay to pause on each slide (in milliseconds)
  const autoAdvanceDelay = 3000;
  // Carousel width state to track full viewport width.
  const [carouselWidth, setCarouselWidth] = useState(0);
  // State to determine if screen is small.
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  // Ref for scrollable container on small screens.
  const containerRef = useRef<HTMLDivElement>(null);

  // Set carousel width and small screen flag on mount and update on resize.
  useEffect(() => {
    const updateWidth = () => {
      const width = window.innerWidth;
      setCarouselWidth(width);
      setIsSmallScreen(width < 768); // Tailwind md breakpoint (768px)
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Auto-advance carousel every autoAdvanceDelay milliseconds.
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, autoAdvanceDelay);
    return () => clearTimeout(timer);
  }, [activeIndex, products.length]);

  // If on a small screen, scroll the container when activeIndex changes.
  useEffect(() => {
    if (isSmallScreen && containerRef.current) {
      containerRef.current.scrollTo({
        left: activeIndex * carouselWidth,
        behavior: "smooth",
      });
    }
  }, [activeIndex, carouselWidth, isSmallScreen]);

  // Handler for manual navigation (only used on large screens).
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % products.length);
  };
  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  // Handler for navigating to service detail page.
  const handleLearnMore = (slug: string) => {
    router.push(`/service/${slug}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      {/* <section
        className="relative overflow-hidden py-20 sm:py-32 bg-cover bg-center"
        style={{ backgroundImage: "url('/services_bg.png')" }}
      > */}
      <section
        className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
              Our Services
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Discover our innovative solutions designed for the future of manufacturing.
              At YVS Mechatronics, we deliver cutting-edge industrial automation,
              custom special-purpose machines, and precision engineering services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="py-16 bg-muted/50 relative">
        <div>
          {isSmallScreen ? (
            // Small screen: scrollable container
            <div
              ref={containerRef}
              className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hidden overflow-y-hidden"
              style={{ width: carouselWidth }}
            >
              {products.map((product, index) => (
                <div
                  key={index}
                  className="min-w-full snap-center"
                  style={{ height: 500 }}
                >
                  <Card className="mb-4 h-[550px]">
                    <CardContent className="p-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                          <h2 className="text-2xl font-bold">{product.title}</h2>
                          <p className="text-muted-foreground">
                            {product.description}
                          </p>
                          <ul className="space-y-2">
                            {product.features.map((feature, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-primary" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                          <Button
                            className="w-full"
                            onClick={() => handleLearnMore(product.slug)}
                          >
                            Learn More
                          </Button>
                        </div>
                        <div className="relative aspect-video overflow-hidden rounded-lg">
                          <Image
                            src={product.image}
                            alt={product.title}
                            width={150}
                            height={150}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            // Large screen: animated carousel with manual navigation buttons
            <div className="relative overflow-hidden" style={{ width: carouselWidth }}>
              <motion.div
                className="flex"
                animate={{ x: -activeIndex * carouselWidth }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {products.map((product, index) => (
                  <div key={index} className="min-w-full" style={{ height: 500 }}>
                    <Card className="mb-4">
                      <CardContent className="p-6">
                        <div className="grid gap-6 md:grid-cols-2">
                          <div className="space-y-4">
                            <h2 className="text-2xl font-bold">{product.title}</h2>
                            <p className="text-muted-foreground">
                              {product.description}
                            </p>
                            <ul className="space-y-2">
                              {product.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4 text-primary" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                            <Button
                              className="w-full"
                              onClick={() => handleLearnMore(product.slug)}
                            >
                              Learn More
                            </Button>
                          </div>
                          <div className="relative aspect-video overflow-hidden rounded-lg">
                            <img
                              src={product.image}
                              alt={product.title}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </motion.div>
              {/* Manual Navigation Controls */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-gray-700/70 text-white p-3 rounded-full hover:bg-gray-800 transition"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-gray-700/70 text-white p-3 rounded-full hover:bg-gray-800 transition"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Product Categories / Services Offered */}
      <MarqueeServices />
    </div>
  );
}
