'use client';

import { useState } from 'react';

import { Button, Group, Select, Stack, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconDownload, IconX } from '@tabler/icons-react';

import { StatusAlert } from '@/shared/ui';

import type { ResourceRelease } from '../../model/resourceRelease';
import { getActiveResourceReleases } from '../../model/resourceReleaseSelectors';

interface ResourceDownloadPanelProps {
  releases: ReadonlyArray<ResourceRelease>;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getDownloadUrl(value: unknown) {
  if (isRecord(value) && typeof value.downloadUrl === 'string') {
    return value.downloadUrl;
  }

  return undefined;
}

function getResponseError(value: unknown) {
  if (isRecord(value) && typeof value.error === 'string') {
    return value.error;
  }

  return undefined;
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Unable to prepare download.';
}

export function ResourceDownloadPanel({ releases }: ResourceDownloadPanelProps) {
  const active = getActiveResourceReleases(releases);
  const [selectedId, setSelectedId] = useState<string | null>(active[0]?.id ?? null);
  const [isDownloading, setIsDownloading] = useState(false);

  const options = active.map((r) => ({ value: r.id, label: r.version }));

  const handleDownload = async () => {
    if (!selectedId || isDownloading) {
      return;
    }

    const notificationId = `download-${selectedId}-${Date.now()}`;
    setIsDownloading(true);

    notifications.show({
      id: notificationId,
      loading: true,
      title: 'Preparing download',
      message: 'Fetching the selected release download link.',
      autoClose: false,
      withCloseButton: false,
    });

    try {
      const res = await fetch(`/api/download/${encodeURIComponent(selectedId)}?format=json`, {
        headers: { Accept: 'application/json' },
      });
      const data: unknown = await res.json().catch(() => undefined);

      if (!res.ok) {
        throw new Error(getResponseError(data) ?? 'Unable to prepare download.');
      }

      const downloadUrl = getDownloadUrl(data);

      if (!downloadUrl) {
        throw new Error('Registry returned an invalid download link.');
      }

      notifications.update({
        id: notificationId,
        color: 'teal',
        icon: <IconCheck size={18} />,
        loading: false,
        title: 'Download ready',
        message: 'Your download is starting.',
        autoClose: 2500,
        withCloseButton: true,
      });

      window.location.assign(downloadUrl);
    } catch (error) {
      notifications.update({
        id: notificationId,
        color: 'red',
        icon: <IconX size={18} />,
        loading: false,
        title: 'Download failed',
        message: getErrorMessage(error),
        autoClose: 6000,
        withCloseButton: true,
      });
    } finally {
      setIsDownloading(false);
    }
  };

  if (active.length === 0) {
    return (
      <StatusAlert status="warning" compact>
        No active releases available for download.
      </StatusAlert>
    );
  }

  return (
    <Stack gap={4}>
      <Text size="sm" fw={500}>
        Version
      </Text>

      <Group gap="xs" align="center">
        <Select
          data={options}
          value={selectedId}
          onChange={setSelectedId}
          allowDeselect={false}
          searchable={active.length > 5}
          nothingFoundMessage="Version not found"
          style={{ flex: 1 }}
        />

        <Button
          leftSection={<IconDownload size={16} />}
          onClick={handleDownload}
          disabled={!selectedId || isDownloading}
          loading={isDownloading}
        >
          Download
        </Button>
      </Group>
    </Stack>
  );
}
