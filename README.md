# doc-pack

This module provides documentation generation for `provision-react-component` generated modules.


## How to use

Simply require the Handlebars helpers to help render templates:

```js
Handlebars.registerHelper(require('@economist/doc-pack'));
```

You can also register the partials that come with the doc-pack:

```js
Handlebars.registerPartial(fs.readFileSync(require.resolve('@economist/doc-pack/partials/component-example.hbs')));
Handlebars.registerPartial(fs.readFileSync(require.resolve('@economist/doc-pack/partials/component-preview.hbs')));
Handlebars.registerPartial(fs.readFileSync(require.resolve('@economist/doc-pack/partials/component-readme.hbs')));
Handlebars.registerPartial(fs.readFileSync(require.resolve('@economist/doc-pack/partials/component-tests.hbs')));
Handlebars.registerPartial(fs.readFileSync(require.resolve('@economist/doc-pack/partials/layout.hbs')));
Handlebars.registerPartial(fs.readFileSync(require.resolve('@economist/doc-pack/partials/panel.hbs')));
```

It also provides templates one can render:

```js
Handlebars.render(fs.readFileSync(require.resolve('@economist/doc-pack/templates/index.hbs')));
Handlebars.render(fs.readFileSync(require.resolve('@economist/doc-pack/templates/standalone.hbs')));
```

### Usage with hbs-cli

[hbs-cli](https://www.npmjs.com/package/hbs-cli) can also be very helpful for rendering these:

```bash
hbs --helper @economist/doc-pack --partial @economist/doc-pack/partials/* -- @economist/doc-pack/templates/index.hbs
```
