import moment from 'moment';

export const dateFormat = (date: Date) => {
  return moment(date).format('MMM Do YYYY');
};
