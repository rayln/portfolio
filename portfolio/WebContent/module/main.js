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
	}
	
	$("#mainTitle").title({
		tab:[
		     {name: "ABOUT US"},
		     {name: "CONCEPTS"},
		     {name: "DELIVERD PROJECTS"},
		     {name: "USABILITY TESTING"}
		]
	});
	
	home.button.on("click", goNext);
	
});