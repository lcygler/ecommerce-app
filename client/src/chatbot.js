export const theme = {
  background: '#f5f8fb',
  // fontFamily: 'Helvetica Neue',
  headerBgColor: '#3182CE',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#3182CE',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

export const steps = [
  { id: '1', message: '¡Hola! ¿En qué puedo ayudarte?', trigger: '2' },
  { id: '2', user: true, trigger: '3' },
  {
    id: '3',
    message: 'Lo siento, no puedo responder a esa pregunta en este momento.',
    end: true,
  },
];