import React, { useEffect, useState } from "react";
import { Button, Card, Form, Grid, Header } from "semantic-ui-react";
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
import HrmsInput from "../components/HrmsInput";
import HrmsDropdown from "../components/HrmsDropdown";
import HrmsTextArea from "../components/HrmsTextArea";

const AddJobPostingPage = () => {
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
                <HrmsDropdown
                  label="İş Pozisyonu"
                  placeholder="İş Pozisyonu"
                  value={formik.values.jobPositionId}
                  options={jobPositionOptions}
                  search={true}
                  onChange={(event, data) =>
                    handleChangeSelect(data.value, "jobPositionId")
                  }
                  onBlur={formik.onBlur}
                  id="jobPositionId"
                  error={
                    formik.errors.jobPositionId && formik.touched.jobPositionId
                  }
                  showError={formik.errors.jobPositionId}
                />
                <HrmsDropdown
                  columnWidth="8"
                  label="Şehir"
                  placeholder="Şehir"
                  value={formik.values.cityId}
                  options={cityOptions}
                  search={true}
                  onChange={(event, data) =>
                    handleChangeSelect(data.value, "cityId")
                  }
                  onBlur={formik.onBlur}
                  id="cityId"
                  error={formik.errors.cityId && formik.touched.cityId}
                  showError={formik.errors.cityId}
                />
              </Grid>
            </Form.Field>

            <Form.Field>
              <Grid stackable>
                <HrmsDropdown
                  label="Çalışma Şekli"
                  placeholder="Çalışma Şekli"
                  value={formik.values.jobTypeId}
                  options={jobTypeOptions}
                  search={false}
                  onChange={(event, data) =>
                    handleChangeSelect(data.value, "jobTypeId")
                  }
                  onBlur={formik.onBlur}
                  id="jobTypeId"
                  error={formik.errors.jobTypeId && formik.touched.jobTypeId}
                  showError={formik.errors.jobTypeId}
                />
                <HrmsDropdown
                  label="Uzaktan Çalışma"
                  placeholder="Uzaktan Çalışma"
                  value={formik.values.isRemote}
                  options={remoteOptions}
                  search={false}
                  onChange={(event, data) =>
                    handleChangeSelect(data.value, "isRemote")
                  }
                  onBlur={formik.onBlur}
                  id="isRemote"
                  error={formik.errors.isRemote && formik.touched.isRemote}
                  showError={formik.errors.isRemote}
                />
              </Grid>
            </Form.Field>

            <Form.Field>
              <Grid stackable>
                <HrmsInput
                  label="Minimum Maaş"
                  type="number"
                  placeholder="Minimum Maaş"
                  value={formik.values.minSalary}
                  name="minSalary"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.minSalary && formik.touched.minSalary}
                  showError={formik.errors.minSalary}
                />
                <HrmsInput
                  label="Maksimum Maaş"
                  type="number"
                  placeholder="Maksimum Maaş"
                  value={formik.values.maxSalary}
                  name="maxSalary"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.maxSalary && formik.touched.maxSalary}
                  showError={formik.errors.maxSalary}
                />
              </Grid>
            </Form.Field>

            <Form.Field>
              <Grid stackable>
                <HrmsInput
                  label="Açık Pozisyon sayısı"
                  type="number"
                  placeholder="Açık Pozisyon sayısı"
                  value={formik.values.numberOfEmployees}
                  name="numberOfEmployees"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.errors.numberOfEmployees &&
                    formik.touched.numberOfEmployees
                  }
                  showError={formik.errors.numberOfEmployees}
                />
                <HrmsInput
                  label="Son başvuru tarihi"
                  type="date"
                  placeholder="Son başvuru tarihi"
                  value={formik.values.endDate}
                  name="endDate"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.endDate && formik.touched.endDate}
                  showError={formik.errors.endDate}
                />
              </Grid>
            </Form.Field>

            <Form.Field>
              <HrmsTextArea
                label="Açıklama"
                placeholder="Açıklama"
                value={formik.values.description}
                name="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.description && formik.touched.description}
                showError={formik.errors.description}
              />
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

export default AddJobPostingPage;
