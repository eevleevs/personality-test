import {serve} from 'https://deno.land/std@0.180.0/http/server.ts'
import {Hono} from 'https://deno.land/x/hono@v3.1.0/mod.ts'
import {serveStatic} from 'https://deno.land/x/hono@v3.1.0/middleware.ts'

import questions from './questions.ts'
import templates from './templates.ts'

const app = new Hono()
  .route(
    '/questions',
    new Hono()
      .get('/length', c => c.json(questions.length))
      .get('/:no', c => {
        const question = questions[parseInt(c.req.param('no'))]
        return question ? c.json(question) : c.text('404 Not Found', 404)
      })
  )
  .get('/', c => c.html(templates.index({})))
  .get('*', serveStatic({root: './static'}))

serve(app.fetch)
