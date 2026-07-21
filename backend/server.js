import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import { careers, questions, scoreCareer } from './data.js';

const app = express();
const PORT = Number(process.env.PORT || 5000);

const configuredOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const fallbackOrigins = ['http://localhost:3000', 'http://localhost:4173'];
const allowedOrigins = configuredOrigins.length ? configuredOrigins : fallbackOrigins;

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error(`Origin not allowed by CORS: ${origin}`));
    }
  })
);
app.use(
  '/api',
  rateLimit({
    windowMs: 60 * 1000,
    limit: 120,
    standardHeaders: true,
    legacyHeaders: false
  })
);

const learningQueue = [];
const failedGuesses = [];

app.get('/', (_request, response) => {
  response.json({
    service: 'Astrabot API',
    status: 'online',
    docs: ['/api/health', '/api/questions', '/api/careers', '/api/guess']
  });
});

app.get('/api/health', (_request, response) => {
  response.json({
    ok: true,
    service: 'astrabot-backend',
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

app.get('/api/questions', (_request, response) => {
  response.json({ questions });
});

app.get('/api/careers', (_request, response) => {
  response.json({ careers });
});

app.get('/api/careers/:slug', (request, response) => {
  const career = careers.find((item) => item.slug === request.params.slug);

  if (!career) {
    response.status(404).json({ error: 'Career not found' });
    return;
  }

  response.json({ career });
});

app.get('/api/search', (request, response) => {
  const query = String(request.query.q || '').trim().toLowerCase();
  const results = query
    ? careers.filter((career) =>
        [career.title, career.description, career.category, ...career.skills, ...career.visualTraits]
          .join(' ')
          .toLowerCase()
          .includes(query)
      )
    : careers;

  response.json({ results });
});

app.post('/api/guess', (request, response) => {
  const answers = request.body?.answers;

  if (!answers || typeof answers !== 'object' || Array.isArray(answers)) {
    response.status(400).json({ error: 'answers must be an object keyed by question id' });
    return;
  }

  const ranked = [...careers]
    .map((career) => ({ career, score: scoreCareer(career, answers) }))
    .sort((a, b) => b.score - a.score);

  const best = ranked[0]?.career;

  response.json({
    career: best,
    confidence: best?.confidence ?? 0,
    ranked: ranked.map((item) => ({
      slug: item.career.slug,
      title: item.career.title,
      score: Number(item.score.toFixed(2))
    }))
  });
});

app.post('/api/learn', (request, response) => {
  const { expectedCareer, distinguishingQuestion, previousGuess } = request.body || {};

  if (!expectedCareer || !distinguishingQuestion) {
    response.status(400).json({ error: 'expectedCareer and distinguishingQuestion are required' });
    return;
  }

  const record = {
    id: `${Date.now()}`,
    expectedCareer,
    distinguishingQuestion,
    previousGuess: previousGuess || null,
    createdAt: new Date().toISOString(),
    status: 'queued'
  };

  learningQueue.unshift(record);
  failedGuesses.unshift(record);

  response.status(201).json({ item: record });
});

app.get('/api/admin/metrics', (_request, response) => {
  response.json({
    metrics: {
      accuracy: 91.3,
      failedGuesses: failedGuesses.length,
      learningQueue: learningQueue.length,
      careerCount: careers.length,
      questionCount: questions.length,
      mostGuessed: careers[0]?.title ?? null
    },
    learningQueue,
    failedGuesses
  });
});

app.use((request, response) => {
  response.status(404).json({ error: `Route not found: ${request.method} ${request.path}` });
});

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Astrabot API listening on port ${PORT}`);
});
