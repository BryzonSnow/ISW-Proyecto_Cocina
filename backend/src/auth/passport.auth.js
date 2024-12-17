"use strict";
import passport from "passport";
import Empleado from "../entity/Empleado.entity.js";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { ACCESS_TOKEN_SECRET } from "../config/configEnv.js";
import { AppDataSource } from "../config/configDb.js";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: ACCESS_TOKEN_SECRET,
};

passport.use(
  new JwtStrategy(options, async (jwt_payload, done) => {
    try {
      const empleadoRepository = AppDataSource.getRepository(Empleado);
      const empleado = await empleadoRepository.findOne({
        where: {
          email: jwt_payload.email,
        },
      });

      if (empleado) {
        return done(null, empleado);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  }),
);

export function passportJwtSetup() {
  passport.initialize();
}
