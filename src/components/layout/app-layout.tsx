

'use client';
import Header from '@/components/layout/header';
import AppSidebar from '@/components/layout/sidebar';
import AiAnalyst from '../dashboard/ai-analyst';
import { AiAnalystProvider } from '@/hooks/use-ai-analyst';
import { SidebarProvider } from '../ui/sidebar';

const socialStats = [
  {
    platform: 'Instagram',
    followers: { value: '120.3k', change: '+12.5%' },
    likes: { value: '2.1M', change: '+8.2%' },
    comments: { value: '45.6k', change: '+15.1%' },
    shares: { value: '30.2k', change: '+5.7%' },
  },
  {
    platform: 'Facebook',
    followers: { value: '80.1k', change: '+5.3%' },
    likes: { value: '850.2k', change: '+4.1%' },
    comments: { value: '15.3k', change: '+9.8%' },
    shares: { value: '10.9k', change: '+2.3%' },
  },
  {
    platform: 'YouTube',
    followers: { value: '50.2k', change: '+18.7%' },
    likes: { value: '5.6M', change: '+11.4%' },
    comments: { value: '95.8k', change: '+20.2%' },
    shares: { value: '40.1k', change: '+7.6%' },
  },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AiAnalystProvider>
        <div className="flex min-h-screen w-full">
            <AppSidebar />
            <div className="flex-1 flex flex-col w-full">
                <Header />
                <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full">
                    {children}
                </main>
            </div>
        </div>
        <AiAnalyst metricsData={JSON.stringify(socialStats)} />
      </AiAnalystProvider>
    </SidebarProvider>
  );
}
