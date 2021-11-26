'use strict';

module.exports = ({SubscriberService, responseHandler, logger}) => {
  const subscribeTopic = () => {
    return async (request, response, next) => {
      try {
        logger.debug('Subscribe Topic');
        const {params, body} = request;

        const {topic} = params;
        const {url} = body;

        await SubscriberService.subscribeTopic(url, topic);

        return responseHandler.handleResponse({
          response,
          code: 200,
          error: false,
          payload: {
            url,
            topic,
          },
        });
      } catch (error) {
        logger.debug(error);
        return next(error);
      }
    };
  };

  return {
    subscribeTopic,
  };
};
