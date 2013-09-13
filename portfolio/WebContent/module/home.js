define(function(require, exports, module){
	var $ = require("jquerymin"); require("jqueryfn");
	var body = $("<div class='body'></div>");
	var foot = $("<div class='foot'></div>");
	exports.result = [body, foot];
	$(exports.result).each(function(index, obj){
		$("#mainHome").append(obj);
	});
	var goldfish = "<div class='content'><div class='content-left'><div style='vertical-align: middle;display: table-cell;'><p style='font-size: 59px; color: white; margin: 0;'>Goldfish</p><p style='font-size: 18px; color: white;margin: 0;'>By this app you can see your photos in different device and also receive the shared photos from your friends</p><div style='margin-top: 15px;' class='store-button'>Window store</div></div></div><div class='content-right goldfish' ></div>";
	var moonrise = "<div class='content'><div class='content-left'><div style='vertical-align: middle;display: table-cell;'><p style='font-size: 59px; color: white; margin: 0;'>Moonrise</p><p style='font-size: 18px; color: white;margin: 0;'>By this app you can see your photos in different device and also receive the shared photos from your friends</p><div style='margin-top: 15px;' class='store-button'>Google Play</div></div></div><div class='content-right moonrise' ></div>";
	var fishnet = "<div class='content'><div class='content-left'></div><div class='content-right' style='display: table; width: 400px; margin-right: 50px;' ><div style='vertical-align: middle;display: table-cell;'><p style='font-size: 59px; color: white; margin: 0;'>Moonrise</p><p style='font-size: 18px; color: white;margin: 0;'>By this app you can see your photos in different device and also receive the shared photos from your friends</p><div style='margin-top: 15px;' class='store-button'>Google Play</div></div></div>";
	body.slide([
        {
        	bg: "styles/default/images/home/goldfish-bg.png",
        	html: goldfish
        },{
        	bg: "styles/default/images/home/moonrise-bg.png",
        	html: moonrise
        },{
        	bg: "styles/default/images/home/fishnet-bg.png",
        	html: fishnet
        }
	]);
	
	var footContent = $("<div style='display:table-cell;vertical-align: middle;text-align: center;'></div>");
	var text = $("<div style='font-size:30px;'>Want to see all projects?</div>");
	var button = $("<div></div>").button({
		text: "VIEW ALL"
	}).css("margin-top", 15);
	
	footContent.append(text);
	footContent.append(button);
	foot.append(footContent);
	/*exports.sayhello = function(){
		
	};*/
	
	exports.button = button;
});