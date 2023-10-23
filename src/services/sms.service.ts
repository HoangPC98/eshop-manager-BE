import twilio from 'twilio'

export const sendSms = async (to: string, message: string) => {
  console.log('twilio config...', process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);
  client.messages
    .create({
      body: message,
      from: '+15017122661',
      to: to
    })
    .then(message => console.log('Send SMS Success, ID:', message.sid));
}