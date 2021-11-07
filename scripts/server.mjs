import Koa from 'koa'
import Router from 'koa-router'
import koaSend from 'koa-send'
import {join} from 'path'

const server = new Koa()
const router = new Router()

router.get('/(.*)', async (ctx, next) => {
  await koaSend(ctx, join('dist', ctx.url === '/' ? 'index.html' : ctx.url))
  await next()
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

server.listen(8080, () => {})
