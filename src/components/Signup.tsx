import './Login.css'

import axios from "axios";

import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react';

import { Flash } from './Other/Flash'
import { Check_is_Valid } from './Methods/IsValid';


const Signup = () => {

  var navigate = useNavigate();

  var [Username, SetUsername] = useState('');
  var [Email, SetEmail] = useState('');
  var [MNumber, SetMNumber] = useState('');
  var [Password, SetPassword] = useState('');

  var [Flashmes, SetFlashmes] = useState(false);
  var [flashmessage, Setflashmessage] = useState({ text: '', color: '', bgcolor: '' });



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
        // navigate('/Login');
      }
      
  
    },[])


  async function Signup(Username: string, Number: string, Email: string, Password: string) {

    var Convertnum = parseInt(Number);

    axios.post(import.meta.env.VITE_SIGNUP_ROUTE, { Username: Username, Number: Convertnum, Email: Email, Password: Password })

      .then((res) => {
        if (res.status == 200) {
          SetUsername('');
          SetEmail('');
          SetMNumber('');
          SetPassword('');

          SetFlashmes(true);
          Setflashmessage({ text: 'Account Created', color: '#92fa7f', bgcolor: '#9fff9347' })

          setInterval(() => {
            SetFlashmes(false);
            Setflashmessage({ text: '', color: '', bgcolor: '' })
            navigate('/Dashboard')
          }, 5000);

          localStorage.setItem("Userid", res.data)

        }

        else {
          console.log(res.data);
          SetFlashmes(true);
          Setflashmessage({ text: res.data, color: '#fa7f7f', bgcolor: '#ff939347' })

          setInterval(() => {
            SetFlashmes(false);
            Setflashmessage({ text: '', color: '', bgcolor: '' })
          }, 5000);
        }

      })

      .catch((err) => {
        console.log(err.response.data);
        SetFlashmes(true);
        Setflashmessage({ text: err.response.data, color: '#fa7f7f', bgcolor: '#ff939347' })

        setInterval(() => {
          SetFlashmes(false);
          Setflashmessage({ text: '', color: '', bgcolor: '' })
        }, 5000);
      })

  }



  return (
    <>
      {Flashmes ? (<><Flash text={flashmessage.text} color={flashmessage.color} bgcolor={flashmessage.bgcolor} /></>) : ('')}


      <div className='Logindiv'>
        <form className='SignupForm' onSubmit={(e) => {
          e.preventDefault();

          if (Username && Email && MNumber && Password != '') {
            Signup(Username, MNumber, Email, Password);
          }

        }}>

          <h3>Signup Now</h3>

          <input type='text' placeholder='Create Username .' value={Username} onChange={(e) => { SetUsername(e.target.value) }} />
          <input type='text' placeholder='Enter Email .' value={Email} onChange={(e) => { SetEmail(e.target.value) }} />
          <input type='text' placeholder='Enter Mobile Number .' value={MNumber} onChange={(e) => { SetMNumber(e.target.value) }} />
          {/* Convert text to number  */}
          <input type="Password" placeholder='Enter Password .' value={Password} onChange={(e) => { SetPassword(e.target.value) }} />

          <button type='submit'>
            Signup Now
          </button>

          <li onClick={() => {
            navigate('/Login');
          }}>
            Login Now
          </li>

        </form>
      </div>

    </>
  )
}

export { Signup }
