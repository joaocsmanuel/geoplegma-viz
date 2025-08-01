// ============================================================================
// ERROR HANDLER UTILITY
// ============================================================================

export type ErrorHandler = (error: Error) => void;

export class ErrorManager {
  private static handlers: ErrorHandler[] = [];

  static addHandler(handler: ErrorHandler): void {
    this.handlers.push(handler);
  }

  static removeHandler(handler: ErrorHandler): void {
    const index = this.handlers.indexOf(handler);
    if (index > -1) {
      this.handlers.splice(index, 1);
    }
  }

  static handleError(error: Error): void {
    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("DGGS Error:", error);
    }

    // Call registered handlers
    this.handlers.forEach((handler) => {
      try {
        handler(error);
      } catch (handlerError) {
        console.error("Error in error handler:", handlerError);
      }
    });
  }

  static wrapAsync<T extends any[], R>(
    fn: (...args: T) => Promise<R>
  ): (...args: T) => Promise<R> {
    return async (...args: T): Promise<R> => {
      try {
        return await fn(...args);
      } catch (error) {
        this.handleError(
          error instanceof Error ? error : new Error(String(error))
        );
        throw error;
      }
    };
  }
}
