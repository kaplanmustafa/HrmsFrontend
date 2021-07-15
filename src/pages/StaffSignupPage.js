import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Card, Form, Grid, Header } from "semantic-ui-react";
import employeeSignupImage from "../assets/images/employeeSignup.jpg";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { staffSignupHandler } from "../store/actions/authActions";
import HrmsInput from "../components/HrmsInput";

const StaffSignupPage = () => {
  const dispatch = useDispatch();

  const StaffSignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Çok Kısa!")
      .max(50, "Çok Uzun!")
      .required("Bu alan boş bırakılamaz"),
    surname: Yup.string()
      .min(2, "Çok Kısa!")
      .max(50, "Çok Uzun!")
      .required("Bu alan boş bırakılamaz"),
    identityNumber: Yup.number()
      .required("Bu alan boş bırakılamaz")
      .test("len", "Lütfen 11 haneli T.C. Kimlik Numaranızı giriniz", (val) => {
        if (val) return val.toString().length === 11;
      }),
    birthYear: Yup.number()
      .required("Bu alan boş bırakılamaz")
      .test("len", "Lütfen 4 haneli doğum yılınızı giriniz", (val) => {
        if (val) return val.toString().length === 4;
      }),
    email: Yup.string()
      .email("Yanlış Email Formatı!")
      .required("Bu alan boş bırakılamaz"),
    password: Yup.string()
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Parolanız en az 8 haneli olmalı ve en az 1 büyük harf, 1 küçük harf, 1 sayı ve 1 özel karakter içermelidir"
      )
      .required("Bu alan boş bırakılamaz"),
    passwordRepeat: Yup.string()
      .oneOf([Yup.ref("password"), null], "Parolalar Eşleşmiyor!")
      .required("Bu alan boş bırakılamaz"),
  });

  const formik = useFormik({
    initialValues: {
      name: undefined,
      surname: undefined,
      identityNumber: undefined,
      birthYear: undefined,
      email: undefined,
      password: undefined,
      passwordRepeat: undefined,
    },
    validationSchema: StaffSignupSchema,
    onSubmit: (values) => {
      dispatch(staffSignupHandler(values)).then((result) => {
        result.data.success === true
          ? toast.success(result.data.message)
          : toast.error(result.data.message);
      });
    },
  });

  const handleChangeSelect = (value, field) => {
    formik.setFieldValue(field, value);
  };

  return (
    <div style={{ marginTop: "5rem" }}>
      <Header as="h1" color="teal" textAlign="center">
        Personel Kayıt
      </Header>
      <Card fluid>
        <Card.Content>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Field>
              <Grid stackable>
                <HrmsInput
                  columnWith="8"
                  label="* Ad"
                  placeholder="Ad"
                  value={formik.values.name}
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.name && formik.touched.name}
                  showError={formik.errors.name}
                />
                <HrmsInput
                  columnWith="8"
                  label="* Soyad"
                  placeholder="Soyad"
                  value={formik.values.surname}
                  name="surname"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.surname && formik.touched.surname}
                  showError={formik.errors.surname}
                />
              </Grid>
            </Form.Field>

            <Form.Field>
              <Grid stackable>
                <HrmsInput
                  columnWith="8"
                  label="* T.C. Kimlik No"
                  placeholder="T.C. Kimlik No"
                  value={formik.values.identityNumber}
                  maxLength="11"
                  name="identityNumber"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.errors.identityNumber &&
                    formik.touched.identityNumber
                  }
                  showError={formik.errors.identityNumber}
                />
                <HrmsInput
                  columnWith="8"
                  label="* Doğum Yılı"
                  placeholder="Doğum Yılı"
                  value={formik.values.birthYear}
                  maxLength="4"
                  name="birthYear"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.birthYear && formik.touched.birthYear}
                  showError={formik.errors.birthYear}
                />
              </Grid>
            </Form.Field>

            <Form.Field>
              <Grid stackable>
                <HrmsInput
                  columnWith="8"
                  label="* Email"
                  placeholder="Email"
                  value={formik.values.email}
                  name="email"
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
                  columnWith="8"
                  label="* Parola"
                  placeholder="Parola"
                  value={formik.values.password}
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.password && formik.touched.password}
                  showError={formik.errors.password}
                />
                <HrmsInput
                  columnWith="8"
                  label="* Parola Tekrarı"
                  placeholder="Parola Tekrarı"
                  value={formik.values.passwordRepeat}
                  name="passwordRepeat"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.errors.passwordRepeat &&
                    formik.touched.passwordRepeat
                  }
                  showError={formik.errors.passwordRepeat}
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
              PERSONEL EKLE
            </Button>
          </Form>
        </Card.Content>
      </Card>
      <img
        src={employeeSignupImage}
        width="560"
        style={{ position: "fixed", bottom: 150, right: 10, zIndex: -1 }}
        alt="employee-signup"
      />
    </div>
  );
};

export default StaffSignupPage;
