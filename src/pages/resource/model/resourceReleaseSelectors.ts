import type { ResourceRelease } from './resourceRelease';

export function getActiveResourceReleases(
  releases: ReadonlyArray<ResourceRelease>,
): ReadonlyArray<ResourceRelease> {
  return releases.filter((release) => !release.yankedAt);
}

export function getLatestActiveResourceRelease(
  releases: ReadonlyArray<ResourceRelease>,
): ResourceRelease | undefined {
  return getActiveResourceReleases(releases)[0];
}
