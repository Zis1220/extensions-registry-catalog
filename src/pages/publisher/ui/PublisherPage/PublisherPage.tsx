import type { Metadata } from 'next';

import { Center, Container, Stack } from '@mantine/core';

import { PageHero } from '@/widgets/page-hero';
import { PaginationControl } from '@/widgets/pagination-control';
import { ResourcesSection, enrichResources } from '@/widgets/resources-section';

import { publisherApi } from '@/entities/publisher';
import { resourceApi } from '@/entities/resource';

import { DEFAULT_PAGE_LIMIT } from '@/shared/config';
import { type SearchParamValue, handleApiError, normalizePage } from '@/shared/lib';
import { Breadcrumbs } from '@/shared/ui';

interface PublisherPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, SearchParamValue>>;
}

export async function generateMetadata({
  params,
  searchParams,
}: PublisherPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { page } = await searchParams;

  const publisher = await publisherApi.getBySlug(slug).catch(handleApiError);
  const currentPage = normalizePage(page);

  const title =
    currentPage > 1
      ? `${publisher.displayName} extensions — page ${currentPage}`
      : `${publisher.displayName} extensions`;

  const description = `Browse extensions published by ${publisher.displayName} in Extensions Registry.`;

  const canonicalUrl =
    currentPage > 1
      ? `/publishers/${publisher.slug}?page=${currentPage}`
      : `/publishers/${publisher.slug}`;

  return {
    title,
    description,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'profile',
    },
  };
}

const LIMIT = DEFAULT_PAGE_LIMIT;

export async function PublisherPage({ params, searchParams }: PublisherPageProps) {
  const { slug } = await params;
  const { page } = await searchParams;
  const currentPage = normalizePage(page);
  const publisher = await publisherApi.getBySlug(slug).catch(handleApiError);
  const { items, meta } = await resourceApi.getByPublisher(
    publisher.id,
    LIMIT,
    (currentPage - 1) * LIMIT,
  );
  const enrichedItems = await enrichResources(items);

  return (
    <>
      <PageHero title={publisher.displayName}>
        <Breadcrumbs items={[{ title: 'Catalog', href: '/' }, { title: publisher.displayName }]} />
      </PageHero>

      <Container id="extensions" size="xl" py={40}>
        <Stack gap="xl">
          <Stack gap="md">
            <Stack gap="xl">
              <ResourcesSection
                emptyMessage="No extensions yet."
                title="Extensions"
                titleOrder={2}
                items={enrichedItems}
              />
              {items.length > 0 && (
                <Center>
                  <PaginationControl
                    total={meta.total}
                    limit={LIMIT}
                    current={currentPage}
                    scrollTargetId="extensions"
                  />
                </Center>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
