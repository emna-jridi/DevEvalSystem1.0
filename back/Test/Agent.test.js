jest.setTimeout(10000)
const { createEmployee, getAllEmployee, updateEmpolyee, deleteEmployee } = require('../Controller/EmployeeController');
const { mockRequest, mockResponse } = require('jest-mock-req-res');
const { StatusCodes } = require('http-status-codes');
const Employee = require('../Model/EmployeeModel');


jest.mock('../Model/EmployeeModel');

describe('Employee Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it('should create a new employee', async () => {
    const req = mockRequest({
      body: {
        fullName: 'John Doe',
        code: 'JD123',
        email: 'john.doe@example.com',
        nCin: 'AB123456',
        gender: 'Male',
        birthdate: '1990-05-15',
        phoneNumber: '+1234567890',
        address: '123 Main Street',
        city: 'New York',
        codePostal: '12345',
        civilState: 'Married',
        dependents: 2,
        contract: 'Full-time',
        position: 'Software Engineer',
        entryDate: '2022-01-01',
        grossSalary: 5000,
        netSalary: 4000,
        RIB: '1234567890',
        cnssNumber: '1234567890',
        emergencyNumber: '+1987654321',
        hierarchicalSuperior: 'Jane Smith',
        leaveBalance: 20,
        lastNegotiationDate: '2023-06-01',
        experienceLevel: 'Senior',
        leavingDate: null,
        leavingRaison: null,
      },
    });
    const res = mockResponse();
    Employee.findOne.mockResolvedValueOnce(null); // Mocking Employee.findOne to return null (employee not found)
  
    await createEmployee(req, res);
  
    expect(res.status).toHaveBeenCalledWith(StatusCodes.ACCEPTED);
    expect(res.send).toHaveBeenCalledWith({ message: 'employee was registered successfully!' });
  });

  it('should get all employees', async () => {
    const req = mockRequest();
    const res = mockResponse();
    const mockEmployees = [
      {
        fullName: 'John Doe',
        code: 'JD123',
        email: 'john.doe@example.com',
        nCin: 'AB123456',
        gender: 'Male',
        birthdate: '1990-05-15',
        phoneNumber: '+1234567890',
        address: '123 Main Street',
        city: 'New York',
        codePostal: '12345',
        civilState: 'Married',
        dependents: 2,
        contract: 'Full-time',
        position: 'Software Engineer',
        entryDate: '2022-01-01',
        grossSalary: 5000,
        netSalary: 4000,
        RIB: '1234567890',
        cnssNumber: '1234567890',
        emergencyNumber: '+1987654321',
        hierarchicalSuperior: 'Jane Smith',
        leaveBalance: 20,
        lastNegotiationDate: '2023-06-01',
        experienceLevel: 'Senior',
        leavingDate: null,
        leavingRaison: null,
      },
      // Add more mock employees as needed
    ];
    Employee.find.mockResolvedValueOnce(mockEmployees);
  
    await getAllEmployee(req, res);
  
    expect(res.status).toHaveBeenCalledWith(StatusCodes.ACCEPTED);
    expect(res.json).toHaveBeenCalledWith({ employees: expect.any(Array) });
    expect(res.json.mock.calls[0][0].employees.length).toEqual(mockEmployees.length);
  });

  it('should update an employee', async () => {
    const req = mockRequest({
      params: { id: 'employee_id' },
      bfullName: 'John Doee',
      code: 'JD123',
      email: 'john.doe@example.com',
      nCin: 'AB123456',
      gender: 'Male',
      birthdate: '1990-05-15',
      phoneNumber: '+1234567890',
      address: '123 Main Street',
      city: 'New York',
      codePostal: '12345',
      civilState: 'Married',
      dependents: 2,
      contract: 'Full-time',
      position: 'Software Engineer',
      entryDate: '2022-01-01',
      grossSalary: 5000,
      netSalary: 4000,
      RIB: '1234567890',
      cnssNumber: '1234567890',
      emergencyNumber: '+1987654321',
      hierarchicalSuperior: 'Jane Smith',
      leaveBalance: 20,
      lastNegotiationDate: '2023-06-01',
      experienceLevel: 'Senior',
      leavingDate: null,
      leavingRaison: null,
      
    });
    const res = mockResponse();
    const mockUpdatedEmployee = {
      fullName: 'Updated Name',
      email: 'updated@example.com',
      // Update other fields as needed
    };
    Employee.findByIdAndUpdate.mockResolvedValueOnce(mockUpdatedEmployee);
  
    await updateEmpolyee(req, res);
  
    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith({ updatedEmployee: mockUpdatedEmployee });
  });

  it('should delete an employee', async () => {
    const req = mockRequest({
      params: { id: 'employee_id' },
    });
    const res = mockResponse();
    const mockDeletedEmployee = {
      fullName: 'John Doe',
      email: 'john@example.com',
   
    };
    Employee.findByIdAndDelete.mockResolvedValueOnce(mockDeletedEmployee);
  
    await deleteEmployee(req, res);
  
    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith({ message: 'Employee was deleted successfully!' });
  });
});
