import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Client } from 'socket.io';
import {JwtStrategy} from './jwt.strategy';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtStrategy: JwtStrategy, private readonly jwtService: JwtService) {
  }
  canActivate(context: ExecutionContext): any {
    const client  = context.switchToWs().getClient();
    const token: string = client.handshake.query.token
    if (!token) {
        throw new UnauthorizedException('token não informado')
    }
    console.log(token)
    try {
      const decoded = this.jwtService.verify(token)
      const userId = decoded.id
      client.handshake.headers.userId = userId
    }catch (error) {
      throw new UnauthorizedException('Token invalido')
    }
    return true;
  }

}
