import { Product, PRODUCT_STATUS, ProductExtra } from "@/types";

const __products: Product[] = [
  {
    id: '',
    name: 'Sope',
    price: 81,
    description: 'Especialidad de la casa. Sope tabasqueño hecho de tortilla de mano y guisos de la casa',
    extras: [
      {
        id: 'sopes-guisos-1',
        title: 'Chose your guiso',
        // description: 'Sope completo o mitad y mitad',
        extrasId: [
          '1',
          '2',
          '5'
        ],
        min: 1,
        max: 2,
      }
    ],
    limit: 5,
    status: PRODUCT_STATUS.ACTIVE,
    inventoryQuantity: 10,
  },
  {
    id: '2',
    name: 'Orden de tacos',
    price: 12,
    description: 'Ricos tacos de guisos de la casa',
    extras: [
      {
        id: 'tacos-guisos-1',
        title: 'Chose your guiso',
        // description: 'Select one guiso',
        extrasId: [
          '3',
          '4',
          '5',
        ],
        min: 1,
        max: 1,
      }
    ],
    status: PRODUCT_STATUS.ACTIVE,
    inventoryQuantity: 100,
  },
  {
    id: '3',
    name: 'Quesadillas',
    price: 75,
    description: 'Mexican dish made of tortilla, cheese, and some other stuff',
    extras: [],
    status: PRODUCT_STATUS.INACTIVE,
    inventoryQuantity: 10,
  }
];

const __extras: ProductExtra[] = [
  {
    id: '1',
    name: 'Chicarron',
    price: 1,
    description: 'Some nice guacamole',
  },
  {
    id: '2',
    name: 'Sour cream',
    price: 2,
    description: 'Some nice'
  },
  {
    id: '3',
    name: 'Chicharron',
    price: 3,
    description: 'Some nice guacamole',
  },
  {
    id: '4',
    name: 'Pastor',
    price: 4,
    description: 'Some nice'
  },
  {
    id: '5',
    name: 'Cheese',
    price: 5,
    description: 'Some nice',
  },
];

export {
  __products,
  __extras,
}