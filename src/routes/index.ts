import express from 'express';
import contactRoutes from './contact';
import contactEditHistoryRoutes from './contact-edit-history';

const Router = express.Router();

Router.get('/', async (req, res) => {
    res.status(200).send({
        message: "Hello 🌍"
    });
});

Router.use('/contact', contactRoutes);
Router.use('/contact-edit-history', contactEditHistoryRoutes);

export default Router


