// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: {
    components: {
      login: 'login',
      logout: 'logout',
      not_found: 'not-found',
      pokemons: 'pokemons',
      pokemons_details: 'pokemon/:id',
      sign_up: 'sign-up'
    },
    api: {
      base: 'api/v1/',
      login: 'login/',
      pokemons: 'pokemon/',
    },
  },
  environment_api: {
    local: 'http://localhost:3000/',
  },
  encoder: {
    password: 'sistemas',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
