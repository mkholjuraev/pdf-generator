const getHeaderDate = () => {
  const date = new Date();
  return `${date.getDay()} ${date.toLocaleString('en-us', {
    month: 'short',
  })} ${date.getFullYear()} ${date.toLocaleString('en-us', {
    hour: '2-digit',
    hour12: false,
    minute: 'numeric',
  })} UTC`;
};

export default getHeaderDate;
