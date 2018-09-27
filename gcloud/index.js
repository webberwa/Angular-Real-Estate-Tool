'use strict'

exports.getZillowPropertyInfo = (req, res) => {
  //www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz18cjuillzpn_2599m&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA

  const fetch = require('node-fetch')
  const parseString = require('xml2js').parseString
  const _ = require('lodash')
  const zillowApiKey = 'X1-ZWz18cjuillzpn_2599m'
  const address = '2114+Bigelow+Ave&citystatezip=Seattle%2C+WA'

  const endpoint = `http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=${zillowApiKey}&address=${address}`
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'text/xml'
    }
  }

  console.log('Begin Zillow API')
  fetch(endpoint, options)
    .then(r => r.text())
    .then(xml => {
      let data = null
      parseString(xml, function(err, result) {
        data = result
      })
      return data
    })
    .then(dom => {
      console.log('Zillow dom')
      console.log(dom)
      console.log('Zillow estimate')
      const estimate = _.find(dom, 'zestimate')
      console.log(estimate)
      const price = _.find(estimate, '_')
      res.send(dom)
    })
    .catch(err => {
      console.log('Zillow error')
      console.log(err)
      return
    })
}
