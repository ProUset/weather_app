function validateQuery(req, res, next) {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: 'Query parameter "q" is required' });
  }
  if (typeof q !== 'string' || q.trim().length === 0) {
    return res.status(400).json({ error: 'Query parameter "q" must be a non-empty string' });
  }
  next();
}

module.exports = { validateQuery };
