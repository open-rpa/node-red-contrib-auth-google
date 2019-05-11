import * as GoogleStrategy from "passport-google-oauth20";

// tslint:disable-next-line: class-name
export class googleauthstrategyoptions {
    public clientID:string = "";
    public clientSecret:string = "";
    public callbackURL:string = "auth/strategy/callback/";
    public scope:string[] = ["profile", "email"];
    public verify:any;
}
// tslint:disable-next-line: class-name
export class googleauthstrategy {

    public name:string = "google";
    public label:string = "Sign in with GoogleID";
    public icon:string = "fa-google";
    public strategy:any = GoogleStrategy.Strategy;
    public options:googleauthstrategyoptions = new googleauthstrategyoptions();
}
interface IVerifyFunction { (error:any, profile:any): void; }
// tslint:disable-next-line: class-name
export class noderedcontribauthgoogle {
    public type:string = "strategy";
    public authenticate:any = null;
    public users:any = null;
    public strategy:googleauthstrategy = new googleauthstrategy();
    private _users: any = {};
    constructor(baseURL:string, consumer_key:string, consumer_secret:string) {
        this.strategy.options.callbackURL = baseURL + "auth/strategy/callback/";
        this.strategy.options.clientID = consumer_key;
        this.strategy.options.clientSecret = consumer_secret;
        this.strategy.options.verify = (this.verify).bind(this);
        this.authenticate = (this._authenticate).bind(this);
        this.users = (this.fn_users).bind(this);
    }
    verify(token:string, tokenSecret:string, profile:any, done:IVerifyFunction):void {
        if(profile.emails) {
            var email:any = profile.emails[0];
            profile.username = email.value;
        }
        this._users[profile.username] = profile;
        done(null,profile);
    }
    async _authenticate(profile:string | any, arg2:any):Promise<any> {
        var username:string = profile;
        if(profile.emails) {
            var email:any = profile.emails[0];
            profile.username = email.value;
        }
        if (profile.username) {
            username = profile.username;
        }
        return this.users(username);
    }
    async fn_users(username:string):Promise<any> {
        var user:any = this._users[username];
        return user;
    }
}
