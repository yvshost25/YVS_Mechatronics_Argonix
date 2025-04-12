"use client";

import { motion } from "framer-motion";
import { Users, Target, Lightbulb, Zap, Award, Sparkles, Gauge, CheckCircle } from "lucide-react";
import { TypingAnimation } from "@/components/magicui/terminal";
import { BlurFade } from "@/components/magicui/blur-fade";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Card, CardContent } from "@/components/ui/card";
import { FeatureCard, FeatureCardWithBorder } from "@/components/ui/feature-card";
import { TypographyH1, TypographyH2, TypographyH3, TypographyP, TypographyLead } from "@/components/ui/typography";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const coreValues = [
    { 
      icon: <Award className="h-7 w-7 text-amber-500" />, 
      title: "Excellence", 
      description: "We strive for excellence in every project, delivering solutions that exceed expectations."
    },
    { 
      icon: <Sparkles className="h-7 w-7 text-blue-500" />, 
      title: "Innovation", 
      description: "Our innovative approach ensures cutting-edge solutions that keep our clients ahead of the curve."
    },
    { 
      icon: <Gauge className="h-7 w-7 text-green-500" />, 
      title: "Precision", 
      description: "We maintain the highest standards of precision in all our engineering and fabrication services."
    },
    { 
      icon: <CheckCircle className="h-7 w-7 text-purple-500" />, 
      title: "Reliability", 
      description: "Our clients trust us for dependable service and solutions that stand the test of time."
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-900">
      {/* Hero Section with Modern Design */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-white">
        {/* Background design elements */}
        <div className="absolute right-0 top-1/4 w-64 h-64 bg-blue-300/20 rounded-full filter blur-3xl"></div>
        <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-indigo-300/20 rounded-full filter blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={fadeIn.initial}
              animate={fadeIn.animate}
              transition={fadeIn.transition}
              className="text-center lg:text-left"
            >
              <div className="inline-block px-6 py-2 bg-blue-100 rounded-full mb-8 text-blue-600 text-sm font-medium">
                About YVS Mechatronics
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-900 leading-tight">
                Engineering Excellence & Innovation
              </h1>
              
              <p className="text-xl text-slate-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                At YVS Mechatronics, we're dedicated to transforming industries through cutting-edge automation, 
                precision engineering, and innovative special-purpose machines.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Button 
                  className="text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md"
                  onClick={() => {
                    const section = document.getElementById('services')
                    section?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Our Services
                </Button>
                <Button 
                  variant="outline"
                  className="border-blue-200 text-blue-600 px-6 py-3 rounded-md"
                  onClick={() => {
                    const section = document.getElementById('contact')
                    section?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Contact Us
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-xl overflow-hidden shadow-xl"
            >
              <Image 
                src="/about_bg.png" 
                alt="YVS Mechatronics Team" 
                width={600} 
                height={400}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision, Mission & Specialization Section - Redesigned to match Key Benefits */}
      <section className="py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-900 -z-10"></div>
        <div className="absolute top-0 right-0 -mr-20 w-80 h-80 bg-blue-200/30 dark:bg-blue-700/10 rounded-full filter blur-3xl -z-5"></div>
        <div className="absolute bottom-0 left-0 -ml-20 w-80 h-80 bg-indigo-200/30 dark:bg-indigo-700/10 rounded-full filter blur-3xl -z-5"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">
              <TextAnimate animation="blurInUp" by="word" startOnView>
                Our Core Principles
              </TextAnimate>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              The foundation of our approach to engineering excellence and innovation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Vision */}
            <BlurFade delay={0.2} inView>
              <FeatureCard
                title="Our Vision"
                description="We empower industries with cutting-edge technology and innovative engineering solutions that transform manufacturing processes with scalable, efficient systems."
                icon={<Target className="h-8 w-8 text-blue-600 dark:text-blue-400" />}
                iconClassName="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl flex items-center justify-center mb-6 shadow-md"
                className="h-full border-2 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              />
            </BlurFade>

            {/* Mission */}
            <BlurFade delay={0.4} inView>
              <FeatureCard
                title="Our Mission"
                description="We deliver robust and cost-effective engineering solutions combining automation, custom machine design, and precision engineering for reliable, future-proof systems."
                icon={<Lightbulb className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />}
                iconClassName="w-16 h-16 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-xl flex items-center justify-center mb-6 shadow-md"
                className="h-full border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              />
            </BlurFade>

            {/* Specialization */}
            <BlurFade delay={0.6} inView>
              <FeatureCard
                title="Our Expertise"
                description="We excel in industrial automation, special-purpose machines, precision engineering and fabrication, plus comprehensive R&D consultancy tailored to evolving needs."
                icon={<Zap className="h-8 w-8 text-purple-600 dark:text-purple-400" />}
                iconClassName="w-16 h-16 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl flex items-center justify-center mb-6 shadow-md"
                className="h-full border-2 border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              />
            </BlurFade>
          </div>
        </div>
      </section>
     
      {/* Company History Section with Modern Timeline */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50 dark:from-slate-900 dark:to-slate-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center mb-16">
            <div className="inline-block px-6 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4 text-blue-600 dark:text-blue-400 text-sm font-medium">
              Our Evolution
            </div>
            <TypographyH2 className="mb-4 text-slate-900 dark:text-white">
              <TextAnimate animation="blurInUp" by="word" startOnView>
                The YVS Mechatronics Story
              </TextAnimate>
            </TypographyH2>
            <TypographyP className="text-slate-700 dark:text-slate-300 mt-0 max-w-2xl mx-auto">
              From our founding vision to our current position as an industry leader, explore the key milestones that have shaped our journey of innovation and excellence.
            </TypographyP>
          </div>
          
          <div className="relative max-w-5xl mx-auto">
            {/* Timeline Line with Animation */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1.5 bg-gradient-to-b from-blue-300 via-indigo-400 to-purple-500 dark:from-blue-700 dark:via-indigo-600 dark:to-purple-700 rounded-full overflow-hidden">
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-white/20 dark:bg-white/10 animate-pulse"></div>
            </div>
            
            <div className="space-y-16 md:space-y-24 relative">
              {/* Timeline Event: 2020 - Foundation */}
              <BlurFade delay={0.2} inView>
                <div className="relative group">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-12 text-center md:text-right order-2 md:order-1">
                      <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 border border-blue-100 dark:border-blue-900/40">
                        <div className="inline-block px-4 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-3 text-blue-600 dark:text-blue-400 text-sm font-semibold">2020</div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                          Foundation
                        </h3>
                        <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                          Founded by M. Sai Kiran, YVS Mechatronics began its journey with a passion for engineering and innovation. His vision and expertise laid the foundation for a company that now stands as a trusted name in industrial automation and precision engineering.
                        </p>
                      </div>
                    </div>
                    
                    {/* Timeline Node with Pulse Effect */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                      <div className="h-12 w-12 rounded-full bg-blue-600 dark:bg-blue-500 z-10 border-4 border-white dark:border-slate-900 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <div className="absolute w-full h-full rounded-full bg-blue-400/50 dark:bg-blue-400/30 animate-ping opacity-75"></div>
                        <span className="text-white text-xs font-bold">2020</span>
                      </div>
                    </div>
                    
                    <div className="md:w-1/2 md:pl-12 pb-12 md:pb-0 order-1 md:order-2">
                      <div className="bg-blue-50 dark:bg-slate-800/80 p-6 rounded-xl shadow-lg overflow-hidden relative group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 border border-blue-100 dark:border-blue-900/40">
                        <div className="absolute top-0 left-0 w-2 h-full bg-blue-500 dark:bg-blue-600"></div>
                        <div className="pl-2">
                          <Image 
                            src="/logo.png" 
                            alt="YVS Mechatronics Foundation" 
                            width={100} 
                            height={100}
                            className="mx-auto mb-2 drop-shadow-md"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </BlurFade>
              
              {/* Timeline Event: 2021 - Establishing Partnerships */}
              <BlurFade delay={0.4} inView>
                <div className="relative group">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pl-12 text-center md:text-left order-2">
                      <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 border border-indigo-100 dark:border-indigo-900/40">
                        <div className="inline-block px-4 py-1 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-3 text-indigo-600 dark:text-indigo-400 text-sm font-semibold">2021</div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                          Strategic Partnerships
                        </h3>
                        <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                          We built strong collaborations with esteemed organizations such as Nuclear Fuel Complex, HAL, and DRDO, reinforcing our commitment to excellence and innovative solutions for demanding industries.
                        </p>
                      </div>
                    </div>
                    
                    {/* Timeline Node with Pulse Effect */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                      <div className="h-12 w-12 rounded-full bg-indigo-600 dark:bg-indigo-500 z-10 border-4 border-white dark:border-slate-900 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <div className="absolute w-full h-full rounded-full bg-indigo-400/50 dark:bg-indigo-400/30 animate-ping opacity-75"></div>
                        <span className="text-white text-xs font-bold">2021</span>
                      </div>
                    </div>
                    
                    <div className="md:w-1/2 md:pr-12 pb-12 md:pb-0 order-1">
                      <div className="bg-indigo-50 dark:bg-slate-800/80 p-6 rounded-xl shadow-lg overflow-hidden relative group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 border border-indigo-100 dark:border-indigo-900/40">
                        <div className="absolute top-0 right-0 w-2 h-full bg-indigo-500 dark:bg-indigo-600"></div>
                        <div className="flex flex-wrap justify-center gap-4 items-center">
                          <Image src="/nuclear_logo.png" alt="Nuclear Fuel Complex" width={80} height={40} className="object-contain bg-white p-2 rounded-lg shadow-sm" />
                          <Image src="/hal_logo.png" alt="HAL" width={80} height={40} className="object-contain bg-white p-2 rounded-lg shadow-sm" />
                          <Image src="/drdo_logo.png" alt="DRDO" width={80} height={40} className="object-contain bg-white p-2 rounded-lg shadow-sm" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </BlurFade>
              
              {/* Timeline Event: 2023 - Innovation & Expansion */}
              <BlurFade delay={0.6} inView>
                <div className="relative group">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-12 text-center md:text-right order-2 md:order-1">
                      <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 border border-purple-100 dark:border-purple-900/40">
                        <div className="inline-block px-4 py-1 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-3 text-purple-600 dark:text-purple-400 text-sm font-semibold">2023</div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                          Innovation & Growth
                        </h3>
                        <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                          With the launch of our advanced R&D facility, we expanded our portfolio to include comprehensive design and consultancy services, setting new benchmarks in the industry with cutting-edge solutions.
                        </p>
                      </div>
                    </div>
                    
                    {/* Timeline Node with Pulse Effect */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                      <div className="h-12 w-12 rounded-full bg-purple-600 dark:bg-purple-500 z-10 border-4 border-white dark:border-slate-900 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <div className="absolute w-full h-full rounded-full bg-purple-400/50 dark:bg-purple-400/30 animate-ping opacity-75"></div>
                        <span className="text-white text-xs font-bold">2023</span>
                      </div>
                    </div>
                    
                    <div className="md:w-1/2 md:pl-12 order-1 md:order-2">
                      <div className="bg-purple-50 dark:bg-slate-800/80 p-6 rounded-xl shadow-lg overflow-hidden relative group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 border border-purple-100 dark:border-purple-900/40">
                        <div className="absolute top-0 left-0 w-2 h-full bg-purple-500 dark:bg-purple-600"></div>
                        <div className="pl-2">
                          <Image 
                            src="/design_services.png" 
                            alt="R&D Expansion" 
                            width={150} 
                            height={150}
                            className="mx-auto drop-shadow-md"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </BlurFade>
              
              {/* Future Direction - 2025 */}
              <BlurFade delay={0.8} inView>
                <div className="relative group">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pl-12 text-center md:text-left order-2">
                      <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 border border-green-100 dark:border-green-900/40">
                        <div className="inline-block px-4 py-1 bg-green-100 dark:bg-green-900/30 rounded-full mb-3 text-green-600 dark:text-green-400 text-sm font-semibold">Looking Ahead</div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                          Future Vision: 2025
                        </h3>
                        <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                          Our roadmap includes expanding globally, developing sustainable automation solutions, and introducing AI-powered systems to revolutionize manufacturing processes for the industries of tomorrow.
                        </p>
                      </div>
                    </div>
                    
                    {/* Timeline Node with Pulse Effect */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                      <div className="h-12 w-12 rounded-full bg-green-600 dark:bg-green-500 z-10 border-4 border-white dark:border-slate-900 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <div className="absolute w-full h-full rounded-full bg-green-400/50 dark:bg-green-400/30 animate-ping opacity-75"></div>
                        <span className="text-white text-xs font-bold">2025</span>
                      </div>
                    </div>
                    
                    <div className="md:w-1/2 md:pr-12 pb-12 md:pb-0 order-1">
                      <div className="bg-green-50 dark:bg-slate-800/80 p-6 rounded-xl shadow-lg overflow-hidden relative group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 border border-green-100 dark:border-green-900/40">
                        <div className="absolute top-0 right-0 w-2 h-full bg-green-500 dark:bg-green-600"></div>
                        <div className="flex justify-center">
                          <Lightbulb className="h-20 w-20 text-green-500 dark:text-green-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}