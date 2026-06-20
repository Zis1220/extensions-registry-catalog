import type { ComponentProps } from 'react';

import { SimpleGrid, Stack, Title } from '@mantine/core';
import { type Icon, IconCategory } from '@tabler/icons-react';

import { type Category, CategoryCard, categoryApi } from '@/entities/category';

type SimpleGridCols = NonNullable<ComponentProps<typeof SimpleGrid>['cols']>;

interface CategoriesGridProps {
  items?: ReadonlyArray<Category>;
  title?: string;
  cols?: SimpleGridCols;
  Icon?: Icon;
  iconColor?: string;
}

const DEFAULT_COLS: SimpleGridCols = {
  base: 1,
  sm: 2,
  md: 3,
  lg: 5,
};

export async function CategoriesGrid({
  items: itemsProp,
  title = 'Browse by Category',
  cols,
  Icon = IconCategory,
  iconColor,
}: CategoriesGridProps) {
  const items = itemsProp ?? (await categoryApi.getAllRoots()).items;
  const gridCols = cols ?? DEFAULT_COLS;

  return (
    <Stack gap="xl">
      <Title order={2}>{title}</Title>
      <SimpleGrid verticalSpacing="lg" cols={gridCols}>
        {items.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            Icon={Icon}
            {...(iconColor ? { iconColor } : {})}
          />
        ))}
      </SimpleGrid>
    </Stack>
  );
}
