'use client';
import type { ReactNode } from 'react';

import Link from 'next/link';

import { Button, ButtonProps } from '@mantine/core';

interface ButtonLinkProps extends ButtonProps {
  href: string;
  children: ReactNode;
}

export function ButtonLink({ href, children, ...props }: ButtonLinkProps) {
  return (
    <Button component={Link} href={href} {...props}>
      {children}
    </Button>
  );
}
