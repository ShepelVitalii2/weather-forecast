function currentTime() {
  const objToday = new Date(),
    weekday = new Array(
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ),
    dayOfWeek = weekday[objToday.getDay()],
    domEnder = (function () {
      let a = objToday;
      if (/1/.test(parseInt((a + '').charAt(0)))) return 'th';
      a = parseInt((a + '').charAt(1));
      return 1 == a ? 'st' : 2 == a ? 'nd' : 3 == a ? 'rd' : 'th';
    })(),
    dayOfMonth =
      today + (objToday.getDate() < 10)
        ? '0' + objToday.getDate() + domEnder
        : objToday.getDate() + domEnder,
    months = new Array(
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ),
    curMonth = months[objToday.getMonth()],
    curYear = objToday.getFullYear(),
    curHour =
      objToday.getHours() > 12
        ? objToday.getHours() - 12
        : objToday.getHours() < 10
        ? '0' + objToday.getHours()
        : objToday.getHours(),
    curMinute =
      objToday.getMinutes() < 10
        ? '0' + objToday.getMinutes()
        : objToday.getMinutes(),
    curSeconds =
      objToday.getSeconds() < 10
        ? '0' + objToday.getSeconds()
        : objToday.getSeconds(),
    curMeridiem = objToday.getHours() > 12 ? 'PM' : 'AM';
  const today =
    curHour +
    ':' +
    curMinute +
    '.' +
    curSeconds +
    curMeridiem +
    ' ' +
    dayOfWeek +
    ' ' +
    dayOfMonth +
    ' of ' +
    curMonth;
  // ', ' +
  // curYear;

  return today;
}
function currentTimeRus() {
  const objToday = new Date(),
    weekday = new Array(
      'Воскресенье',
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
    ),
    dayOfWeek = weekday[objToday.getDay()],
    domEnder = (function () {
      let a = objToday;
      if (/1/.test(parseInt((a + '').charAt(0)))) return 'ое';
      a = parseInt((a + '').charAt(1));
      return 1 == a ? 'ое' : 2 == a ? 'ое' : 3 == a ? 'е' : 'ое';
    })(),
    dayOfMonth =
      today + (objToday.getDate() < 10)
        ? '0' + objToday.getDate() + domEnder
        : objToday.getDate() + domEnder,
    months = new Array(
      'Января',
      'Февраля',
      'Марта',
      'Апреля',
      'Мая',
      'Июня',
      'Июля',
      'Августа',
      'Сентября',
      'Октября',
      'Ноября',
      'Декабря',
    ),
    curMonth = months[objToday.getMonth()],
    curYear = objToday.getFullYear(),
    curHour =
      objToday.getHours() > 12
        ? objToday.getHours() - 12
        : objToday.getHours() < 10
        ? '0' + objToday.getHours()
        : objToday.getHours(),
    curMinute =
      objToday.getMinutes() < 10
        ? '0' + objToday.getMinutes()
        : objToday.getMinutes(),
    curSeconds =
      objToday.getSeconds() < 10
        ? '0' + objToday.getSeconds()
        : objToday.getSeconds(),
    curMeridiem = objToday.getHours() > 12 ? ' am' : ' pm';
  const today =
    curHour +
    ':' +
    curMinute +
    '.' +
    curSeconds +
    ' ' +
    dayOfWeek +
    ' ' +
    dayOfMonth +
    ' ' +
    curMonth;
  // ', ' +
  // curYear;

  return today;
}

export { currentTime, currentTimeRus };
