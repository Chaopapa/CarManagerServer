"use strict";
exports.__esModule = true;
var CodeType;
(function (CodeType) {
    CodeType["SUCCESS"] = "0000";
    CodeType["FAIL"] = "1111";
    CodeType["EMPTY"] = "0204";
})(CodeType = exports.CodeType || (exports.CodeType = {}));
var ResError = /** @class */ (function () {
    function ResError(error) {
        this.message = '';
        this.message = error.message;
        this.code = CodeType.FAIL;
    }
    return ResError;
}());
exports.ResError = ResError;
