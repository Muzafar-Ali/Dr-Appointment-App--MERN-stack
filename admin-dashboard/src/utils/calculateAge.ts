
export const calculateAge = (dob: string) => {
  const today = new Date();
  const birthday = new Date(dob);
  const age = today.getFullYear() - birthday.getFullYear();
  return age;
}