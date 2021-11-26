'use strict';

module.exports = ({joi}) => {
  return {
    '/publish/:topic': {
      post: {
        params: {
          topic: joi.string().required(),
        },
      },
    },
  };
};
