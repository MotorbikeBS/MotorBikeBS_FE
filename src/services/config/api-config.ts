//Base_URL
export const BASE_URL = 'https://motorbikebs-be.azurewebsites.net';

//Signup and verify email EndPoint
export const signupEndPoint = `${BASE_URL}/api/auth/user-register`;
export const verifyEndPoit = `${BASE_URL}/api/auth/verify-account`;

//Login EndPoint
export const loginEndpoint = `${BASE_URL}/api/auth/login`;

//Forgot and Reset Password Endpoint
export const forgotPasswordEndPoint = `${BASE_URL}/api/auth/forgot-password`;
export const resetPasswordEndPoint = `${BASE_URL}/api/auth/reset-password`;

//User endpoints
export const getAllUserEndPoint = `${BASE_URL}/api/user`;
export const getUserByIDEndPoint = `${BASE_URL}/api/user`;
export const editUserByIDEndPoint = `${BASE_URL}/api/user`;

//store endpoint
export const registerStoreEndPoint = `${BASE_URL}/api/storedescription/store-register`;
export const getAllStoreEndPoint = `${BASE_URL}/api/storedescription`;
