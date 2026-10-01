import 'reflect-metadata';

export interface IComic {
  id: number;
  image: string;
  title_series: string;
  title_bf: string;
  artist: string;
  writer: string;
  publisher: string;
  volume_number: number;
  total_volumes: number;
  summary_series: string;
  summary_bf: string;
}

export interface IComicCreate extends Omit<IComic, 'id'> {
  image?: string;
  [key: string]: any;
}
