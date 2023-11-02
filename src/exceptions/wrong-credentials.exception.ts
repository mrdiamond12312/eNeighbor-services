import { ERROR_WRONG_CREDENTIALS } from '@/consts/exceptions.constants';
import { UnauthorizedException } from '@nestjs/common';

export class WrongCredentialsException extends UnauthorizedException {
  constructor() {
    super(ERROR_WRONG_CREDENTIALS);
  }
}
