import { ICard } from "./ICard";

export interface ICards {
  total_cards: number;
  has_more: boolean;
  cards: ICard[];
}
