"use strict";
exports.__esModule = true;
var express = require("express");
var area_1 = require("../../modle/area");
var res_1 = require("../../base/entity/res");
var router = express.Router();
router.get("/province", function (req, res) {
    res.json(new res_1.ResSuccess("请求成功", area_1["default"].getProvinceList()));
});
router.get("/city", function (req, res) {
    res.json(new res_1.ResSuccess("请求成功", area_1["default"].getCityList(req.query.provinceId)));
});
router.get("/county", function (req, res) {
    res.json(new res_1.ResSuccess("请求成功", area_1["default"].getCountyList(req.query.cityId)));
});
exports["default"] = router;
