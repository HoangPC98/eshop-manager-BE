import { authenticator } from "otplib";

export const idGenerator = (length: number, fullChar?: boolean) : string => {
  let result = '';
  const full_chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const id_chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let characters = fullChar ? full_chars : id_chars
  let charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export const secretGenerator = () : string =>{
  return authenticator.generateSecret()
}