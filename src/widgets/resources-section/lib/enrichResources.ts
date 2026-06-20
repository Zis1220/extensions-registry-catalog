import { categoryApi } from '@/entities/category';
import { publisherApi } from '@/entities/publisher';
import type { ResourceListItem } from '@/entities/resource';

/**
 * TODO: Replace with API-side includes or batch endpoints.
 *
 * For now, missing publisher/category data is loaded separately.
 * On small lists this is acceptable because requests are deduplicated by cache.
 */
export async function enrichResources(
  items: ReadonlyArray<ResourceListItem>,
): Promise<ReadonlyArray<ResourceListItem>> {
  if (items.length === 0) {
    return items;
  }

  const missingPublisherIds = new Set<string>();
  const missingCategoryIds = new Set<string>();

  for (const resource of items) {
    if (!resource.publisher && resource.publisherId) {
      missingPublisherIds.add(resource.publisherId);
    }

    if (!resource.category && resource.categoryId) {
      missingCategoryIds.add(resource.categoryId);
    }
  }

  const [publishers, categories] = await Promise.all([
    Promise.all([...missingPublisherIds].map((publisherId) => publisherApi.getById(publisherId))),
    Promise.all([...missingCategoryIds].map((categoryId) => categoryApi.getById(categoryId))),
  ]);

  const publisherById = new Map(publishers.map((publisher) => [publisher.id, publisher]));
  const categoryById = new Map(categories.map((category) => [category.id, category]));

  return items.map((resource) => {
    const publisher = resource.publisher
      ? resource.publisher
      : resource.publisherId
        ? publisherById.get(resource.publisherId)
        : undefined;
    const category = resource.category
      ? resource.category
      : resource.categoryId
        ? categoryById.get(resource.categoryId)
        : undefined;

    return {
      ...resource,
      ...(publisher ? { publisher: { displayName: publisher.displayName, slug: publisher.slug } } : {}),
      ...(category ? { category: { name: category.name, slug: category.slug } } : {}),
    };
  });
}
