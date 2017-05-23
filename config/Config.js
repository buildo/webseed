const t = require('tcomb');

module.exports = t.interface({
  port: t.maybe(t.Integer),
  title: t.String,
  bundle: t.interface({
  })
}, { name: 'Config', strict: true });
