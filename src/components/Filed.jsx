import React, { Component } from "react";
import FieldContext from "./FiledContext";
export default class Filed extends Component {
  static contextType = FieldContext;
  onStoreChange(){
    this.forceUpdate()
  }
  componentDidMount(){
    this.unregister=this.context.registerFiledEntities(this)
  }
  getControlled = () => {
    const { getFieldValue, setFieldsValue } = this.context;
    const { name } = this.props;
    return {
      value: getFieldValue(name),
      onChange: (e) => {
        const newValue = e.target.value;
        setFieldsValue({ [name]: newValue });
        // this.forceUpdate()
        // console.log(newValue, "newValue");
      },
    };
  };
  render() {
    const { children } = this.props;
    const returnChildrenNode = React.cloneElement(
      children,
      this.getControlled()
    );
    return returnChildrenNode;
  }
}
