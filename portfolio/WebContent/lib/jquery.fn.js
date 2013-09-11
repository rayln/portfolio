define(function(require, exports, module){  
	var $ = require("jquerymin");
	$.fn.extend({
		title: function(params){
			var _this = $(this);
			var option = {
				width: 800,
				name: "<span>ASG</span> DESIGN TEAM PORTFOLIO",
				nameWidth: 160,
				point:{
					width: 20,
					height: 11
				},
				tabInfo:{
					animationTime: 350
				}
			};
			params = params || {};
			$.extend(true,params,option);
			var frame = $("<div class=\"frame\"></div>");
			var name = $("<div class=\"name\"></div>");
			var tab = $("<div class=\"tab\">");
			var body = $("<div class=\"body\"></div>");
			var foot = $("<div class=\"foot\"></body>");
			var left = $("<span class='left'></span>");
			var point = $("<span class='point'></span>");
			var right = $("<span class='right'></span>");
			var tabList = [];
			
			(function bodyInit(){
				_this.addClass("pf-main-title");
				name.append(params.name);
				name.width(params.nameWidth);
				$(params.tab).each(function(a,b,c){
					var objTemp = $("<span>"+b.name+"</span>");
					tabList.push(objTemp);
					tab.append(objTemp);
				});
				
				body.append(tab);
				body.append(name);
				frame.append(body);
				_this.append(frame);
			})();
			
			(function footInit(){
				
				var initObj = name;
				var position = initObj.position();
				var leftWith = calc(position, initObj, params);
				left.width(leftWith);
				right.width(calcRight(leftWith, params));
				right.css("float", "right");
				
				foot.append(left);
				foot.append(point);
				foot.append(right);
				_this.append(foot);
			})();
			
			(function event(){
				$(tabList).each(function(index, obj){
					obj.on("mouseenter", function(){
						pointMove.call(obj);
					});
				});
				name.on("mouseenter", function(){
					pointMove.call(name);
				});
				function pointMove(e){
					var leftWith = calc(this.position(), this, params);
					left.animate({
						width: leftWith
					}, params.tabInfo.animationTime);
					right.animate({
						width: calcRight(leftWith, params)
					}, params.tabInfo.animationTime);
				}
			})();
			
			function calc(position, obj, params){
				return position.left + obj.width() / 2 - params.point.width / 2;
			}
			function calcRight(leftWith, params){
				return $(window).width() - leftWith - params.point.width;
			}
		},
		
		slide: function(params){
			var _this = $(this);
			var option = {
				currentIndex: 0
			};
			params = params || {};
			$.extend(true, params, option);
			
			var body = $("<div class='slide-body'></div>");
			var slideList = (function(){
				var arr = [];
				$(params).each(function(index, obj){
					var bg = $("<div class='slide-part' style='background:url("+obj.bg+") center center; background-size: 100% auto;'></div>");
					arr.push(bg);
					body.append(bg);
					
					if(index == params.currentIndex){
						bg.css("left", 0).css("top", 0);
					}else{
						bg.css("left", $(window).width()).css("top", 0);
					}
				});
				return arr;
			})();
			
			(function appendChild(){
				_this.append(body);
			})();
		}
	});
	$.extend({
		
	});
});