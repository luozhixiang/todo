(function($) {

	/**
	 * View: MainScreen
	 *
	 * Responsibilities:
	 *   - The Main Screen of the application.
	 *   - Handle the overall dimension (for now fixed)
	 */

	// --------- View Registration --------- //
	brite.registerView("MainScreen", {
		loadTmpl : true,
		parent : "#bodyPage"
	}, {
		create : function(data, config) {
			return $("#tmpl-MainScreen").render(data);
		},

		docEvents : {
			// add select class when press $item
			"DO_SELECT_ITEM" : function(event, extra) {
				var $item = extra.$item;
				$item.addClass("selected");
				
				setTimeout(function(){
					$item.removeClass("selected");
				},200);
			}
		},

		postDisplay : function(data, config) {
			var view = this;
			var $e = view.$el;
			brite.display("TodosPanel");
		}

	});
	// --------- View Registration --------- //

	// load screen
	$(function() {
		brite.display("MainScreen");
	});
	
})(jQuery);
