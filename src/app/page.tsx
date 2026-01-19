import { Card, CardContent } from '@/components/ui/card';
import { EMOTIONS } from '@/lib/constants';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-4 md:p-8">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold font-headline text-foreground/90">
          Welcome to EmotiWell
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground">
          Your space for emotional clarity and support. How are you feeling today?
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mt-12 w-full max-w-4xl">
        {EMOTIONS.map((emotion) => {
          const Icon = emotion.icon;
          return (
            <Link href={`/guidance/${emotion.slug}`} key={emotion.name}>
              <Card className="aspect-square flex flex-col items-center justify-center p-4 transition-all duration-300 hover:bg-primary hover:shadow-lg hover:-translate-y-1 group">
                <CardContent className="p-0 flex flex-col items-center justify-center gap-4">
                  <Icon className="w-12 h-12 md:w-16 md:h-16 text-muted-foreground transition-colors group-hover:text-primary-foreground" />
                  <span className="text-base md:text-lg font-semibold text-center text-foreground/80 transition-colors group-hover:text-primary-foreground">
                    {emotion.name}
                  </span>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
