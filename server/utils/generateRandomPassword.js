import passwordGenerator from "generate-password"

export const generateRandomPassword = () => {
  const randomPassword = passwordGenerator.generate({
    length: 10,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    strict: true,
  })
  console.log(randomPassword)
  return randomPassword
}
