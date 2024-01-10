import moment from 'moment';

export const dateFormat = (date: Date) => {
  return moment(date).format('MMM Do YYYY');
};

// This function will make sure Jan 2nd comes before Jan 10th
export const sortDates = (dateStringA: string, dateStringB: string) => {
  const dateA = new Date(dateStringA);
  const dateB = new Date(dateStringB);

  return dateA.getTime() - dateB.getTime();
};
