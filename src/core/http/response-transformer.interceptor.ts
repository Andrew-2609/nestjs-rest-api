import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NestResponse } from './nest-response';

@Injectable()
export class ResponseTransformerInterceptor implements NestInterceptor {
  private readonly httpAdapter: AbstractHttpAdapter;

  constructor(httpAdaterHost: HttpAdapterHost) {
    this.httpAdapter = httpAdaterHost.httpAdapter;
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<unknown>,
  ): Observable<unknown> | Promise<Observable<unknown>> {
    return next.handle().pipe(
      map((controllerResponse: NestResponse) => {
        if (controllerResponse instanceof NestResponse) {
          const httpContext = context.switchToHttp();
          const response = httpContext.getResponse();

          const { status, headers, body } = controllerResponse;

          this.setHeadersByName(headers, response);

          this.httpAdapter.status(response, status);

          return body;
        }

        return controllerResponse;
      }),
    );
  }

  private setHeadersByName(headers: unknown, response: unknown): void {
    // Location, Owner, etc.
    const headerNames = Object.getOwnPropertyNames(headers);

    headerNames.forEach((headerName) => {
      const headerValue = headers[headerName];
      this.httpAdapter.setHeader(response, headerName, headerValue);
    });
  }
}
