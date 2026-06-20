import { Badge, Group, Stack, Text, Title } from '@mantine/core';

import { formatDate } from '@/shared/lib';
import { StatusAlert } from '@/shared/ui';

import type { ResourceRelease } from '../../model/resourceRelease';

interface ResourceReleasesListProps {
  releases: ReadonlyArray<ResourceRelease>;
}

export function ResourceReleasesList({ releases }: ResourceReleasesListProps) {
  return (
    <Stack gap="md">
      <Title order={2}>Releases</Title>
      {releases.length > 0 ? (
        <Stack gap="xs">
          {releases.map((release) => (
            <Group
              key={release.id}
              justify="space-between"
              p="sm"
              style={{
                border: '1px solid var(--mantine-color-default-border)',
                borderRadius: 'var(--mantine-radius-md)',
              }}
            >
              <Group gap="md">
                <Text fw={500} size="sm">
                  {release.version}
                </Text>
                <Text c="dimmed" size="xs">
                  {formatDate(release.createdAt)}
                </Text>
                <Text c="dimmed" size="xs" lineClamp={1} maw={300}>
                  {release.changelog}
                </Text>
              </Group>
              <Group gap="xs">
                {release.yankedAt ? (
                  <Badge color="red" variant="light" size="sm">
                    Yanked
                  </Badge>
                ) : (
                  <Badge color="green" variant="light" size="sm">
                    Active
                  </Badge>
                )}
              </Group>
            </Group>
          ))}
        </Stack>
      ) : (
        <StatusAlert status="neutral" compact>
          No releases yet.
        </StatusAlert>
      )}
    </Stack>
  );
}
