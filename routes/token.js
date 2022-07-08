const express = require("express");
const router = express.Router();

const handleErrors = require("../middleware/handleErrors");

const RefreshTokenController = require("../controllers/Token/RefreshToken");

router.get("/refresh", RefreshTokenController);

router.use(handleErrors);

module.exports = router;
