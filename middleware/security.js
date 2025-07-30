import helmet from 'helmet';
import cors from 'cors';
import xss from 'xss-clean';
import express from 'express';
import hpp from 'hpp';

export const configureSecurityMiddleware = (app) => {
  app.use(helmet());
  app.use(cors());
  app.use(xss());
  app.use(express.json({ limit: '10kb' }));
  app.use(hpp());
};