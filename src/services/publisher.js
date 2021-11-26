'use strict';

module.exports = ({httpClient}) => {
  /**
   *
   * @param {string} subscriber
   * @param {Object} message
   * @return {*}
   */
  const publishMessage = (subscriber, message) => {
    return httpClient().post({
      url: subscriber,
      payload: {...message},
    });
  };
  return {
    publishMessage,
  };
};
