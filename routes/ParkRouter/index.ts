import * as express from "express";
import bill from "../../modle/bill";
import park from "../../modle/park";
import { ResSuccess, ResError, ResEmpty } from '../../base/entity/res'


const router = express.Router();

router.get("/billingInfo", async (req, res) => {
    try {
        await bill.saveOrUpdate(req.query);
        res.json(new ResSuccess("操作成功"));
    } catch (error) {
        res.json(new ResError(error));
    }
});

router.get("/parkInfo", async (req, res) => {
    try {
        await park.saveOrUpdate(req.query);
        res.json(new ResSuccess("操作成功"));
    } catch (error) {
        res.json(new ResError(error));
    }
});

router.get("/allPark", async (req, res) => {
    try {
        let result = await park.selectAllPark();
        res.json(new ResSuccess("请求成功", result));
    } catch (error) {
        res.json(new ResError(error));
    }
});


router.get("/parkList", async (req, res) => {
    try {
        let { pageNum, pageSize } = req.query;
        
        let result = await park.findParkList(pageNum,pageSize);
        res.json(new ResSuccess("请求成功", result));
    } catch (error) {
        res.json(new ResError(error));
    }
})

export default router;