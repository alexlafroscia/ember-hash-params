import Ember from 'ember';
import parseHashParamsFrom from './util/parse-hash-params';
import buildHashFrom from './util/build-hash-from';

const { get } = Ember;

export default Ember.Mixin.create({
  transitionTo() {
    const transition = this._super(...arguments);
    const { hashParams } = arguments[arguments.length - 1];

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
