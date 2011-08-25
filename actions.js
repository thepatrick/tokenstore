var helpers = require('./helpers');
module.exports.logout = function() {
  return function(req,res){
    req.session.destroy(function(err){
      res.redirect('/');
    });
  };
};

module.exports.completeLogin = function(auth) {
  return function(req,res) {
    var token = req.param("token");
    auth.retrieve_details(token, function(r){ 
      if(r && r.token == token) {
        req.session.user = r.user;
        req.session.save(function(){
          res.redirect('/');
        });      
      } else {
        res.redirect('/');
      }
    });
  };
};

module.exports.index = function(options, money) {
  return function(req, res){
    var opts = helpers.copyOpts(options);

    money.unusedTokens(function(err, tokens){
      if(err) {
        opts.locals = {};
        res.render('403.hbs', opts);
      } else {
        var nextToken = tokens.shift();
        opts.locals = {
          haveNextToken: true, // nextToken !== undefined && nextToken !== null,
          nextCode: nextToken && nextToken.code,
          nextID: nextToken && nextToken.id,
          remaining: tokens.length === 0 && "none" || tokens.length
        };
        res.render('index.hbs', opts);        
      }
    });
  };
};

module.exports.deposit = function(money) {
  return function(req,res){
    var token = req.param('token');
    token = token && token.trim();
    if(token) {
      money.saveToken({ "code": req.param('token') }, function(error, docs) {
        res.redirect('/');
      });      
    } else {
      res.redirect('/');
    }
  };
};

module.exports.consume = function(money) {
  return function(req,res){
    var id = req.param('id');
    id = id && id.trim();
    if(id) {
      money.useToken(id, function(error, docs) {
        res.redirect('/');
      });      
    } else {
      res.redirect('/');
    }
  };
};