var proper = require('../model/proper');
var mqtt = require('mqtt');
var p = new proper();
class MqttClient {
  constructor(){
    this.client = null;
    this.msg=[];
  }
  connect(callback){
    p.getIP((ip)=>{

      var real = "tcp://"+ip.ip;
      this.client = mqtt.connect(real);
      this.client.on('connect', () => {
        this.client.subscribe('#');
        this.client.on('message', (topic, message) => {
          console.log(topic.toString() + "  : " +message.toString());
          this.msg.push({"topic" : topic.toString() , "content" :message.toString() });
        });
      });
      callback(ip.ip);
    });
  }
  sendmsg(topic,content,callback){
    this.client.publish(topic, content);
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
