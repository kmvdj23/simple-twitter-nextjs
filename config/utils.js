const getDateTime = (datetimestr, date_only = true) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  let date = new Date(datetimestr)
  let month = monthNames[date.getMonth()]
  let day =
    date.getDate().toString().length < 2 ? "0" + date.getDate() : date.getDate()
  let year = date.getFullYear()

  if (date_only) {
    return `
      ${month} ${day}, ${year}
    `
  }

  let hours = (date.getHours() + 24) % 12
  hours = hours.toString().length < 2 ? "0" + hours : hours

  let minutes =
    date.getMinutes().toString().length < 2
      ? "0" + date.getMinutes()
      : date.getMinutes()

  let suffix = date.getHours() >= 12 ? "pm" : "am"

  return `
    ${month} ${day}, ${year} - ${hours}:${minutes}${suffix}
  `
}

const stringToAvatar = (name) => {
  const names = name.split(" ")

  if (names.length < 2) {
    return names[0][0].toUpperCase()
  } else {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
  }
}

export { getDateTime, stringToAvatar }
