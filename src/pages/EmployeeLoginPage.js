import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Card, Form, Grid, Header, Message } from "semantic-ui-react";
import employeeLoginImage from "../assets/images/undraw_login.png";
import { useDispatch } from "react-redux";
import HrmsInput from "../components/HrmsInput";
import { Link } from "react-router-dom";
import { emloyeeLoginHandler } from "../store/actions/authActions";
import { toast } from "react-toastify";

const EmployeeLoginPage = () => {
  const dispatch = useDispatch();

  const EmployeeSignupSchema = Yup.object().shape({
    email: Yup.string()
      .email("Yanlış Email Formatı!")
      .required("Bu alan boş bırakılamaz"),
    password: Yup.string()
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Parolanız en az 8 haneli olmalı ve en az 1 büyük harf, 1 küçük harf, 1 sayı ve 1 özel karakter içermelidir"
      )
      .required("Bu alan boş bırakılamaz"),
  });

  const formik = useFormik({
    initialValues: {
      email: undefined,
      password: undefined,
    },
    validationSchema: EmployeeSignupSchema,
    onSubmit: (values) => {
      dispatch(emloyeeLoginHandler(values)).then((result) => {
        result.data.success === true
          ? toast.success(result.data.message)
          : toast.error(result.data.message);
      });
    },
  });

  return (
    <div style={{ marginTop: "5rem" }}>
      <Header as="h1" color="teal" textAlign="center">
        Kullanıcı Giriş
      </Header>
      <Card fluid centered style={{ width: "50%" }}>
        <Card.Content>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Field>
              <Grid stackable>
                <HrmsInput
                  columnWith="16"
                  placeholder="Email"
                  value={formik.values.email}
                  name="email"
                  icon="mail"
                  iconPosition="left"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.email && formik.touched.email}
                  showError={formik.errors.email}
                />
              </Grid>
            </Form.Field>

            <Form.Field>
              <Grid stackable>
                <HrmsInput
                  type="password"
                  columnWith="16"
                  placeholder="Parola"
                  value={formik.values.password}
                  name="password"
                  icon="lock"
                  iconPosition="left"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.password && formik.touched.password}
                  showError={formik.errors.password}
                />
              </Grid>
            </Form.Field>

            <Button
              type="submit"
              color="teal"
              fluid
              size="large"
              style={{ marginTop: "2em" }}
            >
              GİRİŞ YAP
            </Button>
          </Form>
        </Card.Content>
        <Message>
          <h4>
            Hesabınız yok mu?
            <Link style={{ color: "#00b5ad" }} to="/employee/signup">
              {" Kayıt Olun!"}
            </Link>
          </h4>
        </Message>
      </Card>
      <img
        src={employeeLoginImage}
        width="560"
        style={{ position: "fixed", bottom: 150, right: 10, zIndex: -1 }}
        alt="employee-signup"
      />
    </div>
  );
};

export default EmployeeLoginPage;
