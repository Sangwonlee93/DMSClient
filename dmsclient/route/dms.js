var MqttClient = require('../model/mqttclient');
var cli=[];
var cnt = 1;
cli.push(null);
var home =function(req,res){
  res.render('main.ejs');
};
var connect =function(req,res){
  if(req.session.num){
    res.send('이미 연결되어있는 상태입니다.');
  }else{
    cli.push(new MqttClient());
    req.session.num = cnt;
    console.log(req.session.num);
    cnt++;
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
      res.send('연결 해제 성공');
    });
  }
};
var sendmsg = function(req,res){
  if(req.session.num){
    var topic = req.body.topic;
    var content = req.body.content;
    cli[req.session.num].sendmsg(topic,content,()=>{
      console.log(req.session.num);
      res.send("메시지 보내기 성공");
    });
  }else{
      res.send("연결 필요!");
  }
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
