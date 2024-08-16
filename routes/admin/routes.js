const express = require("express");
const router = express.Router();
const adminAuthController = require("../../controllers/admin/auth");
const adminUserController = require("../../controllers/admin/admin-user");
const adminShiftController = require("../../controllers/admin/shift");
const adminEmployeeController = require("../../controllers/admin/employee");

router.post("/admin/login", adminAuthController.login);
router.get("/admin/admin-users", adminUserController.fetch);
router.get("/admin/admin-user/:id", adminUserController.view);
router.delete("/admin/admin-user/:id", adminUserController.delete);
router.post("/admin/admin-user", adminUserController.create);
router.put("/admin/admin-user/:id", adminUserController.update);
router.get("/admin/shifts", adminShiftController.fetch);
router.post("/admin/shift", adminShiftController.create);
router.put("/admin/shift/:id", adminShiftController.update);
router.delete("/admin/shift/:id", adminShiftController.delete);
router.get("/admin/shifts/all", adminShiftController.fetchAll);
router.get("/admin/employees", adminEmployeeController.fetch);
router.get("/admin/employee/:id", adminEmployeeController.view);
router.delete("/admin/employee/:id", adminEmployeeController.delete);
router.post("/admin/employee", adminEmployeeController.create);
router.put("/admin/employee/:id", adminEmployeeController.update);

module.exports = router;
