export const setExpiring = (date: string) => {
  if (date === null) return false;
  const expiringDate = date.split('/');
  const expiringMonth = expiringDate[0];
  const expiringYear = expiringDate[1];

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  if (
    +expiringMonth <= currentMonth + 1 ||
    (+expiringYear < currentYear && +expiringMonth <= currentMonth)
  ) {
    return true;
  } else {
    return false;
  }
};
