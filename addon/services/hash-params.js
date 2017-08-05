import Ember from 'ember';
import parseHashParamsFrom from '../utils/parse-hash-params';
import buildHashFrom from '../utils/build-hash-from';

const { get, inject } = Ember;

export default Ember.Service.extend({
  router: inject.service(),

  get(prop) {
    const url = get(this, 'router.currentURL');
    const hashParams = parseHashParamsFrom(url);

    return hashParams[prop];
  },

  set(prop, value) {
    const url = get(this, 'router.currentURL');
    const hashParams = parseHashParamsFrom(url);

    hashParams[prop] = value;

    const hash = buildHashFrom(hashParams);
    const [baseURL] = url.split('#');

    get(this, 'router.location').setURL(`${baseURL}#${hash}`);
  }
});
