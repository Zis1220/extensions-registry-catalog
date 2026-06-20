import { Box, Container, Group } from '@mantine/core';

import { ThemeToggle } from '@/features/theme-toggle';

import { Logo } from '@/shared/ui';
import { AnchorLink } from '@/shared/ui';

const links = [
  {
    link: 'https://github.com/Zis1220/extensions-registry-catalog',
    label: 'Catalog Repository',
  },
  {
    link: 'https://github.com/Zis1220/extensions-registry-api',
    label: 'API Repository',
  },
];

export function Footer() {
  const items = links.map((link) => (
    <AnchorLink
      c="dimmed"
      fw={500}
      lh={1}
      px="sm"
      py={8}
      size="sm"
      td="none"
      key={link.label}
      href={link.link}
    >
      {link.label}
    </AnchorLink>
  ));

  return (
    <Box component="footer" mt="auto" bd="1px solid var(--mantine-color-default-border)">
      <Container size="xl" py="xl">
        <Group justify="space-between" align="center">
          <Logo />
          <Group>
            <Group>{items}</Group>
            <ThemeToggle size="lg" />
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
