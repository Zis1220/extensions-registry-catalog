import type { Metadata } from 'next';

import { Container, Divider, Grid, GridCol, Space, Stack } from '@mantine/core';

import { PageHero } from '@/widgets/page-hero';

import { categoryApi } from '@/entities/category';
import { publisherApi } from '@/entities/publisher';
import { resourceApi } from '@/entities/resource';

import { handleApiError } from '@/shared/lib';
import { Breadcrumbs, StatusAlert } from '@/shared/ui';

import { resourceReleaseApi } from '../../api/resourceRelease.api';
import { getLatestActiveResourceRelease } from '../../model/resourceReleaseSelectors';
import { ResourceDescription } from '../ResourceContent/ResourceDescription';
import { ResourceMediaPlaceholder } from '../ResourceContent/ResourceMediaPlaceholder';
import { ResourceReleasesList } from '../ResourceReleasesList/ResourceReleasesList';
import { ResourceSidebar } from '../ResourceSidebar/ResourceSidebar';

interface ResourcePageProps {
  params: Promise<{ resourceSlug: string }>;
}

export async function generateMetadata({ params }: ResourcePageProps): Promise<Metadata> {
  const { resourceSlug } = await params;
  const resource = await resourceApi.getBySlug(resourceSlug).catch(handleApiError);

  const title = `${resource.name} extension`;
  const description =
    resource.metaDescription ||
    resource.description ||
    `Download ${resource.name} from Extensions Registry.`;

  return {
    title,
    description,
    keywords: resource.keywords,

    alternates: {
      canonical: `/resources/${resource.slug}`,
    },

    openGraph: {
      title,
      description,
      url: `/resources/${resource.slug}`,
      type: 'article',
    },
  };
}

export async function ResourcePage({ params }: ResourcePageProps) {
  const { resourceSlug } = await params;
  const resource = await resourceApi.getBySlug(resourceSlug).catch(handleApiError);

  const [publisher, category, { items: releases }] = await Promise.all([
    publisherApi.getById(resource.publisherId),
    categoryApi.getById(resource.categoryId),
    resourceReleaseApi.getByResource(resource.id),
  ]);

  const latestRelease = getLatestActiveResourceRelease(releases);

  return (
    <>
      <PageHero title={resource.name} text={resource.metaDescription}>
        <Breadcrumbs
          items={[
            { title: 'Catalog', href: '/' },
            { title: category.name, href: `/category/${category.slug}` },
            { title: resource.name },
          ]}
        />
      </PageHero>

      <Space h="lg" />
      <Container size="xl" pb={40}>
        <Stack gap="xs" mb="xl">

          {resource.archivedAt && (
            <StatusAlert status="warning" title="Archived resource">
              This extension is archived.
            </StatusAlert>
          )}
        </Stack>
        <Grid gap="xl">
          <GridCol span={{ base: 12, md: 8 }}>
            <Stack gap="xl">
              <ResourceMediaPlaceholder />
              <ResourceDescription description={resource.description} />

              <Divider />
              <ResourceReleasesList releases={releases} />
            </Stack>
          </GridCol>

          <GridCol span={{ base: 12, md: 4 }}>
            <ResourceSidebar
              category={category}
              latestRelease={latestRelease}
              publisher={publisher}
              releases={releases}
              resource={resource}
            />
          </GridCol>
        </Grid>
      </Container>
    </>
  );
}
