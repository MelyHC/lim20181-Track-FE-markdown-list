const mdLinks = ('../main.js')

it('deberia ser una promesa que reulelva en un array de objetos', done => {
  const options = {
    validate: false,
    stats = false
  };
  mdLinks('./README-test.md', options).then(arrLinks => {
    expect(arrLinks).toEqual([{
      href: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'Markdown',
      file: 'C:\\Users\\Mely\\Documents\\lim20181-Track-FE-markdown-list\\README-test.md'
    },
    {
      href: 'https://nodejs.org/en/',
      text: 'Node.js',
      file: 'C:\\Users\\Mely\\Documents\\lim20181-Track-FE-markdown-list\\README-test.md'
    },
    {
      href: 'https://semver.org/',
      text: 'Semver',
      file: 'C:\\Users\\Mely\\Documents\\lim20181-Track-FE-markdown-list\\README-test.md'
    },
    {
      href: 'https://nodejs.org/api/path.html',
      text: 'Path',
      file: 'C:\\Users\\Mely\\Documents\\lim20181-Track-FE-markdown-list\\README-test.md'
    },
    {
      href: 'https://github.com/markedjs/marked',
      text: 'marked',
      file: 'C:\\Users\\Mely\\Documents\\lim20181-Track-FE-markdown-list\\README-test.md'
    },
    {
      href: 'https://carlosazaustre.com/manejando-la-asincronia-en-javascript/',
      text: 'Asíncronía en js',
      file: 'C:\\Users\\Mely\\Documents\\lim20181-Track-FE-markdown-list\\README-test.md'
    },
    {
      href: 'https://nodejs.org/en/',
      text: 'Node.js',
      file: 'C:\\Users\\Mely\\Documents\\lim20181-Track-FE-markdown-list\\README-test.md'
    },
    {
      href: 'https://nodejs.org/en/',
      text: 'Node.js',
      file: 'C:\\Users\\Mely\\Documents\\lim20181-Track-FE-markdown-list\\README-test.md'
    }])
    done();
  })
})