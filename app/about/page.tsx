"use client";

import { motion } from "framer-motion";
import { Award, Users, Target, Lightbulb, Zap } from "lucide-react";
import {
  AnimatedSpan,
  TypingAnimation,
} from "@/components/magicui/terminal";
import { BlurFade } from "@/components/magicui/blur-fade";
import { TextAnimate } from "@/components/magicui/text-animate";
import Image from "next/image";

export default function AboutPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Background Image */}
      <section
        className="relative overflow-hidden py-20 sm:py-32"
      >
        <Image
          src="/images/about_bg.png"
          alt="Fabrication background"
          fill
          className="absolute inset-0 object-cover dark:opacity-30"
        />
        {/* <section
        className="relative overflow-hidden py-20 sm:py-32"> */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={fadeIn.initial}
            animate={fadeIn.animate}
            transition={fadeIn.transition}
          >
            <h1 className="text-3xl font-bold sm:text-6xl text-white">
              <TextAnimate startOnView>
                About YVS Mechatronics
              </TextAnimate>
            </h1>
            <p className="mt-6 text-lg text-white">
              We at YVS Mechatronics are at the forefront of industrial automation,
              special-purpose machines, and precision engineering. Our passion for
              innovation and excellence drives us to deliver state-of-the-art solutions
              that transform the manufacturing, automotive, aerospace, and SME sectors.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision, Mission, Specialization & Employees Section with BlurFade */}
      <section className="py-16 bg-muted/50">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Vision & Mission */}
          <div className="grid gap-8 items-center justify-end">
            <BlurFade delay={0.2} inView>
              <div className="space-y-4">
                <Target className="h-12 w-12 text-primary" />
                <h2 className="text-3xl font-bold">Our Vision</h2>
                <p className="text-muted-foreground">
                  We aim to empower industries with cutting-edge technology and innovative
                  engineering solutions. Our vision is to transform manufacturing processes
                  by delivering scalable, efficient, and precise systems that inspire confidence
                  and drive growth.
                </p>
              </div>
            </BlurFade>
            <BlurFade delay={0.4} inView>
              <div className="space-y-4">
                <Lightbulb className="h-12 w-12 text-primary" />
                <h2 className="text-3xl font-bold">Our Mission</h2>
                <p className="text-muted-foreground">
                  Our mission is to deliver robust and cost-effective engineering solutions.
                  We combine industrial automation, custom machine design, precision engineering,
                  and expert fabrication to ensure our clients receive reliable, future-proof
                  systems tailored to their needs.
                </p>
              </div>
            </BlurFade>
          </div>

          {/* Specialization & Employees */}
          <div className="grid gap-8 items-center mt-5">
            <BlurFade delay={0.6} inView>
              <div className="space-y-4">
                <Zap className="h-12 w-12 text-primary" />
                <h2 className="text-3xl font-bold">What we are Specialized In</h2>
                <p className="text-muted-foreground">
                  At YVS Mechatronics, we excel in industrial automation, the design and manufacture
                  of special-purpose machines, and precision engineering and fabrication. We also
                  provide comprehensive research and development consultancy, ensuring our solutions
                  remain innovative and tailored to evolving industrial requirements.
                </p>
              </div>
            </BlurFade>
            <BlurFade delay={0.8} inView>
              <div className="space-y-4">
                <Users className="h-12 w-12 text-primary" />
                <h2 className="text-3xl font-bold">Our Team</h2>
                <p className="text-muted-foreground">
                  Powered by over 20 skilled professionals, our team includes experts in mechanical
                  design, electrical engineering, software development, and specialized welding
                  techniques. Our collaborative approach and commitment to research ensure we stay
                  ahead of technological advances.
                </p>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* Company History Section with Timeline & Animated Text */}
      <section className="py-16">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8">
              <TextAnimate animation="blurInUp" by="character" startOnView>
                Our Journey
              </TextAnimate>
            </h2>
            <div className="space-y-8">
              <BlurFade delay={0.2} inView>
                {/* Timeline Event: 2020 - Foundation */}
                <div className="relative border-l-2 border-primary pl-8 pb-8">
                  <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-primary"></div>
                  <TypingAnimation className="text-xl font-bold">
                    2020 - Foundation
                  </TypingAnimation>
                  <p className="mt-2 text-muted-foreground">
                    Founded by M. Sai Kiran, YVS Mechatronics began its journey with a passion for engineering and innovation. His vision and expertise laid the foundation for a company that now stands as a trusted name in industrial automation and precision engineering.
                  </p>
                </div>
              </BlurFade>
              {/* Timeline Event: 2021 - Establishing Partnerships */}
              <BlurFade delay={0.4} inView>
                <div className="relative border-l-2 border-primary pl-8 pb-8">
                  <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-primary"></div>
                  <TypingAnimation className="text-xl font-bold">
                    2021 - Establishing Partnerships
                  </TypingAnimation>
                  <p className="mt-2 text-muted-foreground">
                    We built strong collaborations with esteemed organizations such as Nuclear Fuel Complex, HAL, and DRDO, reinforcing our commitment to excellence and innovative solutions.
                  </p>
                </div>
              </BlurFade>
              <BlurFade delay={0.6} inView>
                {/* Timeline Event: 2023 - Innovation & Expansion */}
                <div className="relative border-l-2 border-primary pl-8">
                  <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-primary"></div>
                  <TypingAnimation className="text-xl font-bold">
                    2023 - Innovation & Expansion
                  </TypingAnimation>
                  <p className="mt-2 text-muted-foreground">
                    With the launch of our advanced R&D facility, we expanded our portfolio to include comprehensive design and consultancy services, setting new benchmarks in the industry.
                  </p>
                </div>
              </BlurFade>
            </div>
          </motion.div>
        </div>
      </section >
    </div >
  );
}
