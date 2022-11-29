import missing from '../assets/missing.jpg'

function SeriesCard(props) {
  const { name, premiered, image, genres, rating, externals, ended } =
    props.data

  const imdbURL = `https://www.imdb.com/title/${externals.imdb}`

  return (
    <div className='m-3'>
      <div
        className='card'
        style={{ width: '13rem', backgroundColor: '#222529' }}
      >
        <img src={image ? image.medium : missing} className='card-img-top' alt={name} />
        <div className='card-body'>
          <h5 className='card-title'>{name}</h5>
          <p className='card-title'>{premiered && premiered.slice(0, 4)}</p>
          <p className='card-text'>
            <small className='text-muted'>{genres && genres.join(', ')}</small>
          </p>
        </div>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item bg-transparent text-white'>
            {rating && rating.average !== null ? (
              <>
                <div>Average rating: {rating.average}</div>
                <div className='progress mt-1' style={{ height: '5px' }}>
                  <div
                    className='progress-bar bg-info progress-bar-striped'
                    role='progressbar'
                    aria-label='Rating bar'
                    style={{ width: `${rating.average * 10}%` }}
                    aria-valuenow={rating.average * 10}
                    aria-valuemin='0'
                    aria-valuemax='100'
                  ></div>
                </div>
              </>
            ) : (
              'No rating'
            )}
          </li>
          <li className='list-group-item bg-transparent text-white'>
            IMDb:{' '}
            {externals.imdb ? (
              <a
                href={imdbURL}
                target='_blank'
                rel='noreferrer'
                className='btn btn-outline-warning btn-sm ms-1'
              >
                link
              </a>
            ) : (
              <span className='btn btn-outline-light btn-sm ms-1' disabled>
                not available
              </span>
            )}
          </li>
          <li className='list-group-item bg-transparent text-white'>
            Status: {ended ? <div>Ended: {ended}</div> : 'Running'}
          </li>
        </ul>
        <div className='card-body text-center'>
          <button className='btn btn-success'>Add to watchlist</button>
        </div>
      </div>
    </div>
  )
}

export default SeriesCard
