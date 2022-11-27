import { FaLinkedin, FaGithubSquare } from 'react-icons/fa'

function Footer() {
  return (
    <footer className='navbar navbar-dark bg-dark'>
      <div className='container-fluid'>
        <div className='text-white display-6 fs-6'>
          Created by István Petre{' '}
          <a
            href='https://www.linkedin.com/in/istvan-petre/'
            target='_blank'
            rel='noreferrer'
          >
            <FaLinkedin className='text-white fs-4 ms-2' />
          </a>
          <a
            href='https://github.com/blucheez'
            target='_blank'
            rel='noreferrer'
          >
            <FaGithubSquare className='text-white fs-4 ms-2' />
          </a>
        </div>
      </div>
    </footer>
  )
}
export default Footer
