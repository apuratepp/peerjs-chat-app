import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: 'meteo-peer', // TODO: loaded via config
  Resolver: Resolver
});

loadInitializers(App, 'meteo-peer');

export default App;
