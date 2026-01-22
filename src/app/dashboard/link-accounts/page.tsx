'use client';

import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { linkWithPopup, FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { cn } from '@/lib/utils';

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...props}
    >
        <defs>
            <radialGradient id="instagram-gradient" gradientUnits="userSpaceOnUse" cx="8.982" cy="18.982" r="23.97" fx="8.982" fy="18.982">
                <stop offset="0" stopColor="#fd5" />
                <stop offset=".5" stopColor="#ff543e" />
                <stop offset="1" stopColor="#c837ab" />
            </radialGradient>
        </defs>
        <path fill="url(#instagram-gradient)" d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.784.297-1.459.717-2.126 1.384S.927 3.356.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.297.784.717 1.459 1.384 2.126s1.342.927 2.126 1.224c.765.297 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.261 2.913-.558.784-.297 1.459-.717 2.126-1.224s.927-1.342 1.224-2.126c.297-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.261-2.148-.558-2.913-.297-.784-.717-1.459-1.224-2.126S20.644.927 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.056 1.17-.249 1.805-.413 2.227-.217.562-.477.96-.896 1.382-.42.419-.819.679-1.381.896-.422.164-1.057.36-2.227.413-1.266.057-1.646.07-4.85.07s-3.585-.015-4.85-.074c-1.17-.056-1.805-.249-2.227-.413-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.381-.164-.422-.36-1.057-.413-2.227-.057-1.266-.07-1.646-.07-4.85s.015-3.585.07-4.85c.055-1.17.249-1.805.413-2.227.217-.562.477.96.896-1.382.42-.419.819-.679 1.381-.896.422-.164 1.057.36 2.227-.413C8.415 2.175 8.797 2.16 12 2.16zm0 5.482A4.36 4.36 0 1 0 12 16.36a4.36 4.36 0 0 0 0-8.718zM12 14.2a2.2 2.2 0 1 1 0-4.4 2.2 2.2 0 0 1 0 4.4zm5.669-9.197a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
    </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <circle cx="12" cy="12" r="12" fill="#1877F2"/>
        <path d="M13.552 22.0001V13.6876H16.4055L16.8365 10.515H13.552V8.52756C13.552 7.64306 13.788 7.00006 15.021 7.00006H17V4.07506C16.6855 4.03756 15.5425 3.94506 14.2255 3.94506C11.4595 3.94506 9.673 5.68006 9.673 8.24256V10.515H6.8125V13.6876H9.673V22.0001H13.552Z" fill="white"/>
    </svg>
);


const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/>
        <path fill="#FFFFFF" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
);


const SocialPlatformCard = ({ platform, Icon, onConnect, description, connected }: { platform: string, Icon: React.ElementType, onConnect: () => void, description: string, connected: boolean }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div className="flex items-center gap-4">
                <Icon className="size-8" />
                <CardTitle className="font-headline text-2xl">{platform}</CardTitle>
            </div>
            <Button onClick={onConnect} disabled={connected} className={cn(!connected && "bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90 transition-opacity")}>
                {connected ? 'Connected' : 'Connect'}
            </Button>
        </CardHeader>
        <CardContent>
            <CardDescription>
                {description}
            </CardDescription>
        </CardContent>
    </Card>
);


export default function LinkAccountsPage() {
    const { toast } = useToast();
    const { user } = useAuth();
    // In a real app, this would be determined by checking if you have a valid token for the user.
    const isFacebookConnected = false;
    const isYoutubeConnected = false;
    const isInstagramConnected = false;

    const handleConnect = async (platform: 'Facebook' | 'YouTube' | 'Instagram') => {
        if (!auth.currentUser) {
            toast({
                title: 'Not logged in',
                description: 'Please log in to connect your accounts.',
                variant: 'destructive',
            });
            return;
        }

        let provider;
        if (platform === 'Facebook' || platform === 'Instagram') {
            provider = new FacebookAuthProvider();
            
            // Set specific scopes based on the platform
            if (platform === 'Instagram') {
                provider.addScope('instagram_basic');
                provider.addScope('instagram_manage_insights');
                provider.addScope('pages_show_list');
            } else { // Facebook
                provider.addScope('pages_show_list');
                provider.addScope('pages_read_engagement');
            }
            
            provider.setCustomParameters({
                display: 'popup',
                auth_type: 'reauthenticate' 
            });

        } else { // YouTube
             provider = new GoogleAuthProvider();
             provider.addScope('https://www.googleapis.com/auth/youtube.readonly');
        }

        try {
            const result = await linkWithPopup(auth.currentUser, provider);
            
            toast({
                title: 'Connection successful!',
                description: `Your ${platform} account has been authorized successfully.`,
            });
        } catch (error: any) {
            let description = 'An unexpected error occurred. Please try again.';
            if (error.code === 'auth/credential-already-in-use') {
                description = 'This social account is already linked to another user.';
            } else if (error.code === 'auth/popup-closed-by-user') {
                description = 'The authorization process was canceled.';
            } else if (error.code === 'auth/cancelled-popup-request') {
                description = 'Multiple authorization requests were canceled. Please try again.';
            } else if (error.code === 'auth/popup-blocked') {
                description = 'The browser blocked the popup. Please allow popups for this site.';
            } else if (error.code) {
                 description = 'The connection could not be completed. Check your Meta and Firebase console settings.';
            }

            toast({
                title: `Error connecting to ${platform}`,
                description: description,
                variant: 'destructive',
            });
            console.error('Firebase link error:', error);
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-headline text-3xl font-bold tracking-tight">Connect Accounts</h1>
                <p className="text-muted-foreground">
                    Authorize Insightly to access your social media profile data.
                </p>
            </div>

            <div className="space-y-4">
                <SocialPlatformCard 
                    platform="Instagram" 
                    Icon={InstagramIcon} 
                    onConnect={() => handleConnect('Instagram')}
                    description="Connect your Instagram account via Meta to sync your profile and metrics."
                    connected={isInstagramConnected}
                />
                <SocialPlatformCard 
                    platform="Facebook" 
                    Icon={FacebookIcon} 
                    onConnect={() => handleConnect('Facebook')} 
                    description="Connect your Facebook page to get detailed analytics on your posts and audience."
                    connected={isFacebookConnected}
                />
                <SocialPlatformCard 
                    platform="YouTube" 
                    Icon={YoutubeIcon} 
                    onConnect={() => handleConnect('YouTube')} 
                    description="Connect your YouTube channel to analyze video performance and subscriber growth."
                    connected={isYoutubeConnected}
                />
            </div>
        </div>
    );
}
