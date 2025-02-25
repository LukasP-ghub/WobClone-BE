import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { User } from "../user/entities/user.entity";

export interface JwtPayload {
  id: string
}

function cookieExtractor(reg: any): null | string {
  return (reg && reg.cookies) ? (reg.cookies?.jwt ?? null) : null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: 'JDwoi doi o#OOI F#3fOAoJF*#fooiN hf3OIC OJ o jf#OJCOjoJFo#CO#CoqCMoc#OCMOIDoij oCOMowCOcO#OI3J*#*#*#* FfjCNoo@w*&$08@*&@)*#)(C p9',
    });
  }


  async validate(payload: JwtPayload, done: (error, user) => void) {
    if (!payload || !payload?.id) return done(new UnauthorizedException(), false);

    const user = await this.userRepository.findOneBy({ currentTokenId: payload.id });

    if (!user) return done(new UnauthorizedException(), false);

    done(null, user);
  }
}