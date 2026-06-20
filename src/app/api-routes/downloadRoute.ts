import { NextResponse } from 'next/server';

import { z } from 'zod';

import { env } from '@/shared/env';

const downloadResponseSchema = z.object({
  downloadUrl: z.string().url(),
});

interface DownloadRouteContext {
  params: Promise<{ releaseId: string }>;
}

export async function handleDownload(req: Request, { params }: DownloadRouteContext) {
  const { releaseId } = await params;
  const requestUrl = new URL(req.url);
  const wantsJson =
    requestUrl.searchParams.get('format') === 'json' ||
    req.headers.get('accept')?.includes('application/json');
  const url = new URL(`releases/${encodeURIComponent(releaseId)}/download`, env.REGISTRY_API_URL);
  const res = await fetch(url, { cache: 'no-store' });

  if (!res.ok) {
    return NextResponse.json({ error: 'Not found' }, { status: res.status });
  }

  const data: unknown = await res.json();
  const parsed = downloadResponseSchema.safeParse(data);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid registry response' }, { status: 502 });
  }

  const { downloadUrl } = parsed.data;

  if (wantsJson) {
    return NextResponse.json({ downloadUrl });
  }

  return NextResponse.redirect(downloadUrl);
}
