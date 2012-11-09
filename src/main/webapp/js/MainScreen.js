(function($) {

	/**
	 * View: MainScreen
	 *
	 */

	// --------- View Registration --------- //
	brite.registerView("MainScreen", {
		loadTmpl : true,
		parent : "#bodyPage"
	}, {
		create : function(data, config) {
			return $("#tmpl-MainScreen").render(data);
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
