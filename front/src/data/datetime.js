import moment from 'moment';

moment.locale('fr');

export function formatFrenchDate(timestamp) {
  return moment(timestamp).format("dddd Do MMMM YYYY");
}

export function formatFrenchDateTime(timestamp) {
  return moment(timestamp).format("dddd Do MMMM YYYY HH:mm:ss");
}

export function formatFrenchDuration(milliseconds) {
  const duration = moment.duration(milliseconds);

  const h = duration.get('hours');
  const m = duration.get('minutes');
  const s = duration.get('seconds');

  return `${h}:${m}:${s}`;
}
