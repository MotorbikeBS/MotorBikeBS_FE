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
export const searchMotorNameEndPoint = `${BASE_URL}/api/motorbike/search-MotorName`;
export const filterMotorbikeEndPoint = `${BASE_URL}/api/MotorBike/filter`;
export const cancelPostingEndPoint = `${BASE_URL}/api/MotorBike/CancelPosting`;

//motorbikeField endpoint
export const getMotorBrandEndPoint = `${BASE_URL}/api/motorbrand`;
export const createMotorBrandEndPoint = `${BASE_URL}/api/motorbrand/BrandRegister`;
export const getMotorModelEndPoint = `${BASE_URL}/api/motormodel`;
export const createMotorModelEndPoint = `${BASE_URL}/api/motormodel/modelRegister`;
export const getMotorTypeEndPoint = `${BASE_URL}/api/motortype`;
export const createMotorTypeEndPoint = `${BASE_URL}/api/motortype/typeRegister`;
export const getMotorStatusEndPoint = `${BASE_URL}/api/motorstatus`;

//WishList EndPoint
export const getWishListEndPoint = `${BASE_URL}/api/wishlist/getwishlist`;
export const addToWishListEndPoint = `${BASE_URL}/api/wishlist/addtowishlist`;
export const deleteAllWishListEndPoint = `${BASE_URL}/api/wishlist/deleteallwishlist`;
export const deleteWishListByMotorIdEndPoint = `${BASE_URL}/api/wishlist/deletewishlist`;

//Valuation
export const startValuationEndPoint = `${BASE_URL}/api/valuation/StartValuation`;
export const getValuationEndPoint = `${BASE_URL}/api/valuation/GetValuationRequest`;
export const acceptValuationEndPoint = `${BASE_URL}/api/valuation/accept`;
export const cancelValuationEndPoint = `${BASE_URL}/api/valuation/cancel`;

//Negotiation
export const createNegotitationEndPoint = `${BASE_URL}/api/Negotiation/CreateNegotiation`;
export const getNegotiationEndPoint = `${BASE_URL}/api/Negotiation/GetNegotiation`;
export const accepNegotiationEndPoint = `${BASE_URL}/api/Negotiation/AcceptNegotation`;
export const cancleNegotiationEndPoint = `${BASE_URL}/api/Negotiation/CancelNegotiation`;
export const reupNegotiationEndPoint = `${BASE_URL}/api/Negotiation/ReUpNegotiation`;
export const rejectNegotiationEndPoint = `${BASE_URL}/api/Negotiation/RejectNegotiation`;

//Buyer Booking with Store
export const buyerBookingNonConsignmentEndPoint = `${BASE_URL}/api/buyerbooking/bookingnonconsignment`;
export const getBookingBuyerEndPoint = `${BASE_URL}/api/buyerbooking/getbookingrequest`;
export const acceptBookingBuyerEndPoint = `${BASE_URL}/api/buyerbooking/acceptbooking`;
export const rejectBookingBuyerEndPoint = `${BASE_URL}/api/buyerbooking/rejectbooking`;
export const cancelBookingBuyerEndPoint = `${BASE_URL}/api/buyerbooking/cancelbooking`;

//Bill
export const getBillByStoreIdEndPoint = `${BASE_URL}/api/bill/getByStoreid`;
export const getBillByUserIDEndPoint = `${BASE_URL}/api/bill/getByUserId`;
export const getBillByIdEndPoint = `${BASE_URL}/api/bill/getBillId`;
export const createBillInStockEndPoint = `${BASE_URL}/api/Bill/CreateBill-InStock`;
export const createBillConsignmentEndPoint = `${BASE_URL}/api/bill/CreateBill-Consignment`;
export const createBillNonConsignmentEndPoint = `${BASE_URL}/api/bill/CreateBill-nonConsignment`;

//Payment Endpoint
export const paymentRequestEndPoint = `${BASE_URL}/api/Payment/CreatePaymentUrl`;
export const paymentHistoryEndPoint = `${BASE_URL}/api/Payment/GetPaymentHistory`;

//Posting
export const createPostBootingEndPoint = `${BASE_URL}/api/PostBoosting/Boosting`;
export const getPostBootingHistoryEndPoint = `${BASE_URL}/api/PostBoosting/BoostingHistory`;
export const extendPostBootingEndPoint = `${BASE_URL}/api/PostBoosting/ExtendBoosting`;
export const changeLevelPostBootingEndPoint = `${BASE_URL}/api/postboosting/changelevel`;

//Comment
export const getCommentByCommentIdEndPoint = `${BASE_URL}/api/Comment/GetByCommentID`;
export const getCommentByStoreIdEndPoint = `${BASE_URL}/api/Comment/GetByStoreId_Receiver`;
export const getHistoryCommentByRequestIdEndPoint = `${BASE_URL}/api/Comment/GetHistoryCommentByRequestID`;
export const createCommentEndPoint = `${BASE_URL}/api/Comment/CommentRegister`;
export const replyCommentEndPoint = `${BASE_URL}/api/Comment/ReplyComment`;
export const editCommentEndPoint = `${BASE_URL}/api/Comment/UpdateComment`;
export const deleteCommentEndPoint = `${BASE_URL}/api/Comment/DeleteComment`;

//Request
export const getRequestAssociatedWithStoreEndPoint = `${BASE_URL}/api/Request/GetRequestAssociated_WithStore`;
