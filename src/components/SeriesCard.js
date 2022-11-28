/* import { useState } from 'react' */

function SeriesCard(props) {
  const { name, premiered, image, genres } = props.data
  return (
    <div className='m-3'>
      <div
        className='card'
        style={{ width: '13rem', backgroundColor: '#222529' }}
      >
        <img src={image && image.medium} className='card-img-top' alt={name} />
        <div className='card-body'>
          <h5 className='card-title'>{name}</h5>
          <p className='card-title'>{premiered && premiered.slice(0, 4)}</p>
          <p className='card-text'>
            <small className='text-muted'>
              {genres && genres.join(', ')}
            </small>
          </p>
        </div>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item bg-transparent text-white'>An item</li>
          <li className='list-group-item bg-transparent text-white'>
            A second item
          </li>
          <li className='list-group-item bg-transparent text-white'>
            A third item
          </li>
        </ul>
        <div className='card-body'>
          <a href='/' className='card-link'>
            Card link
          </a>
          <a href='/' className='card-link'>
            Another link
          </a>
        </div>
      </div>
    </div>
  )
}

export default SeriesCard
