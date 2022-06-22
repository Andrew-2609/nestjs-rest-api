export class NestResponse {
  status: number;
  headers: unknown;
  body: unknown;

  constructor(nestResponse: NestResponse) {
    Object.assign(this, nestResponse);
  }
}
