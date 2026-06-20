'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { Pagination } from '@mantine/core';

interface Props {
  total: number;
  limit?: number;
  current: number;
  scrollTargetId?: string;
}

export function PaginationControl({ total, limit = 20, current, scrollTargetId }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(total / limit);

  function handleChange(page: number) {
    const params = new URLSearchParams(searchParams?.toString() ?? '');
    params.set('page', String(page));
    router.push(`?${params.toString()}`, { scroll: false });
    if (scrollTargetId) {
      document.getElementById(scrollTargetId)?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  if (totalPages <= 1) return null;

  return <Pagination total={totalPages} siblings={1} value={current} onChange={handleChange} />;
}
