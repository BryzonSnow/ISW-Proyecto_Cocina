"use strict";
import passport from "passport";
import Empleado from "../entity/Empleado.entity.js";  // Importar la entidad Empleado
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
      // Utilizar el repositorio de Empleado en lugar de User
      const empleadoRepository = AppDataSource.getRepository(Empleado);
      const empleado = await empleadoRepository.findOne({
        where: {
          email: jwt_payload.email,  // Buscamos por el email del payload del JWT
        },
      });

      if (empleado) {
        return done(null, empleado);  // Si el empleado es encontrado, se pasa a la siguiente etapa
      } else {
        return done(null, false);  // Si no se encuentra, se rechaza la autenticación
      }
    } catch (error) {
      return done(error, false);  // En caso de error, también se rechaza la autenticación
    }
  }),
);

export function passportJwtSetup() {
  passport.initialize();
}
