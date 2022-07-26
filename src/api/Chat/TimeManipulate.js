const milliToStandardTime = (milliTime) => {
  const date = new Date(milliTime);
  const str = date.toLocaleString();
  return str.substring(12, 17);
};





const leftMilliToStandardTime = (timestamp) => {

  const startOfDay = new Date().setHours(0, 0, 0);
  const endOfDay = new Date().setHours(23, 59, 59);
  const oneDay = 24 * 60 * 60*1000

  if (timestamp >= startOfDay && timestamp <= endOfDay) {
    
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12:false
    });
  }
  

  else if (timestamp < startOfDay && timestamp >= startOfDay - oneDay) {
    
    return "yesterday";
  }
else {
  console.log(timestamp,startOfDay,oneDay)
    console.log("fmakl");
    return new Date(timestamp).toLocaleDateString("en-US", {
      day: "numeric",
      month: "2-digit",
      year: '2-digit'
    });
  }


  // console.log("time", milliTime);
  // const currentDate = new Date();
  // const date = new Date(milliTime);
  // const str = date.toLocaleString();
  // if (currentDate.toLocaleString().substring(0, 10) == str.substring(0, 10)) {
  //   return str.substring(12, 17);
  // } else {
  //   const day = parseInt(str.substring(0, 2));
  //   const currentDay = parseInt(currentDate.toLocaleString().substring(0, 2));
  //   if (
  //     currentDate.toLocaleString().substring(2, 10) == str.substring(2, 10) &&
  //     currentDay - 1 == day
  //   ) {
  //     return "yesterday";
  //   }
  // }

  // return str.substring(0, 10);
};

export { milliToStandardTime, leftMilliToStandardTime };
