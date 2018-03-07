'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');
const { jwtSalt } = require('../../config/config.minus');

class UserController extends Controller {
  async login() {
    const { ctx, service } = this;
    const { username, password } = ctx.request.body;
    const _user = await ctx.model.User.find({ username });
    if (_user.length) {
      if (_user[0].password === password) {
        const token = jwt.sign({
          username,
          timeTag: +Date.now(),
        }, jwtSalt);
        ctx.body = {
          msg: `login success [${username}]`,
          data: { token },
          code: 0,
        };
        ctx.status = 200;
      } else {
        ctx.body = {
          msg: `login failed [${username}]`,
          code: 10001,
        };
        ctx.status = 200;
      }
    } else {
      const req = await service.user.create(ctx.request.body);

      const token = jwt.sign({
        username,
        timeTag: +Date.now(),
      }, jwtSalt);

      ctx.body = {
        msg: `create user [${username}] success`,
        code: 0,
        data: {
          req,
          token,
        },
      };
      ctx.status = 200;
    }
  }
}

module.exports = UserController;
