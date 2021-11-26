'use strict';

module.exports = ({joi}) => {
  return {
    '/subscribe/:topic': {
      post: {
        params: {
          topic: joi.string().required(),
        },
        body: {
          url: joi.string().required(),
        },
      },
    },
  };
};
