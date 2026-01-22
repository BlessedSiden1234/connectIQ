'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, Home, PenSquare, Settings, Link as LinkIcon } from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useAiAnalyst } from '@/hooks/use-ai-analyst';

export default function AppSidebar() {
  const pathname = usePathname();
  const { setOpen } = useAiAnalyst();

  const menuItems = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: Home,
    },
    {
      href: '/style-guide',
      label: 'AI Style Guide',
      icon: PenSquare,
    },
    {
      href: '/dashboard/link-accounts',
      label: 'Link Accounts',
      icon: LinkIcon,
    }
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Avatar className="size-8">
            <AvatarImage src="/logo.png" alt="ConnectIQ logo" data-ai-hint="logo" />
            <AvatarFallback>CI</AvatarFallback>
          </Avatar>
          <span className="font-headline text-lg font-semibold">ConnectIQ</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={
                  pathname === item.href ||
                  (item.href === '/dashboard' && pathname.startsWith('/dashboard/')) &&
                  pathname !== '/dashboard/settings' &&
                  pathname !== '/dashboard/link-accounts'
                }
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="AI Assistant" onClick={() => setOpen(true)}>
              <Bot />
              <span>AI Assistant</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname.startsWith('/dashboard/settings')}
              tooltip="Settings"
            >
              <Link href="/dashboard/settings">
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
