import _Form from "./Form";
import Field from "./Filed";
import useForm from "./useForm";
const Form = _Form;
Form.Filed = Field;
Form.useForm = useForm;
export { Field, useForm };
export default Form;
