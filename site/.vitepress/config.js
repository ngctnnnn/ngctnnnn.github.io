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
  ]
}