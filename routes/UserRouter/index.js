"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express = require("express");
var user_1 = require("../../modle/user");
var res_1 = require("../../base/entity/res");
var router = express.Router();
router.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, result, resData, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_1["default"].checkPassword(username, password)];
            case 2:
                result = _b.sent();
                resData = {
                    code: res_1.CodeType.SUCCESS,
                    message: "登陆成功"
                };
                res.json(resData);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                res.json(new res_1.ResError(error_1));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get('/addUser', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, resData, error_2, resData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(req.url);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_1["default"].save(__assign({}, req.query))];
            case 2:
                result = _a.sent();
                resData = {
                    code: res_1.CodeType.SUCCESS,
                    message: '添加成功',
                    data: result
                };
                res.json({
                    resData: resData
                });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.log(error_2.message);
                resData = {
                    code: res_1.CodeType.FAIL,
                    message: error_2.message
                };
                res.json(resData);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
//删除
router.get('/deleteUser', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_1["default"].deleteById(req.query.id)];
            case 1:
                _a.sent();
                res.json(new res_1.ResSuccess("删除成功"));
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.json(new res_1.ResError(error_3));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//修改
router.get('/updateUser', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_1["default"].updateById(req.query.id, __assign({}, req.query))];
            case 1:
                result = _a.sent();
                res.json(new res_1.ResSuccess('修改成功'));
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                res.json(new res_1.ResError(error_4));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/listUser', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, pageNum, pageSize, result, resData, error_5, resData;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.query, pageNum = _a.pageNum, pageSize = _a.pageSize;
                console.log(pageNum, pageSize);
                return [4 /*yield*/, user_1["default"].findUserList(pageNum, pageSize)];
            case 1:
                result = _b.sent();
                resData = {
                    code: result ? res_1.CodeType.SUCCESS : res_1.CodeType.EMPTY,
                    message: result ? '请求成功' : '数据为空',
                    data: result
                };
                res.json(resData);
                return [3 /*break*/, 3];
            case 2:
                error_5 = _b.sent();
                resData = {
                    code: res_1.CodeType.FAIL,
                    message: error_5.message
                };
                res.json(resData);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports["default"] = router;
