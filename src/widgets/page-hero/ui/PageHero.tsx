import type { ReactElement } from 'react';

import { Container, Stack, Text, Title } from '@mantine/core';

interface PageHeroProps {
  title: string;
  text?: string | null;
  children?: ReactElement;
}

export function PageHero({ title, text, children }: PageHeroProps) {
  return (
    <Container bg="var(--mantine-color-gray-light)" size="100%">
      {children}
      <Container py="xl" size="xl">
        <Stack>
          <Title order={1}>{title}</Title>
          {text && <Text>{text}</Text>}
        </Stack>
      </Container>
    </Container>
  );
}
