const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/receipt', upload.single('image'), async (req, res) => {
  try {
    const { data } = await Tesseract.recognize(req.file.path, 'eng');
    const text = data.text;

    // Simple extraction (good enough for resume + interview)
    const amount = text.match(/₹?\s?(\d+(\.\d{2})?)/)?.[1] || null;
    const date = text.match(/\b\d{2}[\/-]\d{2}[\/-]\d{4}\b/)?.[0] || null;

    res.json({
      success: true,
      extractedText: text,
      amount,
      date
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'OCR processing failed',
      error: error.message
    });
  }
});

module.exports = router;
