/**
 * The one interface the AI routes talk to. A route asks for text or for JSON
 * that follows a schema; which model or vendor answers is decided here, so
 * changing provider means writing one adapter and passing it to createApp()
 * as `createProvider`, without touching the routes, their prompts or their
 * error handling.
 */
import type { GenerateContentParameters } from "@google/genai";

/** A JSON Schema subset, vendor-neutral: lowercase types, no vendor enums. */
export interface JsonSchema {
  type: "object" | "array" | "string" | "integer" | "number" | "boolean";
  description?: string;
  properties?: Record<string, JsonSchema>;
  required?: string[];
  items?: JsonSchema;
}

export interface GenerationRequest {
  /** Rules for the model; never user text. */
  system: string;
  /** The task, with user text already framed as data. */
  prompt: string;
  maxOutputTokens: number;
  temperature?: number;
  /** The call is abandoned after this long; the error name is TimeoutError. */
  timeoutMs: number;
}

export interface AiProvider {
  /** Free text; undefined or empty when the model returned nothing. */
  generateText(request: GenerationRequest): Promise<string | undefined>;
  /** Raw JSON text constrained by `schema`; the caller validates it. */
  generateJson(request: GenerationRequest, schema: JsonSchema): Promise<string | undefined>;
}

/** The part of the Gemini SDK the adapter uses; tests provide a fake. */
export interface AiClient {
  models: {
    generateContent(params: GenerateContentParameters): Promise<{ text?: string | undefined }>;
  };
}

/** Gemini wants its schema types in capitals ("OBJECT"). */
function toGeminiSchema(schema: JsonSchema): unknown {
  const { type, properties, items, ...rest } = schema;
  return {
    ...rest,
    type: type.toUpperCase(),
    ...(properties && {
      properties: Object.fromEntries(Object.entries(properties).map(([k, v]) => [k, toGeminiSchema(v)])),
    }),
    ...(items && { items: toGeminiSchema(items) }),
  };
}

/** Adapter for Google Gemini through the @google/genai SDK. */
export function createGeminiProvider(client: AiClient, model: string): AiProvider {
  const call = async (request: GenerationRequest, extra: Record<string, unknown> = {}) => {
    const response = await client.models.generateContent({
      model,
      contents: request.prompt,
      config: {
        systemInstruction: request.system,
        maxOutputTokens: request.maxOutputTokens,
        ...(request.temperature !== undefined && { temperature: request.temperature }),
        abortSignal: AbortSignal.timeout(request.timeoutMs),
        ...extra,
      },
    });
    return response.text;
  };
  return {
    generateText: (request) => call(request),
    generateJson: (request, schema) =>
      call(request, {
        responseMimeType: "application/json",
        responseSchema: toGeminiSchema(schema),
      }),
  };
}
