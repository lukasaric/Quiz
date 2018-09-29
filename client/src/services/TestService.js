import Api from '@/services/Api';

const uri = '/topic/submit';

export default {
  continue(partialData) {
    return Api.post(uri, partialData);
  },
  submit(data) {
    return Api.post(uri, data);
  }

};
