export interface ICard {
  id: string;
  mtgo_id: number;
  arena_id: number;
  tcgplayer_id: number;
  cardmarket_id: number;
  name: string;
  lang: string;
  released_at: Date;

  image_uris: {
    small: string;
    normal: string;
    large: string;
    png: string;
    art_crop: string;
    border_crop: string;
  };

  type_line: string;
  oracle_text: string;
  power: string;
  toughness: string;

  colors: string[];
  keywords: string[];
  legalities: any;

  games: string[];
  finishes: string[];
  set_id: string;
  set: string;
  set_name: string;

  collector_number: number;
  rarity: string;
  artist: string;
  artist_ids: string;

  prices: {
    usd: number;
    eur: number;
    tix: number;
  };

  purchase_uris: {
    tcgplayer: string;
    cardmarket: string;
    cardhoarder: string;
  };
}
