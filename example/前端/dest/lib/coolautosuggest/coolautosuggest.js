/**
*  Ajax Autocomplete for jQuery, version %version%
*  (c) 2015 Tomas Kirda
*
*  Ajax Autocomplete for jQuery is freely distributable under the terms of an MIT-style license.
*  For details, see the web site: https://github.com/devbridge/jQuery-Autocomplete
*/

(function(e){"use strict";typeof define=="function"&&define.amd?define(["jquery"],e):typeof exports=="object"&&typeof require=="function"?e(require("jquery")):e(jQuery)})(function(e){"use strict";function r(t,n){var i=function(){},s=this,o={ajaxSettings:{},autoSelectFirst:!1,appendTo:document.body,serviceUrl:null,lookup:null,onSelect:null,width:"auto",minChars:1,maxHeight:300,deferRequestBy:0,params:{},formatResult:r.formatResult,delimiter:null,zIndex:9999,type:"GET",noCache:!1,onSearchStart:i,onSearchComplete:i,onSearchError:i,preserveInput:!1,containerClass:"autocomplete-suggestions",tabDisabled:!1,dataType:"text",currentRequest:null,triggerSelectOnValidInput:!0,preventBadQueries:!0,lookupFilter:function(e,t,n){return e.value.toLowerCase().indexOf(n)!==-1},paramName:"query",transformResult:function(t){return typeof t=="string"?e.parseJSON(t):t},showNoSuggestionNotice:!1,noSuggestionNotice:"No results",orientation:"bottom",forceFixPosition:!1};s.element=t,s.el=e(t),s.suggestions=[],s.badQueries=[],s.selectedIndex=-1,s.currentValue=s.element.value,s.intervalId=0,s.cachedResponse={},s.onChangeInterval=null,s.onChange=null,s.isLocal=!1,s.suggestionsContainer=null,s.noSuggestionsContainer=null,s.options=e.extend({},o,n),s.classes={selected:"autocomplete-selected",suggestion:"autocomplete-suggestion"},s.hint=null,s.hintValue="",s.selection=null,s.initialize(),s.setOptions(n)}var t=function(){return{escapeRegExChars:function(e){return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")},createNode:function(e){var t=document.createElement("div");return t.className=e,t.style.position="absolute",t.style.display="none",t}}}(),n={ESC:27,TAB:9,RETURN:13,LEFT:37,UP:38,RIGHT:39,DOWN:40};r.utils=t,e.Autocomplete=r,r.formatResult=function(e,n){var r=e.value.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),i="("+t.escapeRegExChars(n)+")";return r.replace(new RegExp(i,"gi"),"<strong>$1</strong>")},r.prototype={killerFn:null,initialize:function(){var t=this,n="."+t.classes.suggestion,i=t.classes.selected,s=t.options,o;t.element.setAttribute("autocomplete","off"),t.killerFn=function(n){e(n.target).closest("."+t.options.containerClass).length===0&&(t.killSuggestions(),t.disableKillerFn())},t.noSuggestionsContainer=e('<div class="autocomplete-no-suggestion"></div>').html(this.options.noSuggestionNotice).get(0),t.suggestionsContainer=r.utils.createNode(s.containerClass),o=e(t.suggestionsContainer),o.appendTo(s.appendTo),s.width!=="auto"&&o.width(s.width),o.on("mouseover.autocomplete",n,function(){t.activate(e(this).data("index"))}),o.on("mouseout.autocomplete",function(){t.selectedIndex=-1,o.children("."+i).removeClass(i)}),o.on("click.autocomplete",n,function(){t.select(e(this).data("index"))}),t.fixPositionCapture=function(){t.visible&&t.fixPosition()},e(window).on("resize.autocomplete",t.fixPositionCapture),t.el.on("keydown.autocomplete",function(e){t.onKeyPress(e)}),t.el.on("keyup.autocomplete",function(e){t.onKeyUp(e)}),t.el.on("blur.autocomplete",function(){t.onBlur()}),t.el.on("focus.autocomplete",function(){t.onFocus()}),t.el.on("change.autocomplete",function(e){t.onKeyUp(e)}),t.el.on("input.autocomplete",function(e){t.onKeyUp(e)})},onFocus:function(){var e=this;e.fixPosition(),e.options.minChars===0&&e.el.val().length===0&&e.onValueChange()},onBlur:function(){this.enableKillerFn()},abortAjax:function(){var e=this;e.currentRequest&&(e.currentRequest.abort(),e.currentRequest=null)},setOptions:function(t){var n=this,r=n.options;e.extend(r,t),n.isLocal=e.isArray(r.lookup),n.isLocal&&(r.lookup=n.verifySuggestionsFormat(r.lookup)),r.orientation=n.validateOrientation(r.orientation,"bottom"),e(n.suggestionsContainer).css({"max-height":r.maxHeight+"px",width:r.width+"px","z-index":r.zIndex})},clearCache:function(){this.cachedResponse={},this.badQueries=[]},clear:function(){this.clearCache(),this.currentValue="",this.suggestions=[]},disable:function(){var e=this;e.disabled=!0,clearInterval(e.onChangeInterval),e.abortAjax()},enable:function(){this.disabled=!1},fixPosition:function(){var t=this,n=e(t.suggestionsContainer),r=n.parent().get(0);if(r!==document.body&&!t.options.forceFixPosition)return;var i=t.options.orientation,s=n.outerHeight(),o=t.el.outerHeight(),u=t.el.offset(),a={top:u.top,left:u.left};if(i==="auto"){var f=e(window).height(),l=e(window).scrollTop(),c=-l+u.top-s,h=l+f-(u.top+o+s);i=Math.max(c,h)===c?"top":"bottom"}i==="top"?a.top+=-s:a.top+=o;if(r!==document.body){var p=n.css("opacity"),d;t.visible||n.css("opacity",0).show(),d=n.offsetParent().offset(),a.top-=d.top,a.left-=d.left,t.visible||n.css("opacity",p).hide()}t.options.width==="auto"&&(a.width=t.el.outerWidth()-2+"px"),n.css(a)},enableKillerFn:function(){var t=this;e(document).on("click.autocomplete",t.killerFn)},disableKillerFn:function(){var t=this;e(document).off("click.autocomplete",t.killerFn)},killSuggestions:function(){var e=this;e.stopKillSuggestions(),e.intervalId=window.setInterval(function(){e.hide(),e.stopKillSuggestions()},50)},stopKillSuggestions:function(){window.clearInterval(this.intervalId)},isCursorAtEnd:function(){var e=this,t=e.el.val().length,n=e.element.selectionStart,r;return typeof n=="number"?n===t:document.selection?(r=document.selection.createRange(),r.moveStart("character",-t),t===r.text.length):!0},onKeyPress:function(e){var t=this;if(!t.disabled&&!t.visible&&e.which===n.DOWN&&t.currentValue){t.suggest();return}if(t.disabled||!t.visible)return;switch(e.which){case n.ESC:t.el.val(t.currentValue),t.hide();break;case n.RIGHT:if(t.hint&&t.options.onHint&&t.isCursorAtEnd()){t.selectHint();break}return;case n.TAB:if(t.hint&&t.options.onHint){t.selectHint();return}if(t.selectedIndex===-1){t.hide();return}t.select(t.selectedIndex);if(t.options.tabDisabled===!1)return;break;case n.RETURN:if(t.selectedIndex===-1){t.hide();return}t.select(t.selectedIndex);break;case n.UP:t.moveUp();break;case n.DOWN:t.moveDown();break;default:return}e.stopImmediatePropagation(),e.preventDefault()},onKeyUp:function(e){var t=this;if(t.disabled)return;switch(e.which){case n.UP:case n.DOWN:return}clearInterval(t.onChangeInterval),t.currentValue!==t.el.val()&&(t.findBestHint(),t.options.deferRequestBy>0?t.onChangeInterval=setInterval(function(){t.onValueChange()},t.options.deferRequestBy):t.onValueChange())},onValueChange:function(){var t=this,n=t.options,r=t.el.val(),i=t.getQuery(r);t.selection&&t.currentValue!==i&&(t.selection=null,(n.onInvalidateSelection||e.noop).call(t.element)),clearInterval(t.onChangeInterval),t.currentValue=r,t.selectedIndex=-1;if(n.triggerSelectOnValidInput&&t.isExactMatch(i)){t.select(0);return}i.length<n.minChars?t.hide():t.getSuggestions(i)},isExactMatch:function(e){var t=this.suggestions;return t.length===1&&t[0].value.toLowerCase()===e.toLowerCase()},getQuery:function(t){var n=this.options.delimiter,r;return n?(r=t.split(n),e.trim(r[r.length-1])):t},getSuggestionsLocal:function(t){var n=this,r=n.options,i=t.toLowerCase(),s=r.lookupFilter,o=parseInt(r.lookupLimit,10),u;return u={suggestions:e.grep(r.lookup,function(e){return s(e,t,i)})},o&&u.suggestions.length>o&&(u.suggestions=u.suggestions.slice(0,o)),u},getSuggestions:function(t){var n,r=this,i=r.options,s=i.serviceUrl,o,u,a;i.params[i.paramName]=t,o=i.ignoreParams?null:i.params;if(i.onSearchStart.call(r.element,i.params)===!1)return;if(e.isFunction(i.lookup)){i.lookup(t,function(e){r.suggestions=e.suggestions,r.suggest(),i.onSearchComplete.call(r.element,t,e.suggestions)});return}r.isLocal?n=r.getSuggestionsLocal(t):(e.isFunction(s)&&(s=s.call(r.element,t)),u=s+"?"+e.param(o||{}),n=r.cachedResponse[u]),n&&e.isArray(n.suggestions)?(r.suggestions=n.suggestions,r.suggest(),i.onSearchComplete.call(r.element,t,n.suggestions)):r.isBadQuery(t)?i.onSearchComplete.call(r.element,t,[]):(r.abortAjax(),a={url:s,data:o,type:i.type,dataType:i.dataType},e.extend(a,i.ajaxSettings),r.currentRequest=e.ajax(a).done(function(e){var n;r.currentRequest=null,n=i.transformResult(e,t),r.processResponse(n,t,u),i.onSearchComplete.call(r.element,t,n.suggestions)}).fail(function(e,n,s){i.onSearchError.call(r.element,t,e,n,s)}))},isBadQuery:function(e){if(!this.options.preventBadQueries)return!1;var t=this.badQueries,n=t.length;while(n--)if(e.indexOf(t[n])===0)return!0;return!1},hide:function(){var t=this,n=e(t.suggestionsContainer);e.isFunction(t.options.onHide)&&t.visible&&t.options.onHide.call(t.element,n),t.visible=!1,t.selectedIndex=-1,clearInterval(t.onChangeInterval),e(t.suggestionsContainer).hide(),t.signalHint(null)},suggest:function(){if(this.suggestions.length===0){this.options.showNoSuggestionNotice?this.noSuggestions():this.hide();return}var t=this,n=t.options,r=n.groupBy,i=n.formatResult,s=t.getQuery(t.currentValue),o=t.classes.suggestion,u=t.classes.selected,a=e(t.suggestionsContainer),f=e(t.noSuggestionsContainer),l=n.beforeRender,c="",h,p=function(e,t){var n=e.data[r];return h===n?"":(h=n,'<div class="autocomplete-group"><strong>'+h+"</strong></div>")};if(n.triggerSelectOnValidInput&&t.isExactMatch(s)){t.select(0);return}e.each(t.suggestions,function(e,t){r&&(c+=p(t,s,e)),c+='<div class="'+o+'" data-index="'+e+'">'+i(t,s)+"</div>"}),this.adjustContainerWidth(),f.detach(),a.html(c),e.isFunction(l)&&l.call(t.element,a),t.fixPosition(),a.show(),n.autoSelectFirst&&(t.selectedIndex=0,a.scrollTop(0),a.children("."+o).first().addClass(u)),t.visible=!0,t.findBestHint()},noSuggestions:function(){var t=this,n=e(t.suggestionsContainer),r=e(t.noSuggestionsContainer);this.adjustContainerWidth(),r.detach(),n.empty(),n.append(r),t.fixPosition(),n.show(),t.visible=!0},adjustContainerWidth:function(){var t=this,n=t.options,r,i=e(t.suggestionsContainer);n.width==="auto"&&(r=t.el.outerWidth()-2,i.width(r>0?r:300))},findBestHint:function(){var t=this,n=t.el.val().toLowerCase(),r=null;if(!n)return;e.each(t.suggestions,function(e,t){var i=t.value.toLowerCase().indexOf(n)===0;return i&&(r=t),!i}),t.signalHint(r)},signalHint:function(t){var n="",r=this;t&&(n=r.currentValue+t.value.substr(r.currentValue.length)),r.hintValue!==n&&(r.hintValue=n,r.hint=t,(this.options.onHint||e.noop)(n))},verifySuggestionsFormat:function(t){return t.length&&typeof t[0]=="string"?e.map(t,function(e){return{value:e,data:null}}):t},validateOrientation:function(t,n){return t=e.trim(t||"").toLowerCase(),e.inArray(t,["auto","bottom","top"])===-1&&(t=n),t},processResponse:function(e,t,n){var r=this,i=r.options;e.suggestions=r.verifySuggestionsFormat(e.suggestions),i.noCache||(r.cachedResponse[n]=e,i.preventBadQueries&&e.suggestions.length===0&&r.badQueries.push(t));if(t!==r.getQuery(r.currentValue))return;r.suggestions=e.suggestions,r.suggest()},activate:function(t){var n=this,r,i=n.classes.selected,s=e(n.suggestionsContainer),o=s.find("."+n.classes.suggestion);return s.find("."+i).removeClass(i),n.selectedIndex=t,n.selectedIndex!==-1&&o.length>n.selectedIndex?(r=o.get(n.selectedIndex),e(r).addClass(i),r):null},selectHint:function(){var t=this,n=e.inArray(t.hint,t.suggestions);t.select(n)},select:function(e){var t=this;t.hide(),t.onSelect(e)},moveUp:function(){var t=this;if(t.selectedIndex===-1)return;if(t.selectedIndex===0){e(t.suggestionsContainer).children().first().removeClass(t.classes.selected),t.selectedIndex=-1,t.el.val(t.currentValue),t.findBestHint();return}t.adjustScroll(t.selectedIndex-1)},moveDown:function(){var e=this;if(e.selectedIndex===e.suggestions.length-1)return;e.adjustScroll(e.selectedIndex+1)},adjustScroll:function(t){var n=this,r=n.activate(t);if(!r)return;var i,s,o,u=e(r).outerHeight();i=r.offsetTop,s=e(n.suggestionsContainer).scrollTop(),o=s+n.options.maxHeight-u,i<s?e(n.suggestionsContainer).scrollTop(i):i>o&&e(n.suggestionsContainer).scrollTop(i-n.options.maxHeight+u),n.options.preserveInput||n.el.val(n.getValue(n.suggestions[t].value)),n.signalHint(null)},onSelect:function(t){var n=this,r=n.options.onSelect,i=n.suggestions[t];n.currentValue=n.getValue(i.value),n.currentValue!==n.el.val()&&!n.options.preserveInput&&n.el.val(n.currentValue),n.signalHint(null),n.suggestions=[],n.selection=i,e.isFunction(r)&&r.call(n.element,i)},getValue:function(e){var t=this,n=t.options.delimiter,r,i;return n?(r=t.currentValue,i=r.split(n),i.length===1?e:r.substr(0,r.length-i[i.length-1].length)+e):e},dispose:function(){var t=this;t.el.off(".autocomplete").removeData("autocomplete"),t.disableKillerFn(),e(window).off("resize.autocomplete",t.fixPositionCapture),e(t.suggestionsContainer).remove()}},e.fn.autocomplete=e.fn.devbridgeAutocomplete=function(t,n){var i="autocomplete";return arguments.length===0?this.first().data(i):this.each(function(){var s=e(this),o=s.data(i);typeof t=="string"?o&&typeof o[t]=="function"&&o[t](n):(o&&o.dispose&&o.dispose(),o=new r(this,t),s.data(i,o))})}});