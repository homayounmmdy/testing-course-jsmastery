import { NextResponse } from "next/server";
import { ZodError } from "zod";

import logger from "@/lib/logger";

import { RequestError, ValidationError } from "../http-errors";

export type ResponseType = "api" | "server";

const formatResponse = (
  responseType: ResponseType,
  status: number,
  message: string,
  errors?: Record<string, string[]> | undefined
) => {
  const responseContent = {
    success: false,
    error: {
      message,
      details: errors,
    },
  };

  return responseType === "api"
    ? NextResponse.json(responseContent, { status })
    : { status, ...responseContent };
};

function handleError(error: unknown, responseType: ResponseType = "server") {
  if (error instanceof RequestError) {
    logger.error(
      { err: error },
      `${responseType.toUpperCase()} Error: ${error.message}`
    );

    return formatResponse(
      responseType,
      error.statusCode,
      error.message,
      error.errors
    );
  }

  if (error instanceof ZodError) {
    const validationError = new ValidationError(
      (error.flatten().fieldErrors as Record<string, string[]>) || {}
    );

    logger.error({ err: error }, "Validation Error");
    return formatResponse(
      responseType,
      400,
      "Validation Error",
      validationError.errors
    );
  }

  if (error instanceof Error) {
    logger.error(error.message);
    return formatResponse(responseType, 500, error.message);
  }

  logger.error({ err: error }, "Unknown Error");
  return formatResponse(responseType, 500, "Internal Server Error");
}

export default handleError;
