// @ts-check
require('./genMetadata').watchPosts()

/**
 * @type {import('vitepress').UserConfig}
 */
module.exports = {
  title: 'A technical blog',
  description: 'The official blog',
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  ],
  // markdown: {
  //   config: (md) => {
  //     md.use(require('markdown-it-katex'))
  //     md.render = function () {
  //       return md
  //         .render
  //         .apply(this, arguments)
  //         .replace(/<span class="katex">/g, '<span v-pre class="katex">')
  //     }
  //   },
  // },
}