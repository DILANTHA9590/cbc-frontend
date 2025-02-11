import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";

export default function Loginpage() {
  //mw hook eka api use karannne ape google login btn eka ebbuvama venna oni de
  //meka apita katapadn karaganna oni na document eke thiye meka google auth eke npm doc vala
  //eka kiyavannna
  const googleLogin = useGoogleLogin({
    //apata me use google login hoiok eken labenne function ekk api eka dagaththa google loginvbkle kkata

    // me function eka  api athulata denava json ekk
    // login eka sucess unama ena response eka print karala denna kiyala
    // dan api me function eka run karaganna oni google btn eka click karata passe
    //e nisa api oncl;ick denna  oni  ggole btn ekata
    // ita passe api log vela   api me page eken ma inspect baluvoth apata enava
    //google eken  e ujsrta adala acces token ekak apta meken usrge visthara tika danagganna pulkuvan
    // api etoken eka ekata ape bckend keat yavanna oni ekata api ekk hadaganna oni ape backend eke4
    onSuccess: (res) => {
      console.log(res);
      axios
        .post(import.meta.env.VITE_BACKEND_URL + "/api/users/google", {
          //api meyage data tika yavana back ekata eka enne ape token eke acces token eke
          token: res.access_token,
        })

        .then((res) => {
          console.log("Backend response:", res.data);
          if (res.data.message == "User created") {
            toast.success(
              "Your account is created now you can login via google",
              console.log(res.data)
            );
          } else {
            localStorage.setItem("token", res.data.token);

            if (res.data.user.type == "admin") {
              window.location.href = "/admin";
              console.log("User type:", res.data.user.type);
            } else {
              window.location.href = "/products";
              console.log("User type:", res.data.user.type);
            }
          }
        });
    },
  });

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [value, Setvalue] = useState();

  function login() {
    //api dan me  port number eka calll karana eka methanin venathanakata daganna hdanne
    //  .env ekkata mokda api den methana dirwectly thma backend url eka liyala thiyaggnne mamata meka host karanakota
    //backend eka host karnnne venama thanaka front end eka host karanne venne venamathanaka
    //front end eka host karanne venam thanaka ekama thanaka unath vena venama port dekka run karanana vei
    //ethakota hadisiiye hari apita venama port number ekka  run karanna unoth me me 300 nathuva(vena port number ekka ) me axios call eken backend ekata
    // call karana local host port number eka me hamathana venas karanna vena
    //e nisa api meka .env eke dala veriable hdagena eka methanata denava ethakota eka tahanin vbenas unama hamathanama venas venava
    //ara vidiha unama real backend url eken apata meka replace karanna venava ara vidihata dapuvbama eka lesi venas karanna
    // mokda me url eka sthira deyak neme meka sari sare vans karanna sidda venava http://localhost:3000 venama .env ekk dagannava
    // thiibe me vidihata  .post("http://localhost:3000/api/users/login", {
    //dssas
    axios

      .post(import.meta.env.VITE_BACKEND_URL + "/api/users/login", {
        email: email, //uda thiyena email
        password: password,

        //uda thiyena password ekai api postman eke req eka yauva vge thama me yavanne
        //input type eke data tika aragena methanata dala userlogin eke email password ekata aragena backend ekata eyavanava
      })
      .then((res) => {
        //ita passe ena res eka methanin balanava
        console.log(res);
        // methandi balanava issella  user null da kiyala null nam eka navathinava natghtham phala kotasa exute karanava

        if (res.data.user == null) {
          //methandi user kenek naththam apata backekend res eke eva tyika ganana puluvan  alert ekk viodihata
          //naththama apata avashya ekeka daggnath puluva
          Setvalue(res.data.message);

          //  naththam apata alert ekk denanath puluvan
          // alert(res.data.message)//mehema alert dana eka dan kathai apata me vidihata dammoth deafult thiyena vidihata tha aelrt enne
          // apata lassnata aler dagann use karanna puluan library ekk thyenava react hot toast library eka ganna puluvan
          //eyalage site eken apata oni eva daganna puluvan
          //e alert eka danne me vidihata
          toast.error(res.data.message);

          return;
        }

        toast.success(res.data.message);

        //dan api methandi usertype eka balananna oni
        // type eka admin nam admin page ekata yavanna oni type eka customer nam ciustomer mpage ekata yavanna oni
        // dan apita meka check karaganna apata token eka oni e ka apata iisaraha vadavalata uvamana vensa nisa eka save karala thiyaganna
        //oni apita eka nitharama request ekk yavdda oni venava

        //api  me token eka local storage eke meka save karaganna me local storage eke ape crash eka save karanna puluvan ape web
        //site ekata adalava

        localStorage.setItem("token", res.data.token);

        //apiata browser eke token eka enne reponse eke data vala ena token eka api save kargannava token kiyana namin
        //apita me local storage eke deval key value pairs vidihata me local storage eke deval save karaganna puluvan
        //ethakota meka vercual vaguvak vge hithuvoth dan api methana token eka save karana key value pair vidihata token
        //ekata adala eva string ekkin save venava strin ekkin haby

        // dan api methana balanava user type eka balala eyalava page valata redirect venna

        if (res.data.user.type == "admin") {
          // type eka admin nam admin page ekata yavanava
          window.location.href = "/admin";
        } else {
          window.location.href = "/home";
        }
      });
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
      <div className="flex items-center justify-center w-full h-screen bg-lime-600 ">
        <div className="w-[600px] h-[600px] bg-blue-500 flex items-center justify-center flex-col gap-5 ">
          <img className="w-[100px]" src="\logo.png" alt="" />
          <div className="flex flex-col items-center justify-center">
            <span>Email</span>
            {/* methana default value eka venne api inpute field ekata enter karana eka  use state hook ekata yanava ita passe use
             state email ekata giya  ekata  value eken methana filed eka update karanava*/}

            <input
              type="text"
              placeholder="Email"
              defaultValue={email}
              onChange={(e) => {
                //e kiyala pass venne
                //vechcha onchnage event eke visthara tika eke di onchnage kiyalama thiyennne chnage vechcha eka
                //gana

                // console.log("email is change");
                // console.log(e.target.value);
                // me ken apata brower eken balanna puluvan  input filed type karaama pennava e adla velavae
                // eke athule tika print venava

                //dan api kiyanava e vachne vena venavanam e venas vena vachane uda veriable ekeata dagannav
                setemail(e.target.value);
                // meka thama sampurna core keaform ekath ekka vada karanakota
                ///meken uda thiyena veriable eka udtae eke thiya ganava methana vena changes valin
              }}
            />
            {/* api dan udahadapu use stante veriable deka dunna email emai text field ekata \
                password text field ekatai  e use state hadala dunne apata real time meva venas karanna vena nisa
                ita passe api on change ekk liyagena thiyenava eken venne eken venne kme email eke kotasata adla deval
                type vela e kotasa change venavam me input panel eke thiyena eva monahri ni sa change venavanam
                e chnage ekata adala visthara tika e kiyala gannav ethakota api akurak delete karath akurak type karath e 
                function eka run venava eka apiata check karaganna puluvan conlog ekk gahala broser eke balnna puluvan
                e vagema methana email  e kiyanne me input field eke venasak una ganmn api eka update karaganna oni
                uda thiyena usesate veriable eken */}
          </div>

          <div className="flex flex-col items-center justify-center">
            <span>Password</span>

            <input
              type="text"
              placeholder="password"
              defaultValue={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
          </div>

          <div>
            <button
              className="border border-black p-[20px 20px ]"
              onClick={login}
            >
              Login
            </button>
            {/* api function call karanakota() danne na */}
          </div>

          {/* //api meka damma app .jsx site eka cover karala vagema ggogle ouath npm eka 
// insatall karala. dan apata meka click karama venna oni karanna apata hook ekk enava eka apata enne google aouth ekenamai*/}
          {/* e vagema  meka run karama ape uda google login hook eka run venava ita passe apata login
          google page eka open venava */}

          <button
            onClick={() => {
              googleLogin();
            }}
          >
            Login with Google
          </button>
          <Link
            className="flex items-center justify-start w-full gap-2 px-4 py-2 rounded hover:bg-blue-600"
            to="/signup/"
          >
            singup
          </Link>
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
