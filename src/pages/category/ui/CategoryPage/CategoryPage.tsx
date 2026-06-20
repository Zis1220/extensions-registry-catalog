import type { Metadata } from 'next';

import { Center, Container, Space, Stack } from '@mantine/core';

import { CategoriesGrid } from '@/widgets/categories-grid';
import { PageHero } from '@/widgets/page-hero';
import { PaginationControl } from '@/widgets/pagination-control';
import { ResourcesSection, enrichResources } from '@/widgets/resources-section';

import { categoryApi } from '@/entities/category';
import { resourceApi } from '@/entities/resource';

import { DEFAULT_PAGE_LIMIT } from '@/shared/config';
import { type SearchParamValue, handleApiError, normalizePage } from '@/shared/lib';
import { Breadcrumbs } from '@/shared/ui';

interface CategoryPageProps {
  params: Promise<{ categorySlug: string }>;
  searchParams: Promise<Record<string, SearchParamValue>>;
}

export async function generateMetadata({
  params,
  searchParams,
}: CategoryPageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const { page } = await searchParams;

  const category = await categoryApi.getBySlug(categorySlug).catch(handleApiError);
  const currentPage = normalizePage(page);

  const title =
    currentPage > 1 ? `${category.name} extensions — page ${currentPage}` : `${category.name} extensions`;

  const description = category.description || `Browse ${category.name} extensions in Extensions Registry.`;

  const canonicalUrl =
    currentPage > 1
      ? `/category/${category.slug}?page=${currentPage}`
      : `/category/${category.slug}`;

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
      type: 'website',
    },
  };
}

const LIMIT = DEFAULT_PAGE_LIMIT;

export async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { categorySlug } = await params;
  const { page } = await searchParams;
  const currentPage = normalizePage(page);
  const category = await categoryApi.getBySlug(categorySlug).catch(handleApiError);
  const { items, meta } = await resourceApi.getByCategory(
    category.id,
    LIMIT,
    (currentPage - 1) * LIMIT,
  );
  const { items: sub } = await categoryApi.getChildren(category.id);
  const enrichedItems = await enrichResources(items);

  return (
    <>
      <PageHero title={category.name} text={category.description}>
        <Breadcrumbs items={[{ title: 'Catalog', href: '/' }, { title: category.name }]} />
      </PageHero>

      <Container size="xl" py={40}>
        <Stack gap="xl">
          {sub.length > 0 && (
            <CategoriesGrid
              title="Subcategories"
              items={sub}
              cols={{ base: 2, sm: 3, md: 4, lg: 5 }}
            />
          )}
          <Space h="xl" />
          <Stack id="extensions" gap="xl">
            <Stack gap="xl">
              <ResourcesSection
                emptyMessage="No extensions in this category yet."
                title="Extensions"
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
