import './Login.css'

import axios from "axios";
var Login_Route = import.meta.env.VITE_LOGIN_ROUTE

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {Flash} from './Other/Flash'
import { Check_is_Valid } from './Methods/IsValid';



const Login = () => {
  var navigate = useNavigate();

  var [Username, SetUsername] = useState('');
  var [Password, SetPassword] = useState('');
  
  var [Flashmes, SetFlashmes] = useState(false);
  var [flashmessage,Setflashmessage] = useState({text:'',color:'',bgcolor:''})


  useEffect(()=>{

    var Checkuserid:string | null = localStorage.getItem('Userid');
    if(Checkuserid != null){
      async function Check_isvalid(){

        var CheckValid = await Check_is_Valid(Checkuserid);
        if(CheckValid!=true){
          await localStorage.removeItem('Userid');
          navigate('/Login');
        }else{
          navigate('/Dashboard')
        }
      } 

      Check_isvalid();

    }else{
      localStorage.removeItem('Userid');
      navigate('/Login');
    }

  },[])


  async function LoginRoute(Username: string, Password: string) {


    await axios.post(`${Login_Route}`, { Username: Username, Password: Password })

      .then((res) => {
        if(res.status == 200){
          SetUsername('');
          SetPassword('');
          localStorage.setItem("Userid",res.data);
          navigate('/Dashboard');

        }else{
          console.log(res.data);
          SetFlashmes(true);
          Setflashmessage({text:res.data,color:'#fa7f7f',bgcolor:'#ff939347'})

          setInterval(() => {
            SetFlashmes(false);
            Setflashmessage({text:'',color:'',bgcolor:''})
          }, 5000);
        }

      })

      .catch((err) => {
        console.log(err.response.data);
        SetFlashmes(true);
        Setflashmessage({text:err.response.data,color:'#fa7f7f',bgcolor:'#ff939347'})

        setInterval(() => {
          SetFlashmes(false);
          Setflashmessage({text:'',color:'',bgcolor:''})
        }, 5000);
      })

  }


  return (
    <>
    {Flashmes ? (<><Flash text= {flashmessage.text} color={flashmessage.color} bgcolor={flashmessage.bgcolor}/></>) : ('')}
    <div className='Logindiv'>
      <form className='LoginForm' onSubmit={async (e) => {
        e.preventDefault();

        if (Username && Password != '') {
          LoginRoute(Username,Password);

        }


      }}>

        <h3>Login Now</h3>

        <input type='text' placeholder='Enter Username or Email .' value={Username} onChange={(e) => {
          SetUsername(e.target.value);
        }} />

        <input type="Password" placeholder='Enter Password .' value={Password} onChange={(e) => {
          SetPassword(e.target.value);
        }} />

        <button type='submit'>
          Login Now
        </button>

        <li onClick={() => {
          navigate('/Signup');
        }}>
          Signup Now
        </li>

      </form>
    </div>
    </>
  )
}

export { Login }
