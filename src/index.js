import handlebarsLayouts from 'handlebars-layouts';
import helperMd from 'helper-md';
import helperMarkdown from 'helper-markdown';
import helperRead from 'helper-read';
import { highlight, languages } from 'prismjs';
import { readFileSync } from 'fs';
import { sync as resolve } from 'resolve';
import { join as joinPath } from 'path';
const debug = require('debug')('devpack:docgen');
export function register(handlebars) {
  handlebarsLayouts.register(handlebars);
  handlebars.registerHelper('md', helperMd);
  handlebars.registerHelper('markdown', helperMarkdown());
  handlebars.registerHelper('read', helperRead.sync);
  handlebars.registerHelper('code', function code(options) {
    const lang = languages[(options.hash || {}).lang] || languages.js;
    const contents = options.fn(this) || ''; // eslint-disable-line no-invalid-this
    const output = highlight(contents, lang);
    return new handlebars.SafeString(`<pre><code>${output}</pre></code>`);
  });
  handlebars.registerHelper('json', (json) =>
    new handlebars.SafeString(`<pre>${
      highlight('json', JSON.stringify(json, null, 2))
    }</pre>`)
  );
  handlebars.registerHelper('require', (file) => {
    debug(`Requiring file: ${file}`);
    try {
      return readFileSync(resolve(file, { basedir: process.cwd() }), 'utf8');
    } catch (error) {
      return readFileSync(resolve(file, { basedir: joinPath(__dirname, '..') }), 'utf8');
    }
  });
  const partial = joinPath.bind(null, __dirname, '../partials/');
  [
    'component-example',
    'component-preview',
    'component-readme',
    'component-tests',
    'layout',
    'panel',
  ].forEach((name) => (
    handlebars.registerPartial(name, readFileSync(partial(`${name}.hbs`), 'utf8'))
  ));
  return handlebars;
}
