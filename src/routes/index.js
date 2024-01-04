import express from 'express';
import deposition from './depositionRoutes.js';

const routes = (app) => {
  app.route('/').get((req, res) => res.status(200).send('Challenge-back-end Alura'));
  app.use(express.json(), deposition);
};

export default routes;
