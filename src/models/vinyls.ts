import 'reflect-metadata';

export interface IVinyl {
  id: number;
  cover: string;
  group_name: string;
  album_title: string;
  track_count: number;
  track_list: string;
  music_style: string;
  publisher: string;
  release_date: Date;
}

export interface IVinylCreate extends Omit<IVinyl, 'id'> {
  cover?: string;
  [key: string]: any;
}
