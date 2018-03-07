'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const FormSchema = new mongoose.Schema({
    username: { type: String },
    timeTag: { type: Date, default: +Date.now() },
    format: { type: String },
  });

  return mongoose.model('Form', FormSchema);
};
