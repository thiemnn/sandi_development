import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const schema = yup.object().shape({
    title: yup
        .string()
        .required("Vui lòng nhập title")
        .max(10, "title tối đa 50 ký tự"),
        content: yup
        .string()
        .required("Vui lòng nhập mật khẩu")
        .max(20, "mật khẩu tối đa 20 ký tự")
});
export default function LoginForm() {
    const {
        register,
        handleSubmit
    } = useForm({ resolver: yupResolver(schema) });
    const onLoginSubmit = (data) => {
        console.log(data);
    };
    return (
        <form onSubmit={handleSubmit(onLoginSubmit)}>
            <div className="field">
                <label>Username: </label>                
                <input {...register("title")} />
            </div>
            <div className="field">
                <label>Password: </label>            
                <input {...register("content")} />
            </div>
            <div className="field">
                <button type="submit">Đăng nhập</button>
            </div>
        </form>
    );
}