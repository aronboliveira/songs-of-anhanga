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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var next_1 = require("next");
var LoginMainBody_1 = require("../pages/LoginMainBody");
var core_1 = require("@nestjs/core");
var express_1 = require("express");
// import { Next } from "mysql2/typings/mysql/lib/parsers/typeCast";
var database = require("mysql");
var server = (0, express_1.default)();
var resConnectNext = await (function () { return __awaiter(void 0, void 0, void 0, function () {
    var server_1, dev, nextApp, nextHandler_1, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, core_1.NestFactory.create(LoginMainBody_1.default)];
            case 1:
                server_1 = _a.sent();
                dev = process.env.NODE_ENV !== "production";
                nextApp = (0, next_1.default)({ dev: dev });
                nextHandler_1 = nextApp.getRequestHandler();
                return [4 /*yield*/, nextApp.prepare()];
            case 2:
                _a.sent();
                server_1.use(function (req, res) {
                    nextHandler_1(req, res);
                });
                return [4 /*yield*/, server_1.listen(3000)];
            case 3:
                _a.sent();
                return [2 /*return*/, 1];
            case 4:
                err_1 = _a.sent();
                console.error(err_1.message);
                return [2 /*return*/, -1];
            case 5: return [2 /*return*/];
        }
    });
}); })();
console.log(resConnectNext);
var connection = database.createConnection({
    host: "localhost",
    user: "user",
    password: "password",
    database: "database_name",
});
var resConnect = await (function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, connection.connect(function (err) {
                try {
                    if (err) {
                        switch (err.message) {
                            default:
                                throw new Error("Error stablishing connection with database");
                        }
                    }
                    else {
                        return 1;
                    }
                }
                catch (err) {
                    console.log("".concat(err.message));
                    return -1;
                }
            })];
    });
}); })();
console.log(resConnect);
if (resConnect > 0) {
    connection.query("INSERT", [], function (err, result) {
        try {
            if (err)
                throw new Error("Error processing query.");
            else
                console.log("Success processing query: ".concat(result));
        }
        catch (err) {
            console.error("Error processing query: ".concat(err));
        }
    });
}
else
    console.error("Connection with database had no success. Query aborted.");
server.post("/submit-form", function (req, res) {
    console.log(req);
    res.status(200).json({ message: "Fórmulario recebido com sucesso." });
    res.status(404).json({ message: "Erro no recebimento do formulário." });
});
server.get("/request-data", function (req, res) {
    console.log(req);
    res.status(200).json({ message: "Fórmulario enviado com sucesso." });
    res.status(404).json({ message: "Erro de processamento do formulário." });
});
server.listen(3000, function () {
    console.log("Server loaded, working in port 3000");
});
