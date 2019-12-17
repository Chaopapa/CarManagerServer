import * as express from "express";
import role from "../../modle/role";
import {CodeType,ResType,ResSuccess,ResError} from '../../base/entity/res'
const router = express.Router();



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/addRole',async (req,res)=>{
  console.log(req.url);
  try {
    await role.save({...req.query});
    res.json(new ResSuccess("添加成功"));
  } catch (error) {
    res.json( new ResError(error));
  }
})

export default router;

