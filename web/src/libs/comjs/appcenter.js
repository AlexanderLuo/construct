/****
 应用中心的js模块中心 20170406 zwt 创建1.0版本
 ****/

define(function (require, exports) {
    var qkydata = require("./qkydata");//获取默认数据
    var getpy = require("./getpy");//拼音获取引用
    var opts = qkydata.navdata;
    var titleParam = JSON.parse(window.localStorage.getItem('titleParam'));
    opts.tea_info.name = titleParam.name;


    // var haveicon = qkydata.haveicon //已经有的图标名记录数组;
    var data = getAppFunc();//获取全部应用
    var favoriteData = getMyFavoriteAppList();//获取个性设置应用
    //var stopData = getStopApp();//获取全部应用



    datapush(data, opts.allapp);
    

    //datapush(stopData, opts.stopAppList);
 
    // console.log(opts.favoriteapp);
    dealdata(data, favoriteData, opts.favoriteapp, opts.stopAppList);

    //初始化导航栏数据
    function navdataPush(data) {
        var cates = new Array();
        for (var keys in data) {
            cates[keys] = [data[keys].name, data[keys].appCode];
        }
        return cates;
    }

    //初始化opts数据
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
    }


    //暴露的执行函数
    exports.appcenter_run = function () {
        var apptype = [];
        for (var keys in opts.allapp) {
            var app_typepy = getpy.getpy(keys);//获取应用类别名的拼音
            apptype.push([keys, "id=" + app_typepy]);
            $("#appbox_mould .app_box").attr("apptypeid", app_typepy).attr("apptypename", keys);
            $("#appbox_mould h4 a").html(keys);
            applist_draw(opts.favoriteapp[keys], keys, $("#applist_mould"), $(".appcenter_mian"), opts.allapp[keys]);
        }
        tofor($(".second_level .nav"), apptype, "lia", 0);//渲染二级导航

        appcenter_int();//交互
    }

    function appcenter_intadd() {
        var appAddid = "";//缓存停用的应用id
        //添加按钮
        $(".add_app").on("click", function () {
            var addAppCode = $(this).parent().find(".txt").attr('togo');
            addMyFavorite(addAppCode);
            appAddid = $(this).parents(".app_list").attr("listid");
        });
        //弹窗确定添加
        $("#addapp_sumbit").on("click", function () {
            $(".app_list[listid='" + appAddid + "']").parents(".app_ul").find(".add_list").show();
            $(".app_list[listid='" + appAddid + "']").remove();
            $('#addapp').modal('hide');
        });
    }
    //应用中心交互合集
    function appcenter_int() {
        var appstopid = "";//缓存停用的应用id
        var appCode = "";//应用代码
        //获取所有app_box距离浏览器头的高度
        var allh = [];
        $(".appcenter_mian .app_box").each(function (i) {
            var kk = 0;
            for (var j = 0; j < i; j++) {
                kk += $(".app_box").eq(j).outerHeight(true);
            }
            allh.push([kk, $(this).attr("apptypeid")]);
            kk = 0;
        });

        //二级导航点击滚动到指定栏
        $(".second_level .nav li").on("click", function () {
            $(this).addClass("active").siblings().removeClass("active");
            var apptypeid = $(this).find("a").attr("id");
            //console.log(apptype);
            for (var i = 0; i < allh.length; i++) {
                if (apptypeid == allh[i][1]) {
                    //console.log(allh[i][0]);
                    $("body").animate({scrollTop: allh[i][0]}, 100);
                }
            }
        });
        //页面滚动时改变二级导航选中项
        $(window).scroll(function () {
            var body_scr = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            //console.log(body_scr);
            for (var ik = 0; ik < allh.length; ik++) {
                if (ik == 0) {
                    if (body_scr <= allh[ik][0] && body_scr >= 0) {
                        $(".second_level .nav li").removeClass("active");
                        $("#" + allh[ik][1]).parent().addClass("active");
                    }
                } else {
                    if (body_scr <= allh[ik][0] && body_scr > allh[ik - 1][0]) {
                        $(".second_level .nav li").removeClass("active");
                        $("#" + allh[ik][1]).parent().addClass("active");
                    }
                }
            }
        });
        //停用按钮
        $(".stop_use").on("click", function () {
            appCode = "";
            var appname = $(this).parent().find(".txt").html();
            appCode = $(this).parent().find(".txt").attr('togo');
            console.log("停用");
            console.log(appCode);
            $("#appname").html(appname);
            $('#stopapp').modal('show');
            appstopid = $(this).parents(".app_list").attr("listid");
        });
        //弹窗确定停用
        $("#stopapp_sumbit").on("click", function () {
            //console.log(appstopid);
            $(".app_list[listid='" + appstopid + "']").parents(".app_ul").find(".add_list").show();
            $(".app_list[listid='" + appstopid + "']").remove();
            saveMyFavorite(appCode);
            $('#stopapp').modal('hide');
        });

        //新增app的按钮
        $(".add_list").on("click", function () {
            var apptype = $(this).parents(".app_box").attr("apptypename");
            $(".second_level .nav,.appcenter_mian").hide();
            $(".second_level .add_navbar").show();
            $(".nav_title").html('<i class="qkyicon_14">&#xe616;</i>添加应用');
            $(".appcenter_sigmian").removeClass("yc");

            $("#appbox_mould .app_box").attr("apptypename", apptype).attr("apptypeid", getpy.getpy(apptype));
            $("#appbox_mould h4 a").html(apptype).attr("name", apptype);
            applist_draw(opts.stopAppList[apptype], true, $("#applist_addmould"), $(".appcenter_sigmian"), opts.stopAppList[apptype]);
            appcenter_intadd();//交互
        });
        //返回按钮
        $(".appbtn_back").on("click", function () {
            $(".second_level .nav,.appcenter_mian").show();
            $(".second_level .add_navbar").hide();
            $(".appcenter_sigmian").html("");
            $(".appcenter_sigmian,.appcenter_infomian").addClass("yc");
        });
        //app名字点击
        $(".app_cont .txt").on("click", function () {
            var title = $(this).attr("togo");
            $(".second_level .nav,.appcenter_mian").hide();
            $(".second_level .add_navbar").show();
            $(".appcenter_infomian").removeClass("yc");
            $(".nav_title,.app_info_title").html(title);
        });
    }

    //app应用列表渲染
    function applist_draw(data, keys, list_mould, mianid, favoritedata) {
        for (var i in data) {
            var apppy = data[i][2];//获取应用名的拼音
            if (apppy) {//判断是否有图标了，有的话就加上图标，没有就显示默认app图标
                list_mould.find(".app_icon").html('<img src="' + apppy + '" alt="">');
            } else {
                list_mould.find(".app_icon").html("APP");
            }
            list_mould.find(".app_list").attr("listid", apppy);
            list_mould.find(".app_cont .txt").html(data[i][0]).attr("togo", data[i][1]);
            $("#appbox_mould .app_ul_").append(list_mould.html());
        }
        mianid.append($("#appbox_mould").html());
        $("#appbox_mould .app_ul_").html("");
        if (keys != true) {
            if (favoritedata.length >0) {
                $(".appcenter_mian").find(".app_box[apptypename='" + keys + "']").find(".app_ul").find(".add_list").show();
            } else {
                $(".appcenter_mian").find(".app_box[apptypename='" + keys + "']").find(".app_ul").find(".add_list").hide();
            }
        }
    }

    function tofor(id, data_arr, type, avt) {
        for (var i = 0; i < data_arr.length; i++) {
            var thishtml = "";
            if (type == "lia") {
                thishtml = "<li><a " + data_arr[i][1] + ">" + data_arr[i][0] + "</a></li>";
                if (i == avt)thishtml = "<li class='active'><a " + data_arr[i][1] + ">" + data_arr[i][0] + "</a></li>";
            } else {
                thishtml = "<a " + data_arr[i][1] + ">" + data_arr[i][0] + "</a>";
            }
            id.append(thishtml);
        }
    };
})