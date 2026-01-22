'use client';

import Link from 'next/link';
import { Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  // In a real app, you'd fetch this state from your backend
  const accountsLinked = false;

  if (!accountsLinked) {
    return (
      <div className="flex h-15 w-30 items-center justify-center rounded-lg border-2 border-dashed bg-card p-12 text-center gap-4">
        <div>
          <h2 className="font-headline text-2xl font-bold mb-2">
            Welcome to ConnectIQ
          </h2>
          <p className="text-muted-foreground mb-4">
            Link your social media accounts to start analyzing your metrics.
          </p>
          <Button
            asChild
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90 transition-opacity"
          >
            <Link href="/dashboard/link-accounts">
              <LinkIcon className="mr-2" />
              Link Accounts
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  // This part will be shown once accounts are linked.
  // The logic for this is not implemented yet.
  return (
    <div>
      <h1 className="font-headline text-3xl font-bold tracking-tight">
        Dashboard
      </h1>
      <p className="text-muted-foreground">
        Here’s an overview of your social media performance.
      </p>
    </div>
  );
}
