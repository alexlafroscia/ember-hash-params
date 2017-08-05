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
    const url = get(this, 'router.currentURL');
    return parseHashParamsFrom(url);
  },

  setParam(prop, value) {
    const url = get(this, 'router.currentURL');
    const hashParams = parseHashParamsFrom(url);

    hashParams[prop] = value;

    const hash = buildHashFrom(hashParams);
    const [baseURL] = url.split('#');

    get(this, 'router.location').setURL(`${baseURL}#${hash}`);
  },

  setParams(obj) {
    const url = get(this, 'router.currentURL');
    const [baseURL] = url.split('#');

    const hash = buildHashFrom(obj);
    get(this, 'router.location').setURL(`${baseURL}#${hash}`);
  }
});
