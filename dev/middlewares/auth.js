/**
 * 需要登录
 */
exports.userRequired = function (req, res, next) {
    /**
     * 如果用户已登陆，直接进入首页
     */
    if (req.cookies.pengsi == new Buffer('pengsi').toString('base64')) {
        next();
    } else {
        res.redirect('/login');
    }
};