import * as algoliasearch from 'algoliasearch' // When using TypeScript

var client = algoliasearch('TQ3TDPJYHR', '0e672819466641d3e76c3aea82ec9395')

var index = client.initIndex('providers')
// var contactsJSON = require('./contacts.json');

index.addObjects(contactsJSON, function(err, content) {
  if (err) {
    console.error(err)
  }
})
