import React, { Component } from 'react'
import Country from '../country';
import css from './countries.module.css'

class Countries extends Component {
  render() {
    const { countries } = this.props;
    return (
      <div className={`${css.border} ${css.flexRow}`}>
        {countries.map((country) =>
          <Country country={country} />
        )}
      </div>
    )
  }
}

export default Countries;