module.exports = {
  server_port : 3000,
  route_info : [{file : './dms', path : '/loadmsg',method : 'loadmsg', type : 'get'},
                {file : './dms', path : '/',method : 'home', type : 'get'},
                {file : './dms', path : '/connect',method : 'connect', type : 'get'},
                {file : './dms', path : '/disconnect',method : 'disconnect', type : 'get'},
                {file : './dms', path : '/sendmsg',method : 'sendmsg', type : 'post'}]
};
