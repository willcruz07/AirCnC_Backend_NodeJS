const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');

const routes = express();
const upload = multer(uploadConfig);


// Método utilizado antes do controller
// routes.post('/users', (req, res) => {
//     return res.json(req.body);
// });

routes.post('/sessions', SessionController.store);

routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);

routes.get('/dashboard', DashboardController.show);

//Criando uma rota encadead onde cria se uma reserva dentro de um spot
routes. post('/spots/:spot_id/bookings', BookingController.store);

module.exports = routes;
