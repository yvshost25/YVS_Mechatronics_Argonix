"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowRight, CheckCircle2, MoveRight } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { useTheme } from "@/components/theme/ThemeProvider";
import AboutPage from "./about/page";
import ProductsPage from "./services/page";
import CustomersPage from "./customers/page";
import ContactPage from "./contact/page";
import { TextAnimate } from "@/components/magicui/text-animate";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { FeatureCard } from "@/components/ui/feature-card";
import { TypographyH1, TypographyH2, TypographyLead, TypographyP } from "@/components/ui/typography";
import { ScrollProgress } from "@/components/magicui/scroll-progress";

export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  const highlights = [
    { 
      title: "Industrial Automation", 
      icon: "/precision.png",
      description: "Advanced automation systems for efficient manufacturing processes"
    },
    { 
      title: "Special-Purpose Machines", 
      icon: "/special.png",
      description: "Custom machines designed for your unique industrial requirements"
    },
    { 
      title: "Precision Engineering", 
      icon: "/cnc.png",
      description: "High-precision components with exceptional accuracy and quality"
    },
  ];

  const stats = [
    { number: "100+", label: "Projects Completed" },
    { number: "20+", label: "Team Members" },
    { number: "15+", label: "Industry Partners" },
    { number: "4+", label: "Years of Excellence" },
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Hero Section - Ultra Modern Design */}
      <section id="hero" className="relative overflow-hidden min-h-screen flex items-center justify-center">
        {/* Modern Parallax Background with Enhanced Effects */}
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.05, opacity: 0.9 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="h-full w-full"
          >
            <Image
              src="/images/hero_bg.png"
              alt="Industrial manufacturing background"
              fill
              priority
              className="object-cover"
              style={{ objectPosition: "center 30%" }}
            />
          </motion.div>
          
          {/* Advanced gradient overlay for depth and text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-blue-900/40 to-slate-900/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 via-transparent to-slate-900/50" />
        </div>
        
        {/* Hero Content with Enhanced Motion Animation */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Main Content */}
            <motion.div 
              className="max-w-3xl"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-tight mt-2 text-white drop-shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Empowering Industries Through <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">Innovation</span>
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl mb-8 max-w-2xl leading-relaxed text-white/90 text-shadow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                YVS Mechatronics delivers cutting-edge automation, special-purpose machines, and precision engineering solutions that transform manufacturing efficiency.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <Button 
                  size="lg" 
                  className="text-base px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-xl backdrop-blur-md rounded-md transition-all duration-300 hover:scale-105 group font-medium border border-blue-500/20"
                  onClick={() => {
                    const section = document.getElementById('services')
                    section?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Explore Solutions
                  <MoveRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-base px-8 py-6 text-white border-white/30 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-md transition-all duration-300 hover:scale-105 font-medium group"
                  onClick={() => {
                    const section = document.getElementById('contact')
                    section?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Contact Us
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
              
              {/* Trust Indicators */}
              <motion.div 
                className="mt-12 flex items-center space-x-2 text-sm text-white/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <CheckCircle2 className="h-4 w-4 text-blue-400" />
                <span>Trusted by Industry Leaders</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
                <CheckCircle2 className="h-4 w-4 text-blue-400" />
                <span>24/7 Support</span>
              </motion.div>
            </motion.div>
            
            {/* Right Side - 3D Model or Feature Showcase */}
            <motion.div 
              className="hidden lg:flex justify-center items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            >
              <div className="relative w-full h-[650px]">
                {/* Card 1 - Top Right - Randomly positioned */}
                <motion.div 
                  className={`absolute rounded-xl overflow-hidden shadow-2xl backdrop-blur-md w-64 h-36 p-4 z-30 ${
                    isDark 
                      ? 'bg-gradient-to-tr from-blue-600/70 to-indigo-600/70 border border-white/30' 
                      : 'bg-gradient-to-tr from-blue-500/90 to-indigo-500/90 border border-blue-300/50'
                  }`}
                  // @ts-ignore
                  style={{ top: '6%', right: '6%' }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ 
                    opacity: 1,
                    scale: 1,
                    y: [0, -10, 0],
                    rotate: [0, 2, 0]
                  }}
                  transition={{ 
                    opacity: { duration: 0.5 },
                    scale: { duration: 0.5 },
                    y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                  }}
                  // @ts-ignore
                  whileHover={{ scale: 1.05, zIndex: 40 }}
                >
                  <h3 className="text-lg font-semibold text-white mb-1">Automation Systems</h3>
                  <p className="text-sm text-white font-medium">Advanced solutions that increase efficiency by up to 40%</p>
                </motion.div>
                
                {/* Card 2 - Middle Left - Randomly positioned */}
                <motion.div 
                  className={`absolute rounded-xl overflow-hidden shadow-2xl backdrop-blur-md w-64 h-36 p-4 z-20 ${
                    isDark 
                      ? 'bg-gradient-to-tr from-indigo-600/70 to-purple-600/70 border border-white/30' 
                      : 'bg-gradient-to-tr from-indigo-500/90 to-purple-500/90 border border-indigo-300/50'
                  }`}
                  // @ts-ignore
                  style={{ top: '30%', left: '10%' }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ 
                    opacity: 1,
                    scale: 1,
                    y: [0, 12, 0],
                    rotate: [0, -1.5, 0]
                  }}
                  transition={{ 
                    opacity: { duration: 0.5, delay: 0.3 },
                    scale: { duration: 0.5, delay: 0.3 },
                    y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                    rotate: { duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                  }}
                  // @ts-ignore
                  whileHover={{ scale: 1.05, zIndex: 40 }}
                >
                  <h3 className="text-lg font-semibold text-white mb-1">Precision Engineering</h3>
                  <p className="text-sm text-white font-medium">High-precision components with exceptional accuracy</p>
                </motion.div>
                
                {/* Card 3 - Bottom Right - Randomly positioned */}
                <motion.div 
                  className={`absolute rounded-xl overflow-hidden shadow-2xl backdrop-blur-md w-64 h-36 p-4 z-10 ${
                    isDark 
                      ? 'bg-gradient-to-tr from-cyan-600/70 to-blue-600/70 border border-white/30' 
                      : 'bg-gradient-to-tr from-cyan-500/90 to-blue-500/90 border border-cyan-300/50'
                  }`}
                  // @ts-ignore
                  style={{ bottom: '22%', right: '16%' }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ 
                    opacity: 1,
                    scale: 1,
                    y: [0, 15, 0],
                    rotate: [0, 1, 0]
                  }}
                  transition={{ 
                    opacity: { duration: 0.5, delay: 0.6 },
                    scale: { duration: 0.5, delay: 0.6 },
                    y: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 },
                    rotate: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }
                  }}
                  // @ts-ignore
                  whileHover={{ scale: 1.05, zIndex: 40 }}
                >
                  <h3 className="text-lg font-semibold text-white mb-1">Special-Purpose Machines</h3>
                  <p className="text-sm text-white font-medium">Custom machines designed for unique requirements</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        
      </section>
      
      {/* Services Highlights Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <TypographyH2 className="mb-4 text-slate-900 dark:text-white">
              Innovative Engineering Solutions
            </TypographyH2>
            <TypographyLead className="text-slate-600 dark:text-slate-300 mt-0">
              We specialize in automation, precision engineering, and custom machines that enhance productivity and quality.
            </TypographyLead>
          </div>
          
          {/* Service Highlights - Improved */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {highlights.map((highlight, index) => (
              <BlurFade key={index} delay={0.2 * index} inView>
                <FeatureCard
                  title={highlight.title}
                  description={highlight.description}
                  icon={<Image 
                    src={highlight.icon} 
                    alt={highlight.title} 
                    layout="fill"
                    className="object-cover rounded-xl" 
                  />}
                  iconClassName="w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl flex items-center justify-center mb-6 shadow-md"
                  className="h-full border-2 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  contentClassName="p-6 relative z-10"
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <BlurFade delay={0.3} inView>
        <section id="about">
          <div className="about-section-content">
            <AboutPage />
          </div>
        </section>
      </BlurFade>

      {/* Services Section */}
      <BlurFade delay={0.3} inView>
        <section id="services">
          <div className="services-section-content">
            <ProductsPage />
          </div>
        </section>
      </BlurFade>

      {/* Customers Section */}
      <BlurFade inView>
        <section id="customers">
          <div className="customers-section-content">
            <CustomersPage />
          </div>
        </section>
      </BlurFade>

      {/* Contact Section */}
      <BlurFade delay={0.3} inView>
        <section id="contact">
          <div className="contact-section-content">
            <ContactPage />
          </div>
        </section>
      </BlurFade>
    </div>
  );
}