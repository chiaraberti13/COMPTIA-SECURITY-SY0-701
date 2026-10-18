import { RemediationPayloadSchema } from "./apiSchemas";
import type { Question } from "./types";

/**
 * Treats model output as untrusted input. The provider schema improves the
 * response shape but is not a runtime trust boundary, so every field used by
 * the client is checked (src/apiSchemas.ts) before it leaves the server.
 */
export function validateRemediationPayload(payload: unknown): Question[] | null {
  const result = RemediationPayloadSchema.safeParse(payload);
  return result.success ? result.data : null;
}
