import './AddCard.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Header } from './Other/Header';
import { Footer } from './Other/Footer';
import { Check_is_Valid } from './Methods/IsValid'; 


import axios from 'axios';

const AddCard = () => {
    var navigate = useNavigate();
    var [card, Setcard] = useState('');


    async function OncardSubmit() {
        await axios.post("", { cardnumber: card })
            .then((res) => {
                console.log(res);
                if (res.status == 200) {
                    Setcard('');
                }
            })
            .catch((err) => {
                console.log(err);

            })
    }


    useEffect(() => {

        var Checkuserid: string | null = localStorage.getItem('Userid');
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


    }, [])

    return (
        <div>
            <Header />

            <section className='card'>

                <h3>Add Card Details</h3>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    OncardSubmit();
                }}>

                    <input type='text' placeholder='Enter the Card Number' value={card} onChange={(e) => {
                        Setcard(e.target.value);
                    }}></input>

                    <input type='month'></input>

                    <button>Add card</button>
                </form>

                <div className='carddiv'>

                <section className='card_box'>

                    <h3>12345678901234567890</h3>
                    <section className='card_function'>
                        <li>12/25</li>
                        <i><FontAwesomeIcon className='methods_img' icon={faCopy}></FontAwesomeIcon></i>
                        <i><FontAwesomeIcon className='methods_img' icon={faTrashCan}></FontAwesomeIcon></i>
                    </section>

                </section>



                </div>
                
            </section>

            <Footer />

        </div>
    )
}

export { AddCard }
