import React, { Component } from 'react'
import { formatNumber } from '../../helpers/formatHelpers';
import css from './header.module.css';

class Header extends Component {
  handleInputChange = (event) => {
    const newText = event.target.value;
    this.props.onChangeFilter(newText);
  }
  render() {
    const { filter, countryCount, totalPopulation } = this.props;
    return (
      <div className={css.flexRow}>
        <input
          type="text"
          value={filter}
          onChange={this.handleInputChange}
          placeholder="Filtro"
        />
        |
        <span className={css.country}>
          Países: <strong>{countryCount}</strong> {" "}
        </span> {" "}
        |
        <span className={css.population}>
          População: <strong>{formatNumber(totalPopulation)}</strong>{" "}
        </span>
      </div>
    )
  }
}

export default Header;