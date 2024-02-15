import * as yup from "yup";

const userloginValidationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export default userloginValidationSchema;
