'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async create(body) {
    const UserModel = this.ctx.model.User;
    const { username, password } = body;

    const _user = new UserModel({
      username,
      password,
    });
    await _user.save();

    return _user.username;
  }
}

module.exports = UserService;
