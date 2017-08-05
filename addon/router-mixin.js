import Ember from 'ember';
import parseHashParamsFrom from './utils/parse-hash-params';
import buildHashFrom from './utils/build-hash-from';

const { get } = Ember;

export default Ember.Mixin.create({
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
        const url = get(this, 'url');
        const hash = buildHashFrom(savedHashParams);

        if (hash) {
          const path = `${url}#${hash}`;
          get(this, 'location').setURL(path);
        }
      });
    }

    return transition;
  }
});
