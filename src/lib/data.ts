import { Product, Order, Address, PaymentMethod } from './types';

export const products: Product[] = [
  // Bolsas
  {
    id: 'bag-1',
    name: 'Bolso Elegance Noir',
    description: 'Bolso de cuero genuino con acabado premium y herrajes dorados. Diseño atemporal para cualquier ocasión.',
    price: 2450,
    category: 'bolsas',
    color: 'Negro',
    material: 'Cuero genuino',
    image: 'https://d64gsuwffb70l.cloudfront.net/696804b6cb13eec5f0d9151b_1768424735464_89b443d0.png',
    badge: 'bestseller',
    inStock: true
  },
  {
    id: 'bag-2',
    name: 'Tote Milano',
    description: 'Tote espacioso ideal para el día a día. Compartimentos interiores y cierre magnético.',
    price: 1890,
    originalPrice: 2200,
    category: 'bolsas',
    color: 'Camel',
    material: 'Cuero italiano',
    image: 'https://d64gsuwffb70l.cloudfront.net/696804b6cb13eec5f0d9151b_1768424735589_d05e7ef5.png',
    badge: 'nuevo',
    inStock: true
  },
  {
    id: 'bag-3',
    name: 'Crossbody Chic',
    description: 'Bolso cruzado compacto con correa ajustable. Perfecto para looks casuales y elegantes.',
    price: 1650,
    category: 'bolsas',
    color: 'Burgundy',
    material: 'Cuero napa',
    image: 'https://d64gsuwffb70l.cloudfront.net/696804b6cb13eec5f0d9151b_1768424736700_3bc89142.png',
    inStock: true
  },
  {
    id: 'bag-4',
    name: 'Clutch Soirée',
    description: 'Clutch de noche con cadena dorada desmontable. Elegancia pura para eventos especiales.',
    price: 1290,
    category: 'bolsas',
    color: 'Dorado',
    material: 'Cuero metalizado',
    image: 'https://d64gsuwffb70l.cloudfront.net/696804b6cb13eec5f0d9151b_1768424732897_35fc4454.jpg',
    badge: 'nuevo',
    inStock: true
  },
  {
    id: 'bag-5',
    name: 'Satchel Vintage',
    description: 'Inspirado en diseños clásicos con un toque moderno. Cierre de hebilla y asa superior.',
    price: 2100,
    category: 'bolsas',
    color: 'Cognac',
    material: 'Cuero envejecido',
    image: 'https://d64gsuwffb70l.cloudfront.net/696804b6cb13eec5f0d9151b_1768424734655_a9ca5b76.jpg',
    inStock: true
  },
  {
    id: 'bag-6',
    name: 'Hobo Luxe',
    description: 'Bolso hobo suave y espacioso. Diseño relajado con acabados de lujo.',
    price: 1980,
    category: 'bolsas',
    color: 'Gris',
    material: 'Cuero suave',
    image: 'https://d64gsuwffb70l.cloudfront.net/696804b6cb13eec5f0d9151b_1768424738384_4c10cc05.png',
    badge: 'bestseller',
    inStock: true
  },
  // Billeteras
  {
    id: 'wallet-1',
    name: 'Billetera Compact',
    description: 'Billetera compacta con múltiples compartimentos para tarjetas y efectivo.',
    price: 890,
    category: 'billeteras',
    color: 'Negro',
    material: 'Cuero genuino',
    image: 'https://d64gsuwffb70l.cloudfront.net/696804b6cb13eec5f0d9151b_1768424753464_c45c854d.jpg',
    badge: 'bestseller',
    inStock: true
  },
  {
    id: 'wallet-2',
    name: 'Cartera Continental',
    description: 'Cartera larga con cierre y espacio para smartphone. Elegancia funcional.',
    price: 1250,
    originalPrice: 1450,
    category: 'billeteras',
    color: 'Nude',
    material: 'Cuero saffiano',
    image: 'https://d64gsuwffb70l.cloudfront.net/696804b6cb13eec5f0d9151b_1768424759565_c8f7ce16.png',
    badge: 'nuevo',
    inStock: true
  },
  {
    id: 'wallet-3',
    name: 'Billetera Slim',
    description: 'Diseño ultra delgado para bolsillos. Tecnología RFID bloqueada.',
    price: 750,
    category: 'billeteras',
    color: 'Marrón',
    material: 'Cuero italiano',
    image: 'https://d64gsuwffb70l.cloudfront.net/696804b6cb13eec5f0d9151b_1768424758433_9c06968f.jpg',
    inStock: true
  },
  {
    id: 'wallet-4',
    name: 'Monedero Charm',
    description: 'Monedero pequeño con cierre de beso. Ideal para llevar lo esencial.',
    price: 490,
    category: 'billeteras',
    color: 'Rosa',
    material: 'Cuero napa',
    image: 'https://d64gsuwffb70l.cloudfront.net/696804b6cb13eec5f0d9151b_1768424756912_b10df98b.jpg',
    inStock: true
  },
  {
    id: 'wallet-5',
    name: 'Tarjetero Executive',
    description: 'Tarjetero profesional con capacidad para 12 tarjetas. Acabado premium.',
    price: 650,
    category: 'billeteras',
    color: 'Azul marino',
    material: 'Cuero grabado',
    image: 'https://d64gsuwffb70l.cloudfront.net/696804b6cb13eec5f0d9151b_1768424762922_991a515b.png',
    badge: 'nuevo',
    inStock: true
  },
  // Accesorios
  {
    id: 'acc-1',
    name: 'Cinturón Classic',
    description: 'Cinturón de cuero con hebilla dorada. Ancho perfecto para cualquier ocasión.',
    price: 590,
    category: 'accesorios',
    color: 'Negro',
    material: 'Cuero genuino',
    image: 'https://d64gsuwffb70l.cloudfront.net/696804b6cb13eec5f0d9151b_1768424778059_ae05e3f9.jpg',
    badge: 'bestseller',
    inStock: true
  },
  {
    id: 'acc-2',
    name: 'Llavero Signature',
    description: 'Llavero de cuero con charm metálico. El detalle perfecto para tus llaves.',
    price: 290,
    category: 'accesorios',
    color: 'Camel',
    material: 'Cuero y metal',
    image: 'https://d64gsuwffb70l.cloudfront.net/696804b6cb13eec5f0d9151b_1768424784674_975f7982.png',
    inStock: true
  },
  {
    id: 'acc-3',
    name: 'Porta Pasaporte',
    description: 'Funda elegante para pasaporte con ranuras para tarjetas de embarque.',
    price: 450,
    category: 'accesorios',
    color: 'Burgundy',
    material: 'Cuero saffiano',
    image: 'https://d64gsuwffb70l.cloudfront.net/696804b6cb13eec5f0d9151b_1768424779190_e8098f85.jpg',
    badge: 'nuevo',
    inStock: true
  },
  {
    id: 'acc-4',
    name: 'Estuche Tech',
    description: 'Estuche para cables y accesorios tecnológicos. Organización con estilo.',
    price: 390,
    category: 'accesorios',
    color: 'Gris',
    material: 'Cuero y nylon',
    image: 'https://d64gsuwffb70l.cloudfront.net/696804b6cb13eec5f0d9151b_1768424782410_cf4e8bb4.jpg',
    inStock: true
  },
  {
    id: 'acc-5',
    name: 'Charm Bag',
    description: 'Charm decorativo para bolsos. Añade personalidad a tu bolso favorito.',
    price: 190,
    category: 'accesorios',
    color: 'Dorado',
    material: 'Metal y cuero',
    image: 'https://d64gsuwffb70l.cloudfront.net/696804b6cb13eec5f0d9151b_1768424782573_d5bfb3aa.jpg',
    inStock: true
  }
];

export const heroImage = 'https://images.unsplash.com/photo-1564422170191-4bd349fdd816?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3';

export const craftImages = [
  'https://d64gsuwffb70l.cloudfront.net/696804b6cb13eec5f0d9151b_1768424834362_10d305f7.jpg',
  'https://d64gsuwffb70l.cloudfront.net/696804b6cb13eec5f0d9151b_1768424843921_86adba10.png'
];

export const mockAddresses: Address[] = [
  {
    id: 'addr-1',
    name: 'Casa',
    street: 'Av. Reforma 123, Col. Juárez',
    city: 'Ciudad de México',
    state: 'CDMX',
    zipCode: '06600',
    country: 'México',
    isDefault: true
  },
  {
    id: 'addr-2',
    name: 'Oficina',
    street: 'Paseo de la Reforma 505, Piso 12',
    city: 'Ciudad de México',
    state: 'CDMX',
    zipCode: '06500',
    country: 'México',
    isDefault: false
  }
];

export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: 'pm-1',
    type: 'visa',
    lastFour: '4242',
    expiryMonth: '12',
    expiryYear: '2027',
    isDefault: true
  },
  {
    id: 'pm-2',
    type: 'mastercard',
    lastFour: '8888',
    expiryMonth: '06',
    expiryYear: '2026',
    isDefault: false
  }
];

export const mockOrders: Order[] = [
  {
    id: 'order-1',
    orderNumber: 'BJ-2026-001234',
    date: '2026-01-10',
    status: 'entregado',
    items: [
      { product: products[0], quantity: 1 },
      { product: products[6], quantity: 1 }
    ],
    subtotal: 3340,
    shipping: 0,
    tax: 534.40,
    total: 3874.40,
    shippingAddress: mockAddresses[0],
    paymentMethod: mockPaymentMethods[0]
  },
  {
    id: 'order-2',
    orderNumber: 'BJ-2026-001189',
    date: '2026-01-05',
    status: 'enviado',
    items: [
      { product: products[1], quantity: 1 }
    ],
    subtotal: 1890,
    shipping: 150,
    tax: 326.40,
    total: 2366.40,
    shippingAddress: mockAddresses[1],
    paymentMethod: mockPaymentMethods[1]
  },
  {
    id: 'order-3',
    orderNumber: 'BJ-2025-001098',
    date: '2025-12-20',
    status: 'entregado',
    items: [
      { product: products[10], quantity: 2 },
      { product: products[11], quantity: 1 }
    ],
    subtotal: 1470,
    shipping: 99,
    tax: 251.04,
    total: 1820.04,
    shippingAddress: mockAddresses[0],
    paymentMethod: mockPaymentMethods[0]
  }
];
