'use client';
import type { ReactNode } from 'react';

import Link from 'next/link';

import { Anchor, type AnchorProps } from '@mantine/core';

interface AnchorLinkProps extends AnchorProps {
  href: string;
  children: ReactNode;
}

export function AnchorLink({ href, children, ...props }: AnchorLinkProps) {
  return (
    <Anchor component={Link} href={href} {...props}>
      {children}
    </Anchor>
  );
}
