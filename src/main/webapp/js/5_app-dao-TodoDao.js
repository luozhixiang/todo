(function($){
	
	
	//-------- Remote dao ---------//
	function RemoteTodoDao(){
		this.constructor._super.constructor.call(this,"Todo");
	}
	brite.inherit(RemoteTodoDao,brite.dao.RemoteDao);
	//-------- /Remote dao ---------//
	
	app.RemoteTodoDao = RemoteTodoDao;
	
})(jQuery);