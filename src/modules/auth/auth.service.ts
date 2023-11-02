import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, RegisterAuthDto } from '@modules/auth/dto';
import * as argon from 'argon2';
import { DB_ERROR } from '@/consts';
import { CredentialsTakenException, UserNotFoundException } from '@/exceptions';
import { WrongCredentialsException } from '@/exceptions/wrong-credentials.exception';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async register(dto: RegisterAuthDto) {
    // Generate hashed password
    // NEW IDEA: implement extra salt to strengthen the password hash (dev later)
    const hashedPassword = await argon.hash(dto.password);

    // CREATE new User in DB
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hashObj: hashedPassword,
          userName: dto.userName,
          fullName: dto.fullName,
        },
      });
      // Prevent Hashed Obj from being returned
      delete user.hashObj;
      return { accessToken: await this.signJWToken(user.id, user.email) };
    } catch (error) {
      switch (error.code) {
        case DB_ERROR['UNIQUE_VIOLATION']:
          throw new CredentialsTakenException();
      }
    }
  }

  async signin(dto: AuthDto) {
    // Find iff user exists
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ userName: dto.userNameOrEmail }, { email: dto.userNameOrEmail }],
      },
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    // Check password
    const passwordMatches = await argon.verify(user.hashObj, dto.password);

    if (!passwordMatches) {
      throw new WrongCredentialsException();
    }

    delete user.hashObj;
    return { accessToken: await this.signJWToken(user.id, user.email) };
  }

  signJWToken(userId: number, userName: string): Promise<string> {
    const payload = {
      sub: userId,
      userName,
    };
    const secret = this.config.get('JWT_SALT');
    return this.jwt.signAsync(payload, { secret });
  }
}
