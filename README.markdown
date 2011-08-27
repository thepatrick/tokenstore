MagicHome
=========

Controls X10 devices from an iOS device.

Notes
-----

1. You'll need to do an `npm install` to get the required node modules. If you are using node 0.5.3+ then you may need to modify parts of the cradle module (it uses require.paths for no apparent reason)

2. For now it relies on you having an instance of my auth service running. You probably don't, because you're probably not me. To work around this edit helper.js and change requireLogin to:

    module.exports.requireLogin = function requireLogin(auth, options){
      return function requireLoginHandler(req, res, next) {
        next();
      };
    };

3. Create a couch database for the app to use.

4. Boot it with something like:

    SESSION_SECRET="some secret" COUCH_SERVER="localhost" COUCH_PORT="5984" COUCH_DB=tokens APP_PORT=3000 node app.js

5. Open http://localhost:3000/

Licence
-------

Copyright (c) 2011 Patrick Quinn-Graham

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.