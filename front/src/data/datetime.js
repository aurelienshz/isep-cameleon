import moment from 'moment';

moment.locale('fr');

export function formatFrenchDate(timestamp) {
  return moment(timestamp).format("dddd Do MMMM YYYY");
}

export function formatFrenchDateTime(timestamp) {
  return moment(timestamp).format("dddd Do MMMM YYYY HH:mm");
}

export function formatExactFrenchDuration(milliseconds, withSeconds = false) {
  if (milliseconds < 0) return "Durée invalide";
  const duration = moment.duration(milliseconds);

  const h = duration.get('hours');
  let m = String(duration.get('minutes'));
  let s = String(duration.get('seconds'));

  while (m.length < 2) {
    m = "0" + m;
  }
  while (s.length < 2) {
    s = "0" + s;
  }


  return withSeconds ? `${h}:${m}:${s}` : `${h}:${m}`;
}

export function formatFrenchDuration(milliseconds) {
  if (milliseconds < 0) return "Durée invalide";
  const duration = moment.duration(milliseconds);
  return duration.humanize();
}
