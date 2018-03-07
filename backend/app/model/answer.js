'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const AnswerSchema = new mongoose.Schema({
    fid: { type: String },
    timeTag: { type: Date, default: +Date.now() },
    answer: { type: String },
  });

  return mongoose.model('Answer', AnswerSchema);
};
