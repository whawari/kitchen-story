const express = require("express");
const router = express.Router();

const handleErrors = require("../middleware/handleErrors");

const RefreshAccessTokenController = require("../controllers/Token/RefreshAccessToken");

router.get("/refresh-access", RefreshAccessTokenController);

router.use(handleErrors);

module.exports = router;
