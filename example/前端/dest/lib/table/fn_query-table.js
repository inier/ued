define(["require","exports","module","handlebars","$","pagination","dialog","./ns-util.js","./common.js","loading","network","i18n","./fn_format_amount","./fn_hovercard.js"],function(e,t,n){function p(e,t,n,r,s,o,u){this.search=s,this.table=e,this.page=n,this.filterCon=u,this.temp=t,this.template=null,this.pageData=null,this.ajaxurl=e.attr("ajaxurl"),this.ajaxDeleteItemUrl=e.attr("data-ajax-deleteitem-url"),this.currentPage=1,this._total=0,this.pageSize=n.attr("pagesize")||10,this.callback=o,this.param=i.extend(r,{nPageNo:this.currentPage,nPageSize:this.pageSize})}function d(e,t){t=i.extend({},t);var n={url:e,type:"POST",data:t,dataType:"json"},r=i.when(l.ajax(n)).done(function(e){}).fail(function(){});return r}var r=e("handlebars"),i=e("$"),s=e("pagination"),o=e("dialog"),u=e("./ns-util.js"),a=e("./common.js"),f=e("loading"),l=e("network"),c=e("i18n"),h=e("./fn_format_amount");r.registerHelper("equalsten",function(e,t){return e%10==0&&e!=0?t.fn(this):t.inverse(this)}),r.registerHelper("formatMoney",function(e){var t=e.split("-");return t.length>1?h.doFormat(i.trim(t[0]))+" - "+h.doFormat(i.trim(t[1])):h.doFormat(i.trim(t[0]))}),p.prototype={init:function(){var t=this.temp.html();this.template=r.compile(t),this.search&&(this.param=this.getParam(this.search.closest(".form")),this.bindSearch()),this.bind(),this.event();var n=e("./fn_hovercard.js");n.init()},event:function(){var e=this;i(this.table).bind("reload",function(){e.gosearch()}),this.table.delegate("tr","click",function(){i(this).attr("href")&&!i(this).hasClass("dialog")&&(location.href=i(this).attr("href"))}),this.table.delegate(".js-ajax","click",function(){var t=new a.linkAjax(i(this),function(){e.gosearch()});return!1}),i(this.table).on("click",".js-delegate-delete",function(t){t.preventDefault(),t.stopImmediatePropagation();var n={itemId:t.target.dataset.itemid},r={url:e.ajaxDeleteItemUrl,type:"POST",data:n,async:!1,dataType:"json"};i.when(l.ajax(r)).done(function(){i(t.target).closest("tr").remove(),setTimeout(function(){e.gosearch()},500)}).fail(function(){})})},bindSearch:function(){var e=this;this.search.click(function(){e.gosearch()})},gosearch:function(){var e=this;e.currentPage=1,e.search&&(e.param=i.extend(e.param,e.getParam(e.search.closest(".form")))),e.param=i.extend(e.param,e.getParam(i(e.filterCon))),e.bind()},getParam:function(e){var t={};i(e).find("*[name]").each(function(e,n){var r,s=i(n).attr("name"),o=i.trim(i(n).val()),u=[],a={};if(s=="")return;o=o==i(n).attr("placeholder")?"":o;if(i(n).attr("type")=="radio"){var f=null;i("input[name='"+s+"']:radio").each(function(){i(this).is(":checked")&&(f=i.trim(i(this).val()))}),f?o=f:o=""}if(i(n).attr("type")=="checkbox"){var f=[];i("input[name='"+s+"']:checkbox").each(function(){i(this).is(":checked")&&f.push(i.trim(i(this).val()))}),f.length?o=f.join(","):o=""}s.match(/\./)?(u=s.split("."),r=u[0],a[u[1]]=o,t[r]?t[r]=i.extend({},t[r],a):t[r]=a):t[s]=o});var n={};for(var r in t){var s=t[r];typeof s=="object"?n[r]=JSON.stringify(s):n[r]=t[r]}return n},bind:function(){var e=this;this.param=i.extend(this.param,{skip:(this.currentPage-1)*this.pageSize+1,take:this.pageSize}),e.table.css("position","relative");if(e.table.find(".loadingdata").size()==0){var t=e.table.height()/2-32;t=t<0?32:t,t=30;var n=e.table.width()/2-32;e.table.find("tbody,.tbody").html(""),e.table.nextAll(".sg-pager").find(".nodata").html(""),e.page.hide(),e.table.append('<div class="loadingdata" style="position:absolute;left:'+n+"px;top:"+t+'px;"/>'),e.loading=new f({element:".loadingdata",size:30,duration:800})}d(e.ajaxurl,e.param).done(function(t){e.page.show(),e.loading&&e.loading.remove(),i(".loadingdata").remove();if(!t.hasError){var n=t.content,r=e.template(n);e.table.html(r),t.content&&(e._total=t.content.count||0),e.initPager(),e.callback?e.callback(e,e.table):null}else u.message(c("catalog_loadFailure"),"error")})},initPager:function(){var e=this,t=e.page;t.data("pagesize")?e.pageSize=t.data("pagesize"):t.data("pagesize",e.pageSize),t.attr("pagesize",e.pageSize),t.parent().prevAll().remove(),e._total==0?(t.parent().before('<p class="pdl10 nodata">'+c("catalog_common_no_data","没有符合条件的数据!")+"</p>"),t.hide()):t.show(),this.pageData||(this.pageData=new s(t,{page:this.currentPage,redirectUrl:"",sizeList:[10,20],type:"table",size:e.pageSize,sizeListPerPageLabel:c("catalog_common_itemsperpage"),totalNumLabel:c("catalog_common_sumitems"),onPageChanged:function(n){e.currentPage=n,e.pageSize=parseInt(t.data("pagesize")),e.pageData.setPaging({total:e._total,page:e.currentPage,size:parseInt(t.data("pagesize"))}),e.bind()}})),this.pageData.setPaging({total:e._total,page:e.currentPage,size:parseInt(t.data("pagesize"))})}},n.exports=p});