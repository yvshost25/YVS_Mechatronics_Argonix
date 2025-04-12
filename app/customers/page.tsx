"use client";

import { motion } from "framer-motion";
import { Star, Quote, Users, Shield, Award, Target, ArrowRight, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { FeatureCard, FeatureCardWithBorder } from "@/components/ui/feature-card";
import { TypographyH1, TypographyH2, TypographyH3, TypographyLead, TypographyP } from "@/components/ui/typography";
import Image from "next/image";
import { TextAnimate } from "@/components/magicui/text-animate";
import { BlurFade } from "@/components/magicui/blur-fade";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";

export default function CustomersPage() {
  // Fetch portfolio data using the getPortfolios query
  const portfolios = useQuery(api.portfolio.getPortfolios) || [];

  // Filter data for testimonials and client logos
  const testimonials = portfolios.filter((item) => item.logoUrl);
  const clientLogos = portfolios.filter((item) => item.image);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  // Sample statistics (these should be dynamic in a real implementation)
  const statistics = [
    { value: "95%", label: "Client Satisfaction" },
    { value: "100+", label: "Projects Delivered" },
    { value: "15+", label: "Industries Served" },
    { value: "4+", label: "Years of Excellence" }
  ];

  return (
    <div className="bg-white dark:bg-slate-900">
      {/* Hero Section with Modern Design */}
      <section className="relative py-24 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 -z-10"></div>
        <div className="absolute top-0 right-0 -mr-20 w-80 h-80 bg-blue-200/30 dark:bg-blue-700/10 rounded-full filter blur-3xl -z-5"></div>
        <div className="absolute bottom-0 left-0 -ml-20 w-80 h-80 bg-indigo-200/30 dark:bg-indigo-700/10 rounded-full filter blur-3xl -z-5"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={fadeInUp.transition}
          >
            <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6 text-blue-600 dark:text-blue-400 text-sm font-semibold">
              Trusted by Industry Leaders
            </div>
            
            <TypographyH1 className="mb-6 text-slate-900 dark:text-white">
              <TextAnimate animation="blurInUp" by="word" startOnView>
                Our Valued Partnerships
              </TextAnimate>
            </TypographyH1>
            
            <TypographyLead className="mb-8">
              We're proud to collaborate with leading organizations across diverse industries, 
              delivering excellence in automation and precision engineering solutions.
            </TypographyLead>
            
            <div className="flex justify-center">
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => {
                  const section = document.getElementById('testimonials')
                  section?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Explore Client Success Stories
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <BlurFade key={index} delay={0.1 * index} inView>
                <div className="text-center relative overflow-hidden p-6 rounded-xl group">
                  {/* Glassmorphism effect */}
                  <div className="absolute inset-0 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm backdrop-saturate-150 rounded-xl"></div>
                  
                  {/* Border glow effect */}
                  <div className="absolute inset-0 rounded-xl border border-blue-200/30 dark:border-blue-500/10 group-hover:border-blue-300/50 dark:group-hover:border-blue-500/20 transition-all duration-300"></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                      {stat.value}
                    </div>
                    <div className="text-slate-600 dark:text-slate-400">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos Showcase - Premium Design */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent dark:from-blue-900/10 dark:via-transparent dark:to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-100/40 via-transparent to-transparent dark:from-indigo-900/10 dark:via-transparent dark:to-transparent"></div>
        
        {/* Content container */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-block mb-4">
              <svg className="h-1.5 w-20 mx-auto mb-2 text-blue-500 dark:text-blue-400" viewBox="0 0 80 6" fill="currentColor">
                <rect width="80" height="6" rx="3" />
              </svg>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                <TextAnimate animation="blurInUp" by="word" startOnView>
                  Trusted By Industry Leaders
                </TextAnimate>
              </h2>
            </div>
            
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              We're proud to collaborate with leading organizations across aerospace, defense, manufacturing, and technology sectors.
            </p>
          </div>
          
          {/* Client logos in a horizontal layout */}
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center">
              {clientLogos.length > 0 ? (
                clientLogos.map((logo, index) => (
                  <motion.div
                    key={index}
                    className="w-full sm:w-1/2 md:w-1/3 p-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
                    <div className="bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl h-full">
                      <div className="border border-gray-100 dark:border-slate-700 rounded-xl overflow-hidden flex flex-col h-full">
                        {/* Logo container */}
                        <div className="p-8 flex items-center justify-center flex-grow bg-white dark:bg-slate-800">
                          <Image
                            src={logo.image ?? ''}
                            alt={logo.name}
                            width={160}
                            height={80}
                            className="object-contain max-h-16"
                          />
                        </div>
                        
                        {/* Company name */}
                        <div className="p-3 border-t border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/50">
                          <p className="text-center text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
                            {logo.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                // Fallback logos
                [
                  { src: "/nuclear_logo.png", name: "Nuclear Fuel Complex" },
                  { src: "/hal_logo.png", name: "Hindustan Aeronautics Limited" },
                  { src: "/drdo_logo.png", name: "DRDO" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="w-full sm:w-1/2 md:w-1/3 p-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
                    <div className="bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl h-full">
                      <div className="border border-gray-100 dark:border-slate-700 rounded-xl overflow-hidden flex flex-col h-full">
                        {/* Logo container */}
                        <div className="p-8 flex items-center justify-center flex-grow bg-white dark:bg-slate-800">
                          <Image
                            src={item.src}
                            alt={item.name}
                            width={160}
                            height={80}
                            className="object-contain max-h-16"
                          />
                        </div>
                        
                        {/* Company name */}
                        <div className="p-3 border-t border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/50">
                          <p className="text-center text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
                            {item.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Why Clients Choose Us - Using Key Benefits Design */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <TypographyH2 className="mb-6 text-slate-900 dark:text-white">
              <TextAnimate animation="blurInUp" by="word" startOnView>
                Why Clients Choose Us
              </TextAnimate>
            </TypographyH2>
            <TypographyP className="text-slate-700 dark:text-slate-300 mt-0">
              Our commitment to excellence and innovation makes us the preferred partner for engineering solutions.
            </TypographyP>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <BlurFade delay={0.1} inView>
              <FeatureCard
                title="Expert Team"
                description="Our team of 20+ specialists brings decades of combined experience across mechanical, electrical, and software engineering."
                icon={<Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />}
                iconClassName="w-12 h-12 rounded-full flex items-center justify-center"
              />
            </BlurFade>
            
            <BlurFade delay={0.2} inView>
              <FeatureCard
                title="Reliable Solutions"
                description="We design and build systems with reliability in mind, ensuring long-term performance and minimal downtime."
                icon={<Shield className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />}
                iconClassName="w-12 h-12 rounded-full flex items-center justify-center"
              />
            </BlurFade>
            
            <BlurFade delay={0.3} inView>
              <FeatureCard
                title="Quality Craftsmanship"
                description="Our meticulous attention to detail ensures that every component and system meets the highest quality standards."
                icon={<Award className="h-8 w-8 text-purple-600 dark:text-purple-400" />}
                iconClassName="w-12 h-12 rounded-full flex items-center justify-center"
              />
            </BlurFade>
            
            <BlurFade delay={0.4} inView>
              <FeatureCard
                title="Innovative Approach"
                description="We constantly explore new technologies and methodologies to deliver cutting-edge solutions that keep you ahead of the competition."
                icon={<Target className="h-8 w-8 text-green-600 dark:text-green-400" />}
                iconClassName="w-12 h-12 rounded-full flex items-center justify-center"
              />
            </BlurFade>
          </div>
        </div>
      </section>

      {/* Testimonials - Carousel Layout */}
      <section id="testimonials" className="py-14 bg-slate-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <TypographyH2 className="mb-3 text-slate-900 dark:text-white text-2xl">
              <TextAnimate animation="blurInUp" by="word" startOnView>
                What Our Clients Say
              </TextAnimate>
            </TypographyH2>
            <TypographyP className="text-slate-700 dark:text-slate-300 mt-0 text-sm">
              Read firsthand accounts of the impact our solutions have made on our clients' operations.
            </TypographyP>
          </div>
          
          {/* Testimonial Carousel */}
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>
      
    </div>
  );
}

// Separate component for the testimonial carousel
function TestimonialCarousel({ testimonials }: { testimonials: any[] }) {
  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  
  // Define testimonial data (use dynamic data or fallback)
  const testimonialsData = testimonials.length > 0 ? testimonials : [
    {
      name: "Nuclear Fuel Complex",
      logoUrl: "/nuclear_logo.png",
      description: "YVS Mechatronics delivered exceptional automation solutions for our critical manufacturing processes. Their attention to detail and technical expertise exceeded our expectations."
    },
    {
      name: "Hindustan Aeronautics Limited",
      logoUrl: "/hal_logo.png",
      description: "The precision engineering components provided by YVS Mechatronics have been integral to our aerospace manufacturing. Their quality and reliability are consistently outstanding."
    },
    {
      name: "DRDO",
      logoUrl: "/drdo_logo.png",
      description: "YVS Mechatronics has been a valuable partner in developing specialized equipment for our research projects. Their innovative approach and technical capabilities are impressive."
    }
  ];
  
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
      }, 6000); // Change testimonial every 6 seconds
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
    <div className="relative px-0 mx-auto max-w-[1000px]">
      <Carousel
        opts={{
          align: "center",
          loop: true,
          containScroll: "keepSnaps",
          slidesToScroll: 1
        }}
        className="pb-4,w-full"
        setApi={setApi}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CarouselContent className="py-2">
          {testimonialsData.map((testimonial, index) => (
            <CarouselItem key={testimonial.name || index} className="basis-full pl-2 pr-2 pb-2 pt-2">
              <BlurFade delay={0.1 * index} inView>
                <Card className="relative border-0 overflow-hidden group min-h-[250px]">
                  {/* Glassmorphism effect */}
                  <div className="absolute inset-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md backdrop-saturate-150"></div>
                  
                  {/* Light reflection effect */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-400/20 rounded-full blur-xl transform rotate-12 opacity-0 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none"></div>
                  
                  {/* Border glow effect */}
                  <div className="absolute inset-0 rounded-xl border border-white/30 dark:border-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
                  
                  <CardContent className="p-0">
                    <div className="relative flex flex-col md:flex-row">
                      {/* Decorative left accent */}
                      <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500"></div>
                      
                      {/* Left section with logo and company name */}
                      <div className="p-4 md:p-5 md:w-1/4 flex flex-col items-center justify-center md:border-r border-slate-200 dark:border-slate-700">
                        {/* Logo */}
                        <div className="mb-3 bg-white dark:bg-slate-700 p-2 rounded-lg shadow-sm inline-block">
                          <Image
                            src={testimonial.logoUrl ?? ''}
                            alt={testimonial.name}
                            height={50}
                            width={100}
                            className="h-12 w-auto object-contain"
                          />
                        </div>
                        
                        {/* Rating Stars */}
                        <div className="flex mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 text-amber-500 fill-amber-500 mr-1" />
                          ))}
                        </div>
                        
                        {/* Client Name */}
                        <p className="text-sm font-bold text-slate-900 dark:text-white text-center">{testimonial.name}</p>
                      </div>
                      
                      {/* Right section with testimonial */}
                      <div className="p-4 md:p-5 md:w-3/4 relative">
                        {/* Quote Icon */}
                        <div className="absolute top-4 right-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100/80 to-indigo-100/80 dark:from-blue-900/30 dark:to-indigo-900/30 backdrop-blur-sm flex items-center justify-center shadow-md">
                            <Quote className="h-5 w-5 text-blue-600/70 dark:text-blue-400/70" />
                          </div>
                        </div>
                        
                        {/* Testimonial Text */}
                        <blockquote className="text-sm text-slate-700 dark:text-slate-300 italic pr-10 leading-relaxed relative min-h-[60px]">
                          <span className="text-2xl font-serif text-blue-400 absolute -top-2 -left-1">"</span>
                          <span className="relative">{testimonial.description}</span>
                          <span className="text-2xl font-serif text-blue-400 absolute -bottom-4 right-2">"</span>
                        </blockquote>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </BlurFade>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Controls and Indicators */}
        <div className="mt-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CarouselPrevious className="static translate-y-0 ml-0 h-8 w-8 dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 bg-white hover:bg-slate-100 shadow-md" />
            <CarouselNext className="static translate-y-0 mr-0 h-8 w-8 dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 bg-white hover:bg-slate-100 shadow-md" />
          </div>
          
          {/* Modern Dot indicators */}
          <div className="flex items-center justify-center gap-2">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  current === index 
                    ? "bg-blue-600 w-6" 
                    : "bg-slate-300 dark:bg-slate-600 w-1.5 hover:bg-blue-400 dark:hover:bg-blue-500"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Carousel>
    </div>
  );
}