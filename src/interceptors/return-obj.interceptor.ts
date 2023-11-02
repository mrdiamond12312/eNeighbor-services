import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map((data) => {
        return {
          meta: {
            statusCode: response.statusCode,
            errorCode: null,
            message: 'success',
          },
          data: data,
        };
      }),
    );
  }
}
