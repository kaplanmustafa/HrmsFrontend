import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Input,
  Card,
  Form,
  Grid,
  Header,
  Dropdown,
} from "semantic-ui-react";
import employeeSignupImage from "../assets/images/employeeSignup.jpg";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { emloyerSignupHandler } from "../store/actions/authActions";
import CompanyService from "../services/CompanyService";
import * as utilMethods from "../core/Utilities";

const EmployerSignupPage = () => {
  const [companies, setCompanies] = useState([]);
  const dispatch = useDispatch();

  const EmployerSignupSchema = Yup.object().shape({
    companyId: Yup.string().required("Bu alan boş bırakılamaz"),
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
      companyId: undefined,
      email: undefined,
      password: undefined,
      passwordRepeat: undefined,
    },
    validationSchema: EmployerSignupSchema,
    onSubmit: (values) => {
      dispatch(emloyerSignupHandler(values)).then((result) => {
        result.data.success === true
          ? toast.success(result.data.message)
          : toast.error(result.data.message);
      });
    },
  });

  const handleChangeSelect = (value, field) => {
    formik.setFieldValue(field, value);
  };

  useEffect(() => {
    let companyService = new CompanyService();

    companyService
      .getAll()
      .then((response) => setCompanies(response.data.data));
  }, []);

  const companyOptions = utilMethods.objectsToOptions(
    companies,
    "companyName",
    "id"
  );

  return (
    <div style={{ marginTop: "5rem" }}>
      <Header as="h1" color="teal" textAlign="center">
        İşveren Kayıt
      </Header>
      <Card fluid>
        <Card.Content>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Field>
              <Grid stackable>
                <Grid.Column width={8} textAlign="left">
                  <label>* Şirket</label>
                  <Dropdown
                    style={{ width: "100%" }}
                    clearable
                    item
                    placeholder="Şirket"
                    search
                    selection
                    onChange={(event, data) =>
                      handleChangeSelect(data.value, "companyId")
                    }
                    onBlur={formik.onBlur}
                    id="companyId"
                    value={formik.values.companyId}
                    options={companyOptions}
                  />
                  {formik.errors.companyId && formik.touched.companyId && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.companyId}
                    </div>
                  )}
                </Grid.Column>
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
              KAYDOL
            </Button>
          </Form>
        </Card.Content>
      </Card>
      <img
        src={employeeSignupImage}
        width="560"
        style={{ position: "fixed", bottom: 150, right: 10, zIndex: -1 }}
        alt="employer-signup"
      />
    </div>
  );
};

export default EmployerSignupPage;
