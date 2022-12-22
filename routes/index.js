const express = require("express");
const authmdw = require("../middleware/auth_middleware");
const AdminRouter = require("./Admin");
const AuthRouter = require("./auth");
const categoryRouter = require("./category");
const OverviewRouter = require("./overview");
const QuesRoute = require("./questions");
const SessionRoute = require("./Session");
const UserRouter = require("./User");
const router = express.Router();

router.use("/auth", AuthRouter)
router.use("/user", UserRouter);
router.use("/category",  categoryRouter);


router.use("/questions", QuesRoute);
router.use("/admin", AdminRouter);
router.use("/session", SessionRoute);
router.use("/overview", OverviewRouter);

module.exports = router;
