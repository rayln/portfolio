define(function(require, exports, module){  
	var $ = require("jquerymin");
	
	$.extend({
		test: function(){
			alert(1234);
		},
		animateSlide: function(params, time, callback){
			var _this = $(this);
			var percentTime = .3;
			var percentPosition = .5;
			var frontParams = {};
			var blackParams = {};
			for(var key in params){
				frontParams[key] = params[key] * percentPosition;
				blackParams[key] = params[key] * (1 - percentPosition);
			}
			_this.animate(frontParams, time * percentTime, function(){
				_this.animate(blackParams, time * (1 - percentTime), function(){
					if(callback){
						callback();
					}
				});
			});
		}
	});
	
	$.fn.extend({
		title: function(params){
			var _this = $(this);
			var option = {
				width: 800,
				point:{
					width: 20,
					height: 11
				},
				tabInfo:{
					animationTime: 350
				},
				window: {
					width: $(window).width(),
					height: $(window).height()
				}
			};
			params = params || {};
			$.extend(true,params,option);
			var frame = $("<div class=\"frame\"></div>");
			var name = $("<div class=\"name selected\"></div>");
			var tab = $("<div class=\"tab\">");
			var body = $("<div class=\"body\"></div>");
			var foot = $("<div class=\"foot\"></body>");
			var left = $("<span class='left'></span>");
			var point = $("<span class='point'></span>");
			var right = $("<span class='right'></span>");
			var tabList = [];
			
			(function bodyInit(){
				_this.addClass("pf-main-title");
				name.append(params.name.name);
				name.width(params.name.width);
				
				$(params.tab).each(function(index, obj){
					var objTemp = $("<span>"+obj.name+"</span>");
					tabList.push(objTemp);
					tab.append(objTemp);
					objTemp.data("title-index", index);
				});
				
				body.append(tab);
				body.append(name);
				frame.append(body);
				_this.append(frame);
			})();
			function reset(){
				stop();
				if(name.hasClass("selected")){
					pointMove.call(name);
				}else{
					pointMove.call(tab.find(".selected"));
				}
			}
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
			function stop(){
				left.stop();
				right.stop();
			}
			(function event(){
				$(tabList).each(function(index, obj){
					obj.on("mouseenter", function(){
						stop();
						pointMove.call(obj);
					}).on("mouseleave", function(){
						reset();
					}).on("click", function(){
						var that = $(this);
						$(tabList).each(function(index, obj){
							$(obj).removeClass("selected");
						});
						name.removeClass("selected");
						that.addClass("selected");
					}).on("click", params.tab[index].click || null);
				});
				name.on("mouseenter", function(){
					stop();
					pointMove.call(name);
				}).on("mouseleave", function(){
					reset();
				}).on("click", function(){
					$(tabList).each(function(index, obj){
						$(obj).removeClass("selected");
					});
					name.addClass("selected");
				}).on("click", params.name.click || null);
			})();
			function pointMove(e){
				var leftWith = calc(this.position(), this, params);
				left.animate({
					width: leftWith
				}, params.tabInfo.animationTime);
				right.animate({
					width: calcRight(leftWith, params)
				}, params.tabInfo.animationTime);
			}
			function calc(position, obj, params){
				return position.left + obj.width() / 2 - params.point.width / 2;
			}
			function calcRight(leftWith, params){
				return $(window).width() - leftWith - params.point.width;
			}
			return {
				go: function(index){
					if(index == -1){
						pointMove.call(name);
					}else{
						pointMove.call(tabList[index]);
					}
				}
			};
		},
		
		
		/** slide plugs!!  **/
		slide: function(params){
			var _this = $(this);
			var option = {
				currentIndex: 0,
				duration: 400,
				pointer:{
					width: 27, 
					height: 27, 
					marginLeft: 15, 
					marginRight: 15,
					pointerWidth: 0,
					border: 2
				},
				arrow:{
					left:{
						left: 30
					},
					right: {
						right: 30
					},
					height: 77,
					width: 36
				},
				title: {
					height: 76
				},
				body: {
					width: _this.width(),
					height: (_this.height() - 76)
				}
			};
			params = params || {};
			$.extend(true, params, option);
			//create Slide background!
			var body = $("<div class='slide-body'></div>");
			var navigate = {
				pointer: $("<div class='slide-navigate'></div>"),
				arrowLeft: $("<div class='slide-arrow-left'></div>"),
				arrowRight: $("<div class='slide-arrow-right'></div>"),
				pointerList: []
			};
			
			var slideList = (function(){
				var arr = [];
				$(params).each(function(index, obj){
					var bg = $("<div class='slide-part' style='background:url("+obj.bg+") center center no-repeat; '></div>");
					//var bg = $("<div class='slide-part' ></div>");
					/*(function createBg(){
						var bgframe = $("<img src='"+obj.bg+"' style='position:absoulte; left:0; top:0;width:100%; height:100%;' />");
						bg.append(bgframe);
					})();*/
					arr.push(bg);
					bg.append($(obj.html));
					bg.data("slide-index", index);
					body.append(bg);
					
					if(index == params.currentIndex){
						bg.css("left", 0).css("top", 0);
					}else{
						bg.css("left", $(window).width()).css("top", 0);
					}
				});
				return arr;
			})();
			
			(function initBody(){
				_this.append(body);
			})();
			
			//create Pointer Navigate
			(function createNavigate(){
				(function appendNavigate(){
					body.append(navigate.pointer);
					body.append(navigate.arrowLeft);
					body.append(navigate.arrowRight);
				})();
				
				$(slideList).each(function(index, obj){
					var pointerNavi = $("<div class='slide-navigate-pointer'></div>");
					pointerNavi.css("width", params.pointer.width)
								.css("height", params.pointer.height)
								.css("margin-left", params.pointer.marginLeft)
								.css("margin-right", params.pointer.marginRight)
								.css("border-width", params.pointer.border);
					pointerNavi.data("slide-index", index);
					if(index == 0){
						pointerNavi.addClass("selected");
					}
					navigate.pointerList.push(pointerNavi);
					navigate.pointer.append(pointerNavi);
					
					params.pointer.pointerWidth += params.pointer.width + params.pointer.marginLeft + params.pointer.marginRight + params.pointer.border * 2;
				});
				
				(function(){
					var top = (params.body.height - params.arrow.height)/2 + params.title.height;
					navigate.arrowLeft.css("top", top).css("left", params.arrow.left.left);
					navigate.arrowRight.css("top", top).css("right", params.arrow.right.right);
				})();
				
				var ponintLeft = ($(window).width() - params.pointer.pointerWidth) / 2;
				navigate.pointer.css("left", ponintLeft);
			})();
			
			
			(function bindEvent(){
				function moveRtoL(pointer, nextIndex, currentObj, nextObj){
					move(pointer, nextIndex, currentObj, nextObj, -$(window).width());
				}
				
				function moveLtoR(pointer, nextIndex, currentObj, nextObj){
					move(pointer, nextIndex, currentObj, nextObj, $(window).width());
				}
				function move(pointer, nextIndex, currentObj, nextObj, moveDirection){
					pointer.removeClass("selected");
					navigate.pointerList[nextIndex].addClass("selected");
					$(slideList).each(function(index, obj){
						if(currentObj != obj && nextObj != obj){
							obj.hide();
						}else{
							obj.show();
						}
					});
					currentObj.animate({
						left: moveDirection
					},params.duration);
					
					nextObj.animate({
						left: 0
					},params.duration);
				}
				
				navigate.arrowLeft.on("click", function(){
					var pointer = navigate.pointer.find(".selected");
					var index = pointer.data("slide-index");
					var currentObj = slideList[index];
					var nextIndex = (index == 0 ? slideList.length - 1 : index - 1);
					var nextObj = slideList[nextIndex].css("left", -$(window).width());
					moveLtoR(pointer, nextIndex, currentObj, nextObj);
				});
				navigate.arrowRight.on("click", function(){
					var pointer = navigate.pointer.find(".selected");
					var index = pointer.data("slide-index");
					var currentObj = slideList[index];
					var nextIndex = (index == slideList.length - 1 ? 0 : index + 1);
					var nextObj = slideList[nextIndex].css("left", $(window).width());
					moveRtoL(pointer, nextIndex, currentObj, nextObj);
				});
				
				$(navigate.pointerList).each(function(index, obj){
					obj.on("click",function(){
						var pointer = navigate.pointer.find(".selected");
						var currentIndex = pointer.data("slide-index");
						var nextIndex = obj.data("slide-index");
						if(currentIndex == nextIndex){
							return;
						}
						var currentObj = slideList[currentIndex];
						
						if(currentIndex < nextIndex){
							var nextObj = slideList[nextIndex].css("left", $(window).width());
							moveRtoL(pointer, nextIndex, currentObj, nextObj);
						}else{
							var nextObj = slideList[nextIndex].css("left", -$(window).width());
							moveLtoR(pointer, nextIndex, currentObj, nextObj);
						}
					});
				});
				
				setInterval(function(){
					var pointer = navigate.pointer.find(".selected");
					var index = pointer.data("slide-index");
					var currentObj = slideList[index];
					var nextIndex = (index == slideList.length - 1 ? 0 : index + 1);
					var nextObj = slideList[nextIndex].css("left", $(window).width());
					moveRtoL(pointer, nextIndex, currentObj, nextObj);
				}, 5000);
			})();
		},
		
		animateSlide: function(params, time, callback){
			var _this = $(this);
			var percentTime = .5;
			var percentPosition = .3;
			var frontParams = {};
			var blackParams = {};
			for(var key in params){
				frontParams[key] = params[key] * percentPosition;
				blackParams[key] = params[key];
			}
			_this.animate(frontParams, time * percentTime, function(){
				_this.animate(blackParams, time * (1 - percentTime), function(){
					if(callback){
						callback();
					}
				});
			});
		},
		
		//Button
		button: function(params){
			var _this = $(this);
			var bg = $("<span class='hover'></span>");
			var text = $("<span class='text'></span>").text(params.text);
			var option = {
				duration: 200
			};
			
			$.extend(true, params, option);
			_this.addClass("button");
			_this.append(bg);
			_this.append(text);
			
			//bind event
			(function(){
				_this.on("mouseenter", function(){
					bg.css("right","auto").css("left", 0);
					bg.stop();
					bg.animate({
						width: "100%"
					}, params.duration);
					text.css("color", 'white');
				});
				_this.on("mouseleave", function(){
					bg.css("left","auto").css("right", 0);
					bg.stop();
					bg.animate({
						width: 0
					}, params.duration);
					text.css("color", "black");
				});
			})();
			return _this;
		},
		
		//tips
		tips: function(params){
			var _this = $(this);
			var option = {};
			$.extend(true, params, option);
			
			//w:167 h 36 c: 1d1d1d
			var body = $("<div class='tips-body'></div>");
			var tipsLeft = $("<div class='tips-body-left'></div>");
			var tipsRight = $("<div class='tips-body-right'></div>");
		}
	});
	
	
});