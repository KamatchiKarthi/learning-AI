
import { API_PATHS } from '../utils/Apipath';
import axiosInstance from '../utils/axiosInstance';
import { handleAPIErrLogic } from './ReusableErrorServices';

const getQuizzessForDocs = async (
    documentId
)=> {
    try {
        const response =
            await axiosInstance.get(
                API_PATHS.QUIZZES.GET_ALL_QUIZZES_FOR_DOC(documentId)
            );
        return response.data;
    } catch (error) {
        throw handleAPIErrLogic(error);
    }
};
const getQuizzesById = async (
    quizId
)=> {
    try {
        const response = await axiosInstance.get(
            API_PATHS.QUIZZES.GET_ALL_QUIZZES_BY_ID(quizId)
        );
        return response.data;
    } catch (error) {
        throw handleAPIErrLogic(error);
    }
};

const SubmitQuiz = async (
    quizId,
    answers
) => {
    try {
        const response = await axiosInstance.post(
            API_PATHS.QUIZZES.SUBMIT_QUIZ(quizId),
            { answers }
        );
        return response.data;
    } catch (error) {
        throw handleAPIErrLogic(error);
    }
};

const getQuizResutls = async (
    quizId
) => {
    try {
        const response = await axiosInstance.get(
            API_PATHS.QUIZZES.GET_QUIZ_RESULTS(quizId)
        );
        return response.data;
    } catch (error) {
        throw handleAPIErrLogic(error);
    }
};

const deleteQuiz = async (
    quizId
) => {
    try {
        const response =
            await axiosInstance.delete(
                API_PATHS.QUIZZES.DELETE_QUIZ(quizId)
            );
        return response.data;
    } catch (error) {
        throw handleAPIErrLogic(error);
    }
};

const QuizServices = {
    getQuizzessForDocs,
    getQuizzesById,
    SubmitQuiz,
    getQuizResutls,
    deleteQuiz,
};
export default QuizServices;
