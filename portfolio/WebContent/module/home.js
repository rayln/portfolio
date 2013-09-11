define(function(require, exports, module){
	var $ = require("jquerymin");
	require("jqueryfn");
	var body = $("<div class='body'></div>");
	var foot = $("<div class='foot'></div>");
	body.slide([
        {
        	bg: "styles/default/images/home/goldfish-bg.png"
        },{
        	bg: "styles/default/images/home/goldfish-bg.png"
        },{
        	bg: "styles/default/images/home/goldfish-bg.png"
        }
	]);
	
	exports.result = [body, foot];
	/*exports.sayhello = function(){
		
	};*/
});