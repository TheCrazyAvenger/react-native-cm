export const setExpiring = (date: string) => {
  if (date === null) return false;
  const expiringDate = date.split('/');
  const expiringMonth = expiringDate[0];
  const expiringYear = expiringDate[1];

  const currentDate = new Date();

  const expiring = new Date(`${+expiringMonth}/1/${expiringYear}`);

  if (expiring < currentDate) {
    return true;
  } else {
    return false;
  }
};
