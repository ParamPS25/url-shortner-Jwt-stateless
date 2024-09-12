const express = require("express");
const UrlController = require("../controllers/urlController");

const router = express.Router();

router.post('/url',UrlController.GenerateNewShortUrl);
router.get('/url',UrlController.listAllUrl)


router.get('/url/analytics/:shortId',UrlController.getAnalytics);

module.exports = router;