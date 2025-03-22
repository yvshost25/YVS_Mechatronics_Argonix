import { Button } from "@/components/ui/button"
import { ChevronRight, Settings, PenTool as Tool, Zap } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-20 sm:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Empowering Industries with Innovative Engineering
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Established in 2020, YVS Mechatronics is a trusted name in industrial automation, special-purpose machines, and precision engineering solutions. We serve industries ranging from manufacturing and automotive to aerospace and SMEs.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild>
                <Link href="/products">
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

      {/* Features Section */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-card p-6 shadow-lg">
              <div className="mb-4 inline-block rounded-full bg-primary/10 p-3">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Industrial Automation</h3>
              <p className="text-muted-foreground">
                Designing and implementing advanced automation systems using PLC, SCADA, and microcontrollers to boost productivity and efficiency.
              </p>
            </div>
            <div className="rounded-lg bg-card p-6 shadow-lg">
              <div className="mb-4 inline-block rounded-full bg-primary/10 p-3">
                <Tool className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Special-Purpose Machines</h3>
              <p className="text-muted-foreground">
                Custom-designed machines tailored to unique industrial requirements, ensuring optimal performance and reliability.
              </p>
            </div>
            <div className="rounded-lg bg-card p-6 shadow-lg">
              <div className="mb-4 inline-block rounded-full bg-primary/10 p-3">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Precision Engineering &amp; Fabrication</h3>
              <p className="text-muted-foreground">
                Utilizing state-of-the-art CNC, milling, and welding technologies to deliver high-quality components and innovative fabrication solutions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
