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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var StatusType;
(function (StatusType) {
    StatusType[StatusType["OPEN"] = 0] = "OPEN";
    StatusType[StatusType["COLSE"] = 1] = "COLSE";
})(StatusType || (StatusType = {}));
var schema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        "default": '666666'
    },
    nickname: {
        type: String,
        "default": "后台用户"
    },
    status: {
        type: StatusType,
        "default": StatusType.OPEN
    },
    role: {
        type: mongoose_1.SchemaTypes.ObjectId,
        ref: "role"
    }
});
exports.UserModel = mongoose_1.model('user', schema);
var User = /** @class */ (function () {
    function User() {
    }
    /**
     * 新增用户
     * @param param0
     */
    User.prototype.save = function (_a) {
        var username = _a.username, password = _a.password, rest = __rest(_a, ["username", "password"]);
        return __awaiter(this, void 0, void 0, function () {
            var result, user, result_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log("添加用户" + username + password);
                        console.log(rest);
                        return [4 /*yield*/, this.findOne({ username: username })];
                    case 1:
                        result = _b.sent();
                        if (!!result) return [3 /*break*/, 4];
                        return [4 /*yield*/, new exports.UserModel(__assign({ username: username, password: password }, rest))];
                    case 2:
                        user = _b.sent();
                        console.log(user);
                        return [4 /*yield*/, user.save()];
                    case 3:
                        result_1 = _b.sent();
                        console.log(result_1);
                        return [2 /*return*/, Promise.resolve(result_1)];
                    case 4:
                        console.log("用户已存在");
                        return [2 /*return*/, Promise.reject(new Error('该用户已存在'))];
                }
            });
        });
    };
    /**
     * 删除用户
     */
    User.prototype.deleteById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, exports.UserModel.findByIdAndDelete(id)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, Promise.resolve(result)];
                }
            });
        });
    };
    User.prototype.findOne = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(info);
                        return [4 /*yield*/, exports.UserModel.findOne(info)];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * 查询管理员对应的列表
     */
    User.prototype.findUserList = function (pageNum, pageSize) {
        if (pageNum === void 0) { pageNum = 0; }
        if (pageSize === void 0) { pageSize = 10; }
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, exports.UserModel.find().populate({ path: 'role', select: 'name' }).limit(pageSize).skip(pageNum * pageSize)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, Promise.resolve(result)];
                }
            });
        });
    };
    /**
     * 通过id修改数据
     * @param id
     * @param update
     */
    User.prototype.updateById = function (id, update) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, exports.UserModel.findByIdAndUpdate(id, update)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, Promise.resolve(result)];
                }
            });
        });
    };
    return User;
}());
exports["default"] = new User();
