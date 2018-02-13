setInterval(loadmsg, 1000);

function loadmsg() {
    $.ajax({
        type: "GET",
        url: "/loadmsg",
        success: function(data) {
            var content = "<tr><td>Topic</td><td>Content</td></tr>";
            var msg = data;
            for(var k = 0 ; k < msg.length; k++) {
                var d = '<tr>';
                var b= msg[k];
                d += "<td>"+b.topic+"</td>";
                d += "<td>"+b.content+"</td>";
                content += d;
            }
            $("#msg_list").html(content);
        }
    });
}

function doConnect() {
  $.ajax({
      type: "GET",
      url: "/connect",
      success: function(msg) {
          alert(msg);
      }
  });
}
function doDisconnect() {
  $.ajax({
      type: "GET",
      url: "/disconnect",
      success: function(msg) {
          alert(msg);
      }
  });
}
function sendmsg() {
    var topic = document.getElementById('topic').value;
    var content = document.getElementById('content').value;
    req_body = {'topic': topic, 'content': content};
    $.ajax({
        type: "POST",
        data: JSON.stringify(req_body),
        contentType: 'application/json',
        url: '/sendmsg',
        success: function (msg) {
            alert(msg);
        }
    });

    document.getElementById('topic').value = "";
    document.getElementById('content').value = "";
}
