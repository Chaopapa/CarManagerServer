import * as express from "express";
import user from "../../modle/user";
import {CodeType,ResType} from '../../base/entity/res'
const router = express.Router();



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

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

