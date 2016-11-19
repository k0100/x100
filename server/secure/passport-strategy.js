var LocalStrategy   = require('passport-local').Strategy;
var User            = require('./user-schema');

module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
 
    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField: 'password',
        passReqToCallBack : true
    },
    function(email, password, done) {
        process.nextTick(function() {
            User.findOne({ 'local.email' :  email }, function(err, user) {
                
                console.log(err);
                if (err)
                    return done(null,err);

                // check to see if theres already a user with that email
                if (user) {
                    return done(null,{error : 'That email is already taken.'});
                } else {

                    var newUser = new User();

                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);

                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(newUser);
                    });
                }
            });    
        });
    }));

    passport.use('local-signin', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallBack : true
    },
    function(email, password, done) { 
        User.findOne({ 'local.email' :  email }, function(err, user) {
            if (err)
                return done(err);

            if (!user)
                return done(null, {'error' : 'No user found.'});

            if (!user.validPassword(password))
                return done(null, { 'error' : 'Oops! Wrong password.'}); 

            return done(user);
        });

    }));
};