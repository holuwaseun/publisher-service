'use strict';

module.exports = ({redis}) => {
  const subscribeTopic = async (url, topic) => {
    const key = ['topics', topic].join(':');
    let subscribers = await redis.readKey(key);

    if (!subscribers || (subscribers && subscribers.length === 0)) {
      subscribers = [url];
    } else if (!subscribers.includes(url)) {
      subscribers.push(url);
    }

    await redis.writeKey(key, subscribers);
  };
  return {
    subscribeTopic,
  };
};
