"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GoogleStrategy = require("passport-google-oauth20");
// tslint:disable-next-line: class-name
class googleauthstrategyoptions {
    constructor() {
        this.clientID = "";
        this.clientSecret = "";
        this.callbackURL = "auth/strategy/callback/";
        this.scope = ["profile", "email"];
    }
}
exports.googleauthstrategyoptions = googleauthstrategyoptions;
// tslint:disable-next-line: class-name
class googleauthstrategy {
    constructor() {
        this.name = "google";
        this.label = "Sign in with GoogleID";
        this.icon = "fa-google";
        this.strategy = GoogleStrategy.Strategy;
        this.options = new googleauthstrategyoptions();
    }
}
exports.googleauthstrategy = googleauthstrategy;
// tslint:disable-next-line: class-name
class noderedcontribauthgoogle {
    constructor(baseURL, consumer_key, consumer_secret, customverify = null) {
        this.type = "strategy";
        this.authenticate = null;
        this.users = null;
        this.strategy = new googleauthstrategy();
        this._users = {};
        this.strategy.options.callbackURL = baseURL + "auth/strategy/callback/";
        this.strategy.options.clientID = consumer_key;
        this.strategy.options.clientSecret = consumer_secret;
        this.strategy.options.verify = (this.verify).bind(this);
        this.customverify = customverify;
        this.authenticate = (this._authenticate).bind(this);
        this.users = (this.fn_users).bind(this);
    }
    verify(token, tokenSecret, profile, done) {
        if (profile.emails) {
            var email = profile.emails[0];
            profile.username = email.value;
        }
        if (this.customverify !== null && this.customverify !== undefined) {
            this.customverify(profile, (newprofile) => {
                this._users[newprofile.username] = newprofile;
                done(null, newprofile);
            });
        }
        else {
            this._users[profile.username] = profile;
            done(null, profile);
        }
    }
    async _authenticate(profile, arg2) {
        var username = profile;
        if (profile.emails) {
            var email = profile.emails[0];
            profile.username = email.value;
        }
        if (profile.username) {
            username = profile.username;
        }
        return this.users(username);
    }
    async fn_users(username) {
        var user = this._users[username];
        return user;
    }
}
exports.noderedcontribauthgoogle = noderedcontribauthgoogle;
//# sourceMappingURL=node-red-contrib-auth-google.js.map