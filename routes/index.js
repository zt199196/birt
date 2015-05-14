var express = require('express');
var router = express.Router();

/* 默认进入新增用户页面，未登陆则返回登陆页面*/
router.get('/', function (req, res, next) {
    res.redirect('/stat');
});

/* 进入登陆页面*/
router.get('/login', function (req, res, next) {
    res.render('login', {title: 'login'});
});

/*用户进行登陆*/
router.post('/login', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var rememberMe = req.body.rememberMe;
    if (username == 'admin' && password == 'admin') {
        if (rememberMe && rememberMe == 1) {
            res.cookie('pengsi', new Buffer('admin').toString('base64'), {
                path: '/',
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            });
        } else {
            res.cookie('pengsi', new Buffer('pengsi').toString('base64'), {path: '/'});
            res.redirect('/stat');
        }
    } else {
        res.render('login', {title: 'login', message: '用户名/密码不正确'});
    }
});

/* 用户退出登陆*/
router.all('/logout', function (req, res, next) {
    res.clearCookie('pengsi', {});
    res.render('login', {title: 'login'});
});

module.exports = router;
