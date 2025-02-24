import { useState } from "react";

export default function ImageSlider(props) {
  const [activeImage, setActiveImage] = useState(0);

  const images = props.images;

  return (
    <div className="relative flex flex-col items-center w-full aspect-square">
      <img src={images[activeImage]} className="w-full h-full" alt="" />
      <div className="absolute w-full h-[100px] bottom-0 backdrop-blur-lg ">
        <div className="flex items-center justify-center w-full h-full overflow-hidden ">
          {images.map((image, index) => (
            <img
              onClick={() => setActiveImage(index)}
              key={index}
              src={image}
              className="object-cover w-16 h-16 mx-2 cursor-pointer"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
