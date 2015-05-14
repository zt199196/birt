/**
 * Created by zhangtao on 2015/4/27.
 */
var service = {};
var dbService = require('../lib/dbService');

service.getDataBySql = function (sql, countSql, params, pagePath, pageNo, callback) {
    dbService.psQuery(countSql, params, function (__result) {
        params.push((pageNo - 1) * 15);
        dbService.psQuery(sql, params, function (result) {
            var count = __result[0].count;
            //console.log('result:' + JSON.stringify(result));
            var pageStr = '<ul class="am-pagination"> ';
            var totalPageNo = Math.floor(count / 15);
            if (count % 15 != 0) {
                totalPageNo++;
            }
            /**
             * 生成头
             */
            if (pageNo > 1) {
                pageStr += '<li><a href="' + pagePath + (pageNo - 1) + '">«</a></li>';
            } else {
                pageStr += '<li class="am-disabled"><a href="#">«</a></li>';
            }

            /**
             * 生成中间内容
             */
            if (totalPageNo <= 11) {
                for (var i = 0; i < totalPageNo; i++) {
                    var curPageNo = i + 1;
                    if (curPageNo == pageNo) {
                        pageStr += '<li class="am-active"><a href="' + pagePath + curPageNo + '">' + curPageNo + '</a></li>';
                    } else {
                        pageStr += '<li><a href="' + pagePath + curPageNo + '">' + curPageNo + '</a></li>';
                    }
                }
            } else {
                if (pageNo < 5) {
                    for (var i = 1; i <= 11; i++) {
                        if (pageNo == i)
                            pageStr += '<li class="am-active"><a href="' + pagePath + i + '">' + i + '</a></li>';
                        else
                            pageStr += '<li><a href="' + pagePath + i + '">' + i + '</a></li>';
                    }
                } else {
                    var prePageNum = 5;
                    if (totalPageNo - pageNo < 5) {
                        prePageNum += (5 - (totalPageNo - pageNo));
                    }
                    for (var i = prePageNum; i > 0; i--) {
                        pageStr += '<li><a href="' + pagePath + (pageNo - i) + '">' + (pageNo - i) + '</a></li>';
                    }
                    pageStr += '<li class="am-active"><a href="' + pagePath + (pageNo - i) + '">' + (pageNo - i) + '</a></li>';
                    for (var i = 0; i < 5; i++) {
                        if (pageNo + i + 1 > totalPageNo)
                            break;
                        pageStr += '<li><a href="' + pagePath + (pageNo + i + 1) + '">' + (pageNo + i + 1) + '</a></li>';
                    }
                }
            }

            /**
             * 生成后面内容
             */
            if (totalPageNo > pageNo) {
                pageStr += '<li><a href="' + pagePath + (pageNo + 1) + '">»</a></li>';
            } else {
                pageStr += '<li class="am-disabled" ><a href="#">»</a></li>';
            }

            pageStr += '</ul>';
            result.pageStr = pageStr;
            result.pageNo = pageNo;
            result.count = count;
            callback(result);
        });
    });
};

module.exports = service;