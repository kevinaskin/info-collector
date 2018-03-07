'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');
const { jwtSalt } = require('../../config/config.minus');
const xlsx = require('node-xlsx').default;

class FormController extends Controller {
  async download() {
    const { ctx } = this;
    const { fid } = ctx.query;

    const answers = await ctx.model.Answer.find({ fid });
    if (answers.length) {
      const jsonAnswer = answers.map(i => {
        return JSON.parse(i.answer);
      });
      const title = jsonAnswer[0].title;
      const keys = jsonAnswer[0].keys.map((item, index) => `问题${index + 1}:${item.name}`);
      const data = [[ ...keys ]];
      for (let i = 0; i < jsonAnswer.length; i++) {
        const _answers = jsonAnswer[i].keys.map(item => item.value);
        data.push(_answers);
      }
      const buffer = xlsx.build([{ name: title, data }]);
      ctx.set('Content-Type', 'application/octet-stream');
      ctx.set('Content-Disposition', 'attachment; filename="download.xlsx"');
      ctx.body = buffer;
    } else {
      ctx.body = '暂无数据';
      ctx.status = 200;
    }
  }
  async statistic() {
    const { ctx } = this;
    const { fid } = ctx.request.body;

    const answers = await ctx.model.Answer.find({ fid });
    ctx.body = {
      code: 0,
      msg: 'fetch answers success',
      data: {
        answers,
      },
    };
    ctx.status = 200;
  }
  async answerDetail() {
    const { ctx } = this;
    const { aid } = ctx.request.body;
    const detail = await ctx.model.Answer.findById(aid);
    ctx.body = {
      code: 0,
      msg: 'answer success',
      data: detail,
    };
    ctx.status = 200;
  }
  async answer() {
    const { ctx, service } = this;
    const { fid, answer, timeTag } = ctx.request.body;
    await service.form.answer({
      fid,
      answer,
      timeTag,
    });
    ctx.body = {
      code: 0,
      msg: 'answer success',
    };
    ctx.status = 200;
  }
  async create() {
    const { ctx, service } = this;
    const { token, format } = ctx.request.body;
    const decoded = jwt.verify(token, jwtSalt);
    if (decoded.username && decoded.timeTag) {
      const now = +Date.now();
      if (now - decoded.timeTag > 24 * 60 * 60 * 1000) {
        ctx.body = {
          code: 10003,
          msg: 'token is overdue',
        };
        ctx.status = 200;
      } else {
        const req = await service.form.create({
          username: decoded.username,
          format,
        });
        ctx.body = {
          code: 0,
          msg: 'save form success',
          data: {
            req,
          },
        };
        ctx.status = 200;
      }
    } else {
      ctx.body = {
        code: 10004,
        msg: 'token is invalid',
      };
      ctx.status = 200;
    }
  }
  async get() {
    const { ctx } = this;
    const { token, id } = ctx.request.body;
    if (id) {
      const forms = await ctx.model.Form.findById(id);
      ctx.body = {
        code: 0,
        msg: 'success',
        data: forms,
      };
      ctx.status = 200;
    } else {
      const decoded = jwt.verify(token, jwtSalt);
      if (decoded.username && decoded.timeTag) {
        const now = +Date.now();
        if (now - decoded.timeTag > 24 * 60 * 60 * 1000) {
          ctx.body = {
            code: 10003,
            msg: 'token is overdue',
          };
          ctx.status = 200;
        } else {
          const forms = await ctx.model.Form.find({ username: decoded.username });
          ctx.body = {
            code: 0,
            msg: 'success',
            data: forms,
          };
          ctx.status = 200;
        }
      } else {
        ctx.body = {
          code: 10004,
          msg: 'token is invalid',
        };
        ctx.status = 200;
      }
    }
  }
}

module.exports = FormController;
