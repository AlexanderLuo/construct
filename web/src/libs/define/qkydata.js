/****
 默认数据存放
 ****/
var titleParam = JSON.parse(window.localStorage.getItem('titleParam'));
var serviceMode = JSON.parse(window.localStorage.getItem("project")).serviceMode;
var categoryAndFunc = JSON.parse(window.localStorage.getItem("urlConfig")).categoryAndFunc;
var project = JSON.parse(window.localStorage.getItem("project"))
var data = {};//存储全部app
var jumpData = {}//跳转数据
var myFavoriteAppList = {};//个性化设置app
var commonAppList = {};//常用app
var latelyAppList = {}; //最近访问app

//获取最近访问app
function getLatelyapp() {
    $.ajax({
        url: "/desktop/getRecentFunc?userType=" + titleParam.userType + "&schoolCode=" + titleParam.schoolCode,
        async: false,
        success: function (result) {
            latelyAppList = result.bizData;
        },
        onError: function () {
        }
    })
    return latelyAppList;
}

//获取常用应用
function getCommentapp() {

    $.ajax({
        url: "/favorite/queryCommon",
        Type: "post",
        data: {
            uid: titleParam.uid,
        },
        async: false,
        isXhr: true,
        success: function (result) {
            commonAppList = result.bizData;
        },
        onError: function () {
        }
    })
    return commonAppList;
}
//获取全部应用
function getAppFunc() {
    $.ajax({
        url: categoryAndFunc,
        Type: "post",
        data: {
            userType: titleParam.userType,
            schoolCode: titleParam.schoolCode,
            agencyCode: titleParam.agencyCode,
            uid: titleParam.uid,
            serviceMode: serviceMode
        },
        async: false,
        isXhr: true,
        success: function (result) {
            jumpData = JSON.parse(JSON.stringify(result.bizData));
            data = result.bizData;
            allData=result.bizData;
        },
        onError: function () {
        }
    })
    return data;
}

//获取个性化设置应用
function getMyFavoriteAppList() {
    $.ajax({
        url: "/esaas/getMyFavoriteAppList",
        Type: "post",
        data: {uid: titleParam.uid},
        async: false,
        isXhr: true,
        success: function (result) {
            if (result.rtnCode = "000000") {
                myFavoriteAppList = result.bizData;
            }
        }
    });
    return myFavoriteAppList;
}

//设置个性化设置应用
function saveMyFavorite(appCode) {
    var appCodeList = "";
    var appCodeCheckList = [];
    for (var i in myFavoriteAppList) {
        if (myFavoriteAppList[i].appCode != appCode) {
            console.log("进来");
            console.log(myFavoriteAppList[i].appCode);
            appCodeCheckList.push(myFavoriteAppList[i].appCode);
        }
    }
    if (appCodeCheckList.length > 0) {
        appCodeList = appCodeCheckList.join(",");
    }
    $.ajax({
        url: "/esaas/saveMyFavorite",
        Type: "post",
        data: {
            appCodeList: appCodeList,
            userType: titleParam.userType,
            uid: titleParam.uid,
            account: titleParam.phone
        },
        async: false,
        isXhr: true,
        success: function (result) {
            console.log("保存设置成功");
        }
    });
}
//添加个性化设置应用
function addMyFavorite(appCode) {
    getMyFavoriteAppList();
    var appCodeCheckList = [];
    for (var i in myFavoriteAppList) {
        appCodeCheckList.push(myFavoriteAppList[i].appCode);
    }
    appCodeCheckList.push(appCode);
    if (appCodeCheckList.length > 0) {
        appCodeList = appCodeCheckList.join(",");
    }
    $.ajax({
        url: "/esaas/saveMyFavorite",
        Type: "post",
        data: {
            appCodeList: appCodeList,
            userType: titleParam.userType,
            uid: titleParam.uid,
            account: titleParam.phone
        },
        async: false,
        isXhr: true,
        success: function (result) {
            $('#addapp').modal('show');
        }
    });
}
//获取停用app
function getStopApp() {
    var datas = JSON.parse(JSON.stringify(data));

    for (var keys in datas.data) {
        for (var j in datas.data[keys]) {
            ischeck = false;
            for (var i in myFavoriteAppList) {
                if (myFavoriteAppList[i].appCode == datas.data[keys][j].appCode) {
                    ischeck = true;
                }
            }
            if (ischeck == true) {
                datas.data[keys].splice(j, 1);
            }
        }
    }
    return datas;
}
//设置常用应用点击\
function commonAdd(data) {
    // console.log(thi);
    if($(".setup_list_.rights").find("a").length <5){
        var appCode = $(data).attr('name')
        var appName = $(data).html();
        $(data).remove();
        $(".setup_list_.rights").append("<a  class='clear'name='"+appCode +"'>" + appName + "<i onclick =' javascript:commonDel(this) ' class='qkyicon_mian close fr'>&#xe63b;</i></a>");
    }
}

//取消常用应用点击
function commonDel(data) {
    var appCode = $(data).parent().attr('name')
    var appName = $(data).parent().text();
    appName = appName.substring(0,appName.length-1);
    $(data).parent().remove();
    $(".setup_list_.lefts").append("<a onclick = javascript:commonAdd(this) class='setupApp' name='"+appCode +"'>" + appName + "</a>")
}

function jump(name) {
    // var url = $(this).attr("name");
    // var ss = name.split(",");
    // var datas = jumpData.data[ss[0]][ss[1]];
    // var url = datas.url;
    // console.log(url);
    // var type = datas.jumpType;
    var type = 1;
    //初始化信息
    var isLoaded = window.localStorage.getItem("isLoad");
    if (!isLoaded) {
        window.location = "/";
    }
    var access_token = window.localStorage.getItem("access_token");
    var access_tokens = access_token.substring(1, access_token.length - 1);
    var url = "/user/ssoJump?appCode=" + name +"&redirectUrl="+getLoginSourceByEncode();
    window.open(url);
}

function  getLoginSourceByEncode() {
    return encodeURIComponent('http://' + window.document.location.host);
};

function jumpSSO(url, isBlank, uid, args) {
    isBlank = isBlank || 0;         //0-新窗口，1-当前窗口
    url = getSSOUrl(url);
    //蜂巢统计
    // if (!isNull(args)) {
    //     statistic("enter", uid, args);
    // }
    if (isBlank == 0) {
        window.open(url);
    } else {
        window.location.href = url;
    }
}
function getSSOUrl(url) {
    if (typeof(url) != "undefined" && url != "") {
        if (url[url.length - 1] == "?") {
            url = url.substr(0, url.length - 1);
        }
        var symbol = "?";
        if (url.indexOf("?") > 0) {
            symbol = "&";
        }
        if (url.endWith("ignore") == false) {
            // var titleParam = store.get("titleParam");
            titleParam.schoolCode = isNull(titleParam.schoolCode) ? "" : titleParam.schoolCode;
            titleParam.agencyCode = isNull(titleParam.agencyCode) ? "" : titleParam.agencyCode;
            var access_token = window.localStorage.getItem("access_token");
            var access_tokens = access_token.substring(1, access_token.length - 1);
            url = url + symbol + "access_token=" + access_tokens + "&usertype=" + titleParam.tag + "&uid=" + titleParam.uid + "&schoolCode=" + titleParam.schoolCode + "&agencyCode=" + titleParam.agencyCode + "&loginSource=" + getLoginSourceByEncode();
            //额外增加手机号
            if (!isNull(titleParam.phone)) {
                url = url + "&phone=" + titleParam.phone;
            }
            //全课通
            if (url.indexOf("qkt") >= 0) {
                url = url + "&" + titleParam.qktKey;
            }
        } else {
            //参数
            // var titleParam = store.get("titleParam");
            titleParam.schoolCode = isNull(titleParam.schoolCode) ? "" : titleParam.schoolCode;
            titleParam.agencyCode = isNull(titleParam.agencyCode) ? "" : titleParam.agencyCode;
            var access_token = window.localStorage.getItem("access_token");
            var access_tokens = access_token.substring(1, access_token.length - 1);
            url = url + symbol + "access_token=" + access_tokens + "&usertype=" + titleParam.tag + "&uid=" + titleParam.uid + "&schoolCode=" + titleParam.schoolCode + "&agencyCode=" + titleParam.agencyCode + "&loginSource=" + getLoginSourceByEncode();
            //额外增加手机号
            if (!isNull(titleParam.phone)) {
                url = url + "&phone=" + titleParam.phone;
            }
        }
    }
    console.log(url);
    return url;
}

//埋点方法
function statistic(action, distinctId, args) {
    try {
        honeycomb.identify(distinctId);
        var env_s = "dev";
        if (location.href.indexOf("localhost") > -1 || location.href.indexOf("dev") > -1) {
            env_s = "dev";
        } else {
            env_s = "pro";
        }
        honeycomb.init("qky", {env: env_s});
        honeycomb.track(action, args);
        console.log(action + "埋点成功", distinctId, args);
    } catch (e) {
        console.log(action + "埋点失败", distinctId, args);
    }
}

function isNull(obj) {
    if (typeof(obj) == "undefined" || obj == "undefined") {
        return true;
    } else {
        return (obj == null || obj.length <= 0 ) ? true : false;
    }
}


// js中String添加replaceAll 方法
String.prototype.replaceAll = function (a, b) {
    var reg = new RegExp(a, "g");
    return this.replace(reg, b);
};
// js中String添加startWith方法
String.prototype.startWith = function (str) {
    var reg = new RegExp("^" + str);
    return reg.test(this);
}
// js中String添加endWith方法
String.prototype.endWith = function (str) {
    var reg = new RegExp(str + "$");
    return reg.test(this);
}
//js中数组添加indexOf方法
Array.prototype.indexOf = function (str) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == str) return i;
    }
    return -1;
};
function getLoginSourceByEncode() {
    return encodeURIComponent('http://' + window.document.location.host);
}

define({
    navdata: {
        /*导航数据*/
        "logosrc": "images/nav_logo/qky-logo.png",
        "pjname": "初始页面",
        "navli": [["导航1", "href='#'"], ["导航2", "href='#'"], ["导航3", "href='#'"]],
        "navli_active": 0,
        "moreli": {
            "校园办公": ["xiaoyuanbangong", [["个人办公", "href='#'"], ["行政办公", "href='#'"], ["流程审批", "href='#'"]]],
            "校园支付": ["xiaoyuanzhifu", [["个人办公", "href='#'"], ["行政办公", "href='#'"], ["流程审批", "href='#'"]]],
            "智慧教学": ["zhihuijiaoxue", [["个人办公", "href='#'"], ["行政办公", "href='#'"], ["流程审批", "href='#'"]]]
        },
        "morebtn": true,
        "common": [//常用app
            // ["电子图书馆", "href='#'"], ["校友家园", "href='#'"],
            // ["考勤管理", "href='#'"], ["党工团管理", "href='#'"],
            // ["一卡通", "href='#'"], ["校园缴费", "href='#'"],
            // ["车辆预约管理", "href='#'"], ["教育大数据分析", "href='#'"],
            // ["校园服务岗", "href='#'"], ["校产管理", "href='#'"]
        ],
        "navCommon":[],
        "commonAppCode":[],
        "lately": [//最近使用app
            // ["教育大数据分析", "href='#'"], ["校园缴费", "href='#'"],
            // ["就餐管理", "href='#'"], ["电子班牌", "href='#'"],
            // ["车辆预约管理", "href='#'"], ["教师培训", "href='#'"],
            // ["空间预约管理", "href='#'"], ["教师业务档案", "href='#'"],
            // ["校园服务岗", "href='#'"]
        ],
        "appCodeList":[],
        "nonavigation": [//个性化设置app
            // "教育管理":[["校园办公","href='#'"],["校产管理","href='#'"],["基础数据管理","href='#'"]],
        ],
        "appCodeList": [],
        "stopAppList": [],
        "navigation": [//个性化设置app
            // "教育管理":[["校园办公","href='#'"],["校产管理","href='#'"],["基础数据管理","href='#'"]],
        ],
        "nofavoriteapp":[],
        "favoriteapp": [//个性化设置app
            // "教育管理":[["校园办公","href='#'"],["校产管理","href='#'"],["基础数据管理","href='#'"]],
        ],
        "allapp": {//所有app
            // "教育管理":[["校园办公","href='#'"],["校产管理","href='#'"],["基础数据管理","href='#'"]],
            // "教育大数据":[["基础数据分析","href='#'"],["综合素质分析","href='#'"],["学业水平分析","href='#'"],["微校园使用分析","href='#'"]],
            // "教务管理":[["课务管理","href='#'"],["考务管理","href='#'"],["成绩管理","href='#'"],["资源中心","href='#'"],["个人资源","href='#'"]],
            // "资源平台":[["资源中心","href='#'"],["个人资源","href='#'"]],
            // "教师专业发展":[["教师业务档案","href='#'"],["教师成长档案","href='#'"],["教师培训","href='#'"],["教师考勤","href='#'"],["教师家访","href='#'"]],
            // "学生学业成长":[["学生电子信息","href='#'"],["综合素质评价","href='#'"],["学生成绩","href='#'"],["班级圈","href='#'"],["学生请假","href='#'"]],
            // "校园管理":[
            // 	["校园迎新","href='#'"],["门户管理","href='#'"],["校园缴费","href='#'"],
            // 	["就餐管理","href='#'"],["宿舍管理","href='#'"],["电子图书馆","href='#'"],
            // 	["空间预约管理","href='#'"],["车辆预约管理","href='#'"],["党工团管理","href='#'"],
            // 	["信访管理","href='#'"],["运动会管理","href='#'"],["条形码打印管理","href='#'"],
            // 	["校园服务岗","href='#'"],["校园吉尼斯","href='#'"],["校友家园","href='#'"],
            // 	["电子班牌","href='#'"],["一卡通","href='#'"],["考勤管理","href='#'"]
            // ],
            // "通用功能":[["通知公告","href='#'"],["通讯录","href='#'"],["行事历","href='#'"],["个人网盘","href='#'"],["调查问卷","href='#'"]],
        },
        "isinfo": true,//是否支持登录显示个人信息
        "tea_info": {"name": "张晓明", "isphoto": false, "photo": "images/tx01.png"},
        "otherli": [["切换身份", "href='/html/role.html'"], ["账户设置", "href='account_settings.html'"], ["个人设置", "href='#'"], ["退出", "id='toOut'"]],
        setup: function () {
            $(".setup").on("click", function () {
                $("#comapp_setup").modal('show');
            });
        }
    },
    news_analogdata: [/*推送消息模拟数据*/
        {
            appname: "学习管理平台",
            newsname: "在线测试开放答题",
            newsgettime: "2017-03-28 13:00",
            newscont: "课程西方近代史的测试第一阶段测试已于2017-03-28 13:00开放答题"
        },
        {
            appname: "考务管理",
            newsname: "测试已截止",
            newsgettime: "2017-03-28 13:00",
            newscont: "课程中国文化概论的测试课后小练习已于2017-03-28 10:30截止"
        },
        {
            appname: "作业管理",
            newsname: "课程成员加入",
            newsgettime: "2017-03-28 09:12",
            newscont: "新的成员学生张小画加入课程设计概论"
        },
        {
            appname: "校园办公",
            newsname: "作业互评已经截止",
            newsgettime: "2017-03-27 15:00",
            newscont: "课程西方近代史的作业课后作业已于2017-03-27 15:00截止互评，去查看互评结果并批改作业吧"
        },
        {
            appname: "考务管理",
            newsname: "作业提交",
            newsgettime: "2017-03-27 11:00",
            newscont: "课程中国文化概论的作业文化解析已有6名学生提交，提交率23%"
        },
        {
            appname: "考务管理",
            newsname: "作业提交",
            newsgettime: "2017-03-27 11:00",
            newscont: "课程中国文化概论的作业文化解析已有6名学生提交，提交率23%"
        }
    ],
    //已经有的图标名记录数组;
    haveicon: ["changyongshezhi", "wangshangwenjuan", "xiaoyuanbangong", "xiaoyuanzhifu", "yidongxiaoyuan", "zhihuikongjian", "zhihuixiaoyuan", "zhinengpaike", "zhinengxiaoyuan", "zonghepingjia", "zonghesuzhifenxi", "zonghesuzhipingjia", "jichushujufenxi", "jiaoshichengchangdangan", "xuexiguanlipingtai"]
});