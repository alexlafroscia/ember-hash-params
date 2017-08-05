import Ember from 'ember';
import parseHashParamsFrom from './utils/parse-hash-params';

const { get, inject } = Ember;

export default Ember.Mixin.create({
  hashParams: inject.service(),

  transitionTo(...args) {
    const { hashParams } = args[args.length - 1];

    // If there are hash params, then we don't want them to passed along to
    // the `_super` implementation. Things get pretty dicey.
    if (hashParams) {
      const opts = args[args.length - 1];
      delete opts.hashParams;

      // If the options do not have a query param, we shouldn't pass the object
      // through to the `_super` implementation at all
      if (!opts.hasOwnProperty('queryParams')) {
        args.pop();
      }
    }

    const transition = this._super(...args);

    if (hashParams) {
      const savedHashParams = {};
      const currentHashParams = parseHashParamsFrom(this.get('url'));

      for (let key of Object.keys(hashParams)) {
        const enabled = hashParams[key];
        const value = currentHashParams[key];

        if (enabled && value) {
          savedHashParams[key] = value;
        }
      }

      transition.then(() => {
        get(this, 'hashParams').setParams(savedHashParams);
      });
    }

    return transition;
  }
});
