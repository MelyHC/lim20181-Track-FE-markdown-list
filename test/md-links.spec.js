const mdLinks = require('../index.js')

const options = {
  validate: undefined,
  stats: undefined
};

test('deberia ser array de objetos', () => {
  jest.setTimeout(12000)

  return mdLinks('./test', options)
    .then(arrLinks => {
      expect(arrLinks).toEqual([{
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:\\Users\\MelyHC\\Documents\\Lab\\lim20181-Track-FE-markdown-list\\test\\README-test.md'
      },
      {
        href: 'https://nodejs.org/en/',
        text: 'Node.js',
        file: 'C:\\Users\\MelyHC\\Documents\\Lab\\lim20181-Track-FE-markdown-list\\test\\README-test.md'
      },
      {
        href: 'https://semver.org/',
        text: 'Semver',
        file: 'C:\\Users\\MelyHC\\Documents\\Lab\\lim20181-Track-FE-markdown-list\\test\\README-test.md'
      },
      {
        href: 'https://nodejs.org/api/path.html',
        text: 'Path',
        file: 'C:\\Users\\MelyHC\\Documents\\Lab\\lim20181-Track-FE-markdown-list\\test\\README-test.md'
      },
      {
        href: 'https://github.com/markedjs/marked',
        text: 'marked',
        file: 'C:\\Users\\MelyHC\\Documents\\Lab\\lim20181-Track-FE-markdown-list\\test\\README-test.md'
      },
      {
        href: 'https://carlosazaustre.com/manejando-la-asincronia-en-javascript/',
        text: 'Asíncronía en js',
        file: 'C:\\Users\\MelyHC\\Documents\\Lab\\lim20181-Track-FE-markdown-list\\test\\README-test.md'
      },
      {
        href: 'https://nodejs.org/en/',
        text: 'Node.js',
        file: 'C:\\Users\\MelyHC\\Documents\\Lab\\lim20181-Track-FE-markdown-list\\test\\README-test.md'
      },
      {
        href: 'https://nodejs.org/en/',
        text: 'Node.js',
        file: 'C:\\Users\\MelyHC\\Documents\\Lab\\lim20181-Track-FE-markdown-list\\test\\README-test.md'
      }])
    })
})

test('mdLinks --stast deberia retornar los stast de los links', () => {
  jest.setTimeout(12000)

  options.stats = true

  return mdLinks('./test', options)
    .then(arrLinks => {
      expect(arrLinks).toEqual('Total: 8 \nUnique: 6')
    })
})

