import { ArticleInterface } from './interfaces-model';

export const directory = 'shop1';
type MethodPayInterface = 'monei' | 'stripe';
export const selectedMethodPay: MethodPayInterface = 'stripe';

// conf general
export const dataWeb = {
  nameShop: 'Tecnología Avanzada',
  name: 'mike',
  email: 'soporte@tecnologiaavanzada.com',
  instagram: 'https://www.instagram.com',
  youtube: 'https://www.youtube.com',
  phone: '+34 900 123 456',
  address: 'Calle Innovación 42, 28001 Madrid, España',
  nif: 'A12345678',
  paymentIntentUrl:
    (selectedMethodPay as MethodPayInterface) === 'stripe'
      ? 'http://localhost:4000/stripe-payment'
      : 'http://localhost:4000/monei-payment',

  shippingCost: 9,
  logo: {
    mobile: `${directory}/images-logo/logo-head-mobile.png`,
    pc: `${directory}/images-logo/logo-head.png`,
    icon: `${directory}/icon.ico`,
  },
  colorPrimary: '#323E8A',
  colorSecondary: '#6c757d',
  colorBackground: 'white',
  colorText: 'black',
};

export const carouselConfig = [
  {
    bannerImg: `${directory}/images-carousel/1a.jpg`,
    title: 'iphone 16',
    description: 'Elige uno u otro.',
  },
  {
    bannerImg: `${directory}/images-carousel/2a.jpg`,
    title: 'iphone 16 pro',
    description: 'Elige uno u otro.',
  },
  {
    bannerImg: `${directory}/images-carousel/3a.jpg`,
    title: 'mac mini',
    description: 'Elige uno u otro.',
  },
];

// articles blog
export const articleBlog1 = {
  title: 'El Futuro de los Smartphones: ¿Qué Podemos Esperar?',
  imageUrl: `${directory}/images-articles/article1.jpg`,
  bodyTitle: 'Innovaciones que transformarán nuestros dispositivos móviles.',
  textContent:
    'El avance en la tecnología de los smartphones continúa a un ritmo imparable. Desde pantallas plegables hasta cámaras con inteligencia artificial avanzada, los dispositivos móviles están evolucionando para ofrecer experiencias más inmersivas y prácticas. En este artículo exploramos las tendencias y lo que podemos esperar de la próxima generación de smartphones.',
};

export const articleBlog2 = {
  title: 'Minimalismo Digital: Cómo Simplificar tu Vida Tecnológica',
  imageUrl: `${directory}/images-articles/article2.jpg`,
  bodyTitle: 'Reduce el estrés adoptando un enfoque minimalista.',
  textContent:
    'El minimalismo digital consiste en reducir el uso innecesario de dispositivos y aplicaciones para centrarse en lo esencial. Descubre cómo implementar esta filosofía en tu vida diaria y los beneficios de desconectarte para reconectar.',
};

export const articleBlog3 = {
  title: 'La Revolución del Trabajo Remoto: Herramientas Imprescindibles',
  imageUrl: `${directory}/images-articles/article3.jpg`,
  bodyTitle: 'Optimiza tu productividad desde casa.',
  textContent:
    'El trabajo remoto ha llegado para quedarse. En este artículo, exploramos las herramientas esenciales que necesitas para maximizar tu eficiencia mientras trabajas desde cualquier lugar, desde aplicaciones de colaboración hasta dispositivos ergonómicos.',
};

export const articleBlog4 = {
  title: 'Viajes con Tecnología: Gadgets para Aventureros Modernos',
  imageUrl: `${directory}/images-articles/article4.jpg`,
  bodyTitle: 'Haz que tus viajes sean más cómodos y seguros.',
  textContent:
    'Desde cargadores solares portátiles hasta cámaras de acción ultraligeras, descubre los gadgets que todo aventurero debe llevar consigo. Haz que cada viaje sea inolvidable con tecnología diseñada para explorar.',
};

export const articleBlog5 = {
  title: 'La Inteligencia Artificial en el Día a Día',
  imageUrl: `${directory}/images-articles/article5.jpg`,
  bodyTitle: 'IA: del laboratorio a nuestras vidas.',
  textContent:
    'La inteligencia artificial ya no es cosa del futuro. Desde asistentes personales hasta recomendaciones personalizadas, la IA está transformando cómo vivimos y trabajamos. Descubre sus aplicaciones más útiles y cómo integrarla en tu vida.',
};

// articles
export const articlesBlog = [
  articleBlog1,
  articleBlog2,
  articleBlog3,
  articleBlog4,
  articleBlog5,
] as ArticleInterface[];

// Aviso legal
export const legalNotice = [
  {
    text: `De acuerdo con el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSICE), se detallan los datos identificativos:`,
  },
  { text: `Razón social: Innovación Tecnológica S.A.` },
  { text: `NIF: ${dataWeb.nif}` },
  { text: `Dirección: ${dataWeb.address}` },
  { text: `Teléfono: ${dataWeb.phone}` },
  {
    text: `Email: <a href="mailto:${dataWeb.email}">${dataWeb.email}</a>`,
    isHtml: true,
  },
  { text: 'Términos y condiciones de uso', bold: true },
  { text: 'Uso indebido y responsabilidad', bold: true },
  { text: 'Enlaces', bold: true },
  { text: 'Política de privacidad y protección de datos', bold: true },
  { text: 'Política de Cookies', bold: true },
  { text: 'Legislación aplicable y jurisdicción', bold: true },
];
export const privacyPolicy = [
  {
    title: 'Política de Privacidad',
    content: `La empresa no es responsable de la recogida de datos personales a los usuarios en este apartado, ni será el encargado del tratamiento de los mismos. A los efectos del cumplimiento del Reglamento (UE) 2016/679 del Parlamento Europeo, de 27 de abril (GDPR), y la Ley Orgánica 3/2018, de Protección de Datos Personales y garantía de los derechos digitales de 5 de diciembre (LOPDGDD), se establece la siguiente información:`,
  },
  {
    title: 'Responsable del tratamiento',
    content: `Razón social: Innovación Tecnológica S.A. <br>
              NIF/CIF: ${dataWeb.nif} <br>
              Dirección: ${dataWeb.address} <br>
              Correo: <a href="mailto:${dataWeb.email}">${dataWeb.email}</a>`,
    isHtml: true,
  },
  {
    title: 'Finalidad',
    content: `Se trata la información que nos facilitan las personas interesadas a través de cualquiera de los diferentes formularios que se ponen a su disposición en la página web, con el fin de gestionar el envío de la información que nos soliciten, pudiendo elaborarse, de ser necesario, un perfil comercial en base a la información facilitada. No se tomarán decisiones automatizadas en base a dicho perfil. Los datos personales proporcionados se conservarán mientras se mantenga la relación mercantil y no se solicite su supresión por el interesado.`,
  },
  {
    title: 'Legitimación',
    content: `Se solicita el consentimiento del interesado para el tratamiento de sus datos y la oferta prospectiva de productos y servicios.`,
  },
  {
    title: 'Destinatarios',
    content: `Los datos personales no se cederán a terceros, salvo en su caso, otras empresas del grupo para fines administrativos internos o por obligación legal.`,
  },
  {
    title: 'Derechos',
    content: `Los interesados tienen derecho a acceder a sus datos personales, así como a solicitar la rectificación de los datos inexactos o, en su caso, solicitar su supresión cuando los datos ya no sean necesarios para los fines que fueron recogidos. También tendrán derecho a limitar u oponerse al tratamiento de sus datos, así como solicitar la portabilidad de los mismos. Para ejercer sus derechos deberá dirigirse al Responsable en la dirección ${dataWeb.email}, acompañado de copia del documento de identidad del interesado.`,
  },
  {
    title:
      '1. ¿Quién es el responsable del tratamiento de tus datos personales?',
    content: `Innovación Tecnológica S.A., NIF/CIF: ${dataWeb.nif}, dirección: ${dataWeb.address}, y correo electrónico <a href="mailto:${dataWeb.email}">${dataWeb.email}</a> es el RESPONSABLE del tratamiento de los datos personales del USUARIO y le informa de que estos datos serán tratados de conformidad con lo dispuesto en el Reglamento (UE) 2016/679, de 27 de abril (GDPR), y la Ley Orgánica 3/2018, de 5 de diciembre (LOPDGDD).`,
    isHtml: true,
  },
  {
    title:
      '2. ¿Con qué finalidad se tratan los datos y cuál es la base que legitima el tratamiento?',
    content: `Se trata la información que nos facilitan las personas interesadas con el fin de gestionar el envío de la información que nos soliciten, tramitar encargos, solicitudes, dar respuesta a consultas o cualquier tipo de petición realizada a través de las formas de contacto disponibles en la página web del RESPONSABLE.`,
  },
  {
    title: '3. ¿Cuánto tiempo se conservan los datos?',
    content: `Los datos personales proporcionados se conservarán mientras se mantenga la relación mercantil y no se solicite su supresión por el interesado. Cuando ya no sea necesario, se suprimirán con las medidas de seguridad adecuadas.`,
  },
  {
    title: '4. ¿Qué derechos existen y cómo ejercerlos?',
    content: `Los interesados tienen derecho a acceder a sus datos personales, así como a solicitar la rectificación de los datos inexactos o, en su caso, solicitar su supresión cuando los datos ya no sean necesarios para los fines que fueron recogidos. También tendrán derecho a limitar u oponerse al tratamiento de sus datos. Para ejercer sus derechos deberá ponerse en contacto con el Responsable en la dirección <a href="mailto:${dataWeb.email}">${dataWeb.email}</a>.`,
    isHtml: true,
  },
  {
    title: '5. ¿A quién facilitamos tus datos personales?',
    content: `Los datos personales no se cederán a terceros, salvo en su caso, otras empresas del grupo para fines administrativos internos o salvo obligación legal.`,
  },
  {
    title: '6. ¿Se toman decisiones automatizadas?',
    content: `No se tomarán decisiones automatizadas en base al perfil comercial.`,
  },
  {
    title: '7. ¿Se realizan transferencias internacionales de datos?',
    content: `No realizamos transferencias internacionales de sus datos.`,
  },
  {
    title: '8. ¿Por qué motivo podemos tratar tus datos personales?',
    content: `Se solicita el consentimiento del interesado para el tratamiento de sus datos y la oferta prospectiva de productos y servicios. Los datos personales obtenidos a través de los formularios del sitio web serán tratados únicamente en base al consentimiento otorgado por el interesado, el cual puede ser retirado en cualquier momento.`,
  },
  {
    title: 'Aviso legal',
    content: `Todos los textos, fotografías, logotipos, cupones, productos, servicios e imágenes visualizadas son recogidos por Innovación Tecnológica S.A., NIF/CIF: ${dataWeb.nif} bajo su responsabilidad única y exclusiva. Existen hojas de reclamaciones a disposición del consumidor en la dirección ${dataWeb.address}, pudiendo ponerse en contacto en cualquier momento en la dirección de correo electrónico <a href="mailto:${dataWeb.email}">${dataWeb.email}</a>.`,
    isHtml: true,
  },
];

export const purchaseTerms = [
  {
    title: 'CÓMO COMPRAR',
    content: `El acceso a ${dataWeb.nameShop} es libre y atribuye a quien lo realiza la condición de Usuario, independientemente del posterior uso de los productos ofrecidos. La compra de los productos sólo podrá realizarse por usuarios mayores de 18 años.`,
  },
  {
    title: 'FORMAS DE PAGO',
    isBold: true,
    content: `Todos los importes que se muestran en la página web aparecen en Euros €, y cualquier pago realizado en la plataforma deberá realizarse en la misma moneda. Los productos de venta directa a cliente final (persona física) vienen con su correspondiente IVA incluido en el precio.`,
  },
  {
    title: 'BIZUM',
    isPaymentMethod: true,
    content: `Si selecciona como forma de pago Bizum, una vez finalizado el pedido a través de la página web, en la siguiente pantalla aparecerá el número de teléfono correspondiente para realizar la operación. La compra se realizará inmediatamente después de realizar el pedido. Es muy importante que indique en el Concepto de pago su “nº de pedido, su nombre y apellidos (${dataWeb.name})” para poder validarla.`,
  },
  {
    title: 'TARJETA DE CRÉDITO O DÉBITO',
    isPaymentMethod: true,
    content: `Si selecciona la forma de pago con tarjeta de crédito o débito, una vez finalizado el pedido, aparecerá en la siguiente pantalla los datos que deberá rellenar de su tarjeta. La compra se realizará inmediatamente después de realizar el pedido.`,
  },
  {
    title: 'TRANSFERENCIA BANCARIA',
    isPaymentMethod: true,
    content: `Si selecciona como forma de pago transferencia bancaria, una vez finalizado el pedido, recibirá un email con la factura de compra, con el importe a abonar y los datos de la cuenta bancaria donde deberá realizar el pago. Es importante que indique en el Concepto de la transferencia el “n° de factura, su nombre y apellidos (${dataWeb.name})” para poder validarla. No se considerará efectuado el pago de un pedido hasta que el importe total del pago haya sido recibido en nuestra cuenta. Dispone de 7 días hábiles desde la realización del pedido para realizar la transferencia, pasados esos días, se anulará el pedido. Todas las eventuales comisiones bancarias corren por su cuenta al optar por este sistema de pago. Existe la opción de realizar una transferencia inmediata en su banco y de esta manera tramitaremos su pedido en el momento.`,
  },
  {
    title: 'CONTRA REEMBOLSO',
    isPaymentMethod: true,
    content: `Si se selecciona como forma de pago Contra Reembolso, el importe se cobrará por el repartidor en efectivo. Debe tener el importe exacto preparado, ya que los repartidores no tienen la obligación de llevar cambio. La comisión de reembolso será de 3€ (IVA incluido). El importe máximo que se puede cobrar en efectivo, al destinatario son 1.000 €. En el caso de que el cliente rechace la entrega de un pedido con Servicio de Contra Reembolso, ${dataWeb.nameShop} se reserva el derecho a cancelar los próximos pedidos del cliente.`,
  },
];
export const refundPolicy = [
  {
    title: 'DEVOLUCIONES, GARANTÍAS Y CANCELACIONES',
    content: `Si por algún motivo no queda satisfecho con su compra, tiene un plazo de 14 días desde la fecha de entrega para notificar a <a href="mailto:${dataWeb.email}">${dataWeb.email}</a>. (Conforme al art. 71 del Real Decreto Legislativo 1/2007). Los gastos generados por la devolución del producto correrán a cargo del comprador.`,
    isHtml: true,
  },
  {
    content: `Para ejercer el derecho de desistimiento, el cliente deberá notificar a <a href="mailto:${dataWeb.email}">${dataWeb.email}</a> su decisión de desistir del contrato mediante una declaración inequívoca (por ejemplo, una carta enviada por correo electrónico).`,
    isHtml: true,
  },
  {
    content: `${dataWeb.nameShop} no reembolsará el importe del producto hasta que este sea devuelto en perfectas condiciones y en su embalaje original, incluyendo todos los accesorios, manuales y garantías. Los productos que presenten daños debido a un embalaje inapropiado no serán aceptados.`,
  },
  {
    content: `La dirección de envío para devoluciones será proporcionada por ${dataWeb.nameShop} mediante correo electrónico.`,
  },
  {
    content: `${dataWeb.nameShop} reembolsará el importe total del producto mediante transferencia bancaria una vez confirmada la recepción en las condiciones establecidas.`,
  },
  {
    content: `Los costos de envío para devoluciones correrán a cargo del cliente. ${dataWeb.nameShop} no aceptará devoluciones contra reembolso.`,
  },
  {
    content: `El derecho de desistimiento no será aplicable en los siguientes casos:`,
  },
  {
    isList: true,
    items: [
      'Productos personalizados o fabricados según especificaciones del cliente.',
      'Software, licencias digitales o productos tecnológicos que hayan sido activados o registrados.',
      'Artículos cuyo precinto de seguridad haya sido retirado o dañados tras la entrega.',
    ],
  },
  {
    content: `Para consultas adicionales sobre devoluciones o garantías, el cliente puede comunicarse con el servicio de atención al cliente de ${dataWeb.nameShop} en horario comercial mediante el correo <a href="mailto:${dataWeb.email}">${dataWeb.email}</a> o al teléfono ${dataWeb.phone}.`,
    isHtml: true,
  },
  {
    title: 'Cancelación de Pedidos',
    isHighlight: true,
    content: `El cliente podrá cancelar un pedido siempre que no haya sido procesado y enviado. En caso de que el pedido ya haya sido enviado, se considerará una devolución y se aplicarán las condiciones de reembolso mencionadas anteriormente.`,
  },
];
export const footerText = `Todos los productos y servicios ofrecidos en esta plataforma están diseñados para mejorar la experiencia tecnológica de nuestros usuarios. Las especificaciones técnicas y funcionalidades están sujetas a cambios sin previo aviso. Por favor, consulte a un especialista antes de implementar soluciones tecnológicas avanzadas. Los nombres, logotipos y marcas utilizadas en este sitio son propiedad de sus respectivos dueños. Siempre garantizamos el cumplimiento de los estándares más altos de calidad en el sector tecnológico.`;

export const shippingMethodText: string[] = [
  `Realizamos envíos urgentes en 24-48 horas laborables con las principales empresas de mensajería.`,
  `Si tu pedido supera los 70 euros, los gastos de envío son completamente gratuitos.`,
  `Tus iPhones viajan asegurados y empaquetados con sumo cuidado para garantizar que lleguen en perfecto estado.`,
  `Nuestros gastos de envío incluyen manipulación, embalaje reforzado y seguimiento online de tu paquete.`,
  `Te recomendamos agrupar todos tus productos en un mismo pedido para optimizar los costes de envío.`,
  `En caso de cualquier incidencia con la entrega, contacta con nosotros de inmediato y lo resolveremos cuanto antes.`,
  `Enviamos de forma rápida y fiable, para que disfrutes de tu nuevo iPhone sin demoras innecesarias.`,
  `Ofrecemos un seguro de transporte adicional para mayor tranquilidad ante posibles daños o extravíos.`,
  `Indícanos un correo electrónico de contacto para recibir todas las notificaciones de seguimiento y entrega.`,
  `<strong>¿DÓNDE ESTÁ MI PEDIDO?</strong> Puedes verificar en cualquier momento el estado de tu envío a través del enlace de seguimiento que recibirás por email.`,
  `Pagando hoy, tu iPhone sale de nuestro almacén cuanto antes, listo para llegar en pocos días a tu dirección.`,
  `Compra con total confianza: nuestros envíos son ágiles, seguros y respaldados por un servicio de atención al cliente de primer nivel.`,
];
