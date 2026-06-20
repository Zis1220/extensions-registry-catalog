import Link from 'next/link';

import { Group, Text } from '@mantine/core';

import classes from './Logo.module.css';

type LogoSize = 'sm' | 'md' | 'lg';

interface LogoProps {
  size?: LogoSize;
  withText?: boolean;
  text?: string;
  iconColor?: string;
  textColor?: string;
}

const sizes: Record<LogoSize, { icon: number; fontSize: number }> = {
  sm: { icon: 20, fontSize: 12 },
  md: { icon: 32, fontSize: 16 },
  lg: { icon: 40, fontSize: 22 },
};

export function Logo({
  size = 'md',
  withText = true,
  text = 'Extensions Registry',
  iconColor = 'var(--mantine-primary-color-filled)',
  textColor = 'var(--logo-text-color)',
}: LogoProps) {
  const { icon, fontSize } = sizes[size];

  return (
    <Link href={'/'} className={classes.logo}>
      <Group gap={8} wrap="nowrap">
        <svg
          viewBox="0 0 256 256"
          xmlns="http://www.w3.org/2000/svg"
          width={icon}
          height={icon}
          style={{ flexShrink: 0, color: 'var(--mantine-color-text)' }}
        >
          <g transform="translate(128,128) scale(0.95) translate(-128,-128)">
            <path
              d="M165.78,224H208a16,16,0,0,0,16-16V170.35A8,8,0,0,0,212.94,163a23.37,23.37,0,0,1-8.94,1.77c-13.23,0-24-11.1-24-24.73s10.77-24.73,24-24.73a23.37,23.37,0,0,1,8.94,1.77A8,8,0,0,0,224,109.65V72a16,16,0,0,0-16-16H171.78a35.36,35.36,0,0,0,.22-4,36,36,0,0,0-72,0,35.36,35.36,0,0,0,.22,4H64A16,16,0,0,0,48,72v32.22a35.36,35.36,0,0,0-4-.22,36,36,0,0,0,0,72,35.36,35.36,0,0,0,4-.22V208a16,16,0,0,0,16,16h42.22"
              fill="none"
              stroke={iconColor}
              strokeWidth="16"
              strokeLinejoin="round"
            />
          </g>
        </svg>

        {withText && (
          <Text
            c={textColor}
            fw={400}
            tt="uppercase"
            size={`${fontSize}px`}
            style={{ letterSpacing: '-0.3px', lineHeight: 1 }}
          >
            {text}
          </Text>
        )}
      </Group>
    </Link>
  );
}
