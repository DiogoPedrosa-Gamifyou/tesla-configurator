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
  configs: Array<ModelOptionsConfig>;
  towHitch: boolean;
  yoke: boolean;
}

export interface ModelOptionsConfig {
  id: number;
  description: string;
  range: number;
  speed: number;
  price: number;
}

export interface SelectedOptionConfig {
  config: ModelOptionsConfig,
  towHitch: boolean;
  yoke: boolean;
}
