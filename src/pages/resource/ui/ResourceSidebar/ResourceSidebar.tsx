import { Badge, Card, Divider, Grid, GridCol, Group, Stack, Text } from '@mantine/core';

import type { Category } from '@/entities/category';
import type { Publisher } from '@/entities/publisher';
import type { Resource } from '@/entities/resource';

import { formatDate } from '@/shared/lib';
import { AnchorLink } from '@/shared/ui';

import type { ResourceRelease } from '../../model/resourceRelease';
import { ResourceDownloadPanel } from '../ResourceDownloadPanel/ResourceDownloadPanel';

interface ResourceSidebarProps {
  category: Category;
  latestRelease: ResourceRelease | undefined;
  publisher: Publisher;
  releases: ReadonlyArray<ResourceRelease>;
  resource: Resource;
}

export function ResourceSidebar({
  category,
  latestRelease,
  publisher,
  releases,
  resource,
}: ResourceSidebarProps) {
  return (
    <Stack gap="md">
      <Card withBorder p="md">
        <Stack gap="md">
          <ResourceDownloadPanel releases={releases} />

          <Divider />

          <Stack gap="xs">
            <Grid columns={2} gap="xs">
              <GridCol span={1}>
                <Text size="xs" c="dimmed" tt="uppercase" fw={600}>
                  Category
                </Text>
                <AnchorLink size="sm" href={`/category/${category.slug}`}>
                  {category.name}
                </AnchorLink>
              </GridCol>
              <GridCol span={1}>
                <Text size="xs" c="dimmed" tt="uppercase" fw={600}>
                  Publisher
                </Text>
                <AnchorLink size="sm" href={`/publishers/${publisher.slug}`}>
                  {publisher.displayName}
                </AnchorLink>
              </GridCol>
              <GridCol span={1}>
                <Text size="xs" c="dimmed" tt="uppercase" fw={600}>
                  Latest version
                </Text>
                <Text size="sm">{latestRelease?.version ?? '—'}</Text>
              </GridCol>
              <GridCol span={1}>
                <Text size="xs" c="dimmed" tt="uppercase" fw={600}>
                  Updated
                </Text>
                <Text size="sm">{formatDate(resource.updatedAt)}</Text>
              </GridCol>
            </Grid>

            {resource.keywords.length > 0 && (
              <>
                <Divider />
                <Text size="xs" c="dimmed" tt="uppercase" fw={600}>
                  Keywords
                </Text>
                <Group gap={4}>
                  {resource.keywords.map((keyword) => (
                    <Badge key={keyword} size="md" fw={400} variant="outline">
                      {keyword}
                    </Badge>
                  ))}
                </Group>
              </>
            )}
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
}
