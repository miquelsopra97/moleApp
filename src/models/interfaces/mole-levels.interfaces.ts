export interface IMolePoints {
  points: number;
  interval: number;
}

export interface IMoleLevels {
  [key: string]: IMolePoints;
}
