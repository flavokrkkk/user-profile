export interface IAddress {
  street: string;
  city: string;
}

export interface ICompany {
  name: string;
}

export interface IUser {
  id?: number;
  name: string;
  username: string;
  photo: string | null;
  email: string;
  address: IAddress;
  phone: string;
  company: ICompany;
  isArchived: boolean;
}
