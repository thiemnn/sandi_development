import React, { useState, useEffect } from "react";
// /// create rule for your form
// const rules = {
//     email: "required|email|min:8|max:20",
//     password: "required|min:7|max:40"
// };
// Validator.setLocale(Validator.languages.vi)
// /// custom message for your form
// Validator.setMessages({
//     email: "sfsdfds :name ",
//     password: {
//         min: "sdfsdf password min"
//     }
// });

export default function TestMyValidate() {
    const [values, setValues] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});

    /// add function error custom
    // const hasErr = (name) => {
    //     return touched[name] && errors.isError(name);
    // };
    /// add function when value change
    const handleChange = (event) => {
        event.persist();
        setValues({ ...values, [event.target.name]: event.target.value });
        console.log(values)
    };
    /// hook react
    // useEffect(() => {
    //     //setErrors(Validator.validate(values, rules));
    // }, [values]);

    return (
        <div className="App">
            <form>
                <label htmlFor="email"> mail of u </label>
                <input
                    type="text"
                    // className={hasErr("email") ? "error" : ""}
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                />
                {/* { hasErr("email") && (
                    <div className="text-red">{errors.getError("email")}</div>
                )} */}

                <label htmlFor="password"> password of you </label>
                <input
                    type="password"
                    // className={hasErr("password") ? "error" : ""}
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                />
                {/* { hasErr("password") && (
                    <div className="text-red">{errors.getError("password")}</div>
                )} */}
            </form>
        </div>
    );
}