import { z } from 'zod';
import { ApiError, ErrorCode, ResponseMeta } from '@voyageai/types';

export const ApiErrorSchema = z.object({
  code: z.nativeEnum(ErrorCode),
  message: z.string(),
  details: z.record(z.any()).optional(),
}) satisfies z.ZodType<ApiError>;

export const ResponseMetaSchema = z.object({
  timestamp: z.string(),
  requestId: z.string(),
}) satisfies z.ZodType<ResponseMeta>;
