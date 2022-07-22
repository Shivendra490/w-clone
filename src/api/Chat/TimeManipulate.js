
const milliToStandardTime=(milliTime)=>{
    const date = new Date(milliTime);
const str = date.toLocaleString();
return str.substring(12,17)
  }

export {milliToStandardTime}