const express = require("express");
const router = express.Router();
const adminAuthController = require("../../controllers/admin/auth");
const adminUserController = require("../../controllers/admin/admin-user");
const adminBikeController = require("../../controllers/admin/bike");
const adminEmployeeController = require("../../controllers/admin/employee");
const authMiddleware = require("../../middleware/auth");

router.post("/admin/login", adminAuthController.login);
router.post("/admin/refresh-token", adminAuthController.refresh);
router.get("/admin/admin-users", authMiddleware, adminUserController.fetch);
router.get("/admin/admin-user/:id", authMiddleware, adminUserController.view);
router.delete(
  "/admin/admin-user/:id",
  authMiddleware,
  adminUserController.delete
);
router.post("/admin/admin-user", authMiddleware, adminUserController.create);
router.put("/admin/admin-user/:id", authMiddleware, adminUserController.update);
router.get("/admin/bikes", authMiddleware, adminBikeController.fetch);
router.post("/admin/bike", authMiddleware, adminBikeController.create);
router.put("/admin/bike/:id", authMiddleware, adminBikeController.update);
router.delete("/admin/bike/:id", authMiddleware, adminBikeController.delete);
router.get("/admin/bikes/all", authMiddleware, adminBikeController.fetchAll);
router.get("/admin/employees", authMiddleware, adminEmployeeController.fetch);
router.get("/admin/employee/:id", authMiddleware, adminEmployeeController.view);
router.delete(
  "/admin/employee/:id",
  authMiddleware,
  adminEmployeeController.delete
);
router.post("/admin/employee", authMiddleware, adminEmployeeController.create);
router.put(
  "/admin/employee/:id",
  authMiddleware,
  adminEmployeeController.update
);

module.exports = router;
