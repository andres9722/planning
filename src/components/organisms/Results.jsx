import React from 'react'
import './Results.scss'

const Results = ({ votes }) => {
  let total = votes
    .map(vote => vote.value)
    .reduce((a, b) => Number(a) + Number(b), 0)

  let average = total / votes.length || 0

  return (
    <div className='results'>
      <h5 className='results__title'>Results</h5>
      <ul className='results__list'>
        {votes.map(vote => (
          <li key={vote.email} className='results__list-item'>
            <span className='results__list-item-name'>
              {vote.email} : <b>{vote.value}</b>
            </span>
          </li>
        ))}
      </ul>
      <h1 className='results__total'>Total: {total} </h1>
      <h1 className='results__average'>Average: {average.toFixed(2)} </h1>
    </div>
  )
}

export default Results
