export const formattedDate = (isoDate: string) => {
  const date = new Date(isoDate);

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-GB", options);

  return formattedDate;
};
