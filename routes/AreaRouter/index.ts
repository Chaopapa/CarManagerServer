import * as express from "express";
import area from "../../modle/area";
import {ResSuccess,ResError,ResEmpty} from '../../base/entity/res'

const router = express.Router();


router.get("/province",(req,res)=>{
    res.json(new ResSuccess("请求成功",area.getProvinceList()));
});

router.get("/city",(req,res)=>{
    res.json(new ResSuccess("请求成功",area.getCityList(req.query.provinceId)));
});

router.get("/county",(req,res)=>{
    res.json(new ResSuccess("请求成功",area.getCountyList(req.query.cityId)));
});

export default router;