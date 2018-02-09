var MqttClient = require('../model/mqttclient');
var cli=null;
var home =function(req,res){
  console.log(req.connection.remoteAddress + ' 접속');
  res.render('main.ejs');
};
var connect =function(req,res){
  cli=new MqttClient();
  cli.connect(()=>{
    res.send("연결 성공");
    console.log("sadasd");
  });
};
var disconnect = function(req,res){
  if(cli==null){
    res.send("이미 연결 해제 상태입니다.")
  }else{
    cli.disconnet(()=>{
      cli = null;
      res.send('연결 해제 성공');
    });
  }
};
var sendmsg = function(req,res){
  var topic = req.body.topic;
  var content = req.body.content;
  cli.sendmsg(topic,content,()=>{
    console.log("test!!");
    res.send("메시지 보내기 성공");
  });
};
var loadmsg = function(req,res){
  if(cli==null){
    var temp =[];
    res.send(temp);
  }else{
    cli.loadmsg((msg)=>{
      console.log(msg);
      res.send(msg);
    });
  }
};
module.exports.home =home;
module.exports.connect =connect;
module.exports.disconnect =disconnect;
module.exports.sendmsg = sendmsg;
module.exports.loadmsg = loadmsg;
