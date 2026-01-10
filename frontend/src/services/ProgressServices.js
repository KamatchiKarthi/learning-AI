import { API_PATHS } from '../utils/Apipath';
import axiosInstance from '../utils/axiosInstance';
import { handleAPIErrLogic } from './ReusableErrorServices';

const getDashBoardData = async () => {
    try {
        const response = await axiosInstance.get(
            API_PATHS.PROGRESS.GET_DASHBOARD
        );
        return response.data;
    } catch (error) {
        throw handleAPIErrLogic(error);
    }
};

const ProgressServices = {
    getDashBoardData,
};
export default ProgressServices;
