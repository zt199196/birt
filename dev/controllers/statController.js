/**
 * Created by zhangtao on 2015/4/27.
 */
var dbService = require('../lib/dbService');
var pageService = require('../lib/pageService');
var moment = require('moment');

var controller = {};


controller.line_template = function (req, res, next) {
    var startDate = req.body.startDate || moment().subtract(7, 'days').format("YYYY-MM-DD");
    var endDate = req.body.endDate || moment().format("YYYY-MM-DD");
    var sql = '';
    //dbService.psQuery(sql, [startDate, endDate], function (result) {
    //测试数据
    result = [{dt: '2015-01-01', activenum: 1, totalnum: 2, activetimes: 3},
        {dt: '2015-01-02', activenum: 8, totalnum: 7, activetimes: 9},
        {dt: '2015-01-03', activenum: 6, totalnum: 3, activetimes: 2},
        {dt: '2015-01-04', activenum: 3, totalnum: 9, activetimes: 5},
        {dt: '2015-01-05', activenum: 2, totalnum: 9, activetimes: 6}];
    result.dates = [];
    result.activenum = [];
    result.totalnum = [];
    result.activetimes = [];
    for (var i = 0; i < result.length; i++) {
        result.dates.push(result[i].dt);
        result.activenum.push(result[i].activenum);
        result.totalnum.push(result[i].totalnum);
        result.activetimes.push(result[i].activetimes);
    }
    res.render('stat/lineTemplate', {
        title: 'lineTemplate',
        sidebar: 'stat',
        result: result,
        startDate: startDate,
        endDate: endDate
    });
    //});
};

controller.page_list = function (req, res, next) {
    var startDate = req.body.startDate || req.query.startDate || moment().subtract(7, 'days').format("YYYY-MM-DD");
    var endDate = req.body.endDate || req.query.endDate || moment().format("YYYY-MM-DD");
    var pageNo = req.body.pageNo || req.query.pageNo || 1;
    pageNo = parseInt(pageNo);
    var path = req.baseUrl + req.path;
    var pagePath = path + "?startDate=" + startDate + "&endDate=" + endDate + "&pageNo=";
    var count = 0;
    var countSql = "";
    var sql = "";
    //pageService.getDataBySql(sql, countSql, [startDate, endDate], pagePath, pageNo, function (result) {
    result = [{nickname:'1',propertyCount:"2"},
        {nickname:'2',propertyCount:"2"},
        {nickname:'5',propertyCount:"8"},
        {nickname:'3',propertyCount:"2"},
        {nickname:'t',propertyCount:"2"},
        {nickname:'u',propertyCount:"2"},];
    res.render('stat/pageList', {
        title: 'pageList',
        sidebar: 'stat',
        result: result,
        startDate: startDate,
        endDate: endDate
    });
    //});
};

module.exports = controller;
