"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var readJSON = function (location) {
    return JSON.parse(fs.readFileSync(location, { encoding: "utf-8" }));
};
var writeJSON = function (location, json) {
    return fs.writeFileSync(location, JSON.stringify(json), { encoding: "utf-8" });
};
var KeyValueDB = /** @class */ (function () {
    function KeyValueDB(location, syncThreshold) {
        if (syncThreshold === void 0) { syncThreshold = 200; }
        this.data = {};
        if (!location)
            return;
        this.location = location;
        this.threshold = syncThreshold;
        try {
            if (!fs.existsSync(this.location))
                fs.writeFileSync(this.location, {});
            else
                this.data = readJSON(this.location);
        }
        catch (err) {
            console.error(err);
        }
    }
    KeyValueDB.prototype.set = function (key, value) {
        this.data[key] = value;
        this.sync();
        return key;
    };
    KeyValueDB.prototype.get = function (key) {
        return this.data[key];
    };
    KeyValueDB.prototype.has = function (key) {
        return key in this.data;
    };
    KeyValueDB.prototype.getAll = function () {
        return Object.entries(this.data);
    };
    KeyValueDB.prototype.sync = function () {
        var _this = this;
        if (!this.location)
            return;
        if (this.threshold > 0) {
            clearTimeout(this.syncTimer);
            this.syncTimer = setTimeout(function () { try {
                writeJSON(_this.location, _this.data);
            }
            catch (err) {
                console.error(err);
            } }, this.threshold);
        }
        else
            writeJSON(this.location, this.data);
    };
    return KeyValueDB;
}());
exports.KeyValueDB = KeyValueDB;
