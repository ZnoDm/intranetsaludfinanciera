

export interface Usuario {
  id?:       number;
  email?:    string;
  isActive?: boolean;
  person?:   Person;
}

export interface Person {
  id?:                     number;
  nombres?:                string;
  apellidos?:              string;
  telefono?:               string;
  tipoDocumentoIdentidad?: null;
  documentoIdentidad?:     null;
  urlAvatar?:              string;
}

