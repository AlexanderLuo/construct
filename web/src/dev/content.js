/**
 * Created by Administrator on 2017/4/13 0013.
 */



avalon.component('ms-content', {
    template:require("./content.html"),
    defaults: {
        categories:[],
        dataList:[],
        searchKey:"",
        search:function(el,index,arg){
            if(arg==""){return true;}
            else {return el.name.indexOf(arg)>=0;}
        },
        emptyCheck:function(a){

        },
        switchTab:function(){

        },
        open:function(){
        },
        onInit:function(){
            var _this=this;
            this.fn=this.search;
            var titleParam = JSON.parse(localStorage.getItem("titleParam"));
            var serviceMode = JSON.parse(localStorage.getItem("project"))['serviceMode'];
            $.ajax({
                    url: JSON.parse(localStorage.getItem("urlConfig"))["categoryAndFunc"],
                    data: {
                        userType: 1,
                        schoolCode: titleParam.schoolCode,
                        agencyCode: titleParam.agencyCode,
                        uid: titleParam.uid,
                        serviceMode: serviceMode
                    }}).done(function(data){
                _this.categories=data.bizData.categories;
                var list=[];
                for(var key in data.bizData.data){
                    var ob={
                        categorieCode:key,
                        data:data.bizData.data[key]
                    }
                    list.push(ob)
                }
                _this.dataList=list;
            })
        },
        transCode:function(code){
            var list=this.categories.filter(function(el){
                if(el.code==code){
                    return el.name
                }
            })
            return list[0].name;
        },
        onReady:function() {
        }
    }
});
