import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import http from 'http';
import io from 'socket.io';

import routes from './routes';

import './database';

class App {
  constructor() {
    this.app = express();
    this.server = http.Server(this.app);
    this.io = io(this.server);

    this.init();
    this.middlewares();
    this.routes();
  }

  init() {
    this.connectedUsers = {};

    this.io.on('connection', socket => {
      const { user } = socket.handshake.query;

      this.connectedUsers[user] = socket.id;
    });
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use((req, res, next) => {
      req.io = this.io;
      req.connectedUsers = this.connectedUsers;

      return next();
    });
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().server;
