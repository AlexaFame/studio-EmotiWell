'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { personalizedEmotionalGuidance } from '@/ai/flows/personalized-emotional-guidance';
import { EMOTIONS } from '@/lib/constants';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookText, MessageCircle } from 'lucide-react';

function GuidanceSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
        </div>
    );
}

export default function GuidancePage() {
  const params = useParams();
  const [guidance, setGuidance] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const emotionSlug = Array.isArray(params.emotion) ? params.emotion[0] : params.emotion;
  const emotionDetails = EMOTIONS.find((e) => e.slug === emotionSlug);
  const Icon = emotionDetails?.icon;

  useEffect(() => {
    if (emotionDetails) {
      setIsLoading(true);
      personalizedEmotionalGuidance({ emotionalState: emotionDetails.name })
        .then((result) => setGuidance(result.guidance))
        .catch((error) => {
            console.error('Failed to get guidance:', error);
            setGuidance("I'm sorry, something went wrong. Please try again later.");
        })
        .finally(() => setIsLoading(false));
    }
  }, [emotionDetails]);

  if (!emotionDetails) {
    return <div className="p-6">Emotion not found.</div>;
  }

  return (
    <div className="p-4 md:p-8 flex justify-center items-start">
      <div className="w-full max-w-3xl space-y-8">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            {Icon && <Icon className="w-20 h-20 mx-auto text-muted-foreground mb-4" />}
            <CardTitle className="text-3xl md:text-4xl font-headline">
                Guidance for {emotionDetails.name}
            </CardTitle>
            <CardDescription className="text-lg">
                Here are some thoughts and strategies to help you navigate this feeling.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-lg text-foreground/80 leading-relaxed px-6 md:px-10 pb-10">
            {isLoading ? <GuidanceSkeleton /> : <p>{guidance}</p>}
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>What's Next?</CardTitle>
                <CardDescription>
                    Explore these tools to continue your journey of self-discovery and emotional well-being.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
                <Link href="/journal" passHref>
                   <Button variant="outline" className="w-full h-auto justify-start p-4 text-left flex gap-4 items-start">
                       <BookText className="w-6 h-6 text-accent mt-1"/>
                       <div>
                           <p className="font-semibold">Start Journaling</p>
                           <p className="text-sm text-muted-foreground font-normal">Reflect on your feelings with guided prompts.</p>
                       </div>
                   </Button>
                </Link>
                <Link href="/chat" passHref>
                   <Button variant="outline" className="w-full h-auto justify-start p-4 text-left flex gap-4 items-start">
                       <MessageCircle className="w-6 h-6 text-accent mt-1"/>
                       <div>
                           <p className="font-semibold">Talk it Out</p>
                           <p className="text-sm text-muted-foreground font-normal">Chat with our AI companion for support.</p>
                       </div>
                   </Button>
                </Link>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
