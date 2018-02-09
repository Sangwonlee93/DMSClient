var request = require('request');
class Proper {
  constructor(){
  }
  getIP(callback){
    var options = {
      url: 'http://163.180.117.30:8080/proper',
      method:'GET',
      headers:this.headers,
      json: true
    };

    request(options, (err,res,body) => {
      callback(body);
    });
  }
}
module.exports = Proper;
