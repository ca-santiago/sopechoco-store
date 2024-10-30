import { Product, ProductExtra } from "@/types";

const __products: Product[] = [
  {
    id: 'ee280eab-449d-4838-9213-eef12fd87359',
    name: 'Sope',
    price: 81,
    description: 'Especialidad de la casa. Sope tabasqueño hecho de tortilla de mano y guisos de la casa',
    extras: [
      {
        id: 'sopes-guisos-1',
        title: 'Chose your guiso',
        // description: 'Sope completo o mitad y mitad',
        extrasId: [
          '986965e5-759f-4c2e-b88b-73511983eabd',
          '2fc7a4e3-1dcc-4ef7-9cb4-c85ac506bfc2',
          '3276f5b7-5d63-4667-a9ba-57cde8b47515'
        ],
        min: 1,
        max: 2,
        multiSelect: false,
        countLimit: 2,
      }
    ],
    images: [],
    limit: 5,
    status: 'ACTIVE',
    inventoryQuantity: 10,
  },
  {
    id: '90637cf2-89b6-45fd-9880-d338735447ee',
    name: 'Orden de tacos',
    price: 0,
    description: 'Ricos tacos de guisos de la casa',
    extras: [
      {
        id: 'tacos-guisos-1',
        title: 'Chose your guiso',
        // description: 'Select one guiso',
        extrasId: [
          '74465580-4b4b-4130-91c7-9c3e3adfa827',
          'b3c66df9-df74-438d-b283-35e0c307b0ee',
          '3276f5b7-5d63-4667-a9ba-57cde8b47515',
        ],
        min: 1,
        max: 10,
        multiSelect: true,
        countLimit: 10,
      },
      {
        id: 'tacos-bebidas-1',
        title: 'Chose your drink',
        // description: 'Select one drink',
        extrasId: [
          'dcffe503-e809-4c6f-acf2-56e36595aec8',
          'dfe08bad-94a8-4476-9331-5dd68e5882ef',
        ],
        min: 0,
        max: 99,
        multiSelect: false,
        countLimit: -1,
      }
    ],
    status: "ACTIVE",
    inventoryQuantity: 100,
    images: [],
  },
  {
    id: '8418032c-4042-4d4d-a813-95d332648d05',
    name: 'Quesadillas',
    price: 75,
    description: 'Mexican dish made of tortilla, cheese, and some other stuff',
    extras: [],
    status: 'ACTIVE',
    inventoryQuantity: 10,
    images: [],
  }
];

const __extras: ProductExtra[] = [
  {
    id: '986965e5-759f-4c2e-b88b-73511983eabd',
    name: 'Chicarron',
    price: 5,
    description: 'Some nice guacamole',
  },
  {
    id: '2fc7a4e3-1dcc-4ef7-9cb4-c85ac506bfc2',
    name: 'Salpicon',
    price: 0,
    description: 'Some nice'
  },
  {
    id: '74465580-4b4b-4130-91c7-9c3e3adfa827',
    name: 'Chicharron prenzado',
    price: 3,
    description: 'Some nice guacamole',
  },
  {
    id: 'b3c66df9-df74-438d-b283-35e0c307b0ee',
    name: 'Pastor',
    price: 4,
    description: 'Some nice'
  },
  {
    id: '3276f5b7-5d63-4667-a9ba-57cde8b47515',
    name: 'Cheese',
    price: 5,
    description: 'Some nice',
  },
  {
    id: 'dcffe503-e809-4c6f-acf2-56e36595aec8',
    name: 'Refresco de fresa',
    price: 6,
    description: ''
  },
  {
    id: 'dfe08bad-94a8-4476-9331-5dd68e5882ef',
    name: 'Coca de piña',
    price: 7,
    description: ''
  }
];

export {
  __products,
  __extras,
}