'use strict';

module.exports = ({SubscriberController, validator, express}) => {
  const {Router: expressRouter} = express;

  const router = expressRouter();

  router.route('/subscribe/:topic')
      .post(validator.validateRequest(), SubscriberController.subscribeTopic());

  return router;
};
