const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const  Student  = require('../models/student');

const jwtOptions = {
  secretOrKey: "secret",
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
    console.log(payload);
    const student = await Student.findOne({_id:payload.sub});
    console.log(student);
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