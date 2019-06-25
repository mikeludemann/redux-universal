import React from 'react';
import PropTypes from 'prop-types';

const Counter = ({increment, incrementIfOdd, incrementAsync, decrement, counter}) => (

  <p>
    Time to click: {counter} times
    {' '}
    <button onClick={increment}>+</button>
    {' '}
    <button onClick={decrement}>-</button>
    {' '}
    <button onClick={incrementIfOdd}>Increment - If counter is odd</button>
    {' '}
    <button onClick={() => incrementAsync()}>Asynchronous Increment</button>
  </p>

);

Counter.propTypes = {
  increment: PropTypes.func.isRequired,
  incrementIfOdd: PropTypes.func.isRequired,
  incrementAsync: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired
}

export default Counter;