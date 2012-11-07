package com.todo.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "t_todo")
public class Todo extends BaseTimeStampedEntity {

    private String name;
    
    private int bedone=0;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getBedone() {
		return bedone;
	}

	public void setBedone(int bedone) {
		this.bedone = bedone;
	}

    
}
