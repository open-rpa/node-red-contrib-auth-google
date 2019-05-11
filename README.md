"# node-red-contrib-auth-google" 

Install using npm
```
npm i node-red-contrib-auth-google
```

declare module using either
```javascript
var googleauth = require("node-red-contrib-auth-google");
```
or using typescript
```typescript
import * as googleauth from "node-red-contrib-auth-google";
```
then initilize 
```typescript
settings.adminAuth = new googleauth.noderedcontribauthgoogle("http://localhost:1880/", "blahblah.apps.googleusercontent.com", "secret", 
(profile:string | any, done:any)=> {
    profile.permissions = "*";
    done(profile);
});
```