package com.todo.dao;


import com.todo.entity.BaseEntity;

// DO NOT PUT SINGLETON ON THIS ONE, we need to have one instance per Entity
public class GenericDao extends BaseHibernateDao<BaseEntity> {

    public void setPersistentClass(Class persitentClass) {
        this.persistentClass = persitentClass;
    }
}
