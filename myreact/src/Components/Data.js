let data =[
    {
      title : "Todo title임",
      date : "Todo date임"
    },
  ] 

const addData = (title, date) => {
    const newData = {
        title: title,
        date: date
    };
    data.push(newData);
};

  export { data, addData };