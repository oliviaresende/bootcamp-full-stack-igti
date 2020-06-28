import React from 'react';

const STARS = {
  empty: '☆',
  full: '★',
};

const MAX_STARS = 10;

const Popularity = ({ value }) => {
  const fullStars = STARS.full.repeat(value);
  const emptyStars = STARS.empty.repeat(MAX_STARS - value);

  return (
    <div className="yellow-text">
      {fullStars}
      {emptyStars}
    </div>
  );
}

export default Popularity;