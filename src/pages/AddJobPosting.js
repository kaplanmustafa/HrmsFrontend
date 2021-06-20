import React, { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  Input,
  TextArea,
  Card,
  Form,
  Grid,
  Header,
} from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import undraw_jobAdvertisementCreate from "../assets/images/undraw_jobAdvertisementCreate.png";
import JobTypeService from "../services/JobTypeService";
import CityService from "../services/CityService";
import JobPositionService from "../services/JobPositionService";
import JobPostingService from "../services/JobPostingService";
import * as utilMethods from "../core/Utilities";
import alertify from "alertifyjs";
import { useHistory } from "react-router-dom";

const AddJobPosting = () => {
  const [jobTypes, setJobTypes] = useState([]);
  const [cities, setCities] = useState([]);
  const [jobPositions, setJobPositions] = useState([]);

  const history = useHistory();

  const JobPostingCreateSchema = Yup.object().shape({
    jobPositionId: Yup.string().required("Bu alan boş bırakılamaz"),
    numberOfEmployees: Yup.number().required("Bu alan boş bırakılamaz").min(1),
    jobTypeId: Yup.string().required("Bu alan boş bırakılamaz"),
    isRemote: Yup.string().required("Bu alan boş bırakılamaz"),
    minSalary: Yup.number().min(0),
    maxSalary: Yup.number().min(0),
    cityId: Yup.number().min(1).required("Bu alan boş bırakılamaz"),
    endDate: Yup.date().required("Bu alan boş bırakılamaz").min(1).max(5000),
    description: Yup.string().required("Bu alan boş bırakılamaz"),
  });

  const formik = useFormik({
    initialValues: {
      jobPositionId: undefined,
      numberOfEmployees: undefined,
      jobTypeId: undefined,
      isRemote: undefined,
      minSalary: undefined,
      maxSalary: undefined,
      cityId: undefined,
      endDate: undefined,
      description: undefined,
    },
    validationSchema: JobPostingCreateSchema,
    onSubmit: (values) => {
      let jobPostingService = new JobPostingService();

      values.employerEmail = "muskaplan@innova.com.tr";
      jobPostingService
        .add(values)
        .then((result) =>
          alertify.alert("İş İlanı Başarıyla Oluşturuldu", function () {
            alertify.success("İlan Onaylandıktan Sonra Yayınlanacak");
          })
        )
        .then(history.push("/"));
    },
  });

  useEffect(() => {
    let jobTypeService = new JobTypeService();
    let cityService = new CityService();
    let jobPositionService = new JobPositionService();

    jobTypeService.getAll().then((response) => setJobTypes(response.data.data));
    cityService.getAll().then((response) => setCities(response.data.data));
    jobPositionService
      .getAll()
      .then((response) => setJobPositions(response.data.data));
  }, []);

  const jobTypeOptions = utilMethods.objectsToOptions(
    jobTypes,
    "jobType",
    "id"
  );

  const cityOptions = utilMethods.objectsToOptions(cities, "name", "id");

  const remoteOptions = utilMethods.objectsToOptions(
    [
      { option: "Evet", value: "1" },
      { option: "Hayır", value: "0" },
    ],
    "option",
    "value"
  );

  const jobPositionOptions = utilMethods.objectsToOptions(
    jobPositions,
    "jobTitle",
    "id"
  );

  const handleChangeSelect = (value, field) => {
    formik.setFieldValue(field, value);
  };

  return (
    <div style={{ marginTop: "5rem" }}>
      <Header as="h1" color="teal" textAlign="center">
        İş İlanı Oluştur
      </Header>
      <Card fluid>
        <Card.Content>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Field>
              <Grid stackable>
                <Grid.Column width={8} textAlign="left">
                  <label>İş Pozisyonu</label>
                  <Dropdown
                    style={{ width: "100%" }}
                    clearable
                    item
                    placeholder="İş pozisyonu"
                    search
                    selection
                    onChange={(event, data) =>
                      handleChangeSelect(data.value, "jobPositionId")
                    }
                    onBlur={formik.onBlur}
                    id="jobPositionId"
                    value={formik.values.jobPositionId}
                    options={jobPositionOptions}
                  />
                  {formik.errors.jobPositionId &&
                    formik.touched.jobPositionId && (
                      <div className={"ui pointing red basic label"}>
                        {formik.errors.jobPositionId}
                      </div>
                    )}
                </Grid.Column>
                <Grid.Column width={8} textAlign="left">
                  <label>Şehir</label>
                  <Dropdown
                    style={{ width: "100%" }}
                    clearable
                    item
                    placeholder="Şehir"
                    search
                    selection
                    onChange={(event, data) =>
                      handleChangeSelect(data.value, "cityId")
                    }
                    onBlur={formik.onBlur}
                    id="cityId"
                    value={formik.values.cityId}
                    options={cityOptions}
                  />
                  {formik.errors.cityId && formik.touched.cityId && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.cityId}
                    </div>
                  )}
                </Grid.Column>
              </Grid>
            </Form.Field>

            <Form.Field>
              <Grid stackable>
                <Grid.Column width={8} textAlign="left">
                  <label>Çalışma Şekli</label>
                  <Dropdown
                    style={{ width: "100%" }}
                    clearable
                    item
                    placeholder="Çalışma Şekli"
                    selection
                    onChange={(event, data) =>
                      handleChangeSelect(data.value, "jobTypeId")
                    }
                    onBlur={formik.onBlur}
                    id="jobTypeId"
                    value={formik.values.jobTypeId}
                    options={jobTypeOptions}
                  />
                  {formik.errors.jobTypeId && formik.touched.jobTypeId && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.jobTypeId}
                    </div>
                  )}
                </Grid.Column>
                <Grid.Column width={8} textAlign="left">
                  <label>Uzaktan Çalışma</label>
                  <Dropdown
                    style={{ width: "100%" }}
                    clearable
                    item
                    placeholder="Uzaktan Çalışma"
                    selection
                    onChange={(event, data) =>
                      handleChangeSelect(data.value, "isRemote")
                    }
                    onBlur={formik.onBlur}
                    id="isRemote"
                    value={formik.values.isRemote}
                    options={remoteOptions}
                  />
                  {formik.errors.isRemote && formik.touched.isRemote && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.isRemote}
                    </div>
                  )}
                </Grid.Column>
              </Grid>
            </Form.Field>

            <Form.Field>
              <Grid stackable>
                <Grid.Column width={8} textAlign="left">
                  <label>Minimum Maaş</label>
                  <Input
                    style={{ width: "100%" }}
                    type="number"
                    placeholder="Minimum Maaş"
                    value={formik.values.minSalary}
                    name="minSalary"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></Input>
                  {formik.errors.minSalary && formik.touched.minSalary && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.minSalary}
                    </div>
                  )}
                </Grid.Column>
                <Grid.Column width={8} textAlign="left">
                  <label>Maksimum Maaş</label>
                  <Input
                    style={{ width: "100%" }}
                    type="number"
                    placeholder="Maksimum Maaş"
                    value={formik.values.maxSalary}
                    name="maxSalary"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></Input>
                  {formik.errors.maxSalary && formik.touched.maxSalary && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.maxSalary}
                    </div>
                  )}
                </Grid.Column>
              </Grid>
            </Form.Field>

            <Form.Field>
              <Grid stackable>
                <Grid.Column width={8} textAlign="left">
                  <label>Açık Pozisyon sayısı</label>
                  <Input
                    style={{ width: "100%" }}
                    id="numberOfEmployees"
                    name="numberOfEmployees"
                    error={Boolean(formik.errors.numberOfEmployees)}
                    onChange={formik.handleChange}
                    value={formik.values.numberOfEmployees}
                    onBlur={formik.handleBlur}
                    type="number"
                    placeholder="Açık Pozisyon Sayısı"
                  />
                  {formik.errors.numberOfEmployees &&
                    formik.touched.numberOfEmployees && (
                      <div className={"ui pointing red basic label"}>
                        {formik.errors.numberOfEmployees}
                      </div>
                    )}
                </Grid.Column>
                <Grid.Column width={8} textAlign="left">
                  <label>Son başvuru tarihi</label>
                  <Input
                    style={{ width: "100%" }}
                    type="date"
                    error={Boolean(formik.errors.endDate)}
                    onChange={(event, data) =>
                      handleChangeSelect(data.value, "endDate")
                    }
                    value={formik.values.endDate}
                    onBlur={formik.handleBlur}
                    name="endDate"
                    placeholder="Son başvuru tarihi"
                  />
                  {formik.errors.endDate && formik.touched.endDate && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.endDate}
                    </div>
                  )}
                </Grid.Column>
              </Grid>
            </Form.Field>

            <Form.Field>
              <label style={{ textAlign: "left" }}>Açıklama</label>
              <TextArea
                placeholder="Açıklama"
                style={{ minHeight: 100 }}
                error={Boolean(formik.errors.description).toString()}
                value={formik.values.description}
                name="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.description && formik.touched.description && (
                <div className={"ui pointing red basic label"}>
                  {formik.errors.description}
                </div>
              )}
            </Form.Field>

            <Button
              type="submit"
              color="teal"
              fluid
              size="large"
              style={{ marginTop: "2em" }}
            >
              OLUŞTUR
            </Button>
          </Form>
        </Card.Content>
      </Card>
      <img
        src={undraw_jobAdvertisementCreate}
        width="560"
        style={{ position: "fixed", bottom: 150, right: 10, zIndex: -1 }}
        alt="job-posting"
      />
    </div>
  );
};

export default AddJobPosting;
