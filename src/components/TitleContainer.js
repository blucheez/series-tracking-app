import bg from '../assets/bg.jpg'

function TitleContainer() {
  return (
    <div
      className='d-flex justify-content-center align-items-center h-100'
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.50), rgba(0, 0, 0, 0.80)), url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='text-white display-2 w-50 text-center'>
        Track your TV shows easily with this web app.
      </div>
    </div>
  )
}
export default TitleContainer
