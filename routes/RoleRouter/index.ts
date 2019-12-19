import * as express from "express";
import role from "../../modle/role";
import {ResSuccess,ResError,ResEmpty} from '../../base/entity/res'

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

router.get('/allRole',async (req,res)=>{
  try {
    const result  = await role.findRoleAll();
    res.json(new ResSuccess("请求成功",result));
  } catch (error) {
    res.json( new ResError(error));
  }
});

router.get('/listRole',async (req,res)=>{
  try {
    const {pageNum,pageSize}  = req.query;
    let result  = await role.findRoleList(pageNum,pageSize);
    


    console.log(result);
    res.json(result?new ResSuccess("请求成功",result):new ResEmpty());
  } catch (error) {
    res.json( new ResError(error));
  }

})

router.get("/deleteRole",async (req,res)=>{
  try {
    await role.deleteRole(req.query.id);
    res.json(new ResSuccess("删除成功"));
  } catch (error) {
    res.json( new ResError(error));
  }
})





export default router;

