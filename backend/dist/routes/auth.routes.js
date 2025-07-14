"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router.post('/register', auth_controller_1.AuthController.register);
router.post('/login', auth_controller_1.AuthController.login);
router.post('/send-otp', auth_controller_1.AuthController.sendLoginOTP);
router.post('/verify-otp', auth_controller_1.AuthController.verifyOTP);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map