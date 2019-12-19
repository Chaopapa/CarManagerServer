"use strict";
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
var mongoose_1 = require("mongoose");
var user_1 = require("../user");
var schema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    addUser: {
        type: mongoose_1.SchemaTypes.ObjectId,
        ref: 'user'
    },
    desc: {
        type: String
    },
    park: {
        type: mongoose_1.SchemaTypes.ObjectId,
        ref: "park"
    },
    resourceId: {
        type: Array
    },
    count: {
        type: Number
    }
});
var RoleModel = mongoose_1.model('role', schema);
var Role = /** @class */ (function () {
    function Role() {
    }
    /**
     * 新增/修改角色
     * @param param0
     */
    Role.prototype.save = function (_a) {
        var id = _a.id, name = _a.name, desc = _a.desc, park = _a.park, resourceId = _a.resourceId;
        return __awaiter(this, void 0, void 0, function () {
            var resourceIdArr, result, role, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        resourceIdArr = [];
                        if (resourceId) {
                            resourceIdArr = resourceId.split(',');
                        }
                        if (!id) return [3 /*break*/, 2];
                        return [4 /*yield*/, RoleModel.findByIdAndUpdate({ _id: id }, { name: name, desc: desc, park: park, resourceId: resourceIdArr })];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, Promise.resolve(result)];
                    case 2:
                        role = new RoleModel({ name: name, desc: desc, park: park, resourceId: resourceIdArr });
                        return [4 /*yield*/, role.save()];
                    case 3:
                        result = _b.sent();
                        return [2 /*return*/, Promise.resolve(result)];
                }
            });
        });
    };
    /**
     * 查询所有角色}
     */
    Role.prototype.findRoleAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, RoleModel.find()];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, Promise.resolve(result)];
                }
            });
        });
    };
    /**
     * 查看所有角色列表
     */
    Role.prototype.findRoleList = function (pageNum, pageSize) {
        if (pageNum === void 0) { pageNum = 0; }
        if (pageSize === void 0) { pageSize = 10; }
        return __awaiter(this, void 0, void 0, function () {
            var result, resultPromise;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, RoleModel.find()
                            .limit(pageSize).skip(pageSize * pageNum)
                            .populate({ path: 'addUser', select: 'nickname' })
                            .populate({ path: 'park', select: 'parkName' })];
                    case 1:
                        result = _a.sent();
                        ;
                        return [4 /*yield*/, result.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                var resItem, count;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            resItem = item.toObject();
                                            return [4 /*yield*/, this.countRoleUser(resItem._id)];
                                        case 1:
                                            count = _a.sent();
                                            resItem.count = count;
                                            return [2 /*return*/, resItem];
                                    }
                                });
                            }); })];
                    case 2:
                        resultPromise = _a.sent();
                        return [2 /*return*/, Promise.all(resultPromise).then(function (result) {
                                return Promise.resolve(result);
                            })["catch"](function (err) {
                                return Promise.reject(err);
                            })];
                }
            });
        });
    };
    /**
     * 查询角色的user数
     */
    Role.prototype.countRoleUser = function (role) {
        return __awaiter(this, void 0, void 0, function () {
            var count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_1.UserModel.count({ role: role })];
                    case 1:
                        count = _a.sent();
                        return [2 /*return*/, count];
                }
            });
        });
    };
    /**
     * 删除用户
     *
     */
    Role.prototype.deleteRole = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var count, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.countRoleUser(id)];
                    case 1:
                        count = _a.sent();
                        if (count > 0) {
                            return [2 /*return*/, Promise.reject(new Error('该角色存在用户不可删除'))];
                        }
                        return [4 /*yield*/, RoleModel.findByIdAndDelete(id)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, Promise.resolve(result)];
                }
            });
        });
    };
    return Role;
}());
exports["default"] = new Role();
