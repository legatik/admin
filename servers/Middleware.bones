var express = require('express');


var RedisStore = require('connect-redis')(express);



//RedisStore = require("connect-redis")(connect)
//connect = require 'connect'
//sessionOptions =
//key: "connect.sid"
//secret: "secret123"
//store: new RedisStore()
//app.use(express.session(sessionOptions))




servers.Middleware.augment({
    initialize: function (parent, app) {
       // console.log('app');
        parent.call(this, app);
//        this.use(express.session({
//            secret: 'sdfg234tg234g243',
//            store: new RedisStore
//        }));
        this.use(express.session({secret: '124125fgsdgsdg', store: new RedisStore()}));
        this.use(new servers.Products(app));
        this.use(new servers.Dishes(app));
        this.use(new servers.Register(app));
        this.use(new servers.checkUser(app));
        this.use(new servers.PassportLocal(app));


    }
});

