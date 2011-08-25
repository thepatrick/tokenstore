/*global emit*/
var cradle = require('cradle'),
    util = require('util');

var DataProvider = function(opts, db) {
  opts.cache = true;
  opts.raw = false;
  this.connection= new cradle.Connection(opts);
  this.db = this.connection.database(db);
  this.db.save('_design/tokens', {
    unusedTokens: {
      map: function(doc) {
        if(!doc.used) {
          emit(doc._id, doc);
        }
      }
    }
  });
};

DataProvider.prototype.unusedTokens = function(callback) {
    this.db.view('tokens/unusedTokens',function(error, result) {
      if( error ){
        callback(error);
      }else{
        var res = result.reduce(function(pre, cur, idx, arr){
          pre.push({ id: cur.value._id, code: cur.value.code });
          return pre;
        }, []);
        callback(null, res);
      } 
    });
};

DataProvider.prototype.saveToken = function(deposits, callback) {
    if( typeof deposits.length =="undefined") {
      deposits = [deposits];
    }
    for( var i =0;i< deposits.length;i++ ) {
      var deposit = deposits[i];
      deposit.created_at = new Date();
    }
    this.db.save(deposits, function(error, result) {
      if( error ) callback(error)
      else callback(null, deposits);
    });
};

DataProvider.prototype.useToken = function(id, callback) {
  this.db.get(id, function (err, doc) {
    doc.used = true;
    this.db.save([doc], function(error, result){
      if(error) callback(error);
      else callback(null);
    });
  }.bind(this));
};

exports.DataProvider = DataProvider;