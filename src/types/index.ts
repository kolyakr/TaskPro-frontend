export interface loginFormData {
  email: string;
  password: string;
}

export interface registerFormData extends loginFormData {
  name: string;
}
