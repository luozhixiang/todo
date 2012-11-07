var app = app || {};

(function($){
	
	app.remoteServiceURL = "http://localhost:8080/todo";
	
	app.pressEvent = brite.ua.hasTouch() ? "touchstart" : "mousedown";
	
	
})(jQuery);

