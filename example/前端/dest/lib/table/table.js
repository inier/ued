(function(e,t){typeof define=="function"&&define.amd?define(["$","dialog","handlebars","paging"],t):e.Table=t($,Dialog,Handlebars,Paging)})(this,function(e,t,n,r){function i(t,n,r,i,s,o,u){this.search=s,this.table=t,this.page=r,this.filterCon=u,this.temp=n,this.template=null,this.pageData=null,this.ajaxurl=t.attr("ajaxurl"),this.ajaxDeleteItemUrl=t.attr("data-ajax-deleteitem-url"),this.currentPage=1,this._total=0,this.pageSize=r.attr("pagesize")||10,this.callback=o,this.param=e.extend(i,{})}function s(t,n){return n=e.extend({},n),e.post(t,n,function(e){},"json")}return n.registerHelper("equalsten",function(e,t){return e%10==0&&e!=0?t.fn(this):t.inverse(this)}),n.registerHelper("formatMoney",function(t){var n=t.split("-");return n.length>1?formatAmount.doFormat(e.trim(n[0]))+" - "+formatAmount.doFormat(e.trim(n[1])):formatAmount.doFormat(e.trim(n[0]))}),i.prototype={init:function(){var e=this.temp.html();this.template=n.compile(e),this.search&&(this.param=this.getParam(this.search.closest(".form")),this.bindSearch()),this.bind(),this.event()},event:function(){var t=this;e(this.table).bind("reload",function(){t.gosearch()}),this.table.delegate("tr","click",function(){e(this).attr("href")&&!e(this).hasClass("dialog")&&(location.href=e(this).attr("href"))}),this.table.delegate(".js-ajax","click",function(){if(e(this).attr("href")){var n=e(this).attr("href"),r=e(this).attr("js-ajax-param")||{};e.post(n,r).done(function(n){n.status?t.gosearch():e.alert(n.msg)})}return!1}),e(this.table).on("click",".js-delegate-delete",function(n){var r=e(this).attr("href"),i=e(this).attr("js-ajax-param")||{};return e.confirm("是否确认删除？",[{yes:"确定"},{no:"取消"}],function(s){var o=this;if(s=="yes"){var u={url:r,type:"POST",data:i,async:!1,dataType:"json"};e.when(e.ajax(u)).done(function(){e(n.target).closest("tr").remove(),o.hide(),setTimeout(function(){t.gosearch()},500)}).fail(function(){})}else o.hide()}),!1})},bindSearch:function(){var e=this;this.search.click(function(){e.gosearch()})},gosearch:function(){var t=this;t.currentPage=1,t.search&&(t.param=e.extend(t.param,t.getParam(t.search.closest(".form")))),t.param=e.extend(t.param,t.getParam(e(t.filterCon))),t.bind()},getParam:function(t){var n={};e(t).find("*[name]").each(function(t,r){var i,s=e(r).attr("name"),o=e.trim(e(r).val()),u=[],a={};if(s=="")return;o=o==e(r).attr("placeholder")?"":o;if(e(r).attr("type")=="radio"){var f=null;e("input[name='"+s+"']:radio").each(function(){e(this).is(":checked")&&(f=e.trim(e(this).val()))}),f?o=f:o=""}if(e(r).attr("type")=="checkbox"){var f=[];e("input[name='"+s+"']:checkbox").each(function(){e(this).is(":checked")&&f.push(e.trim(e(this).val()))}),f.length?o=f.join(","):o=""}s.match(/\./)?(u=s.split("."),i=u[0],a[u[1]]=o,n[i]?n[i]=e.extend({},n[i],a):n[i]=a):n[s]=o});var r={};for(var i in n){var s=n[i];typeof s=="object"?r[i]=JSON.stringify(s):r[i]=n[i]}return r},bind:function(){var t=this;this.param=e.extend(this.param,{page:this.currentPage,page_size:this.pageSize}),t.table.css("position","relative");if(t.table.find(".loadingdata").size()==0){var n=t.table.height()/2-32;n=n<0?32:n,n=30;var r=t.table.width()/2-32;t.table.find("tbody,.tbody").html(""),t.table.nextAll(".sg-pager").find(".nodata").html(""),t.page.hide(),t.table.append('<div class="loadingdata" style="position:absolute;left:'+r+"px;top:"+n+'px;"/>')}s(t.ajaxurl,t.param).done(function(n){t.page.show(),t.loading&&t.loading.remove(),e(".loadingdata").remove();if(!n.hasError){var r=n.data,i=t.template(r);t.table.html(i),n.data&&(t._total=n.data.count.total||0),t.initPager(),t.callback?t.callback(t,t.table):null}})},initPager:function(){var e=this,t=e.page;t.data("pagesize")?e.pageSize=t.data("pagesize"):t.data("pagesize",e.pageSize),t.attr("pagesize",e.pageSize),t.parent().prevAll().remove(),e._total==0?(e.table.html('<p class="pdl10 nodata">没有符合条件的数据!</p>'),t.hide()):t.show(),this.pageData||(this.pageData=new r,this.pageData.init({target:this.page,pagesize:e.pageSize,count:e._total,callback:function(t){e.currentPage=t,e.bind()}}))}},i});