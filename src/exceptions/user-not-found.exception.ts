import { ERROR_USER_NOT_FOUND } from '@/consts/exceptions.constants';
import { BadRequestException } from '@nestjs/common';

export class UserNotFoundException extends BadRequestException {
  constructor() {
    super(ERROR_USER_NOT_FOUND);
  }
}
