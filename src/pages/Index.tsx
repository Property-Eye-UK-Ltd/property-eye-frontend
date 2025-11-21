// Property Eye - Home Page

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-8">
      <div className="text-center max-w-4xl space-y-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src="/assets/logo.svg" alt="Property Eye Logo" className="h-12" />
        </div>

        {/* Hero Section */}
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-primary">
            Property Eye
          </h1>
          <p className="text-2xl font-medium text-secondary">
            Digital Watchdog for Real Estate Agencies
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Identify, track, and recover commissions lost when clients bypass your agency.
            Continuous monitoring, flagging, and reporting of potential fraudulent transactions.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center pt-4">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Get Started
          </Button>
          <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
            Learn More
          </Button>
        </div>

        {/* Brand Colors Demo */}
        <Card className="p-8 mt-12">
          <h3 className="text-xl font-semibold mb-6">Brand Colors</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="h-24 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-medium">Primary #00072C</span>
              </div>
              <p className="text-sm text-muted-foreground">Deep Navy Blue</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-secondary rounded-lg flex items-center justify-center">
                <span className="text-secondary-foreground font-medium">Secondary #FFBD09</span>
              </div>
              <p className="text-sm text-muted-foreground">Golden Yellow</p>
            </div>
          </div>
        </Card>

        {/* Font Demo */}
        <Card className="p-8">
          <h3 className="text-xl font-semibold mb-4">Poppins Font Family</h3>
          <div className="space-y-2 text-left">
            <p className="font-light">Light 300 - The quick brown fox jumps over the lazy dog</p>
            <p className="font-normal">Regular 400 - The quick brown fox jumps over the lazy dog</p>
            <p className="font-medium">Medium 500 - The quick brown fox jumps over the lazy dog</p>
            <p className="font-semibold">Semibold 600 - The quick brown fox jumps over the lazy dog</p>
            <p className="font-bold">Bold 700 - The quick brown fox jumps over the lazy dog</p>
            <p className="font-extrabold">Extra Bold 800 - The quick brown fox jumps over the lazy dog</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
