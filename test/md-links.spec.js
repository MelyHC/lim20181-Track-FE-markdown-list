const mdLinks = require('../index.js')

const options = {
  validate: undefined,
  stats: undefined
};

test('deberia ser array de objetos', () => {
  // jest.setTimeout(12000)

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
      },
      {
        href: 'https://nodejs.org/en/asdeasd',
        text: 'Link roto 1',
        file: 'C:\\Users\\MelyHC\\Documents\\Lab\\lim20181-Track-FE-markdown-list\\test\\README-test.md'
      },
      {
        href: 'https://semver.org/retayre',
        text: 'Link roto 2',
        file: 'C:\\Users\\MelyHC\\Documents\\Lab\\lim20181-Track-FE-markdown-list\\test\\README-test.md'
      },
      {
        href: 'https://nodejs.org/api/asdeasd',
        text: 'Link roto 3',
        file: 'C:\\Users\\MelyHC\\Documents\\Lab\\lim20181-Track-FE-markdown-list\\test\\README-test.md'
      }])
    })
})

test('mdLinks --stast deberia retornar los stast de los links', () => {
  // jest.setTimeout(12000)

  options.stats = true

  return mdLinks('./test', options)
    .then(arrLinks => {
      expect(arrLinks).toEqual({ Total: 11, Unique: 9 })
    })
})

test('mdLinks --validate deberia retornar los links con su status', () => {
  jest.setTimeout(15000)

  options.stats = false
  options.validate = true

  return mdLinks('./test', options)
    .then(arrLinks => {
      expect(arrLinks).toEqual([{
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:\\Users\\MelyHC\\Documents\\Lab\\lim20181-Track-FE-markdown-list\\test\\README-test.md',
        status: 200,
        statusText: 'OK'
      },
      {
        href: 'https://nodejs.org/en/',
        text: 'Node.js',
        file: 'C:\\Users\\MelyHC\\Documents\\Lab\\lim20181-Track-FE-markdown-list\\test\\README-test.md',
        status: 200,
        statusText: 'OK'
      },
      {
        href: 'https://semver.org/',
        text: 'Semver',
        file: 'C:\\Users\\MelyHC\\Documents\\Lab\\lim20181-Track-FE-markdown-list\\test\\README-test.md',
        status: 200,
        statusText: 'OK'
      },
      {
        href: 'https://nodejs.org/api/path.html',
        text: 'Path',
        file: 'C:\\Users\\MelyHC\\Documents\\Lab\\lim20181-Track-FE-markdown-list\\test\\README-test.md',
        status: 200,
        statusText: 'OK'
      },
      {
        href: 'https://github.com/markedjs/marked',
        text: 'marked',
        file: 'C:\\Users\\MelyHC\\Documents\\Lab\\lim20181-Track-FE-markdown-list\\test\\README-test.md',
        status: 200,
        statusText: 'OK'
      },
      {
        href: 'https://carlosazaustre.com/manejando-la-asincronia-en-javascript/',
        text: 'Asíncronía en js',
        file: 'C:\\Users\\MelyHC\\Documents\\Lab\\lim20181-Track-FE-markdown-list\\test\\README-test.md',
        status: 200,
        statusText: 'OK'
      },
      {
        href: 'https://nodejs.org/en/',
        text: 'Node.js',
        file: 'C:\\Users\\MelyHC\\Documents\\Lab\\lim20181-Track-FE-markdown-list\\test\\README-test.md',
        status: 200,
        statusText: 'OK'
      },
      {
        href: 'https://nodejs.org/en/',
        text: 'Node.js',
        file: 'C:\\Users\\MelyHC\\Documents\\Lab\\lim20181-Track-FE-markdown-list\\test\\README-test.md',
        status: 200,
        statusText: 'OK'
      },
      {
        href: 'https://nodejs.org/en/asdeasd',
        text: 'Link roto 1',
        file: 'C:\\Users\\MelyHC\\Documents\\Lab\\lim20181-Track-FE-markdown-list\\test\\README-test.md',
        status: 404,
        statusText: 'Not Found'
      },
      {
        href: 'https://semver.org/retayre',
        text: 'Link roto 2',
        file: 'C:\\Users\\MelyHC\\Documents\\Lab\\lim20181-Track-FE-markdown-list\\test\\README-test.md',
        status: 404,
        statusText: 'Not Found'
      },
      {
        href: 'https://nodejs.org/api/asdeasd',
        text: 'Link roto 3',
        file: 'C:\\Users\\MelyHC\\Documents\\Lab\\lim20181-Track-FE-markdown-list\\test\\README-test.md',
        status: 404,
        statusText: 'Not Found'
      }])
    })
})

test('mdLinks --validate --stats deberia retornar la cantidad de link, los links unicos y los rotos', () => {
  //jest.setTimeout(20000)

  options.stats = true
  options.validate = true

  return mdLinks('./test', options)
    .then(arrLinks => {
      expect(arrLinks).toEqual({ Total: 11, Unique: 9, Broken: 3 })
    })
})

test('mdLinks al colocar una ruta no existente deberia mostrarte un mensaje', () => {

  return mdLinks('./testeo', options)
    .then(arrLinks => {
      expect(arrLinks).toEqual('La ruta colocada no se encuentra C:\\Users\\MelyHC\\Documents\\Lab\\lim20181-Track-FE-markdown-list\\testeo')
    })
})

test('mdLinks si no se encontraron links deberia retornar un mensaje', () => {

  return mdLinks('./test/README-test2.md', options)
    .then(arrLinks => {
      expect(arrLinks).toEqual('Tu archivo o carpeta no tiene links')
    })
})
