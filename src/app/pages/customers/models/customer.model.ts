export class Customer {
  id!: number;
  name!: string;
  lastname!: string;
  email!: string;
  address!: address[];
}

export class address {
  id!: number;
  cep!: number;
  city!: string;
  street!: string;
  uf!: string;
  district!: string;
  info!: string;
}
