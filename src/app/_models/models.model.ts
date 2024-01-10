export interface Model {
  code: string;
  description: string;
  colors: Array<ModelColor>;
}

export interface ModelColor {
  code: string;
  description: string;
  price: number;
}

export interface ModelOptions {
  // TODO
}
