import { DGGRS_CONTEXT, DGGRS_ID } from "../../layers/dggs-layer";
import { ElementNotFoundError, ValidationError } from "./error";

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

export class Validator {
  static validateElement(elementId: string): void {
    if (!elementId) {
      throw new ValidationError("Element ID is required");
    }

    if (typeof elementId !== "string") {
      throw new ValidationError("Element ID must be a string", {
        received: typeof elementId,
      });
    }

    const element = document.getElementById(elementId);
    if (!element) {
      throw new ElementNotFoundError(elementId);
    }
  }

  static validateProjection(projection: string): void {
    const validProjections = ["globe", "mercator", "orthographic"];
    if (!validProjections.includes(projection)) {
      throw new ValidationError(
        `Invalid projection: ${projection}. Valid options: ${validProjections.join(
          ", "
        )}`,
        { validProjections, received: projection }
      );
    }
  }

  static validateDggrs(dggrs: any): void {
    if (dggrs === undefined) {
      throw new ValidationError("Dggrs cannot be undefined");
    }

    if (dggrs === null) {
      throw new ValidationError("Dggrs cannot be null");
    }

    if (dggrs && typeof dggrs !== "object") {
      throw new ValidationError("Dggrs must be an object", {
        received: typeof dggrs,
      });
    }

    if (dggrs) {
      if (dggrs.id === undefined || dggrs.id === null) {
        throw new ValidationError("Dggrs id cannot be undefined or null", {
          received: typeof dggrs.id,
        });
      } else {
        if (typeof dggrs.id !== "string" || !DGGRS_ID.includes(dggrs.id)) {
          throw new ValidationError(
            `Invalid DGGRS: ${dggrs.id}. Valid options: ${DGGRS_ID.join(", ")}`,
            {
              received: typeof dggrs.id,
            }
          );
        }

        if (
          typeof dggrs.context !== "string" ||
          !DGGRS_CONTEXT.includes(dggrs.context)
        ) {
          throw new ValidationError(
            `Invalid context: ${
              dggrs.context
            }. Valid options: ${DGGRS_CONTEXT.join(", ")}`,
            {
              received: typeof dggrs.context,
            }
          );
        } 
      }
    }

    // if (layer?.opacity !== undefined) {
    //   if (typeof layer.opacity !== 'number' || layer.opacity < 0 || layer.opacity > 1) {
    //     throw new ValidationError('Layer opacity must be a number between 0 and 1', {
    //       received: layer.opacity
    //     });
    //   }
    // }
  }
}
