import React from 'react'
import './Results.scss'

const Results = ({ votes }) => {
  const votesArray = votes.map(vote => +vote.value)

  const min = Math.min(...votesArray)
  const max = Math.max(...votesArray)

  let indexMin = votesArray.findIndex(value => value === min)
  let indexMax = votesArray.findIndex(value => value === max)

  let total = votesArray.reduce((a, b) => +a + +b, 0) - min - max

  let average = total / (votesArray.length - 2) || 0

  console.log(total, average)

  return (
    <div className='results'>
      <h5 className='results__title'>Results</h5>
      <ul className='results__list'>
        {votes.map((vote, i) => (
          <li key={vote.email} className='results__list-item'>
            {i === indexMin || i === indexMax ? (
              <strike className='results__list-item-name'>
                {vote.email}: {vote.value}
              </strike>
            ) : (
              <span className='results__list-item-name'>
                {vote.email}: {vote.value}
              </span>
            )}
          </li>
        ))}
      </ul>
      <h1 className='results__total'>Total: {total} </h1>
      <h1 className='results__average'>Average: {average.toFixed(2)} </h1>
    </div>
  )
}

export default Results
