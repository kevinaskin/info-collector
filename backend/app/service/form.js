'use strict';

const Service = require('egg').Service;

class FormService extends Service {
  async answer(body) {
    const AnswerModel = this.ctx.model.Answer;
    const { fid, answer, timeTag } = body;

    const _answer = new AnswerModel({
      fid,
      answer,
      timeTag,
    });
    await _answer.save();

    return _answer;
  }

  async create(body) {
    const FormModel = this.ctx.model.Form;
    const { username, format } = body;

    const _form = new FormModel({
      username,
      format,
    });
    await _form.save();

    return _form;
  }
}

module.exports = FormService;
