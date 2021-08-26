import type { Express } from 'express'

export function addCacheMiddleware(app: Express): void {
  app.use((req, res, next) => {
    // here you can define period in second, this one is 5 minutes
    const period = 60 * 50

    // you only want to cache for GET requests
    if (req.method == 'GET') {
      res.set('Cache-control', `public, max-age=${period}`)
    } else {
      // for the other requests set strict no caching parameters
      res.set('Cache-control', 'no-store')
    }

    // remember to call next() to pass on the request
    next()
  })
}
