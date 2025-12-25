const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  title: {
    type: String,
    required: [true, 'Expense title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0.01, 'Amount must be greater than 0']
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
    default: Date.now
  },
  note: {
    type: String,
    trim: true,
    maxlength: [500, 'Note cannot be more than 500 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: [
        'Food',
        'Transportation',
        'Entertainment',
        'Shopping',
        'Bills',
        'Healthcare',
        'Education',
        'Travel',
        'Other'
      ],
      message: 'Please select a valid category'
    }
  },

  // NEW — OCR metadata
  source: {
    type: String,
    enum: ['manual', 'ocr'],
    default: 'manual'
  },

  // NEW — vector embedding for RAG
  embedding: {
    type: [Number],
    default: undefined
  }

}, {
  timestamps: true
});

// Index for better query performance
expenseSchema.index({ user: 1, date: -1 });
expenseSchema.index({ user: 1, category: 1 });

module.exports = mongoose.model('Expense', expenseSchema);
