import * as express from "express";
import role from "../../modle/role";
import {CodeType,ResType} from '../../base/entity/res'
const router = express.Router();



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/addRole',async (req,res)=>{
  console.log(req.url);
  try {
    await role.save({...req.query});
    const resData:ResType = {
      code:CodeType.SUCCESS,
      message:'请求成功',
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
})

export default router;

