import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, PenTool, Settings, PenTool as Tool, Zap } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative overflow-hidden bg-background py-20 sm:py-32">
        {/* Background Image */}
        <Image
          src="/home_bg.png"
          alt="Fabrication background"
          fill
          className="absolute inset-0 object-cover opacity-50 dark:opacity-20"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/10 dark:from-black/40 dark:to-black/20" />

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Empowering Industries with Innovative Engineering
            </h1>
            <p className="mt-6 text-lg leading-8">
              YVS Mechatronics is a trusted name in industrial automation, special-purpose machines, and precision engineering solutions.
            </p>
            <div className="mt-10 flex flex-col lg:flex-row items-center justify-center gap-x-6 gap-3">
              <Button size="lg" asChild>
                <Link href="/services">
                  Explore Our Solutions
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold">About YVS Mechatronics</h2>
            <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Established in 2020, YVS Mechatronics is at the forefront of science, engineering, and technology. Based in Cherlapally, Hyderabad, our company is equipped with modern tools and machinery—including 5 CNC machines, 2 milling machines, 2 lathes, and advanced TIG & ARC welding setups. We specialize in industrial automation, special-purpose machines, precision engineering components, and comprehensive fabrication services.
            </p>
          </div>
        </div>
      </section>

      {/* Services Offered Section */}
      <section id="services" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold">Our Services</h2>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
              We offer a wide range of services to meet diverse industrial needs.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Industrial Automation */}
            <div className="rounded-lg bg-card p-6 shadow-lg">
              <div className="mb-4 inline-block rounded-full bg-primary/10 p-3">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Industrial Automation</h3>
              <p className="text-muted-foreground">
                Designing and implementing automation systems using PLC, SCADA, and microcontrollers for enhanced productivity.
              </p>
            </div>
            {/* Special-Purpose Machines */}
            <div className="rounded-lg bg-card p-6 shadow-lg">
              <div className="mb-4 inline-block rounded-full bg-primary/10 p-3">
                <Tool className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Special-Purpose Machines</h3>
              <p className="text-muted-foreground">
                Custom-designed machines tailored to meet unique industrial requirements.
              </p>
            </div>
            {/* Precision Engineering & Fabrication */}
            <div className="rounded-lg bg-card p-6 shadow-lg">
              <div className="mb-4 inline-block rounded-full bg-primary/10 p-3">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Precision Engineering &amp; Fabrication</h3>
              <p className="text-muted-foreground">
                Delivering high-quality components using state-of-the-art CNC, milling, and welding technologies.
              </p>
            </div>
            {/* Integrated Engineering Design */}
            <div className="rounded-lg bg-card p-6 shadow-lg">
              <div className="mb-4 inline-block rounded-full bg-primary/10 p-3">
                <PenTool className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Integrated Engineering Design</h3>
              <p className="text-muted-foreground">
                Comprehensive design services across mechanical, electrical, and software disciplines.
              </p>
            </div>
            {/* Consultancy Services */}
            <div className="rounded-lg bg-card p-6 shadow-lg">
              <div className="mb-4 inline-block rounded-full bg-primary/10 p-3">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Consultancy Services</h3>
              <p className="text-muted-foreground">
                Professional support for research and development projects across industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio & Clients Section */}
      <section id="portfolio" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold">Our Portfolio &amp; Clients</h2>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
              We have partnered with prestigious organizations to deliver innovative solutions.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-card p-6 shadow-lg">
              <h3 className="mb-3 text-xl font-semibold">Nuclear Fuel Complex (NFC)</h3>
              <p className="text-muted-foreground">
                Trusted partner in delivering precise engineering components.
              </p>
            </div>
            <div className="rounded-lg bg-card p-6 shadow-lg">
              <h3 className="mb-3 text-xl font-semibold">Hindustan Aeronautics Limited (HAL)</h3>
              <p className="text-muted-foreground">
                Collaborated on advanced automation and engineering solutions.
              </p>
            </div>
            <div className="rounded-lg bg-card p-6 shadow-lg">
              <h3 className="mb-3 text-xl font-semibold">DRDO</h3>
              <p className="text-muted-foreground">
                Partnered on projects requiring high precision and advanced fabrication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team & Owner Information Section */}
      <section id="team" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold">Our Team</h2>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
              Powered by a dedicated team of 20+ professionals, our experts in mechanical design, electrical engineering, software development, and skilled welding ensure every project is a success.
            </p>
            <div className="mt-8">
              <h3 className="text-xl font-semibold">M. Sai Kiran</h3>
              <p className="mt-2 text-muted-foreground">
                Founder &amp; visionary leader, driving innovation and excellence in engineering solutions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
