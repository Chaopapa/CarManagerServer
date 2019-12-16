import * as express from "express";
import user from "../../modle/user";
import {CodeType,ResType,ResError} from '../../base/entity/res'
import { json } from "body-parser";
const router = express.Router();





router.post('/login',async (req,res)=>{
  const {username,password}  = req.body; 
  try {
    const result  = await user.checkPassword(username,password);
    const resData = {
      code:CodeType.SUCCESS,
      message:"登陆成功",
      data:result
    }
    res.json(resData);
  } catch (error) {
    res.json(new ResError(error));
  }
})


router.get('/addUser',async (req,res)=>{
  console.log(req.url);
  try {
    const result =  await user.save({...req.query});
    const resData:ResType = {
      code:CodeType.SUCCESS,
      message:'请求成功',
      data:result
    }
    res.json({
     resData
    })
  } catch (error) {
    console.log(error.message);
    const resData:ResType = {
      code:CodeType.FAIL,
      message:error.message
    }
    res.json(resData);
  }
});

router.get('/listUser',async(req,res)=>{
  try {
    const result = await user.findUserList();
    const resData:ResType = {
      code:result?CodeType.SUCCESS:CodeType.EMPTY,
      message:result?'请求成功':'数据为空',
      data:result
    }
    res.json(resData);
  } catch (error) {
    const  resData:ResType = {
      code:CodeType.FAIL,
      message:error.message
    }
    res.json(resData)
  }

})

export default router;

