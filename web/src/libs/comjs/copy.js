
/****
 导航生成和交互js模块

 1.2版本增加是否显示个人信息模块
 ****/

    //var qkydata=require("../define/qkydata");//获取默认数据
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
        "favoriteapp": {//个性化设置app
            // "教育管理": [["校园办公", "href='#'"], ["校产管理", "href='#'"], ["基础数据管理", "href='#'"]],
            // "教育大数据": [["基础数据分析", "href='#'"], ["综合素质分析", "href='#'"], ["学业水平分析", "href='#'"], ["微校园使用分析", "href='#'"]],
            // "教务管理": [["课务管理", "href='#'"], ["考务管理", "href='#'"], ["成绩管理", "href='#'"], ["资源中心", "href='#'"], ["个人资源", "href='#'"]],
            // "资源平台": [["资源中心", "href='#'"], ["个人资源", "href='#'"]],
            // "教师专业发展": [["教师业务档案", "href='#'"], ["教师成长档案", "href='#'"], ["教师培训", "href='#'"], ["教师考勤", "href='#'"], ["教师家访", "href='#'"]],
            // "学生学业成长": [["学生电子信息", "href='#'"], ["综合素质评价", "href='#'"], ["学生成绩", "href='#'"], ["班级圈", "href='#'"], ["学生请假", "href='#'"]],
            // "校园管理": [
            //     ["校园迎新", "href='#'"], ["门户管理", "href='#'"], ["校园缴费", "href='#'"],
            //     ["就餐管理", "href='#'"], ["宿舍管理", "href='#'"], ["电子图书馆", "href='#'"],
            //     ["空间预约管理", "href='#'"], ["车辆预约管理", "href='#'"], ["党工团管理", "href='#'"],
            //     ["信访管理", "href='#'"], ["运动会管理", "href='#'"], ["条形码打印管理", "href='#'"],
            //     ["校园服务岗", "href='#'"], ["校园吉尼斯", "href='#'"], ["校友家园", "href='#'"],
            //     ["电子班牌", "href='#'"], ["一卡通", "href='#'"], ["考勤管理", "href='#'"]
            // ],
            // "通用功能": [["通知公告", "href='#'"], ["通讯录", "href='#'"], ["行事历", "href='#'"], ["个人网盘", "href='#'"], ["调查问卷", "href='#'"]],
        },
        "allapp": {//所有app
            // "教育管理": [["校园办公", "href='#'"], ["校产管理", "href='#'"], ["基础数据管理", "href='#'"]],
            // "教育大数据": [["基础数据分析", "href='#'"], ["综合素质分析", "href='#'"], ["学业水平分析", "href='#'"], ["微校园使用分析", "href='#'"]],
            // "教务管理": [["课务管理", "href='#'"], ["考务管理", "href='#'"], ["成绩管理", "href='#'"], ["资源中心", "href='#'"], ["个人资源", "href='#'"]],
            // "资源平台": [["资源中心", "href='#'"], ["个人资源", "href='#'"]],
            // "教师专业发展": [["教师业务档案", "href='#'"], ["教师成长档案", "href='#'"], ["教师培训", "href='#'"], ["教师考勤", "href='#'"], ["教师家访", "href='#'"]],
            // "学生学业成长": [["学生电子信息", "href='#'"], ["综合素质评价", "href='#'"], ["学生成绩", "href='#'"], ["班级圈", "href='#'"], ["学生请假", "href='#'"]],
            // "校园管理": [
            //     ["校园迎新", "href='#'"], ["门户管理", "href='#'"], ["校园缴费", "href='#'"],
            //     ["就餐管理", "href='#'"], ["宿舍管理", "href='#'"], ["电子图书馆", "href='#'"],
            //     ["空间预约管理", "href='#'"], ["车辆预约管理", "href='#'"], ["党工团管理", "href='#'"],
            //     ["信访管理", "href='#'"], ["运动会管理", "href='#'"], ["条形码打印管理", "href='#'"],
            //     ["校园服务岗", "href='#'"], ["校园吉尼斯", "href='#'"], ["校友家园", "href='#'"],
            //     ["电子班牌", "href='#'"], ["一卡通", "href='#'"], ["考勤管理", "href='#'"]
            // ],
            // "通用功能": [["通知公告", "href='#'"], ["通讯录", "href='#'"], ["行事历", "href='#'"], ["个人网盘", "href='#'"], ["调查问卷", "href='#'"]],
        },
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
    //var qkyhtml=require("../define/qkyhtml");//获取默认要加载html
    //var getpy=require("./getpy");//拼音获取引用


    var opts=qkydata.navdata;


    $.fn.extend({
        "qkynav": function (options) {
            //检测用户传进来的参数是否合法

            if (!isValid(options))
                return this;
            opts = $.extend({}, opts, options); //使用jQuery.extend 覆盖插件默认参数
            return this.each(function (i) {
                var thisdiv=$(this);

                htmlajax("dist/define/qkynav.html",function(thishtml){

                    thisdiv.html(thishtml);


                    //初始化数据
                    $(".nav_logo img").attr("src",opts.logosrc);

                    $(".nav_pjname").html(opts.pjname);

                    $(".other_name").html(opts.tea_info.name);

                    tofor($("#navbar .nav"),opts.navli,"lia",opts.navli_active);

                    //是否显示个人信息
                    if(opts.isinfo){
                        $(".nav_other").removeClass("yc");
                        tofor($("#otherli"),opts.otherli,"lia");

                        if(opts.tea_info.isphoto){
                            $(".user_photo").removeClass("dist").html("<img src='"+opts.tea_info.photo+"' />");
                        }else{
                            $(".user_photo").addClass("dist");
                        }

                        //获取未读消息并渲染
                        var newsdata=qkydata.news_analogdata;
                        $(".nav_news_badge").html(qkydata.news_analogdata.length>99 ? 99 : qkydata.news_analogdata.length);
                        for(var i=0;i<newsdata.length;i++){
                            if(i<5){//只显示5条
                                //var appicon=getpy.getpy(newsdata[i].appname);//获取应用名的拼音
                                var appicon="AAA";//获取应用名的拼音
                                if($.inArray(appicon,qkydata.haveicon)!=-1){//判断是否有图标了，有的话就加上图标，没有就显示默认app图标
                                    $("#nav_news_li_mould .app_icon").html('<img src="images/appicon/'+appicon+'.png" alt="">');
                                }else{
                                    $("#nav_news_li_mould .app_icon").html("APP");
                                }
                                $("#nav_news_li_mould .nav_news_name").html(newsdata[i].newsname);
                                $("#nav_news_li_mould .nav_news_times").html(newsdata[i].newsgettime);
                                $("#nav_news_li_mould .nav_news_appname").html(newsdata[i].appname);
                                $("#nav_news_li_mould .nav_news_cont").html(newsdata[i].newscont);
                                $(".nav_news_libox").append($("#nav_news_li_mould").html());
                            }
                        }
                        $(".nav_news_icon").click(function(){
                            $(this).parent().find(".nav_news_popup").slideToggle(200);
                            $(this).find("span").hide();
                        });

                    }
                    //是否显示更多弹窗
                    if(opts.morebtn){
                        $(".navbtn").on("click",function(){
                            $(".nav_more").slideToggle(100);
                            $(this).toggleClass("active");
                        });
                        tofor($("#common"),opts.common,"a");//渲染常用app
                        tofor($("#lately"),opts.lately,"a");//渲染最近app
                        //渲染全部app
                        var rowi=0;
                        for(var key in opts.allapp){
                            console.log(22222);
                            $("#nav_more_lli_mould h5 span").html(key);
                            tofor($("#nav_more_lli_mould .li_a"),opts.allapp[key],"a");
                            if(rowi%2==0){
                                $(".row_left").append($("#nav_more_lli_mould").html());
                            }else{
                                $(".row_right").append($("#nav_more_lli_mould").html());
                            }
                            $("#nav_more_lli_mould .li_a").html("");
                            rowi++;
                        }

                    }else{
                        $(".navbtn").hide();
                    }

                    //创建设置弹窗
                    $("body").append($("#modal_mould").html());
                    $("#modal_mould,#nav_more_lli_mould,#nav_news_li_mould").remove();
                    opts.setup();
                });
            });
        }
    });


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

    //私有方法，检测参数是否合法
    function isValid(options) {
        return !options || (options && typeof options === "object") ? true : false;
    }

    //异步获取html
    function htmlajax(url,sucfun){
        var urlhtml="";
        $.ajax({
            url: url,
            cache: false,
            success: function(html){
                sucfun(html);
            }
        });
    }
