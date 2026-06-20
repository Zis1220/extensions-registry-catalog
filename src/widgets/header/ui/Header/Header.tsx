'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Box, Burger, Container, Divider, Drawer, Group, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { ThemeToggle } from '@/features/theme-toggle';

import { Logo } from '@/shared/ui';

import classes from './Header.module.css';

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

export function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const pathname = usePathname();
  const isCatalogActive =
    pathname === '/' ||
    pathname?.startsWith('/category') ||
    pathname?.startsWith('/resources') ||
    pathname?.startsWith('/publishers');

  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={
        (link.link === '/' ? isCatalogActive : pathname?.startsWith(link.link)) || undefined
      }
      onClick={close}
    >
      {link.label}
    </Link>
  ));

  return (
    <Box component="header" h={64} bg="var(--mantine-color-body)">
      <Container size="xl" h="100%">
        <Group h="100%" justify="space-between">
          <Logo />

          <Group gap={16} visibleFrom="xs">
            {items}
            <ThemeToggle size="lg" />
          </Group>

          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="xs"
            size="sm"
            aria-label="Toggle navigation"
          />
        </Group>
      </Container>

      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="xs"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px)" mx="-md">
          <Divider my="sm" />
          {items}
          <Divider my="sm" />
          <Group px="md" mt="sm">
            <ThemeToggle size="lg" />
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
