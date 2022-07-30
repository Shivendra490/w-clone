const ONE_DAY = 24 * 60 * 60 * 1000;
const dateFormatter = (timestamp) => {
  const startOfDay = new Date().setHours(0, 0, 0);
  const endOfDay = new Date().setHours(23, 59, 59);

  if (timestamp >= startOfDay && timestamp <= endOfDay) {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else if (timestamp < startOfDay && timestamp >= startOfDay - ONE_DAY) {
    return "yesterday";
  } else {
    return new Date(timestamp).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
};

export const dateFormatterForRightSide = (current, next) => {
  const startOfDay = new Date().setHours(0, 0, 0);
  const formattedCurrent = dateFormatter(current);
  // means messages over
  if (!next) {
    return formattedCurrent;
  }
  const formattedNext = dateFormatter(next);


  if (current >= startOfDay && next >= startOfDay) {
    return "";
  }

  if (current >= startOfDay && next < startOfDay) {
    return "Today";
  }


  if (formattedCurrent === formattedNext) {
    return "";
  }


  if (formattedCurrent !== formattedNext) {
    return formattedCurrent;
  }
};

export default dateFormatter;

//case 1: time shown as time
// case 2: time shown as yesterday
// case 3: time shown as date
