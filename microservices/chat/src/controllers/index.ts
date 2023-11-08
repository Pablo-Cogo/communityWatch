import { CUSTOM_VALIDATION } from '@src/models';
import { Response } from 'express';
import mongoose, { Document, Model } from 'mongoose';

export abstract class BaseController<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  protected sendCreateOrUpdateErrorResponse(
    res: Response,
    error: unknown
  ): void {
    if (error instanceof mongoose.Error.ValidationError) {
      const clientErrors = this.handleClientErrors(error);
      res
        .status(clientErrors.code)
        .send({ code: clientErrors.code, error: clientErrors.error });
    } else if (error instanceof Error) {
      const errors = this.handleErrors(error);
      res.status(errors.code).send({ code: errors.code, error: errors.error });
    } else {
      res.status(500).send({ code: 500, error: 'Ocorreu algum erro!' });
    }
  }

  private handleErrors(error: Error): {
    code: number;
    error: string;
  } {
    if (error.name === 'TokenExpiredError') {
      return { code: 440, error: 'Sua sessão expirou!' };
    } else {
      return { code: 500, error: 'Ocorreu algum erro!' };
    }
  }

  private handleClientErrors(error: mongoose.Error.ValidationError): {
    code: number;
    error: string | string[];
  } {
    const schema = this.model.schema;
    const errorMessages: string[] = [];
    for (const field in error.errors) {
      if (Object.prototype.hasOwnProperty.call(error.errors, field)) {
        const errorMessage = error.errors[field].message;
        const fieldName = schema.path(field).options.describe ?? field;
        errorMessages.push(`Erro no(a) "${fieldName}": ${errorMessage}`);
      }
    }

    console.log(errorMessages);
    const duplicatedKindErrors = Object.values(error.errors).filter(
      (err) =>
        err.name === 'ValidatorError' &&
        err.kind === CUSTOM_VALIDATION.DUPLICATED
    );
    if (duplicatedKindErrors.length) {
      return { code: 409, error: errorMessages };
    }
    return { code: 422, error: errorMessages };
  }
}
