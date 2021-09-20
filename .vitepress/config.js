// @ts-check
require('./genMetadata').watchPosts()

/**
 * @type {import('vitepress').UserConfig}
 */
module.exports = {
  title: 'A Machine Learning blog',
  description: 'The offical Machine Learning blog by ngctnnnn',
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
