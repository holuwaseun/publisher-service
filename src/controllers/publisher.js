'use strict';

module.exports = ({PublisherService, responseHandler, logger, redis}) => {
  /**
   * publishMessage
   * @return {(function(*, *, *): Promise<void>)|*}
   */
  const publishMessage = () => {
    return async (request, response, next) => {
      try {
        logger.debug('Publish Message');
        const {params, body} = request;

        const {topic} = params;

        const key = ['topics', topic].join(':');
        const subscribers = await redis.readKey(key);

        if (!subscribers || (subscribers && !subscribers.length)) {
          return responseHandler.handleResponse({
            response,
            code: 200,
            error: false,
            payload: {
              message: 'OK',
            },
          });
        }

        const subscriberMessage = {
          topic,
          data: body,
        };

        for (const subscriber of subscribers) {
          await PublisherService.publishMessage(subscriber, subscriberMessage);
        }

        return responseHandler.handleResponse({
          response,
          code: 200,
          error: false,
          payload: {
            message: 'OK',
          },
        });
      } catch (error) {
        logger.debug(error);
        return next(error);
      }
    };
  };

  return {
    publishMessage,
  };
};
