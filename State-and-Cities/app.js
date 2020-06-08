import { promises } from "fs";

const fs = promises;

const statesUF = ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO']

// Implementar um método que irá criar um arquivo JSON para cada estado representado no arquivo Estados.json, e o seu conteúdo será um array das cidades pertencentes aquele estado, de acordo com o arquivo Cidades.json. O nome do arquivo deve ser o UF do estado, por exemplo: MG.json.
const statesWithCities = async () => {
  const states = JSON.parse(await fs.readFile('./datas/states.json', "utf8"))
  const cities = JSON.parse(await fs.readFile('./datas/cities.json', "utf8"))
  states.map(state => {
    const data = cities.filter(city => city.Estado === state.ID)
    fs.writeFile(`./states/${state.Sigla}.json`, JSON.stringify(data))
  })
}
// Criar um método que recebe como parâmetro o UF do estado, realize a leitura do arquivo JSON correspondente e retorne a quantidade de cidades daquele estado.
const statesCountCities = async () => {
  const countCities = async (uf) => {
    const data = JSON.parse(await fs.readFile(`./states/${uf}.json`, "utf8"))
    return data.length
  }
  const statesLength = await Promise.all(statesUF.map(async state => {
    const count = await countCities(state)
    return ({
      'UF': state,
      'numCities': count
    })
  }))
  return statesLength
}

// Criar um método que imprima no console um array com o UF dos cinco estados que mais possuem cidades, seguidos da quantidade, em ordem decrescente. Utilize o método criado no tópico anterior. Exemplo de impressão: [“UF - 93”, “UF - 82”, “UF - 74”, “UF - 72”, “UF - 65”]
const fiveMore = (statesLength) => {
  statesLength.sort((a, b) => {
    if (a.numCities < b.numCities) {
      return 1;
    }
    if (a.numCities > b.numCities) {
      return -1;
    }
    return 0;
  })

  let i = 0
  const result = []

  while (i < 5) {
    result.push(`${statesLength[i].UF} - ${statesLength[i].numCities}`)
    i = i + 1
  }

  return (result)
}

// Criar um método que imprima no console um array com o UF dos cinco estados que menos possuem cidades, seguidos da quantidade, em ordem decrescente. Utilize o método criado no tópico anterior. Exemplo de impressão: [“UF - 30”, “UF - 27”, “UF - 25”, “UF - 23”, “UF - 21”]
const fiveLess = (statesLength) => {
  statesLength.sort((a, b) => {
    if (a.numCities > b.numCities) {
      return 1;
    }
    if (a.numCities < b.numCities) {
      return -1;
    }
    return 0;
  })

  let i = 0
  const result = []

  while (i < 5) {
    result.push(`${statesLength[i].UF} - ${statesLength[i].numCities}`)
    i = i + 1
  }

  return (result.reverse())
}

// Criar um método que imprima no console um array com a cidade de maior nome de cada estado, seguida de seu UF. Em caso de empate, considerar a ordem alfabética para ordená-los e então retornar o primeiro. Por exemplo: [“Nome da Cidade – UF”, “Nome da Cidade – UF”, ...].
const biggestName = async () => {
  const biggestNameByUF = async (uf) => {
    const data = JSON.parse(await fs.readFile(`./states/${uf}.json`, "utf8"))
    data
      .sort((a, b) => a.Nome.localeCompare(b.Nome))
      .sort((a, b) => b.Nome.length - a.Nome.length);
    return ({ Sigla: uf, Nome: data[0].Nome })
  }
  const names = await Promise.all(statesUF.map(async state => await biggestNameByUF(state)))
  return (names)
}

// Criar um método que imprima no console um array com a cidade de menor nome de cada estado, seguida de seu UF. Em caso de empate, considerar a ordem alfabética para ordená-los e então retorne o primeiro. Por exemplo: [“Nome da Cidade – UF”, “Nome da Cidade – UF”, ...].
const smallestName = async () => {
  const smallestNameByUF = async (uf) => {
    const data = JSON.parse(await fs.readFile(`./states/${uf}.json`, "utf8"))
    data
      .sort((a, b) => a.Nome.localeCompare(b.Nome))
      .sort((a, b) => a.Nome.length - b.Nome.length);
    return ({ Sigla: uf, Nome: data[0].Nome })
  }
  const names = await Promise.all(statesUF.map(async state => await smallestNameByUF(state)))
  return (names)
}

// Criar um método que imprima no console a cidade de maior nome entre todos os estados, seguido do seu UF. Em caso de empate, considerar a ordem alfabética para ordená-los e então retornar o primeiro. Exemplo: “Nome da Cidade - UF".
const biggestNameCity = (biggest) => {
  return (biggest.sort((a, b) => a.Nome.localeCompare(b.Nome)).sort((a, b) => b.Nome.length - a.Nome.length)[0])
}

// Criar um método que imprima no console a cidade de menor nome entre todos os estados, seguido do seu UF. Em caso de empate, considerar a ordem alfabética para ordená-los e então retornar o primeiro. Exemplo: “Nome da Cidade - UF".
const smallestNameCity = (smallest) => {
  return (smallest.sort((a, b) => a.Nome.localeCompare(b.Nome)).sort((a, b) => a.Nome.length - b.Nome.length)[0])
}

statesWithCities().then(async () => {
  const statesLength = await statesCountCities()
  const more = fiveMore(statesLength)
  console.log(more)
  const less = fiveLess(statesLength)
  console.log(less)
  const biggest = await biggestName()
  console.log(biggest.map(x => `${x.Nome} - ${x.Sigla}`))
  const smallest = await smallestName()
  console.log(smallest.map(x => `${x.Nome} - ${x.Sigla}`))
  const biggestN = biggestNameCity(biggest)
  console.log(`${biggestN.Nome} - ${biggestN.Sigla}`)
  const smallestN = smallestNameCity(smallest)
  console.log(`${smallestN.Nome} - ${smallestN.Sigla}`)
})