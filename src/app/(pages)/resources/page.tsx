import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RESOURCE_CATEGORIES, Resource } from '@/lib/constants';
import { placeholderImages } from '@/lib/placeholder-images';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

function ResourceCard({ resource }: { resource: Resource }) {
  const image = placeholderImages.find(
    (img) => img.id === resource.imagePlaceholderId
  );
  return (
    <a
      href={resource.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full"
    >
      <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        {image && (
          <div className="relative aspect-video overflow-hidden rounded-t-lg">
            <Image
              src={image.imageUrl}
              alt={image.description}
              fill
              className="object-cover"
              data-ai-hint={image.imageHint}
            />
          </div>
        )}
        <CardHeader className="flex-grow">
          <CardTitle className="text-lg">{resource.title}</CardTitle>
          <CardDescription>{resource.description}</CardDescription>
        </CardHeader>
        <CardFooter>
          <p className="text-sm text-accent-foreground flex items-center">
            Visit site <ArrowUpRight className="h-4 w-4 ml-1" />
          </p>
        </CardFooter>
      </Card>
    </a>
  );
}

export default function ResourcesPage() {
  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">
          Resource Directory
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Find professional help, support groups, and educational materials to
          support your mental well-being.
        </p>
      </div>

      <div className="space-y-12">
        {RESOURCE_CATEGORIES.map((category) => (
          <section key={category.title}>
            <h2 className="text-2xl font-semibold font-headline mb-2">
              {category.title}
            </h2>
            <p className="text-muted-foreground mb-6">{category.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.resources.map((resource) => (
                <ResourceCard key={resource.title} resource={resource} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
