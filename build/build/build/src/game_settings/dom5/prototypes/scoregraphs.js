"use strict";
var GameSetting = require("../../prototypes/game_setting.js");
var dom5SettingFlags = require("../../../json/dominions5_setting_flags.json");
var SemanticError = require("../../../errors/custom_errors.js").SemanticError;
var key = "scoregraphs";
module.exports = Scoregraphs;
function Scoregraphs() {
    var _this = this;
    var _value;
    this.getValue = function () { return _value; };
    this.getReadableValue = function () {
        var value = _this.getValue();
        if (value == dom5SettingFlags.NO_SCOREGRAPHS)
            return "Completely disabled";
        if (value == dom5SettingFlags.INVISIBLE_SCOREGRAPHS)
            return "Visible hrough sites/magic";
        if (value == dom5SettingFlags.VISIBLE_SCOREGRAPHS)
            return "Always visible";
        else
            return "Invalid value";
    };
    this.setValue = function (input) {
        var validatedValue = _validateInputFormatOrThrow(input);
        _value = validatedValue;
    };
    this.fromJSON = function (value) {
        if (Number.isInteger(value) === false)
            throw new Error("Expected integer; got " + value);
        _value = value;
    };
    this.translateValueToCmdFlag = function () {
        var value = _this.getValue();
        return ["--scoregraphs", value];
    };
    function _validateInputFormatOrThrow(input) {
        if (Scoregraphs.prototype.isExpectedFormat(input) === false)
            throw new SemanticError("Invalid value format for the scoregraphs.");
        return +input.replace(/\D*/, "");
    }
}
//sets the base object to be instanced from the GameSetting
//constructor, with all its properties included. These will 
//be shared across all instances of the Scoregraphs constructor.
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf
Scoregraphs.prototype = new GameSetting(key);
Scoregraphs.prototype.constructor = Scoregraphs;
Scoregraphs.prototype.getPrompt = function () { return Scoregraphs.prototype.getDescription(); };
//# sourceMappingURL=scoregraphs.js.map