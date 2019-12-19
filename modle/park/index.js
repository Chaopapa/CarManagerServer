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
var bill_1 = require("../bill");
var schema = new mongoose_1.Schema({
    parkName: {
        type: String,
        required: true
    },
    provinceId: {
        type: String,
        required: true
    },
    cityId: {
        type: String,
        required: true
    },
    countyId: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    state: {
        type: String,
        "default": '0'
    },
    longitude: {
        type: String
    },
    latitude: {
        type: String
    },
    ruleArr: {
        type: Array
    },
    addUser: {
        type: mongoose_1.SchemaTypes.ObjectId
    }
});
exports.ParkModel = mongoose_1.model("park", schema);
var Park = /** @class */ (function () {
    function Park() {
    }
    Park.prototype.saveOrUpdate = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, result, park, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params.ruleArr = params.ruleArr ? params.ruleArr.split(',') : [];
                        if (!params.parkId) return [3 /*break*/, 2];
                        _id = params.parkId;
                        delete params.parkId;
                        return [4 /*yield*/, exports.ParkModel.findByIdAndUpdate({ _id: _id }, params)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, Promise.resolve(result)];
                    case 2:
                        park = new exports.ParkModel(params);
                        return [4 /*yield*/, park.save()];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, Promise.resolve(result)];
                }
            });
        });
    };
    Park.prototype.selectAllPark = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, exports.ParkModel.find()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Park.prototype.findParkList = function (pageNum, pageSize) {
        if (pageNum === void 0) { pageNum = '0'; }
        if (pageSize === void 0) { pageSize = '10'; }
        return __awaiter(this, void 0, void 0, function () {
            var park;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(pageNum, pageSize);
                        return [4 /*yield*/, exports.ParkModel.find().limit(Number(pageSize)).skip(Number(pageNum) * Number(pageSize))];
                    case 1:
                        park = _a.sent();
                        park.forEach(function (item) { return __awaiter(_this, void 0, void 0, function () {
                            var ruleArr, ruleList;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        ruleArr = item.ruleArr;
                                        return [4 /*yield*/, bill_1.BillMode.find()["in"]("_id", ruleArr)];
                                    case 1:
                                        ruleList = _a.sent();
                                        item.toObject().ruleList = ruleList;
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/, Promise.resolve(park)];
                }
            });
        });
    };
    return Park;
}());
exports["default"] = new Park();
