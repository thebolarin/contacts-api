import express from 'express'
import { fetchContactEditHistories, fetchContactEditHistory } from '../controllers/contact-edit-history';

const Router = express.Router();

Router.get('/', fetchContactEditHistories);
Router.get('/:contactEditHistoryId', fetchContactEditHistory);

export default Router;