'use client';

import { ActionIcon, Group } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';

import { useTheme } from '../../model/useTheme';
import classes from './ThemeToggle.module.css';

interface ThemeToggleProps {
  size?: string;
}

export function ThemeToggle({ size = 'xl' }: ThemeToggleProps) {
  const { toggle } = useTheme();

  return (
    <Group justify="center">
      <ActionIcon onClick={toggle} variant="default" size={size} aria-label="Toggle color scheme">
        <IconSun className={`${classes.icon} ${classes.light}`} />
        <IconMoon className={`${classes.icon} ${classes.dark}`} />
      </ActionIcon>
    </Group>
  );
}
