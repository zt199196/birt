var express = require('express');
var auth = require('../dev/middlewares/auth');
var router = express.Router();

var statController = require('../dev/controllers/statController');

/* 获取新增用户数据 */
router.all(['/lineTemplate', '/'], auth.userRequired, statController.line_template);

/* 获取用户活动排名 */
router.all('/pageList', auth.userRequired, statController.page_list);

module.exports = router;
