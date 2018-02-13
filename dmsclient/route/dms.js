var MqttClient = require('../model/mqttclient');
var cli=[];
var cnt = 0;
var home =function(req,res){
  res.render('main.ejs');
};
var connect =function(req,res){
  if(req.session.num){
    res.send('이미 연결되어있는 상태입니다.');
  }else{
    req.session.num = cnt;
    console.log(req.session.num);
    cnt++;
    cli.push(new MqttClient());
    cli[req.session.num].connect(()=>{
      console.log(req.session.num);
      res.send("연결 성공");
    });
  }
};
var disconnect = function(req,res){
  if(!req.session.num){
    res.send("이미 연결 해제 상태입니다.");
  }else{
    cli[req.session.num].disconnet(()=>{
      cli[req.session.num] = null;
      delete req.session.num;
      for(var i =0; i<cli.length; i++){
        console.log(cli[i]);
      }
      res.send('연결 해제 성공');
    });
  }
};
var sendmsg = function(req,res){
  var topic = req.body.topic;
  var content = req.body.content;
  cli[req.session.num].sendmsg(topic,content,()=>{
    console.log(req.session.num);
    res.send("메시지 보내기 성공");
  });
};
var loadmsg = function(req,res){
  if(!req.session.num){
    var temp =[];
    res.send(temp);
  }else{
    cli[req.session.num].loadmsg((msg)=>{
      res.send(msg);
    });
  }
};
module.exports.home =home;
module.exports.connect =connect;
module.exports.disconnect =disconnect;
module.exports.sendmsg = sendmsg;
module.exports.loadmsg = loadmsg;
