
import { API_PATHS } from '../utils/Apipath';
import axiosInstance from '../utils/axiosInstance';
import { handleAPIErrLogic } from './ReusableErrorServices';

const getAllFlashCardSets =
    async () => {
        try {
            const response =
                await axiosInstance.get(
                    API_PATHS.FLASHCARDS.GET_ALL_FLASHCARDS
                );
            return response.data;
        } catch (error) {
            throw handleAPIErrLogic(error);
        }
    };

const flashCardDocsById = async (
    id
) => {
    try {
        const response = await axiosInstance.get(
            API_PATHS.FLASHCARDS.GET_FLASHCARDS_FOR_DOC(id)
        );
        return response.data;
    } catch (error) {
        throw handleAPIErrLogic(error);
    }
};

const reviewFlashcard = async (
    cardId,
    cardIndex
)=> {
    try {
        const response = await axiosInstance.post(
            API_PATHS.FLASHCARDS.REVIEW_FLASHCARDS(cardId),
            { cardIndex }
        );
        return response.data;
    } catch (error) {
        throw handleAPIErrLogic(error);
    }
};

const toggleStar = async (
    cardId
)=> {
    try {
        const response = await axiosInstance.put(
            API_PATHS.FLASHCARDS.TOGGLE_STAR(cardId)
        );
        return response.data;
    } catch (error) {
        throw handleAPIErrLogic(error);
    }
};

const deleteFlashCardSet = async (
    id
) => {
    try {
        const response =
            await axiosInstance.delete(
                API_PATHS.FLASHCARDS.DELETE_FLASHCARD(id)
            );
        return response.data;
    } catch (error) {
        throw handleAPIErrLogic(error);
    }
};

const FlashCardServices = {
    getAllFlashCardSets,
    flashCardDocsById,
    reviewFlashcard,
    toggleStar,
    deleteFlashCardSet,
};
export default FlashCardServices;
