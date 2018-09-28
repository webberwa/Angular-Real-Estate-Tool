const express = require('express')
const jsdom = require('jsdom')
const fetch = require('node-fetch')
const parseString = require('xml2js').parseString
const DOMParser = require('xmldom').DOMParser
const app = express()
const port = 3000
const { JSDOM } = jsdom
const _ = require('lodash')

app.get('/', (req, res) => {
  getZillowPropertyInfo(req, res)
})

const parseXML = XML => new DOMParser().parseFromString(XML, 'text/xml')

const getZillowPropertyInfo = (req, res) => {
  //www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz18cjuillzpn_2599m&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA

  const zillowData = {
    'SearchResults:searchresults': {
      $: {
        'xsi:schemaLocation':
          'http://www.zillow.com/static/xsd/SearchResults.xsd https://www.zillowstatic.com/vstatic/18f7df5/static/xsd/SearchResults.xsd',
        'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
        'xmlns:SearchResults':
          'http://www.zillow.com/static/xsd/SearchResults.xsd'
      },
      request: [
        {
          address: ['2114 Bigelow Ave'],
          citystatezip: ['Seattle, WA']
        }
      ],
      message: [
        {
          text: ['Request successfully processed'],
          code: ['0']
        }
      ],
      response: [
        {
          results: [
            {
              result: [
                {
                  zpid: ['48749425'],
                  links: [
                    {
                      homedetails: [
                        'https://www.zillow.com/homedetails/2114-Bigelow-Ave-N-Seattle-WA-98109/48749425_zpid/'
                      ],
                      graphsanddata: [
                        'http://www.zillow.com/homedetails/2114-Bigelow-Ave-N-Seattle-WA-98109/48749425_zpid/#charts-and-data'
                      ],
                      mapthishome: [
                        'http://www.zillow.com/homes/48749425_zpid/'
                      ],
                      comparables: [
                        'http://www.zillow.com/homes/comps/48749425_zpid/'
                      ]
                    }
                  ],
                  address: [
                    {
                      street: ['2114 Bigelow Ave N'],
                      zipcode: ['98109'],
                      city: ['SEATTLE'],
                      state: ['WA'],
                      latitude: ['47.637934'],
                      longitude: ['-122.347936']
                    }
                  ],
                  zestimate: [
                    {
                      amount: [
                        {
                          _: '2114438',
                          $: {
                            currency: 'USD'
                          }
                        }
                      ],
                      'last-updated': ['09/26/2018'],
                      oneWeekChange: [
                        {
                          $: {
                            deprecated: 'true'
                          }
                        }
                      ],
                      valueChange: [
                        {
                          _: '-24867',
                          $: {
                            duration: '30',
                            currency: 'USD'
                          }
                        }
                      ],
                      valuationRange: [
                        {
                          low: [
                            {
                              _: '2008716',
                              $: {
                                currency: 'USD'
                              }
                            }
                          ],
                          high: [
                            {
                              _: '2262449',
                              $: {
                                currency: 'USD'
                              }
                            }
                          ]
                        }
                      ],
                      percentile: ['0']
                    }
                  ],
                  localRealEstate: [
                    {
                      region: [
                        {
                          $: {
                            name: 'East Queen Anne',
                            id: '271856',
                            type: 'neighborhood'
                          },
                          zindexValue: ['870,700'],
                          links: [
                            {
                              overview: [
                                'http://www.zillow.com/local-info/WA-Seattle/East-Queen-Anne/r_271856/'
                              ],
                              forSaleByOwner: [
                                'http://www.zillow.com/east-queen-anne-seattle-wa/fsbo/'
                              ],
                              forSale: [
                                'http://www.zillow.com/east-queen-anne-seattle-wa/'
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  }

  const xmlString = `<?xml version='1.0' encoding='us-ascii'?>

<!--  A SAMPLE set of slides  -->

<slideshow 
    title="Sample Slide Show"
    date="Date of publication"
    author="Yours Truly"
    >

    <!-- TITLE SLIDE -->
    <slide type="all">
      <title>Wake up to WonderWidgets!</title>
    </slide>

    <!-- OVERVIEW -->
    <slide type="all">
        <title>Overview</title>
        <item>Why <em>WonderWidgets</em> are great</item>
        <item/>
        <item>Who <em>buys</em> WonderWidgets</item>
    </slide>

</slideshow>`

  const xmlDoc = parseXML(xmlString, 'text/xml')
  // const value = xmlDoc.querySelectorAll('slideshow slide')
  // .getElementsByTagName('title')[0].childNodes[0].nodeValue
  console.log(xmlDoc)
  return res.send('good')

  const getEstimateFromData = json => {
    return json['SearchResults:searchresults']['response'][0]['results'][0][
      'result'
    ][0]['zestimate'][0]['amount'][0]['_']
  }

  const data = getEstimateFromData(zillowData)
  // res.send(data)

  const fetch = require('node-fetch')
  const parseString = require('xml2js').parseString
  const zillowApiKey = 'X1-ZWz18cjuillzpn_2599m'
  const address = '2114+Bigelow+Ave&citystatezip=Seattle%2C+WA'

  // const endpoint = `http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=${zillowApiKey}&address=${address}`
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'text/xml'
    }
  }
  const endpoint = 'https://httpbin.org/xml'

  console.log('Begin Zillow API')
  fetch(endpoint, options)
    .then(r => r.text())
    // .then(xml => parseXML(xml))
    .then(dom => {
      console.log(dom)
      res.send(dom)
    })
    .catch(err => {
      console.log('Zillow error')
      console.log(err)
      return
    })
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
