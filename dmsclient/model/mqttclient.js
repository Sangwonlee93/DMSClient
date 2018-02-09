var proper = require('../model/proper');
var mqtt = require('mqtt');
var p = new proper();
class MqttClient {
  constructor(){
    this.client = null;
    this.msg=new Array();
  }
  connect(callback){
    p.getIP((ip)=>{

      var real = "tcp://"+ip['ip'];
      console.log(real);
      this.client = mqtt.connect(real);
      this.client.on('connect', () => {
        this.client.subscribe('#');
        this.client.on('message', (topic, message) => {
          console.log(topic.toString() + "  : " +message.toString());
          this.msg.push({"topic" : topic.toString() , "content" :message.toString() });
        });
      });
    });
    callback(null);
  }
  sendmsg(topic,content,callback){
    console.log(topic);
    this.client.publish(topic, content);
    console.log("asdasdasdasd");
    callback(null);
  }
  loadmsg(callback){
    callback(this.msg);
  }
  disconnet(callback){
    this.client.end();
    callback(null);
  }
}
module.exports = MqttClient;
