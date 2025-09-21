import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // diz como extrair o token da requisição
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // não permite token expirado
      ignoreExpiration: false,
      // chave secreta usada para assinar e validar o token
      secretOrKey: 'secret',
    });
  }

  // aqui você recebe o payload decodificado do token
  async validate(payload: any) {
    // o retorno vai para req.user
    return { userId: payload.id, role: payload.role };
  }
}
