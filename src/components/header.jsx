import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { RiCloseLargeFill } from "react-icons/ri";
import NavSlidder from "./navSlider";
export default function Header() {
  // dan api header component eka hadaganna thama yanne dan meka hadala api me component eka dannav
  //avshya thanata api meka dagannava api php[ vala kare header footter ekas]
  const [isSliderOpen, setIsSliderOpen] = useState(false);

  return (
    <>
      {
        //api methandi use satte ekk hadala thiyena ekde api state eka true nam vitharak me responsive nav bar eka pennava
        //api methana code goda gahila thiyeddi kathine eka nisa api nav slider eka navslider compinent ekk athulata aran yanava
        // nahtham kalin ethana thibba code eka thibbe methana ita passe ek component eka api  methanata pass karaganava
        //meka kali thibba hati balanna oni nam navslidereka commonet e t eka &&( meke dan meda thiyenava eva ain karala)
        //  e slider eke tjiyena coimpo eka danna

        //e vagema dan apita close venakota venna oni de methanadi karaganna venne na mokada e thiyenne venama compionent ekakka
        //e nisa api clse btn eka ebuvama venna oni de methandi pass karaganava onclose kiyala liyala
        //function ekk pass karagannava ape states eka ME AND DENEN RETURN VENNE API MENU EKEA CLICK KARAMA
        //API UDA STATE EKA TRU UE KARANAVA ETHAKOTA EKA RENDER VENAVA E VGEMA CLOSE VENNA API EKA YAVANAVA PROP EKK VIDIHATA NAV
        //  SLIDER EKATA MOKDA EKA ETHANA THIYENNE E NISA EKA API PROP EKK VIDIHATA YAVANAVA E COMPO EKAKATA mokda slider eka
        //call karana stete eka thiyenne meke apta methana onclick eka close venna denna vidihak na e nisa api me satte ekata
        //kiyanava props vidihata yavanava function ekk ethakota api eke colse icon eka obapu
        //state eka value eka false venava nav slioder eka hide venava

        isSliderOpen && (
          <NavSlidder
            onCloseSlider={() => {
              setIsSliderOpen(false);
            }}
          />
        )
      }
      <header className="bg-white w-full h-[12vh]  flex justify-center items-center relative">
        <img
          src="/logo_.png"
          className="h-[133px] w-[209px] rounded-full  cursor-pointer absolute left-[-30px]"
        />

        {/* //ita passe apita eka penna oni nam api haber btn eke isSliderOpen true kara ethakota elka click karama slider eka penava */}
        <RxHamburgerMenu
          className="absolute h-full text-3xl right-7 sm:hidden text-accent"
          onClick={() => {
            setIsSliderOpen(true);
          }}
        />

        <div className="h-full   items-center  justify-evenly w-[500px]  sm:flex hidden">
          <Link
            to="/"
            className="text-xl font-bold text-accent hover:border-b border-b-accent"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="text-xl font-bold text-accent hover:border-b border-b-accent"
          >
            Products
          </Link>

          <Link
            to=""
            className="text-xl font-bold text-accent hover:border-b border-b-accent"
          >
            About Us
          </Link>

          <Link
            to="/"
            className="text-xl font-bold text-accent hover:border-b border-b-accent"
          >
            Contact Us
          </Link>

          <Link
            to="/Cart"
            className="text-xl font-bold text-accent hover:border-b border-b-accent"
          >
            Cart
          </Link>
        </div>
      </header>
    </>
  );
}
