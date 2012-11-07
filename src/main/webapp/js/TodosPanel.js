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
			//create todo when user click
			"btap; .btnCreate" : function() {
				var view = this;
				var $e = view.$el;
				var $name = $e.find("input[name='todoName']");
				var name = $name.val();
				var data = { name : name, bedone:0 };
				
				brite.dao("Todo").create(data).done(function(){
					$name.val('');
				});
			},
			
			"change; .todoItem input[type=checkbox]" : function(event) {
				var view = this;
				var $e = view.$el;
				
				var $this = $(event.currentTarget);
				var $li = $this.closest("li");
				var id = $li.attr("data-entity-id");
				var name = $li.attr("data-entity-name");
				var data = {id:id , name : name };
				if($this.is(":checked")){
					data.bedone = 1;
				}else{
					data.bedone = 0;
				}
				brite.dao("Todo").update(data).done(function(){});
			}
		},

		daoEvents : {
			"dataChange;Todo" : function() {
				$(document).trigger("DO_TODOSPANEL_REFRESH");
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
