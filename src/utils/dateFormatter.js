const dateFormatter = (timestamp) => {
  const startOfDay = new Date().setHours(0, 0, 0);
  const endOfDay = new Date().setHours(23, 59, 59);
  const oneDay = 24 * 60 * 60 * 1000;

  if (timestamp >= startOfDay && timestamp <= endOfDay) {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else if (timestamp < startOfDay && timestamp >= startOfDay - oneDay) {
    return "yesterday";
  } else {
    return new Date(timestamp).toLocaleDateString("en-US", {
      day: "numeric",
      month: "2-digit",
      year: '2-digit'
    });
  }
};

export default dateFormatter;

//case 1: time shown as time
// case 2: time shown as yesterday
// case 3: time shown as date
