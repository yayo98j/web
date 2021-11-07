import Vue from 'vue'

export const run = async (): Promise<void> => {
  new Vue({
    el: '#wait',
    render: (createElement) => createElement('h1', 'WAIT FOR IT!!!')
  })

  await new Promise((resolve) => setTimeout(resolve, 2500))

  const { sayAndComponent } = await import('./lazy')
  new Vue({
    el: '#portal',
    render: (createElement) => sayAndComponent('here it is', createElement)
  })
}
