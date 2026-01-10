
import { API_PATHS } from '../utils/Apipath';
import axiosInstance from '../utils/axiosInstance';
import { handleAPIErrLogic } from './ReusableErrorServices';

const generateFlashcards = async (
    documentId,
    options
) => {
    try {
        const response =
            await axiosInstance.post(
                API_PATHS.AI.GENERATE_FLASHCARDS,
                { documentId, ...options }
            );
        return response.data;
    } catch (error) {
        throw handleAPIErrLogic(error);
    }
};

const generateQuiz = async (
    documentId,
    options
) => {
    try {
        const response = await axiosInstance.post(
            API_PATHS.AI.GENERATE_QUIZ,
            { documentId, ...options }
        );
        return response.data;
    } catch (error) {
        throw handleAPIErrLogic(error);
    }
};

const generateSummary = async (
    documentId
) => {
    try {
        const response = await axiosInstance.post(
            API_PATHS.AI.GENERATE_SUMMARY,
            { documentId }
        );
        return response.data;
    } catch (error) {
        throw handleAPIErrLogic(error);
    }
};

const chat = async (
    documentId,
    concept
) => {
    try {
        const response = await axiosInstance.post(
            API_PATHS.AI.CHAT,
            { documentId, question: concept }
        );
        return response.data;
    } catch (error) {
        throw handleAPIErrLogic(error);
    }
};

const explainConcept = async (
    documentId,
    concept
) => {
    try {
        const response =
            await axiosInstance.post(
                API_PATHS.AI.EXPLAIN_CONCEPT,
                { documentId, concept }
            );
        return response.data;
    } catch (error) {
        throw handleAPIErrLogic(error);
    }
};

const getChatHistory = async (
    documentId
) => {
    try {
        const response = await axiosInstance.get(
            API_PATHS.AI.GET_CHAT_HISTORY(documentId)
        );
        return response.data;
    } catch (error) {
        throw handleAPIErrLogic(error);
    }
};

const AiServices = {
    generateFlashcards,
    generateQuiz,
    generateSummary,
    chat,
    explainConcept,
    getChatHistory,
};
export default AiServices;
