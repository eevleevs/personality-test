import {assertEquals} from 'https://deno.land/std@0.180.0/testing/asserts.ts'

import questions from './questions.ts'
import app from './static/app.js'

const host = 'http://localhost:8000'

Deno.test({
  name: '/questions/length',
  async fn() {
    assertEquals(
      await (await fetch(host + '/questions/length')).json(),
      questions.length
    )
  },
})

Deno.test({
  name: '/questions/0',
  async fn() {
    assertEquals(
      await (await fetch(host + '/questions/0')).json(),
      questions[0]
    )
  },
})

for (const [status, paths] of new Map([
  [404, ['/questions/100', '/questions/wrong']],
  [200, ['/', '/alpinejs.esm.js', '/chota.css', '/app.js']],
])) {
  for (const path of paths) {
    Deno.test({
      name: path,
      async fn() {
        const res = await fetch(host + path)
        res.body?.cancel()
        assertEquals(res.status, status)
      },
    })
  }
}

for (const [pers, compFn] of new Map([
  ['Introvert', (a: any, b: any) => (a[1] < b[1] ? a : b)],
  ['Extrovert', (a: any, b: any) => (a[1] > b[1] ? a : b)],
])) {
  Deno.test({
    name: pers,
    async fn() {
      app.host = host
      await app.init()
      await app.start()
      while (app.questions.length) {
        await app.nextQuestion()
        app.scoreAnswer(Object.entries(app.answers).reduce(compFn)[0])
      }
      assertEquals(app.result(), pers)
    },
  })
}
