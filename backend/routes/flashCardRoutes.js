import express from 'express';
import protect from '../middleware/auth.js';
import {
  deleteFlashCardSets,
  getAllFlashCardSets,
  getFlashCardbyId,
  reviewFlashcard,
  toggleFlashCard,
} from '../controller/flashCardController.js';

const flashcardRouter = express.Router();

flashcardRouter.use(protect);

flashcardRouter.get('/', getAllFlashCardSets);
flashcardRouter.get('/:id', getFlashCardbyId);
flashcardRouter.post('/:cardId/review', reviewFlashcard);
flashcardRouter.put('/:cardId/star', toggleFlashCard);
flashcardRouter.delete('/:id', deleteFlashCardSets);

export default flashcardRouter;
