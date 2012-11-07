var app = app || {};


// --------- Entity Dao Registration --------- //
(function($){
	
	//register RemoteDao
	brite.registerDao(new brite.dao.RemoteDao("Todo"));
	
	// add dao listeners
	brite.dao.onDao(function(event) {
		console.log("dao.onDao call : " + event.daoEvent.entityType + " - " + event.daoEvent.action);
	}, "namespace1"); 


})(jQuery);

