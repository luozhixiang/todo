package com.todo.web;

import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.britesnow.snow.util.JsonUtil;
import com.britesnow.snow.util.ObjectUtil;
import com.britesnow.snow.web.handler.annotation.WebActionHandler;
import com.britesnow.snow.web.handler.annotation.WebModelHandler;
import com.britesnow.snow.web.param.annotation.WebModel;
import com.britesnow.snow.web.param.annotation.WebParam;
import com.todo.dao.DaoRegistry;
import com.todo.dao.IDao;
import com.todo.entity.BaseEntity;
import com.todo.util.JSONOptions;
import com.google.inject.Inject;
import com.google.inject.Singleton;

@Singleton
@SuppressWarnings({ "unchecked" })
public class DaoWebHandlers {

    private DaoRegistry      daoRegistry;
    
    public static Logger logger = LoggerFactory.getLogger(DaoWebHandlers.class);

    @Inject
    public DaoWebHandlers(DaoRegistry daoRegistry) {
        this.daoRegistry = daoRegistry;
    }

    @WebModelHandler(startsWith = "/daoGet")
    public void daoGet(@WebModel Map m, @WebParam("objType") String objType, @WebParam("obj_id") Long id) {
        IDao dao = daoRegistry.getDao(objType);
        Object obj = dao.get(id);
        m.put("result", obj);
    }

    @WebModelHandler(startsWith = "/daoList")
    public void daoList(@WebModel Map m, @WebParam("objType") String objType, @WebParam("opts") String jsonOpts) {
        IDao dao = daoRegistry.getDao(objType);
        
        JSONOptions opts = new JSONOptions(jsonOpts);
        
        List<Object> list = dao.list(opts.getPageIndex(), opts.getPageSize(), 
        		opts.getMatchMap(), opts.getOrderBy(), opts.getOrderType());
        
        Long cnt = dao.count(opts.getMatchMap());
        m.put("result_count", cnt);
        m.put("result", list);
    }

    @WebActionHandler
    public Object daoSave(@WebParam("objType") String objType, @WebParam("obj_id") Long id,
                            @WebParam("objJson") String jsonObj) {
        Map jsonMap = JsonUtil.toMapAndList(jsonObj);
        IDao dao = daoRegistry.getDao(objType);
        Object obj = dao.get(id);
        if (obj == null) {
            obj = daoRegistry.getEntityInstance(objType);
        }
        try {
            ObjectUtil.populate(obj, jsonMap);
        } catch (Exception ex) {
        	logger.error(ex.getMessage(), ex);
        }
        try {
        	if(id!=null && id.longValue()>0){
        		return dao.update(obj);
        	}else{
        		return dao.save(obj);
        	}
        } catch (Exception e) {
        	logger.error(e.getMessage(), e);
        	return e;
        }
        
    }

    @WebActionHandler
    public void daoDelete(@WebParam("objType") String objType, @WebParam("obj_id") Long id) {
        IDao dao = daoRegistry.getDao(objType);
        BaseEntity entity = (BaseEntity) dao.get(id);
        dao.delete(entity);
    }
    
    @WebActionHandler
    public void daoDeleteMany(@WebParam("objType") String objType, @WebParam("obj_ids")  String jsonIds) {
        Map jsonMap = JsonUtil.toMapAndList(jsonIds);
        IDao dao = daoRegistry.getDao(objType);
        JSONArray ids = (JSONArray) jsonMap.get("obj_ids");
        for (Object id : ids.toArray()) {
            BaseEntity entity = (BaseEntity) dao.get(Long.valueOf(id.toString()));
            dao.delete(entity);
        }
    }

}
