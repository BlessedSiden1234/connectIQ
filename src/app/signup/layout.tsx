
import Link from 'next/link';
import Image from 'next/image';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark flex min-h-screen flex-col bg-gradient-to-br from-[#1a0c20] via-[#2a1435] to-[#4b2959] text-white">
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-transparent">
        <div className="container flex h-20 max-w-screen-2xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Insightly Logo" width={40} height={40} data-ai-hint="logo" />
            <span className="font-headline text-3xl font-bold text-white">ConnectIQ</span>
          </Link>
        </div>
      </header>
      <div className="flex flex-1 items-center justify-center p-4 sm:p-20 lg:p-40">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl rounded-lg shadow-lg overflow-hidden bg-black/30 backdrop-blur-sm">
          <div className="flex flex-col items-center justify-center p-8 bg-transparent text-white">
            {children}
          </div>
          <div className="flex items-center justify-center p-0 relative">
            <Image src="/auth-background.png" alt="Authentication Background" layout="fill" objectFit="cover" className="rounded-r-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
