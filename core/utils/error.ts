// ============================================================================
// CUSTOM ERROR CLASSES
// ============================================================================

// Base error class for your library
export class DggsError extends Error {
  public readonly code: string;
  public readonly context?: Record<string, any>;

  constructor(message: string, code: string, context?: Record<string, any>) {
    super(message);
    this.name = "DGGSError";
    this.code = code;
    this.context = context;

    // // Maintains proper stack trace for where our error was thrown
    // if (Error.captureStackTrace) {
    //   Error.captureStackTrace(this, DggsError);
    // }
  }
}

// Specific error types
export class ValidationError extends DggsError {
  constructor(message: string, context?: Record<string, any>) {
    super(message, "VALIDATION_ERROR", context);
    this.name = "ValidationError";
  }
}

export class ConfigurationError extends DggsError {
  constructor(message: string, context?: Record<string, any>) {
    super(message, "CONFIGURATION_ERROR", context);
    this.name = "ConfigurationError";
  }
}

export class NetworkError extends DggsError {
  constructor(
    message: string,
    statusCode?: number,
    context?: Record<string, any>
  ) {
    super(message, "NETWORK_ERROR", { ...context, statusCode });
    this.name = "NetworkError";
  }
}

export class ElementNotFoundError extends DggsError {
  constructor(elementId: string) {
    super(`Element with ID '${elementId}' not found`, "ELEMENT_NOT_FOUND", {
      elementId,
    });
    this.name = "ElementNotFoundError";
  }
}

export class ProjectionError extends DggsError {
  constructor(message: string, projection: string) {
    super(message, "PROJECTION_ERROR", { projection });
    this.name = "ProjectionError";
  }
}


// // ============================================================================
// // RESULT PATTERN (Alternative to throwing errors)
// // ============================================================================

// export type Result<T, E = Error> = 
//   | { success: true; data: T }
//   | { success: false; error: E };

// export class ResultUtils {
//   static ok<T>(data: T): Result<T> {
//     return { success: true, data };
//   }
  
//   static err<T, E = Error>(error: E): Result<T, E> {
//     return { success: false, error };
//   }
  
//   static isOk<T, E>(result: Result<T, E>): result is { success: true; data: T } {
//     return result.success;
//   }
  
//   static isErr<T, E>(result: Result<T, E>): result is { success: false; error: E } {
//     return !result.success;
//   }
// }