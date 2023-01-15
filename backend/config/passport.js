const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { Student } = require('../models/student');

const jwtOptions = {
  secretOrKey: "eierwhgfrmlhm",
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};


const tokenTypes = {
    ACCESS: 'access',
    REFRESH: 'refresh',
    RESET_PASSWORD: 'resetPassword',
    VERIFY_EMAIL: 'verifyEmail',
  };
  

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid token type');
    }
    const student = await Student.findById(payload.sub);
    if (!student) {
      return done(null, false);
    }
    done(null, student);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
};