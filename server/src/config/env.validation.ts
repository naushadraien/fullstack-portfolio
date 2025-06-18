import { z } from 'zod';

export const zodEnvSchema = z.object({});

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
