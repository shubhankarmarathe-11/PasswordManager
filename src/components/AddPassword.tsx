import './AddPassword.css'

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { Header } from './Other/Header';
import { Footer } from './Other/Footer';
import { copyText } from './Methods/CopyMethod'
import { Check_is_Valid } from './Methods/IsValid';
import { DecodeData } from './Methods/Decode_Id';
import { RemovePass } from './Methods/Removepassword';
import { AddNewPassword } from './Methods/AddPassword';

import { Flash } from './Other/Flash';


type DecodedData = {
    Password: string;
    Username: string;
    Website: string;
    iat: number;
}


const AddPassword = () => {


    var navigate = useNavigate();

    var [url, Seturl] = useState('');
    var [Username, SetUsername] = useState('');
    var [Password, SetPassword] = useState('');

    var [Flashmes, SetFlashmes] = useState(false);
    var [flashmessage, Setflashmessage] = useState({ text: '', color: '', bgcolor: '' })

    var [FetchedData, SetFetchedData] = useState<{ _id: string, Userid: string, WebsiteCredentials: DecodedData }[]>([]);

    var [UserData, SetUserData] = useState<{ _id: string, Userid: string, WebsiteCredentials: DecodedData }[]>([]); // Type script error [] this indicate array of type never[] we should design it explicitly

    var [Change, SetChange] = useState(false);


    useEffect(() => {
        async function getdata() {

            SetFetchedData(await DecodeData());
        }

        getdata();

    }, [Change])


    useEffect(() => {

        setTimeout(() => {

            SetUserData(FetchedData)
        }, 1000)

    }, [Change, FetchedData])


// When you use function which is imported from the different file you have to use to state variables 

// one is for the fetching data 

// second for displaying fetched data with some delay 

// the delay is necessary beacuse react nature is to render directly which results we can't get data directly.


    useEffect(() => {

        var Checkuserid: string | null = localStorage.getItem('Userid');
        if (Checkuserid != null) {
            async function Check_isvalid() {

                var CheckValid = await Check_is_Valid(Checkuserid);
                if (CheckValid != true) {
                    await localStorage.removeItem('Userid');
                    navigate('/Login');
                }
            }

            Check_isvalid();

        } else {
            localStorage.removeItem('Userid');
            navigate('/Login');
        }


    }, [Change])




    return (
        <>

            {Flashmes ? (<><Flash text={flashmessage.text} color={flashmessage.color} bgcolor={flashmessage.bgcolor} /></>) : ('')}

            <Header />
            
            <div>

                <section className='passwords'>
                    <h3>Add New Password</h3>
                    <form onSubmit={async (e) => {
                        e.preventDefault();
                        if (url && Username && Password != '') {

                            var result = await AddNewPassword(url, Username, Password);
                            if (result) {
                                SetChange(!Change);

                                Seturl('');
                                SetUsername('');
                                SetPassword('');

                                SetFlashmes(true);
                                Setflashmessage({ color: '#92fa7f', bgcolor: '#9fff9347', text: 'Password Added Successfully' });

                                setInterval(() => {
                                    SetFlashmes(false);
                                    Setflashmessage({ text: '', color: '', bgcolor: '' })
                                }, 5000);

                            }
                        } else {
                            SetFlashmes(true);
                            Setflashmessage({ text: 'Please Enter Data ...', color: '#fa7f7f', bgcolor: '#ff939347' });

                            setInterval(() => {
                                SetFlashmes(false);
                                Setflashmessage({ text: '', color: '', bgcolor: '' })
                            }, 5000);
                        }


                    }}>
                        <input type='text' placeholder='Website URL' value={url} onChange={(e) => {
                            Seturl(e.target.value);
                        }}></input>

                        <input type='text' placeholder='Enter Username' value={Username} onChange={(e) => {
                            SetUsername(e.target.value);
                        }}></input>

                        <input type='password' placeholder='Enter Password' value={Password} onChange={(e) => {
                            SetPassword(e.target.value);
                        }}></input>

                        <button>Add Password</button>
                    </form>


                    <div className='passworddiv'>
                        {

                            (UserData && UserData.length > 0) ? (


                                UserData.map((result: { _id: string, Userid: string, WebsiteCredentials: { Website: string, Username: string, Password: string } }) => {
                                    return (
                                        <section key={result._id} className='password_box'>
                                            <span>
                                                <p>Website - </p>
                                                <h4 className='copytext' id='copywebsite'> {result.WebsiteCredentials.Website || 'N/A'}</h4>

                                            </span>
                                            <span>
                                                <p>Username - </p>
                                                <h4 className='copytext' id='copyuser'> {result.WebsiteCredentials.Username}</h4>
                                            </span>
                                            <span>
                                                <p>Password - </p>
                                                <h4 className='copytext' id='copypassword'> {result.WebsiteCredentials.Password}</h4>
                                            </span>
                                            <span>
                                                <FontAwesomeIcon onClick={() => {
                                                    copyText();
                                                }} className='methods_img' icon={faCopy}></FontAwesomeIcon>

                                                <FontAwesomeIcon onClick={async () => {
                                                    let myres = await RemovePass(result.Userid, result._id);
                                                    if (myres) {
                                                        SetChange(!Change);
                                                        SetFlashmes(true);
                                                        Setflashmessage({ color: '#92fa7f', bgcolor: '#9fff9347', text: 'Password Removed' });

                                                        setInterval(() => {
                                                            SetFlashmes(false);
                                                            Setflashmessage({ text: '', color: '', bgcolor: '' })
                                                        }, 5000);
                                                    }

                                                }} className='methods_img' icon={faTrashCan}></FontAwesomeIcon>
                                            </span>

                                        </section>
                                    )
                                })

                            ) : ('')
                        }

                    </div>
                </section>

            </div>
            <Footer />
        </>
    )
}

export { AddPassword }
