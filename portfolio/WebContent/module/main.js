seajs.use(['./module/home.js','jquerymin','jqueryfn'], function(home, jquery){
	var $ = jquery;
	$("#mainTitle").title({
		//tab:["ABOUT US", "CONCEPTS", "DELIVERD PROJECTS", "USABILITY TESTING"]
		tab:[
		     {name: "ABOUT US"},
		     {name: "CONCEPTS"},
		     {name: "DELIVERD PROJECTS"},
		     {name: "USABILITY TESTING"}
		]
	});
	
	$(home.result).each(function(index, obj){
		$("#mainHome").append(obj);
	});
});