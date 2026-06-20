import { SimpleGrid } from '@mantine/core';

import type { ResourceListItem } from '../../model/resource';
import { ResourceCard } from '../ResourceCard/ResourceCard';

interface Props {
  items: ReadonlyArray<ResourceListItem>;
}

export function ResourcesGrid({ items }: Props) {
  return (
    <SimpleGrid verticalSpacing="lg" cols={{ base: 1, sm: 2, md: 3, lg: 4 }}>
      {items.map((resource) => (
        <ResourceCard resource={resource} key={resource.id} />
      ))}
    </SimpleGrid>
  );
}
