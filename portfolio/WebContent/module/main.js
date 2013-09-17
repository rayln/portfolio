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
		var currentIndex = $(".pf-main-body > .selected").data("module-index");
		title.go(currentIndex);
		goPage(currentIndex + 1);
	}
	function goPage(index){
		$("#mainHome").animate({
			'margin-top': -$(window).height() * index
		}, 400);
		$(".module").each(function(listIndex, obj){
			if(index == listIndex){
				$(obj).addClass("selected");
			}else{
				$(obj).removeClass("selected");
			}
		});
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
	
	$("#mainTips").tips({
		text: 'Navi',
		catelogTitle:"HOME",
		catelog:[
		         {name: "Portfolio"},
		         {name: "About us"},
		         {name: "Concepts"},
		         {name: "Deliverd"},
		         {name: "Usability"}
		]
	});
	
	
	//bind event
	(function(){
		
		//resize
		$(window).on("resize", function(){
			var currentIndex = $(".pf-main-body > .selected").data("module-index");
			$("#mainHome").css('margin-top', -$(window).height() * currentIndex);
		});
	})();
});