import { UserJWTGuards } from '@modules/auth/guards';
import { Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

@Controller('user')
@UseGuards(UserJWTGuards)
export class UserController {
  @Get('info')
  // Req is from validation of Guard returns passby -> May be a param decorator later
  getInfo(@Req() req: Request) {
    return req.user;
  }

  @Patch('edit-profile')
  editProfile() {}
}
