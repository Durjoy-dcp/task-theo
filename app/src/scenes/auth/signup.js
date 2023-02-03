import { Field, Formik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import validator from "validator";

import { setUser } from "../../redux/auth/actions";

import LoadingButton from "../../components/loadingButton";
import api from "../../services/api";

export default function signup() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth.user);

  return (
    // Auth Wrapper
    <div className="authWrapper font-myfont">
      <div className="font-[Helvetica] text-center text-[32px] font-semibold	mb-[15px]">Account team</div>

      {user && <Redirect to="/" />}
      <Formik
        initialValues={{ username: "", organisation: "", password: "" }}
        onSubmit={async (values, actions) => {
          try {
            console.log(values);
            const { user, token } = await api.post(`/user/signup`, values);
            if (token) api.setToken(token);
            if (user) dispatch(setUser(user));
          } catch (e) {
            console.log("e", e);
            toast.error("Wrong login", e.code);
          }
          actions.setSubmitting(false);
        }}>
        {({ values, errors, isSubmitting, handleChange, handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div className="mb-[25px]">
                <div className="flex flex-col-reverse">
                  <Field
                    className="peer signInInputs "
                    validate={(v) => validator.isEmpty(v) && "This field is Required"}
                    name="username"
                    type="text"
                    id="username"
                    value={values.username}
                    onChange={handleChange}
                  />
                  <label className="peer-focus:text-[#116eee]" htmlFor="username">
                    Username
                  </label>
                </div>
                {/* Error */}
                <p className="text-[12px] text-[#FD3131]">{errors.username}</p>
              </div>
              <div className="mb-[25px]">
                <div className="flex flex-col-reverse">
                  <Field
                    className="peer signInInputs "
                    validate={(v) => validator.isEmpty(v) && "This field is Required"}
                    name="organisation"
                    type="text"
                    id="organisation"
                    value={values.organisation}
                    onChange={handleChange}
                  />
                  <label className="peer-focus:text-[#116eee]" htmlFor="organisation">
                    Organisation name
                  </label>
                </div>
                {/* Error */}
                <p className="text-[12px] text-[#FD3131]">{errors.organisation}</p>
              </div>
              <div className="mb-[25px]">
                <div className="flex flex-col-reverse">
                  <Field
                    className="peer signInInputs"
                    validate={(v) => validator.isEmpty(v) && "This field is Required"}
                    name="password"
                    type="password"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                  />
                  <label className="peer-focus:text-[#116eee]" htmlFor="password">
                    Password
                  </label>
                </div>
                {/* Error */}
                <p className="text-[12px] text-[#FD3131]">{errors.password}</p>
              </div>
              <div role="group" aria-labelledby="my-radio-group">
                <label>
                  <Field type="radio" name="avatar" onChange={handleChange} value="https://i.ibb.co/r5jVxKc/avatarimg1.png" />
                  <img style={{ height: "50px", width: "50px", margin: "10px" }} src="https://i.ibb.co/r5jVxKc/avatarimg1.png" alt="" />
                </label>
                <label>
                  <Field type="radio" name="avatar" onChange={handleChange} value="https://i.ibb.co/P13PWrz/avatarimg2.png" />
                  <img style={{ height: "50px", width: "50px", margin: "10px" }} src="https://i.ibb.co/P13PWrz/avatarimg2.png" alt="" />
                </label>
                <label>
                  <Field type="radio" name="avatar" onChange={handleChange} value="https://i.ibb.co/m94zbXF/avatarimg3.png" />
                  <img style={{ height: "50px", width: "50px", margin: "10px" }} src="https://i.ibb.co/m94zbXF/avatarimg3.png" alt="" />
                </label>
              </div>
              {/* SignIn Button */}
              <LoadingButton
                className="font-[Helvetica] w-[220px] bg-[#007bff] hover:bg-[#0069d9] text-[#fff] rounded-[30px] m-auto block text-[16px] p-[8px] min-h-[42px] "
                loading={isSubmitting}
                type="submit"
                color="primary">
                Signup
              </LoadingButton>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}
