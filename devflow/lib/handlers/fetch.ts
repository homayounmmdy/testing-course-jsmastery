import { RequestError } from "../http-errors";
import logger from "../logger";
import handleError from "./error";

interface FetchOptions extends RequestInit {
  timeout?: number;
}

// Type guard to check if the error is an instance of Error
function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export async function fetchHandler<T>(
  url: string,
  options: FetchOptions = {}
): Promise<ActionResponse<T>> {
  const {
    timeout = 100000,
    headers: customHeaders = {},
    ...restOptions
  } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const headers: HeadersInit = { ...defaultHeaders, ...customHeaders };

  const config: RequestInit = {
    ...restOptions,
    headers,
    signal: controller.signal,
  };

  try {
    const response = await fetch(url, config);
    clearTimeout(id); // Clear the timeout on successful fetch

    if (!response.ok) {
      throw new RequestError(
        response.status,
        `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    const lastError = isError(error) ? error : new Error("Unknown error");

    // Handle request timeouts
    if (lastError.name === "AbortError") {
      logger.warn(`Request timed out for ${url}`);
    } else {
      logger.error(`Fetch error for ${url}: ${lastError.message}`);
    }

    // Use the handleError function to manage the error
    return handleError(lastError) as ActionResponse<T>;
  }
}
