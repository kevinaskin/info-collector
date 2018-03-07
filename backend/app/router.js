'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/login', controller.user.login);

  router.post('/forms', controller.form.get);
  router.post('/forms/create', controller.form.create);
  router.post('/forms/answer', controller.form.answer);

  router.post('/forms/statistic', controller.form.statistic);
  router.post('/forms/answer/detail', controller.form.answerDetail);
  router.get('/download', controller.form.download);
};
