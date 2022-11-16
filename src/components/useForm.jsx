import React, { Component } from "react";
import { useRef } from "react";

class FormStore {
    constructor() {
        this.store = {}; //状态值 name===>value
        this.filedEntities = [];
        this.callbacks={}
    }
    setCallbacks=(callbacks)=>{
      this.callbacks={...this.callbacks,...callbacks}
    }
    //注册和取消注册 订阅与取消订阅
    registerFiledEntities = (entity) => {
        this.filedEntities.push(entity);
        return () => {
            this.filedEntities = this.filedEntities.filter(
                (item) => item !== entity
            );
            delete this.store[entity.props.name];
        };
    };
    validate=()=>{
      let err=[]
      return err
    }
    submit = () => {
        let err=this.validate()
        if(err.length===0){
          console.log("submit ");
        }else{
          console.log('error')
        }
    };
    getFieldsValue = () => {
        return {
            ...this.store
        };
    };
    getFieldValue = (name) => {
        return this.store[name];
    };
    setFieldsValue = (newStore) => {
        //update store
        this.store = {
            ...this.store,
            ...newStore
        };
        //update comp
        console.log(this.store, "store");
        this.filedEntities.forEach((item) => {
            Object.keys(newStore).forEach((i) => {
                if (i === item.props.name) {
                    item.onStoreChange();
                }
            });
        });
    };
    getForm = () => {
        return {
            getFieldValue: this.getFieldValue,
            getFieldsValue: this.getFieldsValue,
            setFieldsValue: this.setFieldsValue,
            registerFiledEntities: this.registerFiledEntities,
            submit:this.submit,
            setCallbacks:this.setCallbacks
        };
    };
}

function useForm() {
    //卸载之前都是指向的同一个值
    const formRef = useRef();
    if (!formRef.current) {
        const formStore = new FormStore();
        formRef.current = formStore.getForm();
    }
    return [formRef.current];
}
export default useForm;
