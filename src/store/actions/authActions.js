import EmployeeService from "../../services/EmployeeService";
import EmployerService from "../../services/EmployerService";
import StaffService from "../../services/StaffService";

export const emloyeeSignupHandler = (employee) => {
  return async function () {
    let employeeService = new EmployeeService();
    const response = await employeeService.add(employee);
    return response;
  };
};

export const emloyerSignupHandler = (employer) => {
  return async function () {
    let employerService = new EmployerService();
    const response = await employerService.add(employer);
    return response;
  };
};

export const staffSignupHandler = (staff) => {
  return async function () {
    let staffService = new StaffService();
    const response = await staffService.add(staff);
    return response;
  };
};
