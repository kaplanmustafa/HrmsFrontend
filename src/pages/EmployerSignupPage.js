import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Card, Form, Grid, Header } from "semantic-ui-react";
import employeeSignupImage from "../assets/images/employeeSignup.jpg";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { emloyerSignupHandler } from "../store/actions/authActions";
import CompanyService from "../services/CompanyService";
import * as utilMethods from "../core/Utilities";
import HrmsDropdown from "../components/HrmsDropdown";
import HrmsInput from "../components/HrmsInput";

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
                <HrmsDropdown
                  label="* Şirket"
                  placeholder="Şirket"
                  value={formik.values.companyId}
                  options={companyOptions}
                  search={true}
                  onChange={(event, data) =>
                    handleChangeSelect(data.value, "companyId")
                  }
                  onBlur={formik.onBlur}
                  id="companyId"
                  error={formik.errors.companyId && formik.touched.companyId}
                  showError={formik.errors.companyId}
                />
                <HrmsInput
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
