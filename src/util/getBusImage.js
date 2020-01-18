

const getBusImage = (BusVeh1, BusVeh2) =>{
  //getBusImage(BusVeh1)
 return "yongsan03"+setBusImage(BusVeh1)+setBusImage(BusVeh2)+".png"
}


const setBusImage = (BusVeh) =>{
  switch (BusVeh) {
   case 1:
    return "_small";
   case 2:
    return "_big";
   case 0:
    return "_null";
  }

}

export {getBusImage}
