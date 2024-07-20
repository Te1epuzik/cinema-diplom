export const useFormatDate = (date: Date) => {
  const month =
    (date.getMonth() + 1).toString().length === 1
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  const day =
    (date.getDate() + 1).toString().length === 1
      ? "0" + (date.getDate())
      : date.getDate();
  const year = date.getFullYear();

  return [year, month, day].join("-");
};
