import { NestResponse } from './nest-response';

export class NestResponseBuilder {
  private response: NestResponse = {
    status: 200,
    headers: {},
    body: {},
  };

  public withStatus(status: number): NestResponseBuilder {
    this.response.status = status;
    return this;
  }

  public withHeaders(headers: unknown): NestResponseBuilder {
    this.response.headers = headers;
    return this;
  }

  public withBody(body: unknown): NestResponseBuilder {
    this.response.body = body;
    return this;
  }

  public build(): NestResponse {
    return new NestResponse(this.response);
  }
}
