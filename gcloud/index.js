'use strict'

exports.getZillowPropertyInfo = (req, res) => {
  //www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz18cjuillzpn_2599m&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA

  console.log('query')
  console.log(req.query)

  const fetch = require('node-fetch')
  const _ = require('lodash')

  // Build API query
  const zillowApiKey = 'X1-ZWz18cjuillzpn_2599m'
  const endpoint = `http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=${zillowApiKey}&address=${
    req.query.address
  }&citystatezip=${req.query.citystatezip}`

  console.log(endpoint)
  console.log(encodeURI(endpoint))

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'text/xml'
    }
  }

  console.log('Begin Zillow API')
  fetch(encodeURI(endpoint), options)
    .then(r => r.text())
    .then(xml => {
      res.set('Access-Control-Allow-Origin', '*')
      res.set('Access-Control-Allow-Methods', 'GET')
      res.set('Access-Control-Allow-Headers', 'Content-Type')
      res.set('Access-Control-Max-Age', '3600')
      res.status(200).send(xml)
    })
    .catch(err => {
      console.log('Zillow error')
      console.log(err)
      return
    })
}
