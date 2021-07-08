import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Input, Card, Form, Grid, Header } from "semantic-ui-react";
import employeeSignupImage from "../assets/images/employeeSignup.jpg";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { staffSignupHandler } from "../store/actions/authActions";

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
                <Grid.Column width={8} textAlign="left">
                  <label>* Ad</label>
                  <Input
                    style={{ width: "100%" }}
                    placeholder="Ad"
                    onChange={(event, data) =>
                      handleChangeSelect(data.value, "name")
                    }
                    onBlur={formik.onBlur}
                    id="name"
                    value={formik.values.name}
                  />
                  {formik.errors.name && formik.touched.name && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.name}
                    </div>
                  )}
                </Grid.Column>
                <Grid.Column width={8} textAlign="left">
                  <label>* Soyad</label>
                  <Input
                    style={{ width: "100%" }}
                    placeholder="Soyad"
                    onChange={(event, data) =>
                      handleChangeSelect(data.value, "surname")
                    }
                    onBlur={formik.onBlur}
                    id="surname"
                    value={formik.values.surname}
                  />
                  {formik.errors.surname && formik.touched.surname && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.surname}
                    </div>
                  )}
                </Grid.Column>
              </Grid>
            </Form.Field>

            <Form.Field>
              <Grid stackable>
                <Grid.Column width={8} textAlign="left">
                  <label>* T.C. Kimlik No</label>
                  <Input
                    style={{ width: "100%" }}
                    placeholder="T.C. Kimlik No"
                    maxLength={11}
                    onChange={(event, data) =>
                      handleChangeSelect(data.value, "identityNumber")
                    }
                    onBlur={formik.onBlur}
                    id="identityNumber"
                    value={formik.values.identityNumber}
                  />
                  {formik.errors.identityNumber &&
                    formik.touched.identityNumber && (
                      <div className={"ui pointing red basic label"}>
                        {formik.errors.identityNumber}
                      </div>
                    )}
                </Grid.Column>
                <Grid.Column width={8} textAlign="left">
                  <label>* Doğum Yılı</label>
                  <Input
                    style={{ width: "100%" }}
                    placeholder="Doğum Yılı"
                    maxLength={4}
                    onChange={(event, data) =>
                      handleChangeSelect(data.value, "birthYear")
                    }
                    onBlur={formik.onBlur}
                    id="birthYear"
                    value={formik.values.birthYear}
                  />
                  {formik.errors.birthYear && formik.touched.birthYear && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.birthYear}
                    </div>
                  )}
                </Grid.Column>
              </Grid>
            </Form.Field>

            <Form.Field>
              <Grid stackable>
                <Grid.Column width={8} textAlign="left">
                  <label>* Email</label>
                  <Input
                    style={{ width: "100%" }}
                    placeholder="Email"
                    onChange={(event, data) =>
                      handleChangeSelect(data.value, "email")
                    }
                    onBlur={formik.onBlur}
                    id="email"
                    value={formik.values.email}
                  />
                  {formik.errors.email && formik.touched.email && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.email}
                    </div>
                  )}
                </Grid.Column>
              </Grid>
            </Form.Field>

            <Form.Field>
              <Grid stackable>
                <Grid.Column width={8} textAlign="left">
                  <label>* Parola</label>
                  <Input
                    style={{ width: "100%" }}
                    placeholder="Parola"
                    type="password"
                    onChange={(event, data) =>
                      handleChangeSelect(data.value, "password")
                    }
                    onBlur={formik.onBlur}
                    id="password"
                    value={formik.values.password}
                  />
                  {formik.errors.password && formik.touched.password && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.password}
                    </div>
                  )}
                </Grid.Column>
                <Grid.Column width={8} textAlign="left">
                  <label>* Parola Tekrarı</label>
                  <Input
                    style={{ width: "100%" }}
                    placeholder="Parola Tekrarı"
                    type="password"
                    onChange={(event, data) =>
                      handleChangeSelect(data.value, "passwordRepeat")
                    }
                    onBlur={formik.onBlur}
                    id="passwordRepeat"
                    value={formik.values.passwordRepeat}
                  />
                  {formik.errors.passwordRepeat &&
                    formik.touched.passwordRepeat && (
                      <div className={"ui pointing red basic label"}>
                        {formik.errors.passwordRepeat}
                      </div>
                    )}
                </Grid.Column>
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
