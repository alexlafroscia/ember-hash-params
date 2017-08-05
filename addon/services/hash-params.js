import Ember from 'ember';
import parseHashParamsFrom from '../utils/parse-hash-params';
import buildHashFrom from '../utils/build-hash-from';

const { get, inject } = Ember;

export default Ember.Service.extend({
  router: inject.service(),

  getParam(prop) {
    const params = this.getParams();
    return params[prop];
  },

  getParams() {
    const url = get(this, 'router.location.path');
    return parseHashParamsFrom(url);
  },

  setParam(prop, value) {
    const hashParams = this.getParams();

    hashParams[prop] = value;

    this.setParams(hashParams);
  },

  setParams(obj) {
    const url = get(this, 'router.location.path');
    const [baseURL] = url.split('#');

    const hash = buildHashFrom(obj);
    get(this, 'router.location').setURL(`${baseURL}#${hash}`);
  }
});
