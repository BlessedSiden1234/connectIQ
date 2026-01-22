'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { summarizeYoutubeStyle } from '@/ai/flows/youtube-style-guide';
import { Skeleton } from '../ui/skeleton';
import { Bot } from 'lucide-react';

export default function StyleGuideForm() {
  const [channelDescription, setChannelDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [styleSummary, setStyleSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (!channelDescription || !file || !previewUrl) {
      toast({
        title: 'Missing Information',
        description: 'Please provide a channel description and a sample image.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setStyleSummary('');

    try {
      const result = await summarizeYoutubeStyle({
        channelDescription,
        exampleVideoDataUri: previewUrl,
      });
      setStyleSummary(result.styleSummary);
    } catch (error) {
      console.error('Error summarizing style:', error);
      toast({
        title: 'Error',
        description: 'Unable to generate the style guide. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Channel Information</CardTitle>
          <CardDescription>Provide details and a sample image of your YouTube channel.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="channel-description">Channel Description</Label>
            <Textarea
              id="channel-description"
              placeholder="E.g.: A channel dedicated to high-quality cooking tutorials with a rustic, cozy aesthetic."
              value={channelDescription}
              onChange={(e) => setChannelDescription(e.target.value)}
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="video-frame">Sample Video Frame</Label>
            <Input id="video-frame" type="file" accept="image/*" onChange={handleFileChange} />
          </div>
          {previewUrl && (
            <div className="relative aspect-video w-full overflow-hidden rounded-md border">
              <Image src={previewUrl} alt="Video frame preview" fill style={{ objectFit: 'cover' }} data-ai-hint="video frame" />
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90 transition-opacity"
          >
            {isLoading ? 'Analyzing Style...' : 'Generate Style Guide'}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Bot className="size-5" />
            AI-Generated Style Summary
          </CardTitle>
          <CardDescription>
            Here is the AI’s analysis of your channel’s visual style.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          )}
          {styleSummary && <p className="text-sm leading-relaxed">{styleSummary}</p>}
          {!isLoading && !styleSummary && (
            <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-8">
              <Bot className="size-12 mb-4" />
              <p>Your style summary will appear here.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
