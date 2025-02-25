import './Header.css'
import { useNavigate,Link } from 'react-router-dom';

const Header = () => {
    var navigate = useNavigate();
  return (
    <div>
      <div className='navbar'>
                <ul>
                    <li><Link to={'/Dashboard'}>Home</Link></li>
                    <li><Link to={'/Dashboard/Addpassword'}>Passwords</Link></li>
                    <li><a onClick={async()=>{
                        await localStorage.removeItem('Userid');
                        navigate('/Login');
                        
                    }}>Logout</a></li>
                </ul>
            </div>
    </div>
  )
}

export {Header}
