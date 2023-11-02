import { ERROR_CREDENTIALS_TAKEN } from '@/consts/exceptions.constants';
import { BadRequestException } from '@nestjs/common';

// import { ERROR_PAGE_TYPE } from '../filters/constraint-errors';

export class CredentialsTakenException extends BadRequestException {
  constructor() {
    super(ERROR_CREDENTIALS_TAKEN);
  }
}
