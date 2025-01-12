import { useState } from "react";

export default function ImageSlider(props) {
  // dan api methana product valata adala image ekk hadganna hadanne peops use karala
  //api methandik props pass karagannava ape productt overview page eken

  //   api me sate eka dagaththe ape image vala yata thiyena image click kranakota eva displaty venna

  const [activeImage, setActiveImage] = useState(0);

  const images = props.images;

  return (
    <div className="w-full aspect-square flex items-center flex-col relative">
      {/* methandi api useate eke indexc eka default index eka methanatra pass karanav
       */}
      <img src={images[activeImage]} className="w-full h-full" alt="" />
      <div className="absolute w-full h-[100px] bottom-0 backdrop-blur-lg ">
        {/* ita passe ape propseeken ava images tika api map karala methanat adagannav */}
        <div className="w-full h-full flex items-center justify-center overflow-hidden ">
          {images.map((image, index) => (
            <img
              // methandi dan api set karala thiyenneokkoma ape image tika key pair valin ita passe api e adla
              //image ekla click karamama e image ekae iindex eka pass karla thiyenne onclick ekk dala usesate ekata
              //ethakota e e satte eka update vela apita avshya image eka pennava
              onClick={() => setActiveImage(index)}
              key={index}
              src={image}
              className="w-16 h-16 object-cover 
                     mx-2 cursor-pointer"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// use satet eka danna  lkalin thibbe me vidhata palaveni image eka penna

// const images = props.images;
// console.log(images);
// return (
//   <div className="w-full aspect-square flex items-center flex-col relative">
//     <img src={images[0]} className="w-full h-full" alt="" />
//     <div className="absolute w-full h-[100px] bottom-0 backdrop-blur-lg ">
//       {/* ita passe ape propseeken ava images tika api map karala methanat adagannav */}
//       <div className="w-full h-full flex items-center justify-center overflow-hidden">
//         {images.map((image, index) => (
//           <img
//             key={index}
//             src={image}
//             className="w-16 h-16 object-cover
//                    mx-2 cursor-pointer"
//           />
//         ))}
//       </div>
