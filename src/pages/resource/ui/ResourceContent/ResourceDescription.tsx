import { Stack, Text, Title } from '@mantine/core';

interface ResourceDescriptionProps {
  description: string | null;
}

export function ResourceDescription({ description }: ResourceDescriptionProps) {
  if (!description) {
    return null;
  }

  return (
    <Stack gap="xs">
      <Title order={2}>Description</Title>
      <Text>{description}</Text>
    </Stack>
  );
}
