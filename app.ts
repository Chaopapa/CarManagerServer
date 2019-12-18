
import * as express from 'express';
import * as mongoose  from  'mongoose';
import usersRouter from './routes/UserRouter';
import roleRouter from "./routes/RoleRouter";
import areaRouter from "./routes/AreaRouter";
import parkRouter from "./routes/ParkRouter";


const app:any = express();



mongoose.connect('mongodb://localhost:27017/car',{useNewUrlParser: true,useUnifiedTopology: true},err=>{
  if(err){
    console.log('数据启动失败');
  }else{
    app.listen('5000',(err: any)=>{
      if(err){
        console.log(err);
      }else{
        console.log('服务器启动成功');
      }
    })
  }
})

// app.use(logger('dev'));
// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// // app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));


//跨域设置
app.use(
 (req:any,res:any,next:any)=>{
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
 }
)


app.use('/manager/api/user', usersRouter);
app.use('/manager/api/role',roleRouter);
app.use("/manager/api/area",areaRouter);
app.use("/manager/api/parking",parkRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });




