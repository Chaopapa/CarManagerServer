"use strict";
exports.__esModule = true;
var express = require("express");
var mongoose = require("mongoose");
var UserRouter_1 = require("./routes/UserRouter");
var RoleRouter_1 = require("./routes/RoleRouter");
var AreaRouter_1 = require("./routes/AreaRouter");
var app = express();
mongoose.connect('mongodb://localhost:27017/car', { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (err) {
        console.log('数据启动失败');
    }
    else {
        app.listen('5000', function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('服务器启动成功');
            }
        });
    }
});
// app.use(logger('dev'));
// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// // app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
//跨域设置
app.use(function (req, res, next) {
    if (req.path !== "/" && !req.path.includes(".")) {
        res.header({
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": req.headers.origin || "*",
            "Access-Control-Allow-Headers": "X-Requested-With",
            "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
            "Content-Type": "application/json; charset=utf-8"
        });
    }
    next();
});
app.use('/manager/api/user', UserRouter_1["default"]);
app.use('/manager/api/role', RoleRouter_1["default"]);
app.use("/manager/api/area", AreaRouter_1["default"]);
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
