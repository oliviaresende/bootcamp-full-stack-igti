import React, { Component } from 'react';
import Countries from './components/countries';
import Header from './components/header';

class App extends Component {
  constructor() {
    super();
    this.state = {
      allCountries: [],
      filteredCountries: [],
      filteredPopulation: 0,
      filter: '',
    };
  }
  async componentDidMount() {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const json = await res.json();
    const allCountries = json.map(({ name, numericCode, flag, population }) => {
      return {
        id: numericCode,
        name,
        filterName: name.toLowerCase(),
        flag,
        population,
      };
    });
    const filteredPopulation = this.calculateTotalPopularionFrom(allCountries);

    this.setState({
      allCountries,
      filteredCountries: allCountries,
      filteredPopulation,
    })
  }
  calculateTotalPopularionFrom = (countries) => {
    return countries.reduce((acc, cur) => acc + cur.population, 0);
  }
  handleChangeFilter = (newFilter) => {
    const filteredCountries = this.state.allCountries.filter(country => country.filterName.includes(newFilter.toLowerCase()));
    const filteredPopulation = this.calculateTotalPopularionFrom(filteredCountries);
    this.setState({
      filter: newFilter,
      filteredCountries,
      filteredPopulation,
    });
  };
  render() {
    const { filteredCountries, filter, filteredPopulation } = this.state;
    return (
      <div className="container">
        <h1 style={styles.centeredTitle}>React Countries</h1>
        <Header
          filter={filter}
          onChangeFilter={this.handleChangeFilter}
          countryCount={filteredCountries.length}
          totalPopulation={filteredPopulation}
        />
        <Countries countries={filteredCountries} />
      </div>
    )
  }
}

const styles = {
  centeredTitle: {
    textAlign: 'center',
  },
}

export default App;
