import 'https://deno.land/x/dotenv@v3.2.0/load.ts'
import {
  compileFile,
  LocalsObject,
  Options,
  renderFile,
} from 'https://deno.land/x/pug@v0.1.5/mod.ts'

const dirName = './templates/'

export const templates: {
  [key: string]: (args: Options & LocalsObject) => string
} = {}

for await (const {name} of Deno.readDir(dirName)) {
  if (!name.endsWith('.pug')) continue
  templates[name.slice(0, -4)] = Deno.env.get('DEV')
    ? args => renderFile(dirName + name, args)
    : compileFile(dirName + name)
}
