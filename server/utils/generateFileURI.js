export const generateFileURI = (file) => {
  const fileToBase64 = Buffer.from(file.buffer).toString("base64")
  const fileURI = `data:${file.mimetype};base64,${fileToBase64}`
  return fileURI
}
