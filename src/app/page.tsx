import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Bot, BarChart, Eye } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const LandingHeader = () => (
  <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-transparent">
    <div className="container flex h-20 max-w-screen-2xl items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.png" alt="ConnectIQ Logo" width={40} height={40} data-ai-hint="logo" />
        <span className="font-headline text-3xl font-bold text-white">ConnectIQ</span>
      </Link>
      <div className="flex items-center gap-2">
        <Button variant="ghost" asChild className="text-white hover:bg-white/10 hover:text-white">
          <Link href="/login">Log In</Link>
        </Button>
        <Button asChild className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90 transition-opacity">
          <Link href="/signup">Register</Link>
        </Button>
      </div>
    </div>
  </header>
);

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <div className="flex flex-col items-center p-6 text-center bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/20 text-purple-400">
      <Icon className="h-6 w-6" />
    </div>
    <h3 className="mb-2 font-headline text-xl font-bold text-white">{title}</h3>
    <p className="text-purple-200/80">{description}</p>
  </div>
);

export default function LandingPage() {
  return (
    <div className="dark flex min-h-screen flex-col bg-black text-white">
      <div className="bg-gradient-to-b from-[#1a0c20] via-[#2a1435] to-transparent">
        <LandingHeader />
        <main>
          {/* Hero Section */}
          <section className="container grid items-center gap-6 pb-8 pt-6 md:py-20 lg:py-24">
            <div className="mx-auto flex max-w-[980px] flex-col items-center gap-6 text-center">
              <h1 className={cn(
                  "font-headline text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl",
                  "bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent"
              )}>
                Analyze Your Social Media with the Power of AI
              </h1>
              <p className="max-w-[700px] text-lg text-purple-200/80">
                ConnectIQ gives you the tools to understand your performance, optimize content, and grow your audience.
              </p>
              <div className="flex gap-4">
                <Button asChild size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-90 transition-opacity shadow-lg">
                  <Link href="/signup">Get Started for Free</Link>
                </Button>
              </div>
            </div>
          </section>
        </main>
      </div>

      <div className="bg-black">
        {/* Features Section */}
        <section className="w-full py-16 md:py-24 lg:py-32">
          <div id="features" className="container space-y-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
              <h2 className="font-headline text-3xl font-bold leading-[1.1] md:text-4xl text-white">Why ConnectIQ?</h2>
              <p className="max-w-[85%] leading-normal text-purple-200/80 sm:text-lg">
                Discover features that will help you take your social media strategy to the next level.
              </p>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
              <FeatureCard 
                icon={BarChart} 
                title="Clear Metrics" 
                description="Visualize your performance with easy-to-understand charts and statistics."
              />
              <FeatureCard 
                icon={Bot}
                title="AI Analyst"
                description="Ask natural language questions and get deep insights from your data instantly."
              />
              <FeatureCard 
                icon={Eye}
                title="Style Guide"
                description="Analyze the visual identity of any channel to inspire your own branding strategy."
              />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-6 md:px-8 md:py-0">
          <div className="container flex flex-col items-center justify-center gap-3 text-center md:h-24">
            <p className="text-sm leading-loose text-purple-200/70">
              Released under the MIT License.
            </p>
            <p className="text-sm leading-loose text-purple-200/70">
              Copyright © 2021-present Blessed Siden
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
