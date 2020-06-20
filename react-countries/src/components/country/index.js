import React, { Component } from 'react';
import css from './country.module.css';

class Country extends Component {
  render() {
    const { country } = this.props;
    return (
      <div className={css.border}>
        <img className={css.image} src={country.flag} alt={country.name} />
        <span>{country.name}</span>
      </div>
    )
  }
}

export default Country;