import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import * as DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const window = new JSDOM('').window;
const purify = DOMPurify(window);

@Injectable()
export class SanitizeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    
    // Sanitizujemy wszystkie pola w body
    if (request.body) {
      Object.keys(request.body).forEach((key) => {
        if (typeof request.body[key] === 'string') {
          request.body[key] = purify.sanitize(request.body[key]);
        }
      });
    }

    return next.handle().pipe(
      map((data) => {
        // Możemy też sanitizować dane zwracane przez API
        if (typeof data === 'string') {
          return purify.sanitize(data);
        }
        return data;
      }),
    );
  }
}
