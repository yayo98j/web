import { Plugin } from 'rollup'
// @ts-ignore
import modify from 'rollup-plugin-modify'

export default (production = true): Plugin =>
  modify({
    'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development'),
    // todo: remove after pending PR is merged
    // fix for 'assignment to undeclared variable dav' in davclient.js/lib/client.js 6:0
    "if (typeof dav === 'undefined') { dav = {}; }": 'var dav = dav || {}',
    // todo: owncloud-sdk _makeOCSrequest has no catch
    // this is required if a network error for example 'blocked by CORS' happened
    'l(o.instance+p,{method:e,body:d.body,headers:h})':
      'l(o.instance+p,{method:e,body:d.body,headers:h}).catch(function(e){return r(e)})'
  })
