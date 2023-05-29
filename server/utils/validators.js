import validator from "validator"

export const isNRC = (value) => {
  return validator.matches(value, /^\d{2}[a-zA-Z]\d{7}$/)
}

export const isNIF = (value) => {
  return validator.matches(value, /^\d{13}$/)
}

export const isEmail = (value) => {
  return validator.isEmail(value)
}

export const isPhoneNumber = (value) => {
  return validator.matches(
    String(`+213${value}`),
    /^(00213|\+213|0)(5|6|7)[0-9]{8}$/
  )
}

export const isStrongPassword = (value) => {
  return validator.isStrongPassword(value, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    returnScore: false,
  })
}

export const isURL = (value) => {
  return validator.isURL(value)
}
