export const timestampToDate = (timestamp: number) => {
  const date = new Date(timestamp);

  const formattedDate =
    date.getDate() +
    " " +
    date.toLocaleString("en-US", { month: "long" }) +
    " " +
    date.getFullYear();
  console.log(formattedDate);

  return formattedDate;
};

