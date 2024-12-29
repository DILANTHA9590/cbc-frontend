import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

export default function Loginpage() {

    const[email, setemail]=useState("")
    const[password, setpassword]=useState("")
    const[value, Setvalue] =useState()
    
    function login(){
        axios.post("http://localhost:3000/api/users/login",{
            email : email, //uda thiyena email
            password : password //uda thiyena password ekai api postman eke req eka yauva vge thama me yavanne 
            //input type eke data tika aragena methanata dala userlogin eke email password ekata aragena backend ekata eyavanava


        }).then((res)=>{//ita passe ena res eka methanin balanava
            console.log(res);

            // methandi balanava issella  user null da kiyala null nam eka navathinava natghtham phala kotasa exute karanava

            if(res.data.user==null){

                //methandi user kenek naththam apata backekend res eke eva tyika ganana puluvan  alert ekk viodihata
                //naththama apata avashya ekeka daggnath puluvan
             Setvalue(res.data.message)

            //  naththam apata alert ekk denanath puluvan
            alert(res.data.message)//mehema alert dana eka dan kathai apata me vidihata dammoth deafult thiyena vidihata tha aelrt enne
            // apata lassnata aler dagann use karanna puluan library ekk thyenava react hot toast library eka ganna puluvan
            //eyalage site eken apata oni eva daganna puluvan 

                return
            }

            //dan api methandi usertype eka balananna oni 
            // type eka admin nam admin page ekata yavanna oni type eka customer nam ciustomer mpage ekata yavanna oni
            // dan apita meka check karaganna apata token eka oni e ka apata iisaraha vadavalata uvamana vensa nisa eka save karala thiyaganna
            //oni apita eka nitharama request ekk yavdda oni venava

            //api  me token eka local storage eke meka save karaganna me local storage eke ape crash eka save karanna puluvan ape web
            //site ekata adalava 
            localStorage.setItem("token",res.data.token)
            
            
            //apiata browser eke token eka enne reponse eke data vala ena token eka api save kargannava token kiyana namin
            //apita me local storage eke deval key value pairs vidihata me local storage eke deval save karaganna puluvan
            //ethakota meka vercual vaguvak vge hithuvoth dan api methana token eka save karana key value pair vidihata token
            //ekata adala eva string ekkin save venava strin ekkin haby

            // dan api methana balanava user type eka balala eyalava page valata redirect venna
            
            if(res.data.user.type == "admin") {
// type eka admin nam admin page ekata yavanava
                window.location.href = "/admin"
            }

            else{
                window.location.href = "/home"
            }
         


        })

        // console.log("pressloginbtn");

        // console.log(email)//dan api baluvgoth avith thiyenne realtime update una email eka eka balnna puluvan 
        //use state use karanne mekata inputfiled---> updateusesate ----->login btn dan mehema print karla vadak na apita ilga 
        //part ekata  yan

          
    }

    //dan api meke obeject ekk vifdihata api dan balanava mokda api meke me component eke vanas vena attribute diha 
    // baluivoth email eka password keai meke vensa venava mokda api e vens vena hma ekkatama use state hadaganna 
    // oni
    return (
        <>

        <div className="w-full h-screen bg-lime-600 flex items-center justify-center ">

            <div className="w-[600px] h-[600px] bg-blue-500 flex items-center justify-center flex-col gap-5 ">

                <img className="w-[100px]" src="\logo.png" alt="" />
                <div className="flex flex-col justify-center items-center">

                <span>Email</span>
             {/* methana default value eka venne api inpute field ekata enter karana eka  use state hook ekata yanava ita passe use
             state email ekata giya  ekata  value eken methana filed eka update karanava*/}
                <input type="text" placeholder="Email" defaultValue={email} onChange={(e)=>{//e kiyala pass venne 
                //vechcha onchnage event eke visthara tika eke di onchnage kiyalama thiyennne chnage vechcha eka 
                //gana

                    // console.log("email is change");
                    // console.log(e.target.value);
                    // me ken apata brower eken balanna puluvan  input filed type karaama pennava e adla velavae 
                    // eke athule tika print venava

                    //dan api kiyanava e vachne vena venavanam e venas vena vachane uda veriable ekeata dagannav
                    setemail(e.target.value)  // meka thama sampurna core keaform ekath ekka vada karanakota
                    ///meken uda thiyena veriable eka udtae eke thiya ganava methana vena changes valin


                }} />  
                {/* api dan udahadapu use stante veriable deka dunna email emai text field ekata \
                password text field ekatai  e use state hadala dunne apata real time meva venas karanna vena nisa
                ita passe api on change ekk liyagena thiyenava eken venne eken venne kme email eke kotasata adla deval
                type vela e kotasa change venavam me input panel eke thiyena eva monahri ni sa change venavanam
                e chnage ekata adala visthara tika e kiyala gannav ethakota api akurak delete karath akurak type karath e 
                function eka run venava eka apiata check karaganna puluvan conlog ekk gahala broser eke balnna puluvan
                e vagema methana email  e kiyanne me input field eke venasak una ganmn api eka update karaganna oni
                uda thiyena usesate veriable eken */}

                </div>


                <div className="flex flex-col justify-center items-center">
                <span>Password</span>


                <input type="text" placeholder="password" defaultValue={password} onChange={(e)=>{

                    setpassword(e.target.value)

                }}/>

                </div>

                <div>
                    <button className="border border-black p-[20px 20px ]" onClick={login}>Login</button>
                    {/* api function call karanakota() danne na */}
                </div>

                <div>
                    <Link className="underline text-amber-400">Fogotten Password</Link>
                </div>

                <div>
                    <p>{value}</p>
                </div>

            </div>

        </div>

      
        </>
    );
}

    // {
    //     customer mail
 
    //     "email": "customer123@example.com",
    //     "firstName": "John",
    //     "lastName": "Doe",
    //     "password": "securePassword123",
    //     "isBlock": false,
    //     "type": "customer",
    //     "profilePic": "https://example.com/profile-pic.jpg"
      
      
    //   }





//     {
//  admin detils
//         "email": "admin123@example.com",
//         "firstName": "John",
//         "lastName": "Doe",
//         "password": "securePassword123",
//         "isBlock": false,
//         "type": "admin",
//         "profilePic": "https://example.com/profile-pic.jpg"
      
      
//       }