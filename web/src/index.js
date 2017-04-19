/**
 * Created by Administrator on 2017/4/12 0012.
 */



var nav=require("./dev/qkynav.html")
var logo=require('./images/nav_logo/qky-logo.png')
require("./dev/content")
require("./dev/footer")


avalon.component('ms-nav', {
    template:nav,
    defaults: {
        logo:logo,
        title:"页面",
        userName:"迈克尔",
        curPage:'',
        open:function(){
            $(".nav_more").slideToggle(100);
            $(".navbtn").toggleClass("active");
        },
        onReady:function() {
            $(".nav_news_icon").click(function(){
                $(this).parent().find(".nav_news_popup").slideToggle(200);
                $(this).find("span").hide();
            });
        }
    }
});

var qkydata={
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
            ["电子图书馆", "href='#'"], ["校友家园", "href='#'"],
            ["考勤管理", "href='#'"], ["党工团管理", "href='#'"],
            ["一卡通", "href='#'"], ["校园缴费", "href='#'"],
            ["车辆预约管理", "href='#'"], ["教育大数据分析", "href='#'"],
            ["校园服务岗", "href='#'"], ["校产管理", "href='#'"]
        ],
        "lately": [//最近使用app
            ["教育大数据分析", "href='#'"], ["校园缴费", "href='#'"],
            ["就餐管理", "href='#'"], ["电子班牌", "href='#'"],
            ["车辆预约管理", "href='#'"], ["教师培训", "href='#'"],
            ["空间预约管理", "href='#'"], ["教师业务档案", "href='#'"],
            ["校园服务岗", "href='#'"]
        ],
        "favoriteapp": {},
        "allapp": {},
        "isinfo": true,//是否支持登录显示个人信息
        "tea_info": {"name": "张晓明", "isphoto": false, "photo": "images/tx01.png"},
        "otherli": [["个人空间", "href='#'"], ["账户设置", "href='#'"], ["帮助中心", "href='#'"], ["退出", "id='toOut'"]],
        setup: function () {
            $(".setup").on("click", function () {
                $("#comapp_setup").modal('show');
            });
        }
    },
    news_analogdata: [
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
    haveicon: ["changyongshezhi", "wangshangwenjuan", "xiaoyuanbangong", "xiaoyuanzhifu", "yidongxiaoyuan", "zhihuikongjian", "zhihuixiaoyuan", "zhinengpaike", "zhinengxiaoyuan", "zonghepingjia", "zonghesuzhifenxi", "zonghesuzhipingjia", "jichushujufenxi", "jiaoshichengchangdangan", "xuexiguanlipingtai"] //已经有的图标名记录数组;
}
var opts=qkydata.navdata;
function tofor(id,data_arr,type,avt) {
    for(var i=0;i<data_arr.length;i++){
        var thishtml="";
        if(type=="lia"){
            thishtml="<li><a "+data_arr[i][1]+">"+data_arr[i][0]+"</a></li>";
            if(i==avt)thishtml="<li class='active'><a "+data_arr[i][1]+">"+data_arr[i][0]+"</a></li>";
        }else{
            thishtml="<a "+data_arr[i][1]+">"+data_arr[i][0]+"</a>";
        }
        id.append(thishtml);
    }
};
