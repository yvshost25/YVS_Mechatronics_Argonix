"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  ArrowRight,
  Zap,
  Settings,
  Wrench,
  BarChart4,
  Lightbulb
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { FeatureCard } from "@/components/ui/feature-card";
import { TypographyH1, TypographyH2, TypographyLead, TypographyP } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MarqueeServices } from "./_components/MarqueeServices";
import { TextAnimate } from "@/components/magicui/text-animate";
import { BlurFade } from "@/components/magicui/blur-fade";

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
        "Reduced downtime"
      ],
      image: "/precision.png",
      slug: "industrial-automation-systems",
      icon: <Zap className="h-12 w-12 text-blue-600 dark:text-blue-400" />
    },
    {
      title: "Special-Purpose Machines",
      description:
        "Custom-designed machines tailored to unique industrial needs, ensuring high efficiency and productivity.",
      features: [
        "Tailored solutions",
        "Industry 4.0 ready",
        "Robust performance",
        "Cost-effective operation"
      ],
      image: "/special.png",
      slug: "special-purpose-machines",
      icon: <Settings className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
    },
    {
      title: "Precision Engineering Components",
      description:
        "High-quality components crafted with advanced CNC and milling technologies for exceptional precision and durability.",
      features: [
        "Quality craftsmanship",
        "Advanced CNC",
        "Tight tolerances",
        "Material flexibility"
      ],
      image: "/cnc.png",
      slug: "precision-engineering-components",
      icon: <Wrench className="h-12 w-12 text-green-600 dark:text-green-400" />
    },
    {
      title: "Fabrication Services",
      description:
        "Comprehensive fabrication solutions including TIG & ARC welding for durable and precise production of industrial parts.",
      features: [
        "Expert welding",
        "High-quality fabrication",
        "Custom solutions",
        "Rapid prototyping"
      ],
      image: "/fabrication.png",
      slug: "fabrication-services",
      icon: <BarChart4 className="h-12 w-12 text-orange-600 dark:text-orange-400" />
    },
    {
      title: "Design Services",
      description:
        "Complete mechanical, electrical, and software design services for integrated engineering solutions that optimize performance.",
      features: [
        "Innovative designs",
        "Integrated approach",
        "Customized solutions",
        "Technical documentation"
      ],
      image: "/design_services.png",
      slug: "design-services",
      icon: <Lightbulb className="h-12 w-12 text-amber-600 dark:text-amber-400" />
    },
    {
      title: "Consultancy Services",
      description:
        "Professional consultancy support for research and development projects across industries, leveraging our expertise.",
      features: [
        "Expert advice",
        "Strategic planning",
        "Innovative solutions",
        "Implementation support"
      ],
      image: "/consultancy.png",
      slug: "consultancy-services",
      icon: <Zap className="h-12 w-12 text-purple-600 dark:text-purple-400" />
    },
  ];

  // Handler for navigating to service detail page.
  const handleLearnMore = (slug: string) => {
    router.push(`/service/${slug}`);
  };

  // Benefits section data
  const benefits = [
    {
      title: "Increased Productivity",
      description: "Our solutions help streamline operations and boost production throughput.",
      icon: <Zap className="h-6 w-6 text-blue-600" />
    },
    {
      title: "Cost Efficiency",
      description: "Reduce operational costs while maintaining exceptional quality.",
      icon: <BarChart4 className="h-6 w-6 text-green-600" />
    },
    {
      title: "Technical Excellence",
      description: "Access to cutting-edge technology and engineering expertise.",
      icon: <Settings className="h-6 w-6 text-indigo-600" />
    },
    {
      title: "Customized Solutions",
      description: "Tailored to your specific requirements and industry challenges.",
      icon: <Lightbulb className="h-6 w-6 text-amber-600" />
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-900">
      {/* Hero Section with Gradient Background */}
      <section className="relative py-24 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 -z-10"></div>
        <div className="absolute top-0 right-0 -mr-20 w-80 h-80 bg-blue-200/30 dark:bg-blue-700/10 rounded-full filter blur-3xl -z-5"></div>
        <div className="absolute bottom-0 left-0 -ml-20 w-80 h-80 bg-indigo-200/30 dark:bg-indigo-700/10 rounded-full filter blur-3xl -z-5"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6 text-blue-600 dark:text-blue-400 text-sm font-semibold">
              Professional Engineering Services
            </div>

            <TypographyH1 className="mb-8 text-slate-900 dark:text-white">
              <TextAnimate animation="blurInUp" by="word" startOnView>
                Innovative Industrial Solutions
              </TextAnimate>
            </TypographyH1>
            
            <TypographyLead className="mb-10">
              Discover our comprehensive range of engineering services designed to transform your manufacturing processes, 
              increase efficiency, and drive innovation in your industry.
            </TypographyLead>
            
            <Button 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {
                const section = document.getElementById('contact')
                section?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Request a Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <TypographyH2 className="mb-6 text-slate-900 dark:text-white">
              <TextAnimate animation="blurInUp" by="word" startOnView>
                Why Choose Our Services
              </TextAnimate>
            </TypographyH2>
            <TypographyP className="text-slate-700 dark:text-slate-300 mt-0">
              Our engineering solutions deliver measurable results and competitive advantages.
            </TypographyP>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <BlurFade key={index} delay={0.1 * index} inView>
                <FeatureCard
                  title={benefit.title}
                  description={benefit.description}
                  icon={benefit.icon}
                  iconClassName="w-12 h-12 rounded-full"
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Service Cards - Carousel Layout */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">
              <TextAnimate animation="blurInUp" by="word" startOnView>
                Our Comprehensive Solutions
              </TextAnimate>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Explore our range of specialized services designed to meet your industry-specific needs
            </p>
          </div>
          
          <div className="relative px-4 sm:px-6 max-w-[98%] mx-auto">
            {/* Carousel with API access for indicators */}
            {(() => {
              const [api, setApi] = useState<any>(null);
              const [current, setCurrent] = useState(0);
              const [autoplay, setAutoplay] = useState(true);
              const autoplayRef = useRef<NodeJS.Timeout | null>(null);
              
              // Auto-scroll functionality
              useEffect(() => {
                if (!api || !autoplay) return;
                
                const onSelect = () => {
                  setCurrent(api.selectedScrollSnap());
                };
                
                api.on("select", onSelect);
                
                // Start autoplay
                const startAutoplay = () => {
                  stopAutoplay();
                  autoplayRef.current = setInterval(() => {
                    if (api.canScrollNext()) {
                      api.scrollNext();
                    } else {
                      api.scrollTo(0);
                    }
                  }, 5000); // Change slide every 5 seconds
                };
                
                // Stop autoplay
                const stopAutoplay = () => {
                  if (autoplayRef.current) {
                    clearInterval(autoplayRef.current);
                    autoplayRef.current = null;
                  }
                };
                
                startAutoplay();
                
                return () => {
                  api.off("select", onSelect);
                  stopAutoplay();
                };
              }, [api, autoplay]);
              
              // Pause autoplay on hover
              const handleMouseEnter = () => setAutoplay(false);
              const handleMouseLeave = () => setAutoplay(true);
              
              return (
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                    containScroll: "trimSnaps",
                    slidesToScroll: 1
                  }}
                  className="pb-6"
                  setApi={setApi}
                  className="w-full"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <CarouselContent>
                    {products.map((product, index) => (
                      <CarouselItem key={index} className="basis-full sm:basis-full md:basis-1/2 lg:basis-1/3 pl-4 pr-4 pb-8 pt-2">
                        <BlurFade delay={0.1 * index} inView>
                          <div className="relative rounded-xl overflow-hidden flex flex-col h-[520px] group border-2 border-slate-200 dark:border-slate-700 transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
                            {/* Card background */}
                            <div className="absolute inset-0 bg-white dark:bg-slate-800 z-0"></div>
                            
                            {/* Hover effects */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/10 to-indigo-50/10 dark:from-blue-900/5 dark:to-indigo-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none"></div>
                            
                            <div className="h-44 relative overflow-hidden z-10">
                              <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/30 to-transparent"></div>
                              <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-2 rounded-full shadow-lg">
                                <div className="h-10 w-10 flex items-center justify-center">
                                  {product.icon}
                                </div>
                              </div>
                            </div>
                            
                            <div className="p-5 flex-grow relative z-10">
                              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{product.title}</h3>
                              <p className="text-slate-600 dark:text-slate-300 mb-3 text-sm">
                                {product.description}
                              </p>
                              <div className="space-y-2 mb-3">
                                {product.features.map((feature, i) => (
                                <div key={i} className="flex items-center gap-2">
                                  <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                                    <CheckCircle className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                                  </div>
                                  <span className="text-slate-700 dark:text-slate-300 text-sm">{feature}</span>
                                </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="px-5 pb-5 mt-auto relative z-10">
                              <Button
                                className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-white transition-colors duration-300"
                                onClick={() => handleLearnMore(product.slug)}
                              >
                                <span>Learn More</span>
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                              </Button>
                            </div>
                          </div>
                        </BlurFade>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  
                  {/* Control buttons and indicators */}
                  <div className="mt-6 mb-8">
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <CarouselPrevious className="static translate-y-0 ml-0 h-10 w-10 dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 bg-blue-50 hover:bg-blue-100 border-blue-200" />
                      <CarouselNext className="static translate-y-0 mr-0 h-10 w-10 dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 bg-blue-50 hover:bg-blue-100 border-blue-200" />
                    </div>
                    
                    {/* Dot indicators */}
                    <div className="flex items-center justify-center gap-2">
                      {products.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => api?.scrollTo(index)}
                          className={`w-2.5 h-2.5 rounded-full transition-all ${
                            current === index 
                              ? "bg-blue-600 w-4" 
                              : "bg-slate-300 dark:bg-slate-600"
                          }`}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </Carousel>
              );
            })()}
          </div>
        </div>
      </section>

      {/* Product Categories / Services Offered with Enhanced Marquee */}
      <MarqueeServices />
      
    </div>
  );
}