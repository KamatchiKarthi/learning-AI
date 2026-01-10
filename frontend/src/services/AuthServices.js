
import { API_PATHS } from '../utils/Apipath';
import axiosInstance from '../utils/axiosInstance';
import { handleAPIErrLogic } from './ReusableErrorServices';

const login = async ({
    email,
    password,
})=> {
    try {
        const response = await axiosInstance.post(
            API_PATHS.AUTH.LOGIN,
            {
                email,
                password,
            }
        );
        return response.data;
    } catch (error) {
        throw handleAPIErrLogic(error);
    }
};

const register = async ({
    username,
    email,
    password,
})=> {
    try {
        const response = await axiosInstance.post(
            API_PATHS.AUTH.REGISTER,
            { username, email, password }
        );
        return response.data;
    } catch (error) {
        throw handleAPIErrLogic(error);
    }
};

const getProfile = async () => {
    try {
        const response = await axiosInstance.get(
            API_PATHS.AUTH.GET_PROFILE
        );
        return response.data;
    } catch (error) {
        throw handleAPIErrLogic(error);
    }
};

const updateProfile = async (
    userData
)=> {
    try {
        const response = await axiosInstance.put(
            API_PATHS.AUTH.GET_PROFILE,
            userData
        );
        return response.data;
    } catch (error) {
        throw handleAPIErrLogic(error);
    }
};

const changePassword = async (
    passwords
) => {
    try {
        const response = await axiosInstance.post(
            API_PATHS.AUTH.CHANGE_PASSWORD,
            passwords
        );
        return response.data;
    } catch (error) {
        throw handleAPIErrLogic(error);
    }
};

const AuthServices = {
    login,
    register,
    getProfile,
    updateProfile,
    changePassword,
};

export default AuthServices;
