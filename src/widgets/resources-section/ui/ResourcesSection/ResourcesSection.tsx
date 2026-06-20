import type { ComponentProps } from 'react';

import { Stack, Title } from '@mantine/core';

import { type ResourceListItem, ResourcesGrid } from '@/entities/resource';

import { StatusAlert } from '@/shared/ui';

interface ResourcesSectionProps {
  emptyMessage?: string;
  items: ReadonlyArray<ResourceListItem>;
  title: string;
  titleOrder?: ComponentProps<typeof Title>['order'];
}

export function ResourcesSection({
  emptyMessage,
  items,
  title,
  titleOrder = 2,
}: ResourcesSectionProps) {
  return (
    <Stack gap="xl">
      <Title order={titleOrder}>{title}</Title>
      {items.length > 0 ? (
        <ResourcesGrid items={items} />
      ) : emptyMessage ? (
        <StatusAlert status="neutral" compact>
          {emptyMessage}
        </StatusAlert>
      ) : null}
    </Stack>
  );
}
