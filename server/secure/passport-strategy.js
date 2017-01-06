var LocalStrategy = require('passport-local').Strategy;
var User = require('./user-schema');

module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function (user, done) {
        if (user) {
            User.findById(user._id, function (err, user) {
                done(err, user);
            });
        }
        else {
            done(null, user);
        }
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
        function (email, password, done) {
            process.nextTick(function () {
                User.findOne({ 'local.email': email }, function (err, user) {
                    if (err)
                        return done(err);

                    // check to see if theres already a user with that email
                    if (user) {
                        return done({ error: 'That email is already taken.' });
                    } else {

                        var newUser = new User();

                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);

                        newUser.save(function (err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
            });
        }));

    passport.use('local-signin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
        function (email, password, done) {
            User.findOne({ 'local.email': email }, function (err, user) {
                if (err)
                    return done(err);

                if (!user)
                    return done({ 'error': 'No user found.' });

                if (!user.validPassword(password))
                    return done({ 'error': 'Oops! Wrong password.' });
                return done(null, user);
            });

        }));
};