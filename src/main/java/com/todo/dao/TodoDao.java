package com.todo.dao;

import java.util.List;

import com.todo.entity.Todo;

public class TodoDao extends BaseHibernateDao<Todo> {


    
    @SuppressWarnings("unchecked")
	public List<Todo> getTodos(){
        List<Todo>  list = (List<Todo>) daoHelper.find(0,100,"select o from Todo o");
        return list;
    }
    
    
}
