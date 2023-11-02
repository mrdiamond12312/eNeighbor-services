import { JWT_USER } from '@/consts';
import { AuthGuard } from '@nestjs/passport';

export class UserJWTGuards extends AuthGuard(JWT_USER) {
  constructor() {
    super();
  }
}
