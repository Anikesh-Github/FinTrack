const express = require('express');
const Expense = require('../models/Expense');
const OpenAI = require('openai');

const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.post('/ask', async (req, res) => {
  try {
    const { question, userId } = req.body;

    const expenses = await Expense.find({ user: userId }).limit(20);

    const context = expenses.map(e =>
      `Date: ${e.date}, Amount: ${e.amount}, Category: ${e.category}`
    ).join('\n');

    const prompt = `
You are a financial assistant.
Answer ONLY using the following expense data.

${context}

User question:
${question}
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }]
    });

    res.json({
      success: true,
      answer: completion.choices[0].message.content
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'RAG query failed',
      error: error.message
    });
  }
});

module.exports = router;
