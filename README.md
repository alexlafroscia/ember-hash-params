# ember-hash-params

To send data into an Ember application, you usually want to do one of two things:

1. Define a [dynamic segment][dynamic-segment] in the URL
2. Use a [query parameter][query-param] for the route

However, in some cases you might not be able to use either -- if, for example, your URL contains information that you don't want to log to the server. In these cases it can be useful to define parameters through the [hash][hash]; this addon makes this (somewhat) easier.

## Installation

```bash
ember install ember-hash-params
```

Then, install the Router mixin

```javascript
// app/router.js
// ...
import HashParamSupport from 'ember-hash-params/router-mixin';

const Router = Ember.Router.extend(HashParamSupport, {
  // ...
});
// ...
```

## Usage

### Transitioning with Hash Params

Applying the above mixin allows transitions in Ember to maintain hash params, when they normally would be blown away by the transition. Much like query params, you specify the hash params at the point that you make the transition:

```javascript
// app/foo/route.js
export default Ember.Route.extend({
  beforeModel() {
    this.transitionTo('bar', {
      hashParams: {
        foo: true
      }
    });
  }
});
```

The above transition would maintain the value of the `foo` hash param through the transition.

[dynamic-segment]: https://guides.emberjs.com/v2.14.0/routing/specifying-a-routes-model/#toc_dynamic-models
[query-param]: https://guides.emberjs.com/v2.14.0/routing/query-params/
[hash]: https://www.w3schools.com/jsref/prop_loc_hash.asp
