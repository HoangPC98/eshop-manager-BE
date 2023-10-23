import { Injectable, NestInterceptor, ExecutionContext, CallHandler, StreamableFile, Request } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  code: number;
  data: T;
}

@Injectable()
export class TransResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const httpCtx = context.switchToHttp()
    const thisRequest = httpCtx.getRequest<Request>()
    return next.handle().pipe(
      map((result) => {
        return {
          code: thisRequest.method=='POST' ? 201 : 200,
          data: result
        }
      }),
    );
  }
}