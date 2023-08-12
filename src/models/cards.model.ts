import { Card } from '@/interfaces/cards.interface';
import { query, run, all } from '@/utils/promise.db';

class CardsModel {
  async createCard(word: string): Promise<Card | null> {
    const result = await run('INSERT INTO cards (word) VALUES (?)', [word]);
    if (!result) {
      return null;
    }
    return result as Card;
  }

  async updateCard(id: number, info: { word: string }): Promise<Card | null> {
    const result = await run(
      `
    UPDATE cards
    SET word = ? WHERE id = ?
  `,
      [info.word, id],
    );
    if (!result) {
      return null;
    }
    return result as Card;
  }

  async deleteCard(id: number): Promise<Card | null> {
    const result = await run(`DELETE FROM cards WHERE id = ?`, [id]);
    if (!result) {
      return null;
    }
    return result as Card;
  }

  async fetchCards(): Promise<Card[] | null> {
    const result = await all('SELECT * FROM cards');
    if (!result) {
      return null;
    }
    return result as Card[];
  }

  async getCardById(id: number): Promise<Card | null> {
    const result = await query('SELECT * FROM cards WHERE id = ?', [id]);
    if (!result) {
      return null;
    }
    return result as Card;
  }
}

export default CardsModel;
