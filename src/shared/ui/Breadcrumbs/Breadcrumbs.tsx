import { Breadcrumbs as BC, Container, Text } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';

import { AnchorLink } from '../AnchorLink/AnchorLink';

export interface BreadcrumbItem {
  title: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: ReadonlyArray<BreadcrumbItem>;
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <Container py="xs" size="xl">
      <BC separator={<IconChevronRight size={12} />}>
        {items.map((item, i) =>
          item.href ? (
            <AnchorLink td="none" href={item.href} key={i} size="sm">
              {item.title}
            </AnchorLink>
          ) : (
            <Text key={i} size="sm" c="dimmed">
              {item.title}
            </Text>
          ),
        )}
      </BC>
    </Container>
  );
}
