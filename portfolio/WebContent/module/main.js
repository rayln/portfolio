seajs.use(['./module/home.js','./module/about.js','jquerymin','jqueryfn'], function(home, about, jquery){
	var $ = jquery;
	var params = {
		window: {
			width: $(window).width(),
			height: $(window).height()
		}
	};
	
	// init
	(function init(){
		$(".module").each(function(index, obj){
			$(obj).data("module-index", index);
			if(index == 0){
				$(obj).addClass("selected");
			}
		});
	})();
	
	function goNext(){
		var currentIndex = $(".pf-main-body").find(".selected").data("module-index");
		$("#mainHome").animate({
			'margin-top': -params.window.height * (currentIndex + 1)
		}, 400);
		title.go(currentIndex);
	}
	function goPage(index){
		$("#mainHome").animate({
			'margin-top': -params.window.height * index
		}, 400);
	}
	
	var title = $("#mainTitle").title({
		tab:[
		     {name: "ABOUT US", click: function(){
		    	 goPage(1);
		     }},
		     {name: "CONCEPTS", click: function(){
		    	 goPage(1);
		     }},
		     {name: "DELIVERD PROJECTS", click: function(){
		    	 goPage(1);
		     }},
		     {name: "USABILITY TESTING", click: function(){
		    	 goPage(1);
		     }}
		],
		name:{
			name: "<span>ASG</span> DESIGN TEAM PORTFOLIO",
			width: 160,
			click: function(){
				goPage(0);
			}
		}
	});
	
	home.button.on("click", goNext);
	
});