var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');

passport.use( new LocalStrategy(User.authenticate()) );
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); //used to create, sign and verify tokens.

var config = require('./config');

//expiresIn: 3600 secs = 60 minutes.
exports.getToken = (user) => {
    return jwt.sign(user, config.secretKey, {expiresIn: 3600});
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(
    new JwtStrategy(opts, (jwt_payload,done) => {
        User.findOne({_id:jwt_payload._id}, (err,user) => {
            //'done' is a callback with 3 args: (error?, user?, [info?])
            if (err){
                return done(err,false);
            }else if (user){
                return done(null,user);
            }else{
                return done(null,false);
            }
        });
    })
);

exports.verifyUser = passport.authenticate('jwt', {session:false});

exports.verifyAdmin = function(req,res,next){
    if (req.user.admin === true){
        return next();
    }else{
        let err = new Error('You are not authorized to perform this operation!');
        err.status = 403;
        return next(err);
    }
};