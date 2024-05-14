const {
  createEmployee,
  getAllEmployee,
  updateEmpolyee,
  deleteEmployee,
} = require("../Controller/EmployeeController");
const { mockRequest, mockResponse } = require("jest-mock-req-res");
const { StatusCodes } = require("http-status-codes");
const Employee = require("../Model/EmployeeModel");

jest.mock("../Model/EmployeeModel");

describe("Employee Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new employee", async () => {
    const req = mockRequest({
      body: {
        id: "61123c58bfc6e03384d4bf63",
        fullName: "John Doe",
        code: "JD123",
        email: "john.doe@example.com",
        nCin: "AB123456",
        gender: "Male",
        birthdate: "1990-05-15",
        phoneNumber: "+1234567890",
        address: "123 Main Street",
        city: "New York",
        codePostal: "12345",
        civilState: "Married",
        dependents: 2,
        contract: "Full-time",
        position: "Software Engineer",
        entryDate: "2022-01-01",
        grossSalary: 5000,
        netSalary: 4000,
        RIB: "1234567890",
        cnssNumber: "1234567890",
        emergencyNumber: "+1987654321",
        hierarchicalSuperior: "Jane Smith",
        leaveBalance: 20,
        lastNegotiationDate: "2023-06-01",
        experienceLevel: "Senior",
        leavingDate: null,
        leavingRaison: null,
      },
    });
    const res = mockResponse();
    Employee.findOne.mockResolvedValueOnce(null);

    await createEmployee(req, res);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.ACCEPTED);
    expect(res.send).toHaveBeenCalledWith({
      message: "employee was registered successfully!",
    });
  });

  it("should get all employees", async () => {
    const req = mockRequest();
    const res = mockResponse();
    const mockEmployees = [
      {
        id: "61123c58bfc6e03384d4bf64",
        fullName: "Employee 1",
        email: "employee1@example.com",
        code:20230,
        nCin: "AB123456",
        gender: "Male",
        birthdate: "1990-05-15",
        phoneNumber: "+1234567890",
        address: "123 Main Street",
        city: "New York",
        codePostal: "12345",
        civilState: "Married",
        dependents: 2,
        contract: "Full-time",
        position: "Software Engineer",
        entryDate: "2022-01-01",
        grossSalary: 5000,
        netSalary: 4000,
        RIB: "1234567890",
        cnssNumber: "1234567890",
        emergencyNumber: "+1987654321",
        hierarchicalSuperior: "Jane Smith",
        leaveBalance: 20,
        lastNegotiationDate: "2023-06-01",
        experienceLevel: "Senior",
        leavingDate: null,
        leavingRaison: null,
      
      },
      {
    id: "61123c58bfc6e03384d4bf62", // Mettez ici l'ID correspondant à votre deuxième entrée
    fullName: "Employee 2",
    code:2020, 
    email: "employee2@example.com",
    nCin: "AB123456",
    gender: "Male",
    birthdate: "1990-05-15",
    phoneNumber: "+1234567890",
    address: "123 Main Street",
    city: "New York",
    codePostal: "12345",
    civilState: "Married",
    dependents: 2,
    contract: "Full-time",
    position: "Software Engineer",
    entryDate: "2022-01-01",
    grossSalary: 5000,
    netSalary: 4000,
    RIB: "1234567890",
    cnssNumber: "1234567890",
    emergencyNumber: "+1987654321",
    hierarchicalSuperior: "Jane Smith",
    leaveBalance: 20,
    lastNegotiationDate: "2023-06-01",
    experienceLevel: "Senior",
    leavingDate: null,
    leavingRaison: null,
        
      },
    ];
    Employee.find.mockResolvedValueOnce(mockEmployees);

    await getAllEmployee(req, res);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.ACCEPTED);
    expect(res.json).toHaveBeenCalledWith({ employees: mockEmployees });
  });

  it("should update an employee", async () => {
    const req = mockRequest({
      params: { id: "employeeId" },
      body: {
        _id: "employeeId",
        fullName: "John Doe up",
        code: "JD123",
        email: "john.doe@example.com",
        nCin: "AB123456",
        gender: "Male",
        birthdate: "1990-05-15",
        phoneNumber: "+1234567890",
        address: "123 Main Street",
        city: "New York",
        codePostal: "12345",
        civilState: "Married",
        dependents: 2,
        contract: "Full-time",
        position: "Software Engineer",
        entryDate: "2022-01-01",
        grossSalary: 5000,
        netSalary: 4000,
        RIB: "1234567890",
        cnssNumber: "1234567890",
        emergencyNumber: "+1987654321",
        hierarchicalSuperior: "Jane Smith",
        leaveBalance: 20,
        lastNegotiationDate: "2023-06-01",
        experienceLevel: "Senior",
        leavingDate: null,
        leavingRaison: null,
      },
    });
    const res = mockResponse();
    const updatedEmployee = {
      _id: "employeeId",
      fullName: "John Doe Updated" /* Updated fields */,
    };
    Employee.findByIdAndUpdate.mockResolvedValueOnce(updatedEmployee);

    await updateEmpolyee(req, res);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith({ updatedEmployee });
  });

  it("should delete an employee", async () => {
    const req = mockRequest({ params: { id: "employeeId" } });
    const res = mockResponse();
    const deletedEmployee = {
      _id: "employeeId",

      fullName: "John Doe",
      code: "JD123",
      email: "john.doe@example.com",
      nCin: "AB123456",
      gender: "Male",
      birthdate: "1990-05-15",
      phoneNumber: "+1234567890",
      address: "123 Main Street",
      city: "New York",
      codePostal: "12345",
      civilState: "Married",
      dependents: 2,
      contract: "Full-time",
      position: "Software Engineer",
      entryDate: "2022-01-01",
      grossSalary: 5000,
      netSalary: 4000,
      RIB: "1234567890",
      cnssNumber: "1234567890",
      emergencyNumber: "+1987654321",
      hierarchicalSuperior: "Jane Smith",
      leaveBalance: 20,
      lastNegotiationDate: "2023-06-01",
      experienceLevel: "Senior",
      leavingDate: null,
      leavingRaison: null,
    };
    Employee.findByIdAndDelete.mockResolvedValueOnce(deletedEmployee);

    await deleteEmployee(req, res);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith({
      message: "Employee was deleted successfully!",
    });
  });
});
