import { BatteryLow, BrainCircuit, Frown, LucideIcon, ShieldAlert, UserX } from 'lucide-react';

export interface Emotion {
  name: string;
  slug: string;
  icon: LucideIcon;
  description: string;
}

export const EMOTIONS: Emotion[] = [
  {
    name: 'Stress',
    slug: 'stress',
    icon: BrainCircuit,
    description: 'Feeling overwhelmed or unable to cope with mental or emotional pressure.',
  },
  {
    name: 'Anxiety',
    slug: 'anxiety',
    icon: ShieldAlert,
    description: 'A feeling of worry, nervousness, or unease, typically about an imminent event.',
  },
  {
    name: 'Sadness',
    slug: 'sadness',
    icon: Frown,
    description: 'The condition or quality of being sad.',
  },
  {
    name: 'Loneliness',
    slug: 'loneliness',
    icon: UserX,
    description: 'Sadness because one has no friends or company.',
  },
  {
    name: 'Low Motivation',
    slug: 'low-motivation',
    icon: BatteryLow,
    description: 'Lacking the desire or willingness to do something.',
  },
];


export interface ResourceCategory {
  title: string;
  description: string;
  resources: Resource[];
}

export interface Resource {
  title: string;
  description: string;
  link: string;
  imagePlaceholderId: string;
}

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  {
    title: 'Professional Help',
    description: 'Connect with certified therapists and mental health professionals.',
    resources: [
      {
        title: 'National Alliance on Mental Illness (NAMI)',
        description: 'Advocacy, education, support, and public awareness for mental illness.',
        link: 'https://www.nami.org',
        imagePlaceholderId: '1',
      },
      {
        title: 'BetterHelp',
        description: 'Online counseling with licensed therapists.',
        link: 'https://www.betterhelp.com',
        imagePlaceholderId: '2',
      },
       {
        title: 'Psychology Today',
        description: 'Find therapists, psychologists, and counselors in your area.',
        link: 'https://www.psychologytoday.com/us/therapists',
        imagePlaceholderId: '3',
      },
    ],
  },
  {
    title: 'Support Groups',
    description: 'Find a community of people with shared experiences.',
    resources: [
      {
        title: 'Support Groups Central',
        description: 'Virtual support groups on various mental health topics.',
        link: 'https://www.supportgroupscentral.com',
        imagePlaceholderId: '4',
      },
      {
        title: 'The Depression and Bipolar Support Alliance (DBSA)',
        description: 'Providing hope, help, support, and education.',
        link: 'https://www.dbsalliance.org',
        imagePlaceholderId: '5',
      },
    ],
  },
  {
    title: 'Articles & Education',
    description: 'Learn more about mental health and well-being.',
    resources: [
      {
        title: 'Mindful.org',
        description: 'Resources and articles on mindfulness and meditation.',
        link: 'https://www.mindful.org',
        imagePlaceholderId: '6',
      },
      {
        title: 'Verywell Mind',
        description: 'A friendly approach to mental health and psychology.',
        link: 'https://www.verywellmind.com',
        imagePlaceholderId: '7',
      },
    ],
  },
];
