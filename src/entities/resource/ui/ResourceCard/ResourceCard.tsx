import Link from 'next/link';

import { Badge, Card, CardSection, Center, Paper, Stack, Text } from '@mantine/core';
import { IconBox } from '@tabler/icons-react';

import { AnchorLink } from '@/shared/ui';

import type { ResourceListItem } from '../../model/resource';
import classes from './ResourceCard.module.css';

interface ResourceCardProps {
  resource: ResourceListItem;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const innerLinkClassName = classes.innerLink ?? '';

  return (
    <Card className={classes.card ?? ''} withBorder padding="md">
      <CardSection data-orientation="vertical">
        <Paper pos="relative">
          <Center h={160}>
            <IconBox height={128} width={128} stroke={1} opacity={0.7} />
          </Center>

          {resource.archivedAt && (
            <Badge size="md" color="gray" variant="light" pos="absolute" top={8} right={8}>
              Archived
            </Badge>
          )}
        </Paper>
      </CardSection>

      <Link
        href={`/resources/${resource.slug}`}
        className={classes.mainLink ?? ''}
        aria-label={resource.name}
      />

      <Stack gap="xs" mt="md">
        <Text size="md" fw={600} lh={1.3} truncate>
          {resource.name}
        </Text>

        {(resource.publisher || resource.category) && (
          <Text size="sm" c="dimmed" truncate>
            {resource.publisher && (
              <>
                By{' '}
                <AnchorLink
                  className={innerLinkClassName}
                  href={`/publishers/${resource.publisher.slug}`}
                >
                  {resource.publisher.displayName}
                </AnchorLink>{' '}
              </>
            )}
            {resource.category && (
              <>
                {resource.publisher ? 'in' : 'In'}{' '}
                <AnchorLink
                  className={innerLinkClassName}
                  href={`/category/${resource.category.slug}`}
                >
                  {resource.category.name}
                </AnchorLink>
              </>
            )}
          </Text>
        )}
      </Stack>
    </Card>
  );
}
