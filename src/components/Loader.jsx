import React from 'react'
import { Player } from "@lottiefiles/react-lottie-player";

const Loader = () => {
  return ( 
      <Player
        autoplay
        loop
        src="https://assets5.lottiefiles.com/packages/lf20_ht6o1bdu.json"
        style={{ height: "300px", width: "300px" }}
      ></Player>
  );
}

export default Loader