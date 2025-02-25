import './Not.css'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    var navigate = useNavigate()
  return (
    <div className='notfound'>
      <h1>404 Page Not Found</h1>
      <li onClick={()=>{
        navigate('/Login')
      }}>Return To Login </li>
    </div>
  )
}

export { NotFound}
