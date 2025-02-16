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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          window.location.href = "/";
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Toaster />
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">
          Login to your account
        </h2>
        <p className="text-center text-gray-600">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>

        {/* Social Login Buttons */}
        <div className="mt-6">
          <button
            className="flex items-center justify-center w-full p-3 mb-3 border rounded-lg"
            onClick={() => googleLogin()}
          >
            <img src="google-icon.png" alt="Google" className="w-5 h-5 mr-2" />
            Sign in with Google
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="w-full border-gray-300" />
          <span className="mx-2 text-gray-500">OR</span>
          <hr className="w-full border-gray-300" />
        </div>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
          <a href="#" className="text-blue-500">
            Forgot Password?
          </a>
        </div>

        {/* Login Button */}
        <button
          className="w-full p-3 text-white transition bg-black rounded-lg hover:bg-gray-800"
          onClick={login}
        >
          Login
        </button>
      </div>
    </div>
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
