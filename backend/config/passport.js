const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const Student = require('../models/student');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {

            Student.findOne(
               { email: email }
            ).then(student => {
                if (!student) {
                    return done(null, false, { msg: 'Email/Password are invalid' });
                }


                bcrypt.compare(password, student.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, student);
                    } else {
                        return done(null, false, { msg: 'Email/Password are invalid' });
                    }
                });
            });
        })
    );

    
};