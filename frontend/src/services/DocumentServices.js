
import { API_PATHS } from '../utils/Apipath';
import axiosInstance from '../utils/axiosInstance';
import { handleAPIErrLogic } from './ReusableErrorServices';

const getDocuments = async () => {
    try {
        const response = await axiosInstance.get(
            API_PATHS.DOCUMENTS.GET_DOCUMENTS
        );
        return response.data;
    } catch (error) {
        throw handleAPIErrLogic(error);
    }
};

const uploadDocuments = async (
    formData
) => {
    try {
        const response = await axiosInstance.post(
            API_PATHS.DOCUMENTS.UPLOAD,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data;
    } catch (error) {
        throw handleAPIErrLogic(error);
    }
};

const deleteDocument = async (
    documentId
)=> {
    try {
        const response =
            await axiosInstance.delete(
                API_PATHS.DOCUMENTS.DELETE_DOCUMENT_BY_ID(documentId)
            );
        return response.data;
    } catch (error) {
        throw handleAPIErrLogic(error);
    }
};

const getDocumentById = async (
    documentId
) => {
    try {
        const response = await axiosInstance.get(
            API_PATHS.DOCUMENTS.GET_DOCUMENT_BY_ID(documentId)
        );
        return response.data;
    } catch (error) {
        throw handleAPIErrLogic(error);
    }
};

const DocuemntServices = {
    getDocuments,
    uploadDocuments,
    deleteDocument,
    getDocumentById,
};

export default DocuemntServices;
