import React from "react";
import { Image } from "@chakra-ui/react"



const UserImage = ({image}) => {
    return ( 
        <div>
            <Image
    src={image}
    boxSize="150px"
    borderRadius="full"
    fit="cover"
    alt="userPic"
  />
        </div>
     );
}
 

export default UserImage;