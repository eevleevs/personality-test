import 'https://deno.land/x/dotenv@v3.2.0/load.ts'
import {
  compileFile,
  LocalsObject,
  Options,
  renderFile,
} from 'https://deno.land/x/pug@v0.1.3/mod.ts'

const dirName = './templates/'

export default Object.fromEntries(
  Array.from(Deno.readDirSync(dirName))
    .filter(f => f.name.endsWith('.pug'))
    .map(f => [
      f.name.slice(0, -4),
      Deno.env.get('DEV')
        ? (args: Options & LocalsObject) => renderFile(dirName + f.name, args)
        : compileFile(dirName + f.name),
    ])
)
