import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';

type CustomHttpException = {
  body: any;
  status: number;
};

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly httpAdapter: AbstractHttpAdapter;

  constructor(httpAdapterHost: HttpAdapterHost) {
    this.httpAdapter = httpAdapterHost.httpAdapter;
  }

  catch(exception: Error, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const [request, response] = [context.getRequest(), context.getResponse()];

    const { body, status }: CustomHttpException =
      exception instanceof HttpException
        ? { status: exception.getStatus(), body: exception.getResponse() }
        : {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            body: {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              timestamp: new Date().toISOString(),
              message: exception.message,
              path: `${request.method} ${request.path}`,
            },
          };

    this.httpAdapter.reply(response, body, status);
  }
}
