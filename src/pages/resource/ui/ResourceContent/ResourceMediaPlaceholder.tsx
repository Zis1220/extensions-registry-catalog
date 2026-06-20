import { AspectRatio, Card, Center } from '@mantine/core';
import { IconBox } from '@tabler/icons-react';

export function ResourceMediaPlaceholder() {
  return (
    <Card withBorder p={0}>
      <AspectRatio ratio={16 / 9}>
        <Center bg="var(--mantine-color-body)">
          <IconBox height={120} width={120} stroke={1} opacity={0.4} />
        </Center>
      </AspectRatio>
    </Card>
  );
}
