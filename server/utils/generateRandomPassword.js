import passwordGenerator from "generate-password"

export const generateRandomPassword = () => {
  const randomPassword = passwordGenerator.generate({
    length: 12,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  })
  return randomPassword
}
