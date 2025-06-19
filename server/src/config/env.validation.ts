import { z } from 'zod';

export const zodEnvSchema = z.object({
  PORT: z
    .string()
    .transform((val) => {
      const parsed = parseInt(val, 10);
      if (isNaN(parsed)) return 4000;
      return parsed;
    })
    .pipe(
      z
        .number()
        .int()
        .positive()
        .max(65535, { message: 'Port must be between 1 and 65535' }),
    )
    .default('4000')
    .describe('This is server port'),
  DATABASE_URL: z
    .string()
    .min(1, { message: 'Database url cannot be empty' })
    .describe('Your favorite db url'),
  AWS_PUBLIC_BUCKET_NAME: z.string().describe('AWS public bucket name'),
  AWS_REGION: z.string().describe('Aws region'),
  AWS_ACCESS_KEY: z.string().describe('AWS_ACCESS_KEY of the app'),
  AWS_SECRET_ACCESS_KEY: z
    .string()
    .describe('AWS_SECRET_ACCESS_KEY of the app'),
  AWS_CLOUDFRONT_DISTRIBUTION_DOMAIN_NAME: z
    .string()
    .describe('AWS_CLOUDFRONT_DISTRIBUTION_DOMAIN_NAME of the app'),
});

export type EnvConfig = z.infer<typeof zodEnvSchema>;

export function validateConfig(config: Record<string, unknown>) {
  try {
    return zodEnvSchema.parse(config);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Environment validation errors:');
      error.errors.forEach((err) => {
        console.error(`- ${err.path.join('.')}: ${err.message}`);
      });
    }
    throw new Error(
      'Environment validation failed. Check server logs for details.',
    );
  }
}
