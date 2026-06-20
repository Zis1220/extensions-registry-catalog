import { z } from 'zod';

export const idSchema = z.string().min(1);
export const slugSchema = z.string().min(1);
export const dateTimeSchema = z.string().min(1);
