import { Center, Container, Stack } from '@mantine/core';

import { CategoriesGrid } from '@/widgets/categories-grid';
import { PaginationControl } from '@/widgets/pagination-control';
import { ResourcesSection, enrichResources } from '@/widgets/resources-section';

import { resourceApi } from '@/entities/resource';

import { DEFAULT_PAGE_LIMIT } from '@/shared/config';
import { type SearchParamValue, normalizePage } from '@/shared/lib';

import { Hero } from '../Hero/Hero';

export const metadata = {
  title: {
    absolute: 'Extensions Registry',
  },
  description: 'Find, publish and manage extensions for your app',
};

interface Props {
  searchParams: Promise<Record<string, SearchParamValue>>;
}

const LIMIT = DEFAULT_PAGE_LIMIT;

export async function HomePage({ searchParams }: Props) {
  const { page } = await searchParams;
  const currentPage = normalizePage(page);
  const { items, meta } = await resourceApi.getAll(LIMIT, (currentPage - 1) * LIMIT);
  const enrichedItems = await enrichResources(items);

  return (
    <>
      <Hero />
      <Container size="xl" py="60">
        <Stack gap="60">
          <CategoriesGrid />
          <Stack id="latest-resources" gap="xl">
            <ResourcesSection
              emptyMessage="No extensions have been published yet."
              title="Latest Extensions"
              items={enrichedItems}
            />
            <Center>
              <PaginationControl
                total={meta.total}
                limit={LIMIT}
                current={currentPage}
                scrollTargetId="latest-resources"
              />
            </Center>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
