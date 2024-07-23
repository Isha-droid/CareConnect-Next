import twilio from 'twilio';

export default function sendMessage(phone: string, message: string): Promise<{ success: boolean }> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
  const token = process.env.TWILIO_AUTH_TOKEN as string;
  const client = twilio(accountSid, token);

  return client.messages
    .create({
      body: message,
      messagingServiceSid: 'VA238aabc9349de2f37b5d8d846789a9f2',
      to: phone,
    })
    .then(() => ({
      success: true,
    }))
    .catch((error) => {
      console.error(error);
      return {
        success: false,
      };
    });
}
