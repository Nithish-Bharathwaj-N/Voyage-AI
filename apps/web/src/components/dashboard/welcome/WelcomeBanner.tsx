import React from 'react';
import { Heading } from '../../typography/Heading';
import { Text } from '../../typography/Text';

interface WelcomeBannerProps {
  userName: string;
}

export function WelcomeBanner({ userName }: WelcomeBannerProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date());

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
      <div>
        <Text variant="muted" size="sm" className="mb-1 font-medium">{formattedDate}</Text>
        <Heading level={2} className="tracking-tight text-3xl">
          {getGreeting()}, {userName}
        </Heading>
        <Text variant="muted" className="mt-2">
          Ready to plan your next adventure?
        </Text>
      </div>
    </div>
  );
}
