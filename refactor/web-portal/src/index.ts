import Vue from 'vue'

export const run = async (): Promise<void> => {
  const { sayAndComponent } = await import('./lazy')

  new Vue({
    el: '#portal',
    render: (h) => sayAndComponent('WOOP', h)
  })
}
