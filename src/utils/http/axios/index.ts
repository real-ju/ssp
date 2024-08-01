import { Requester } from './Requester';
import { message } from 'ant-design-vue/es';

import type { RequestOptions } from './types';

function createRequester(options: RequestOptions = {}) {
  return new Requester(options);
}

export const httpRequester = createRequester({
  validateCustomStatus: (response) => {
    return true;
  },
  handleCustomError: function (response) {
    const data = response.data;
    if (data) {
      message.error(data.message);
    }
  }
});
