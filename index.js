const app = require('koa')();
const session = require('koa-session');
const router = require('koa-router')();
const views = require('koa-views');
const path = require('path');
var send = require('koa-send');


app.use(views(__dirname + '/views', {
    map: {
      html: 'underscore'
    }
  }));





app.keys = ['somesecret'];

var CONFIG = {
  key: 'surf:sess', /** (string) cookie key (default is koa:sess) */
  maxAge: 86400000, /** (number) maxAge in ms (default is 1 days) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
};
app.use(session(CONFIG, app));
// or if you prefer all default config, just use => app.use(session(app));







router
  .get('/parts/(.*).key', function *(next) {
    if (this.session.user === 'Subscription user') {
      console.log(`This user is logged in so give them the key: ${path.join(__dirname, 'parts/') + this.params['0'] + '.key'}`);
      yield send(this, this.path);
    } else {
      console.log("User is not logged in, so no key.")
      this.body = "Nope.";
    }
  })
  .get('/parts/(.*).ts', function *(next) {
    yield send(this, this.path);
  })
  .get('/(.*).ts', function *(next) {
    yield send(this, path.join('parts/', this.path));
  })
  .get('/parts/prog_index.m3u8', function *(next) {
    yield send(this, this.path);
  })
  .get('/prog_index.m3u8', function *(next) {
    yield send(this, path.join('parts/', this.path));
  })
  .get('/login', function *(next) {
    this.session.user = 'Subscription user';
    this.body = "Logged in <a href='/'>main page</a>";
  })
  .get('/logout', function *(next) {
    this.session.user = null;
    this.body = "Logged out  <a href='/'>main page</a>";
  })
  .get('/', function *(next) {
    this.state = {
      session: this.session,
      title: 'app'
    };
    
    if (this.session.user) {
      yield this.render('index', {
        user: 'Subscription user'
      });
    } else {
      yield this.render('index', {
        user: 'Non Subscribed user'
      });
    }
  });
  
  

app
  .use(router.routes())
  .use(router.allowedMethods())    
  .use(function* (next) {
    const possibleFile = path.join(__dirname + this.url);
    console.log(`Handling ${possibleFile}`)
    yield send(this, this.path);
  });

  
  
app.listen(3000);
console.log('listening on port 3000');