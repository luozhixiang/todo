(function($) {

	/**
	 * View: TodosPanel
	 */
	brite.registerView("TodosPanel", {
		loadTmpl : true,
		emptyParent : true,
		parent : ".MainScreen-content"
	}, {
		create : function(data, config) {
			return $("#tmpl-TodosPanel").render(data);
		},

		events : {
			
			"btap; .btnCreate" : createTodo ,
			
			"click; .archive"  : doAchive ,
			
			"change; .todoItem input[type=checkbox]" : updateTodo
		},

		daoEvents : {
			"dataChange;Todo" : function(event) {
				var action = event.daoEvent.action;
				if(action!="update"){
					$(document).trigger("DO_TODOSPANEL_REFRESH");
				}
			}
		},

		docEvents : {
			"DO_TODOSPANEL_REFRESH" : function() {
				var view = this;
				refresh.call(view);
			}
		},

		postDisplay : function(data, config) {
			var view = this;
			var $e = view.$el;
			view.$count = $e.find(".TodosPanel-header .count");
			view.$remainingcount = $e.find(".TodosPanel-header .remaining-count");
			refresh.call(view);
		}

	});
	// --------- View Private Methods --------- //

	function createTodo() {
		var view = this;
		var $e = view.$el;
		var $name = $e.find("input[name='todoName']");
		var name = $name.val();
		var data = { name : name, bedone:0 };
		
		brite.dao("Todo").create(data).done(function(){
			$name.val('');
		});
	}
	
	function doAchive() {
		var view = this;
        var ids = [];
        view.$el.find(".todosList li.done").each(function(){
        	ids.push($(this).attr("data-entity-id"));
        });
        if(ids.length>0){
        	brite.dao("Todo").removeMany(ids);
        }
	}
	
	function updateTodo(event) {
		var view = this;
		var $e = view.$el;
		
		var $this = $(event.currentTarget);
		var entity = $this.bEntity();
		var $li = $this.closest("li");
		var data = {id:entity.id , name : entity.name };
		
		if($this.is(":checked")){
			data.bedone = 1;
		}else{
			data.bedone = 0;
		}
		brite.dao("Todo").update(data).done(function(){
			$li.toggleClass("done");
			var bedonecount = $e.find(".todosList li.done").size();
			view.$remainingcount.html(view.count-bedonecount);
		});
	}
	
	function refresh(){
		var view = this;
		var $e = view.$el;
		var $todos = $e.find(".todosList").empty();
		
		brite.dao("Todo").list({withResultCount:true}).done(function(data){
			var todos = data.result;
			view.count = data.result_count;
			view.$count.html(view.count);
			var bedonecount = 0;
			for(var i=0;i<todos.length;i++){
				if(todos[i].bedone==1) bedonecount++;
				$todos.append($("#tmpl-todosPanel-todoItem").render(todos[i]));
			}
			view.$remainingcount.html(view.count-bedonecount);
		});
	}
	
	// --------- /View Private Methods --------- //

})(jQuery);
