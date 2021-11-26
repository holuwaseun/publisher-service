'use strict';

module.exports = ({PublisherController, validator, express}) => {
  const {Router: expressRouter} = express;

  const router = expressRouter();

  router.route('/publish/:topic')
      .post(validator.validateRequest(), PublisherController.publishMessage());

  return router;
};
