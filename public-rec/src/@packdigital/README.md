# README

## Theme Shadowing

Normally when you shadow components you build the shadowing "project" component inside of `src/components/<COMPONENT>` so it lives alongside all the other project components, and inside of the shadow file (e.g. `src/@packdigital/gatsby-theme-ripperoni/components/<COMPONENT>`) you do a module redirect like so:

```react
export { default } from 'src/components/<COMPONENT>';
```

However, when you want to import and extend the original theme component when building a shadowing project component, because of the way shadowing works in gatsby, **you have to import the theme component from inside the shadowing file**.

For example, the following would **not** work:

```react
// src/components/Footer.jsx

import React from 'react';
import Footer from '@packdigital/gatsby-theme-ripperoni/src/components/Footer';

export default props => (
  <Footer>
    My new project specific footer!
  </Footer>
);
```

```react
// src/@packdigital/gatsby-theme-ripperoni/components/Footer.jsx

export { default } from 'src/components/Footer';
```

What you should do _instead_ is:

```react
// src/@packdigital/gatsby-theme-ripperoni/components/Footer.jsx

import React from 'react';
import Footer from '@packdigital/gatsby-theme-ripperoni/src/components/Footer';

export default props => (
  <Footer>
    My new project specific footer!
  </Footer>
);
```

Read more [here](https://github.com/ChristopherBiscardi/gatsby-theme-examples/issues/23).

## Theme Shadowing Loop

Be careful when you import and extend a shadowed component that you're importing the exact same file from the theme and not using the default index.js module redirect. If you do the latter you'll get stuck in an infinite loop and your site will break ☹️.
