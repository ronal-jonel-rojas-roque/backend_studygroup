import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { firstValueFrom, of } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  public constructor(private readonly reflector: Reflector) {}

  public async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<any> {
    const body = await firstValueFrom(next.handle());
    return of({
      statusCode: body.statusCode,
      message: Array.isArray(body.message) ? body.message : [body.message],
      data: body.data,
      count: body.count,
    });
  }
}
