/****
 导航生成和交互js模块

 1.2版本增加是否显示个人信息模块
 ****/

define(function (require) {
    var qkydata = require("./qkydata");//获取默认数据
    var qkyhtml = require("./qkyhtml");//获取默认要加载html
    var getpy = require("./getpy");//拼音获取引用
    var opts = qkydata.navdata;

    var commonData = getCommentapp();//获取常用应用;
    var latelyData = getLatelyapp();//获取最近访问应用;
    opts.common = navdataPush(commonData);
    console.log(opts.common);
    opts.lately = navdataPush(latelyData);
    // console.log(opts.lately);
    // console.log(latelyData);

    // search("导学",opts.favoriteapp);

    var datas = JSON.parse(JSON.stringify(getAppFunc())) //获取全部应用
    var favoriteData = getMyFavoriteAppList();//获取个性设置应用

    dealdata(data, favoriteData, opts.navigation, opts.nonavigation);
    // dealdata(datas, favoriteData);
    // datapush(datas, opts.navigation);
    // console.log(opts.navigation);

    //初始化导航栏数据
    function navdataPush(data) {
        var cates = new Array();
        for (var keys in data) {
            cates[keys] = [data[keys].name,data[keys].appCode];
            // console.log(data);
        }
        // console.log(cates);
        return cates;
    }
    getCommonAppCode();
    //获取常用应用appcode组
    function getCommonAppCode() {
        console.log(opts.navCommon)
    }


    //搜索数据过滤
    function search(searchData, data) {
        var reg = new RegExp(searchData);
        var ischeck = false;
        var isCheck = false;
        var datas = JSON.parse(JSON.stringify(data));
        for (var keys in datas.data) {
            isCheck = false
            for (var j in datas.data[keys]) {
                ischeck = false;
                if (datas.data[keys][j].name.match(reg)) {
                    ischeck = true;
                    isCheck = true;
                }
                if (ischeck == false) {
                    data.data[keys][j].name = '';
                }
            }
            if (isCheck == false) {
                // data.data[keys].splice(keys, 1);
            }
        }
    }

    //初始化opts.allapp数据
    function datapush(data, opts) {
        var cate = data.categories;
        var datas = data.data;
        for (var j in cate) {
            var users = cate[j].name;
            opts[users] = '';
        }
        for (var i in datas) {
            var leng = datas[i].length;
            if (leng > 0) {
                for (var keys in cate) {
                    if (cate[keys].code == i) {
                        var cates = new Array();
                        for (var j in datas[i]) {
                            cates[j] = [datas[i][j].name, datas[i][j].appCode, datas[i][j].icon];
                        }
                        var user = cate[keys].name;
                        opts[user] = cates;
                    }
                }
            }
        }
    }

    //处理弹窗所有应用
    function setupDatas() {
        var setupData = new Array();
        for(var key in opts.favoriteapp){
            var cates = JSON.parse(JSON.stringify(opts.favoriteapp[key]));
            setupData[key] = cates;
        }
        console.log(setupData);
             for(var i in setupData){
                 for(var j  in setupData[i]){
                     for(var keys in opts.common){
                        // console.log(opts.common[keys][1] + "  "+setupData[i][j][1]);
                         if(opts.common[keys][1] == setupData[i][j][1]){
                             // console.log(222222);
                             setupData[i].splice(j,1)
                         }
                     }
                 }
         }
        console.log(setupData)
        return setupData;
    }

    //处理个性化应用
    function dealdata(data, favoritedata, opts1, opts2) {
        var cate = data.categories;
        var check = false;
        var favNum = 0;
        var nofavNum = 0;
        for (var j in cate) {
            var name = cate[j].name;
            opts1[name] = '';
            opts2[name] = '';

        }
        var datas = JSON.parse(JSON.stringify(data));
        for (var keys in datas.data) {
            favNum = 0;
            nofavNum = 0;
            var cates = new Array();
            var catess = new Array();
            for (var j in datas.data[keys]) {
                check = false;
                for (var i in favoritedata) {
                    if (favoritedata[i].appCode == datas.data[keys][j].appCode) {
                        check = true;
                        break;
                    }
                }
                for (var code in cate) {
                    if (cate[code].code == keys) {
                        var name = cate[code].name;
                        if (check == true) {
                            cates[favNum] = [datas.data[keys][j].name, datas.data[keys][j].appCode, datas.data[keys][j].icon];
                            favNum++;
                            opts1[name] = cates;
                        } else {
                            catess[nofavNum] = [datas.data[keys][j].name, datas.data[keys][j].appCode, datas.data[keys][j].icon];
                            nofavNum++;
                            opts2[name] = catess;
                        }
                    }
                }
            }
        }
        return opts1;
    }



    $.fn.extend({
        "qkynav": function (options) {
            //检测用户传进来的参数是否合法
            if (!isValid(options))
                return this;
            opts = $.extend({}, opts, options); //使用jQuery.extend 覆盖插件默认参数
            return this.each(function (i) {
                var thisdiv = $(this);
                htmlajax("dist/define/qkynav.html", function (thishtml) {

                    thisdiv.html(thishtml);


                    //初始化数据
                    $(".nav_logo img").attr("src", opts.logosrc);
                    $(".nav_pjname").html(opts.pjname);
                    $(".other_name").html(opts.tea_info.name);
                    tofor($("#navbar .nav"), opts.navli, "lia", opts.navli_active);

                    //是否显示个人信息
                    if (opts.isinfo) {
                        $(".nav_other").removeClass("yc");
                        tofor($("#otherli"), opts.otherli, "lia");

                        if (opts.tea_info.isphoto) {
                            $(".user_photo").removeClass("dist").html("<img src='" + opts.tea_info.photo + "' />");
                        } else {
                            $(".user_photo").addClass("dist");
                        }

                        //获取未读消息并渲染
                        var newsdata = qkydata.news_analogdata;
                        $(".nav_news_badge").html(qkydata.news_analogdata.length > 99 ? 99 : qkydata.news_analogdata.length);
                        for (var i = 0; i < newsdata.length; i++) {
                            if (i < 5) {//只显示5条
                                var appicon = getpy.getpy(newsdata[i].appname);//获取应用名的拼音
                                if ($.inArray(appicon, qkydata.haveicon) != -1) {//判断是否有图标了，有的话就加上图标，没有就显示默认app图标
                                    $("#nav_news_li_mould .app_icon").html('<img src="images/appicon/' + appicon + '.png" alt="">');
                                } else {
                                    $("#nav_news_li_mould .app_icon").html("APP");
                                }
                                $("#nav_news_li_mould .nav_news_name").html(newsdata[i].newsname);
                                $("#nav_news_li_mould .nav_news_times").html(newsdata[i].newsgettime);
                                $("#nav_news_li_mould .nav_news_appname").html(newsdata[i].appname);
                                $("#nav_news_li_mould .nav_news_cont").html(newsdata[i].newscont);
                                $(".nav_news_libox").append($("#nav_news_li_mould").html());
                            }
                            var newspoph = $(".nav_news_popup").outerHeight();
                            if (newspoph > 500)$(".nav_news_popup").css("height", "500px");//超过500的高度自动变可以滚动
                        }

                        $(document).on("click", ":not('.nav_news_box')", function () {
                            $(".nav_news_box .nav_news_popup").slideUp(50);
                        })
                        $(".nav_news_box").on("click", function (event) {
                            event.stopPropagation();
                        });
                        $(".nav_news_icon").click(function () {
                            $(this).parent().find(".nav_news_popup").slideToggle(50);
                            $(this).find("span").hide();
                            $(".nav_more").slideUp(50);
                            $(".navbtn").removeClass("active");
                        });

                    }
                    //是否显示更多弹窗
                    if (opts.morebtn) {
                        $(document).on("click", ":not('.nav_more,.navbtn')", function () {
                            $(".nav_more").slideUp(50);
                            $(".navbtn").removeClass("active");
                        })
                        $(".nav_more").on("click", function (event) {
                            event.stopPropagation();
                        });
                        $(".navbtn").on("click", function (event) {
                            event.stopPropagation();
                            $(".nav_more").slideToggle(50);
                            $(this).toggleClass("active");
                            $(".nav_news_box .nav_news_popup").slideUp(50);
                        });

                        tofor($("#common"), opts.common, "a");//渲染常用app
                        tofor($("#lately"), opts.lately, "a");//渲染最近app
                        //渲染全部app
                        to(opts);

                    } else {
                        $(".navbtn").hide();
                    }
                    //搜索结果渲染
                    $("#search").keydown(function (event) {
                        if (event.which == 13) {
                            var searchData = $("#search").val();
                            if (searchData != '') {
                                var data = JSON.parse(JSON.stringify(datas))
                                search(searchData, data);
                                datapush(data, opts.navigation);
                                $(".row_right").empty();
                                $(".row_left").empty();
                                to(opts);
                            } else {
                                var data = JSON.parse(JSON.stringify(datas))
                                datapush(data, opts.navigation);
                                $(".row_right").empty();
                                $(".row_left").empty();
                                to(opts);
                            }
                        }
                    });

                    //创建设置弹窗
                    $("body").append($("#modal_mould").html());
                    opts.navCommon = setupDatas();
                    var appNumber = 0;
                    for (var keys in opts.navCommon) {
                        for (var i in opts.navCommon[keys]) {
                            $(".setup_list_.lefts").append("<a onclick = javascript:commonAdd(this) class='setupApp' name='"+opts.navCommon[keys][i][1] +"'>" + opts.navCommon[keys][i][0] + "</a>");
                            appNumber++;
                        }
                    }
                    for (var keys in opts.common) {
                            $(".setup_list_.rights").append("<a class='clear'name='"+opts.common[keys][1] +"'>" + opts.common[keys][0] + "<i onclick =' javascript:commonDel(this) ' class='qkyicon_mian close fr'>&#xe63b;</i></a>");
                    }

                    $(".setup_title #favoriteAppNumber").html(appNumber);
                    $(".setup_title #commonAppNumber").html(++keys);
                    // $("#modal_mould,#nav_more_lli_mould,#nav_news_li_mould").remove();//去除所有隐藏待渲染的模板
                    $("#modal_mould").remove();
                    // $("#nav_more_lli_mould").remove();
                    // $("#nav_news_li_mould").remove();
                    opts.setup();
                });
            });
        }
    });

    function to(opts) {
        var rowi = 0;
        for (var key in opts.navigation) {
            $("#nav_more_lli_mould h5 span").html(key);
            tofor($("#nav_more_lli_mould .li_a"), opts.navigation[key], "a");
            if (rowi % 2 == 0) {
                $(".row_left").append($("#nav_more_lli_mould").html());
            } else {
                $(".row_right").append($("#nav_more_lli_mould").html());
            }
            $("#nav_more_lli_mould .li_a").html("");
            rowi++;
        }
    }


    function tofor(id, data_arr, type, avt) {
        for (var i = 0; i < data_arr.length; i++) {
            var thishtml = "";
            if (type == "lia") {
                thishtml = "<li><a " + data_arr[i][1] + ">" + data_arr[i][0] + "</a></li>";
                if (i == avt)thishtml = "<li class='active'><a " + data_arr[i][1] + ">" + data_arr[i][0] + "</a></li>";
            } else {
                thishtml = "<a onclick = javascript:jump(this.name) name = '" + data_arr[i][1] + "'>" + data_arr[i][0] + "</a>";
            }
            id.append(thishtml);
        }
    }

    //私有方法，检测参数是否合法
    function isValid(options) {
        return !options || (options && typeof options === "object") ? true : false;
    }

    //异步获取html
    function htmlajax(url, sucfun) {
        var urlhtml = "";
        $.ajax({
            url: url,
            cache: false,
            success: function (html) {
                sucfun(html);
            }
        });
    }
})