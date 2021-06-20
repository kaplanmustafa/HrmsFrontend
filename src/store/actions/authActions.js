import EmployeeService from "../../services/EmployeeService";

export const emloyeeSignupHandler = (employee) => {
  return async function () {
    let employeeService = new EmployeeService();
    const response = await employeeService.add(employee);
    return response;
  };
};
