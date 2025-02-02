
const months = [ "","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

export const slotDtateFormat = (slotDate: string) => {
  const dateArray = slotDate.split('-');
  const formatedDAte = `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`
  return  formatedDAte
} 