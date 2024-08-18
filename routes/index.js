const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth");
const UserController = require("../controllers/admin-user");
const BikeController = require("../controllers/bike");
const BikeAssemblyController = require("../controllers/bike-assembly");
const EmployeeController = require("../controllers/employee");
const AuthMiddleware = require("../middleware/auth");

router.post("/login", AuthController.login);
router.post("/refresh-token", AuthController.refresh);
router.get("/admin-users", AuthMiddleware, UserController.fetch);
router.get("/admin-user/:id", AuthMiddleware, UserController.view);
router.delete("/admin-user/:id", AuthMiddleware, UserController.delete);
router.post("/admin-user", AuthMiddleware, UserController.create);
router.put("/admin-user/:id", AuthMiddleware, UserController.update);
router.get("/bikes", AuthMiddleware, BikeController.fetch);
router.post("/bike", AuthMiddleware, BikeController.create);
router.put("/bike/:id", AuthMiddleware, BikeController.update);
router.delete("/bike/:id", AuthMiddleware, BikeController.delete);
router.get("/bikes/all", AuthMiddleware, BikeController.fetchAll);
router.get("/employees", AuthMiddleware, EmployeeController.fetch);
router.get("/employee/:id", AuthMiddleware, EmployeeController.view);
router.delete("/employee/:id", AuthMiddleware, EmployeeController.delete);
router.post("/employee", AuthMiddleware, EmployeeController.create);
router.put("/employee/:id", AuthMiddleware, EmployeeController.update);
router.get("/bike-assemblies", AuthMiddleware, BikeAssemblyController.fetch);
router.post("/bike-assembly", AuthMiddleware, BikeAssemblyController.create);
router.put("/bike-assembly/:id", AuthMiddleware, BikeAssemblyController.update);
router.delete(
  "/bike-assembly/:id",
  AuthMiddleware,
  BikeAssemblyController.delete
);
router.get(
  "/bike-assemblies/all",
  AuthMiddleware,
  BikeAssemblyController.fetchAll
);

module.exports = router;
