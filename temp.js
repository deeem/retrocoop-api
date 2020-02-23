const obj = {
  pack1: [
    { name: 'theme1', cat: 'pack1' },
    { name: 'theme2', cat: 'pack1' },
    { name: 'theme3', cat: 'pack1' }
  ],
  pack2: [
    { name: 'theme1', cat: 'pack2' },
    { name: 'theme2', cat: 'pack2' },
    { name: 'theme3', cat: 'pack2' }
  ],
  pack3: [
    { name: 'theme1', cat: 'pack3' },
    { name: 'theme2', cat: 'pack3' },
    { name: 'theme3', cat: 'pack3' }
  ],
  pack4: [
    { name: 'theme1', cat: 'pack4' },
    { name: 'theme2', cat: 'pack4' },
    { name: 'theme3', cat: 'pack4' }
  ],
  pack5: [
    { name: 'theme1', cat: 'pack5' },
    { name: 'theme2', cat: 'pack5' },
    { name: 'theme3', cat: 'pack5' }
  ],
  pack6: [
    { name: 'theme1', cat: 'pack6' },
    { name: 'theme2', cat: 'pack6' },
    { name: 'theme3', cat: 'pack6' }
  ],
  pack7: [
    { name: 'theme1', cat: 'pack7' },
    { name: 'theme2', cat: 'pack7' },
    { name: 'theme3', cat: 'pack7' }
  ]
}

function* makeThemeGenerator() {
  const themes = Object.keys(obj)

  for (theme in themes) {
    yield obj[themes[theme]]
  }
}

const g = makeThemeGenerator();
console.log(...g)
