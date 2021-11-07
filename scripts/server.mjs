import Koa from 'koa'
import Router from 'koa-router'
import koaSend from 'koa-send'
import {extname, join} from 'path'

const server = new Koa()
const router = new Router()

router.get('/:folderOrFile?', async (ctx, next) => {
  const {folderOrFile = ''} = ctx.params

  try {
    await koaSend(ctx, join('refactor', 'web-container-browser', 'dist', extname(folderOrFile) ? folderOrFile : 'index.html'))
  } catch (e) {
    await next()
  }

})

router.get('/:folder/:path*', async (ctx, next) => {
  const {folder, path} = ctx.params

  try {
    await koaSend(ctx, join('refactor', folder, 'dist', path))
  } catch {
    // ok to fail, waterfall goes down to web-portal as a fallback
  }

  try {
    await koaSend(
      ctx,
      join(
        'packages', 'web-portal', 'dist',
        extname(path) ? join(folder, path) : 'index.html'
      )
    )
  } catch (e) {
    await next()
  }

})

server.use(router.routes())

server.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
})

server.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
})

server.listen(8080, () => {
})
