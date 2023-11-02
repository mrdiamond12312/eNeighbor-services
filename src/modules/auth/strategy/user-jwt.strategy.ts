import { JWT_USER } from '@/consts';
import { PrismaService } from '@modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class UserJWTStrategy extends PassportStrategy(Strategy, JWT_USER) {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SALT'),
    });
  }

  async validate(payload: { sub: number; userName: string }) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ userName: payload.userName }, { email: payload.userName }],
      },
    });

    return user;
  }
}
