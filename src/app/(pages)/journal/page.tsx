'use client';

import { useState } from 'react';
import { generateSelfReflectionPrompt } from '@/ai/flows/self-reflection-prompts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { EMOTIONS } from '@/lib/constants';
import { useToast } from '@/hooks/use-toast';
import { Lightbulb, RotateCw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export default function JournalPage() {
  const [selectedEmotion, setSelectedEmotion] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGeneratePrompt = async (emotion: string) => {
    if (!emotion) {
        toast({
            title: "No Emotion Selected",
            description: "Please select an emotion to generate a prompt.",
            variant: "destructive",
        })
        return;
    };
    setIsLoading(true);
    setPrompt('');
    try {
      const { prompt } = await generateSelfReflectionPrompt({ emotionalState: emotion });
      setPrompt(prompt);
    } catch (error) {
      console.error('Failed to generate prompt:', error);
      toast({
            title: "Error",
            description: "Failed to generate a new prompt. Please try again.",
            variant: "destructive",
        })
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    toast({
        title: "Entry Saved!",
        description: "Your journal entry has been saved.",
    })
  }

  return (
    <div className="p-4 md:p-8 flex justify-center">
      <div className="w-full max-w-3xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Create a Journal Entry</CardTitle>
            <CardDescription>
              Select how you're feeling to get a personalized reflection prompt.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4">
            <Select onValueChange={setSelectedEmotion} value={selectedEmotion}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select your current emotion..." />
              </SelectTrigger>
              <SelectContent>
                {EMOTIONS.map((emotion) => (
                  <SelectItem key={emotion.slug} value={emotion.name}>
                    {emotion.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={() => handleGeneratePrompt(selectedEmotion)} disabled={isLoading} className="w-full sm:w-auto">
              <RotateCw className={cn('mr-2 h-4 w-4', { 'animate-spin': isLoading })} />
              Get New Prompt
            </Button>
          </CardContent>
        </Card>

        {(prompt || isLoading) && (
            <Card className="bg-primary/20 border-primary/40">
                <CardHeader className="flex-row items-start gap-4 space-y-0">
                    <div className='p-2 bg-primary/30 rounded-full'>
                        <Lightbulb className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                        <CardTitle className="text-lg">Your Reflection Prompt</CardTitle>
                        <CardDescription>Use this prompt to guide your writing.</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                        </div>
                    ) : (
                        <p className="text-foreground/90">{prompt}</p>
                    )}
                </CardContent>
            </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-xl">Your Thoughts</CardTitle>
            <CardDescription>
              Write down anything that comes to mind. This is a safe space.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Start writing..."
              className="min-h-[200px]"
            />
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave}>Save Entry</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
