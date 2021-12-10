export const getNextDay = (date: any) => {
  try {
    const newDate = new Date(date);
    return new Date(
      newDate.setDate(newDate.getDate() + 1),
    ).toLocaleDateString();
  } catch (e) {
    console.log(e);
  }
};
