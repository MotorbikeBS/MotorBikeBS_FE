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
export const changePasswordEndPoint = `${BASE_URL}/api/user/changepassword`;

//store endpoint
export const registerStoreEndPoint = `${BASE_URL}/api/storedescription/store-register`;
export const verifyStoreEndPoint = `${BASE_URL}/api/storedescription/verifystore`;
export const refuseStoreEndPoint = `${BASE_URL}/api/storedescription/refusestore`;
export const inActiveStoreEndPoint = `${BASE_URL}/api/storedescription/inactivestore`;
export const reActiveStoreEndPoint = `${BASE_URL}/api/storedescription/reactivestore`;
export const getAllStoreEndPoint = `${BASE_URL}/api/storedescription`;
export const getStoreByIDEndPoint = `${BASE_URL}/api/storedescription`;

//owner endpoint
export const ownerRegisterEndPoint = `${BASE_URL}/api/owner/ownerregister`;

//motorbike endpoint
export const getAllWithSpecificStatusEndPoint = `${BASE_URL}/api/motorbike/getallwithspecificstatus`;
export const getAllOnExChangeEndPoint = `${BASE_URL}/api/motorbike/getallonexchange`;
export const getAllOnStoreExChangeEndPoint = `${BASE_URL}/api/motorbike/getallonstoreexchange`;
export const getMotorByStoreIdEndPoint = `${BASE_URL}/api/motorbike/getmotorbystoreid`;
export const getMotorByOwnerIdEndPoint = `${BASE_URL}/api/motorbike/getmotorbyowner`;
export const getMotorByIdEndPoint = `${BASE_URL}/api/motorbike`;
export const updateMotorByIdEndPoint = `${BASE_URL}/api/motorbike/updatemotor`;
export const postMotorRegisterEndPoint = `${BASE_URL}/api/motorbike/motorregister`;
export const updateMotorStatusEndPoint = `${BASE_URL}/api/motorbike/updatemotor-status`;

//motorbikeField endpoint
export const getMotorBrandEndPoint = `${BASE_URL}/api/motorbrand`;
export const getMotorModelEndPoint = `${BASE_URL}/api/motormodel`;
export const getMotorTypeEndPoint = `${BASE_URL}/api/motortype`;
export const getMotorStatusEndPoint = `${BASE_URL}/api/motorstatus`;

//WishList EndPoint
export const getWishListEndPoint = `${BASE_URL}/api/wishlist/getwishlist`;
export const addToWishListEndPoint = `${BASE_URL}/api/wishlist/addtowishlist`;
export const deleteAllWishListEndPoint = `${BASE_URL}/api/wishlist/deleteallwishlist`;
export const deleteWishListByMotorIdEndPoint = `${BASE_URL}/api/wishlist/deletewishlist`;

//Booking
export const storeBookingWithOwnerExchangeEndPoint = `${BASE_URL}/api/booking/storebookingowner`;
export const getAllBookingByOwnerEndPoint = `${BASE_URL}/api/booking/getbookingrequest`;
