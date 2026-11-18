const DEFAULT_MESSAGE =
  'Hola Wilder, vi tu web y me gustaría hablar de un proyecto.';

export async function handler(event) {
  const number = (process.env.WHATSAPP_NUMBER || '').replace(/\D/g, '');

  if (!number) {
    return {
      statusCode: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      body: 'WhatsApp no está configurado. Define WHATSAPP_NUMBER en Netlify.',
    };
  }

  const text =
    (event.queryStringParameters && event.queryStringParameters.text) ||
    DEFAULT_MESSAGE;

  return {
    statusCode: 302,
    headers: {
      Location: `https://wa.me/${number}?text=${encodeURIComponent(text)}`,
      'Cache-Control': 'no-store',
    },
    body: '',
  };
}
