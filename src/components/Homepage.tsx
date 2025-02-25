import './Home.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Header } from './Other/Header';
import { Footer } from './Other/Footer';
import {Check_is_Valid} from './Methods/IsValid'


const Homepage = () => {
    var navigate = useNavigate();


      useEffect(()=>{
    
        var Checkuserid:string | null = localStorage.getItem('Userid');
        if(Checkuserid != null){
          async function Check_isvalid(){

            var CheckValid = await Check_is_Valid(Checkuserid);
            if(CheckValid!=true){
              await localStorage.removeItem('Userid');
              navigate('/Login');
            }
          } 

          Check_isvalid();

        }else{
          localStorage.removeItem('Userid');
          navigate('/Login');
        }
        
    
      },[])


    return (
        <>
        <Header/>
            <div className='home'>
                

               
            </div>

            <Footer/>
        </>
    )
}

export{Homepage}
