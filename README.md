# ember-hash-params

[![Build Status](https://travis-ci.org/alexlafroscia/ember-hash-params.svg?branch=master)](https://travis-ci.org/alexlafroscia/ember-hash-params)

To send data into an Ember application, you usually want to do one of two things:

1. Define a [dynamic segment][dynamic-segment] in the URL
2. Use a [query parameter][query-param] for the route

However, in some cases you might not be able to use either -- if, for example, your URL contains information that you don't want to log to the server. In these cases it can be useful to define parameters through the [hash][hash]; this addon makes this (somewhat) easier.

For example, you might want to send out a URL to your users that contain some kind of data that might be considered [PII][pii]. It could look like this:

```txt
https://my-cool-deal-site.com#discount-code=123456
```

That discount code probably shouldn't be logged to your servers, so a query param or URL segment won't do. Since hashes aren't seen by the server, but are seen by the client, it can be a method for communicating without exposing PII to your server logs.

Throughout this documentation (and the code) when I refer to a `hash param`, I mean a key-value pair like the one in the URL above. Like query params, they are delimited by an `&`, so a couple of params would look like:

```txt
https://my-cool-deal-site.com#discount-code=123456&postal-code=94041
```

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

**Note:** This addon depends on the [router service polyfill](https://github.com/rwjblue/ember-router-service-polyfill). It will only be included if your Ember version is less than 2.15; you *do not* have to install it yourself.

## Usage

### Transitioning with Hash Params

Applying the above mixin allows transitions in Ember to set hash params, when they normally would be blown away by the transition. Much like query params, you specify the hash params at the point that you make the transition:

```javascript
// app/foo/route.js
import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    this.transitionTo('bar', {
      queryParams: { /* Could go here, if needed */ },
      hashParams: {
        foo: 'bar'
      }
    });
  }
});
```

The above transition would set the value of the `foo` hash param through the transition. If you wanted to just maintain the current value of all params, you could instead do something like:

```javascript
// app/foo/route.js
import Ember from 'ember';

const { inject } = Ember;

export default Ember.Route.extend({
  hashParams: inject.service(),

  beforeModel() {
    this.transitionTo('bar', {
      hashParams: get(this, 'hashParams').getParams()
    });
  }
});
```

Which would set all of the params after the transition to the value they had before it.


### Getting and Setting Values Outside of Transitions

All of that isn't too helpful if you can't actually get the values again. The `hashParams` service, however, allows for getting and setting the values in a way that will both update the URL _and_ play nicely with Ember acceptance tests.

```javascript
const hashParams = get(this, 'hashParams');
hashParams.get('foo'); // Return the value of the `foo` param
hashParams.getParams(); // Return an object of all the params

hashParams.set('foo', 'bar'); // Set the `foo` param to `bar`
hashParams.setParams({ foo: 'bar' }); // Replace all hash params with the values in the given object
```

## A Warning

Please -- for your own sake -- don't do this. Don't use this addon; use query params. Ember supports them really nicely, and (while often annoying) they at least are accounted for by the framework's routing model. This is, by all means, a hack.

However, if you _have_ to use hash params (as I do) then this provides an interface for using them that plays nice enough with the Ember router that you can write Acceptance tests that will behave the way you expect them to.

[dynamic-segment]: https://guides.emberjs.com/v2.14.0/routing/specifying-a-routes-model/#toc_dynamic-models
[query-param]: https://guides.emberjs.com/v2.14.0/routing/query-params/
[hash]: https://www.w3schools.com/jsref/prop_loc_hash.asp
[pii]: https://en.wikipedia.org/wiki/Personally_identifiable_information
