"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import AboutPage from "./about/page";
import ProductsPage from "./services/page";
import CustomersPage from "./customers/page";
import ContactPage from "./contact/page";
import { TextAnimate } from "@/components/magicui/text-animate";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Hero Section with Background Image */}
      <BlurFade delay={0.3} inView>
        <section id="hero" className="relative overflow-hidden py-20 sm:py-32 bg-muted/50">
          <Image
            src="/images/hero_bg.png"
            alt="Fabrication background"
            fill
            className="absolute inset-0 object-cover dark:opacity-30"
          />
          <div className="absolute inset-0" />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-6xl text-white">
                <TextAnimate startOnView>
                  Empowering Industries with Innovative Engineering
                </TextAnimate>
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted/100 dark:text-white">
                YVS Mechatronics is a trusted name in industrial automation, special-purpose machines, and precision engineering solutions.
              </p>
              <div className="mt-10 flex flex-col lg:flex-row items-center justify-center gap-x-6 gap-3">
                <Button size="lg" onClick={() => {
                  const section = document.getElementById('services')
                  section?.scrollIntoView({ behavior: 'smooth' })
                }}>
                  Explore Our Solutions
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" onClick={() => {
                  const section = document.getElementById('contact')
                  section?.scrollIntoView({ behavior: 'smooth' })
                }}>
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </section>
      </BlurFade>

      {/* About Us Section */}
      <BlurFade delay={0.3} inView>
        <section id="about">
          <AboutPage />
        </section>
      </BlurFade>

      {/* Services Section */}
      <BlurFade delay={0.3} inView>
        <section id="services">
          <ProductsPage />
        </section>
      </BlurFade>

      {/* Customers Section */}
      <BlurFade inView>
        <section id="customers">
          <CustomersPage />
        </section>
      </BlurFade>

      {/* Contact Section */}
      <BlurFade delay={0.3} inView>
        <section id="contact">
          <ContactPage />
        </section>
      </BlurFade>
    </div >
  );
}