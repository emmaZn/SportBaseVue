# SportBaseVue

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

DEV nuxt

from src/nuxt.config.js
remove line  : buildDir: '../functions/nuxt',

from src
$npm install
$npm run dev

DEV firebase

from src/nuxt.config.js
add line  : buildDir: '../functions/nuxt',

from src
yarn build
cd ..
cp -R functions/nuxt/dist/ public/assets/
firebase serve
