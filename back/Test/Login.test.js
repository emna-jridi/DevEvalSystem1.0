const { login } = require('../Controller/AuthenticationController');
const { mockRequest, mockResponse } = require('jest-mock-req-res');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcryptjs');
const User = require('../Model/UserModel');

jest.mock('../Model/UserModel'); // Mocking UserModel

describe('Login Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it('should return 400 if email or password are missing', async () => {
    const req = mockRequest();
    const res = mockResponse();

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({ message: 'Please provide an email and password !' });
  });

  it('should return 401 if user does not exist', async () => {
    const req = mockRequest({ body: { email: 'test@example.com', password: 'password' } });
    const res = mockResponse();

    User.findOne.mockResolvedValueOnce(null); // Mocking User.findOne to return null

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED);
    expect(res.json).toHaveBeenCalledWith({ message: 'user does not exist.' });
  });

  it('should return 403 if password is invalid', async () => {
    const req = mockRequest({ body: { email: 'test@example.com', password: 'invalidpassword' } });
    const res = mockResponse();
    const mockUser = { email: 'test@example.com', password: bcrypt.hashSync('correctpassword', 8) };
  
    User.findOne.mockResolvedValueOnce(mockUser); // Mocking User.findOne to return a user with correct password
  
    await login(req, res);
  
    expect(res.status).toHaveBeenCalledWith(StatusCodes.FORBIDDEN);
    expect(res.json).toHaveBeenCalledWith({ accessToken: null, message: 'Invalid Password !' }); // Adjusted expectation
  });

  it('should return 401 if user state is false', async () => {
    const req = mockRequest({ body: { email: 'test@example.com', password: 'password' } });
    const res = mockResponse();
    const mockUser = { email: 'test@example.com', password: bcrypt.hashSync('password', 8), state: false };

    User.findOne.mockResolvedValueOnce(mockUser); // Mocking User.findOne to return a user with state false

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED);
    expect(res.json).toHaveBeenCalledWith({ message: 'User does not have permission to connect.', state: false });
  });

  it('should return 202 with access and refresh tokens if login is successful', async () => {
    const req = mockRequest({ body: { email: 'test@example.com', password: 'password' } });
    const res = mockResponse();
    const mockUser = { email: 'test@example.com', password: bcrypt.hashSync('password', 8), state: true, id: '123', role: 'user' };

    User.findOne.mockResolvedValueOnce(mockUser); // Mocking User.findOne to return a valid user

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.ACCEPTED);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ accessToken: expect.any(String), refreshToken: expect.any(String) }));
  });

  it('should return 500 if an error occurs', async () => {
    const req = mockRequest({ body: { email: 'test@example.com', password: 'password' } });
    const res = mockResponse();

    User.findOne.mockRejectedValueOnce(new Error('Database error')); // Mocking User.findOne to throw an error

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error during the authentication.' });
  });
});