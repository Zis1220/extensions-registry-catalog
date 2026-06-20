import Link from 'next/link';

import { Box, Card, Center, Group, Text } from '@mantine/core';
import type { Icon } from '@tabler/icons-react';

import type { Category } from '../../model/category';
import classes from './CategoryCard.module.css';

interface CategoryCardProps {
  category: Category;
  Icon?: Icon;
  iconColor?: string;
}

export function CategoryCard({ category, Icon, iconColor }: CategoryCardProps) {
  return (
    <Card withBorder className={classes.card ?? ''}>
      <Link
        href={`/category/${category.slug}`}
        className={classes.mainLink ?? ''}
        aria-label={`Open ${category.name} category`}
      />
      <Group wrap={'nowrap'} justify={'space-between'}>
        <Text truncate fw={600}>
          {category.name}
        </Text>

        <Box bdrs={'xl'} bg={'dimmed'} p={'md'}>
          <Center>{Icon && <Icon size={16} {...(iconColor ? { color: iconColor } : {})} />}</Center>
        </Box>
      </Group>
    </Card>
  );
}
