export const enum EFormKeys {
  NAME = "name",
  ADDRESS_CITY = "address.city",
  COMPANY_NAME = "company.name",
  EMAIL = "email",
  USERNAME = "username",
  PHONE = "phone",
}

export const formKeysTitle: Record<EFormKeys, string> = {
  [EFormKeys.NAME]: "Имя",
  [EFormKeys.USERNAME]: "Никнейм",
  [EFormKeys.EMAIL]: "Почта",
  [EFormKeys.ADDRESS_CITY]: "Город",
  [EFormKeys.PHONE]: "Телефон",
  [EFormKeys.COMPANY_NAME]: "Название компании",
};

export const formKeysData: Array<EFormKeys> = [
  EFormKeys.NAME,
  EFormKeys.USERNAME,
  EFormKeys.EMAIL,
  EFormKeys.ADDRESS_CITY,
  EFormKeys.PHONE,
  EFormKeys.COMPANY_NAME,
];
