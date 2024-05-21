import 'express-async-errors';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import usuarioController from './controllers/usuarioController'
import produtoController from './controllers/produtoCotroller'
import vendasController from './controllers/vendaController'
import analiseController from './controllers/analiseController'

const server = express();

server.use(cors());
server.use(morgan('tiny'));
server.use(express.json());
server.use(helmet());


server.use(usuarioController)
server.use(produtoController)
server.use(vendasController)
server.use(analiseController)

server.listen(process.env.PORT, ()=> console.log("API ONLINE NA PORTA "+ process.env.PORT))
