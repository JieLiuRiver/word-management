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
    try {
      await run('BEGIN');
      await run(
        `UPDATE cards
         SET word = ? WHERE id = ?`,
        [info.word, id],
      );
      const newCard = await this.getCardById(id);
      await run('COMMIT');
      return newCard as Card;
    } catch (error) {
      await run('ROLLBACK');
    }
  }

  async deleteCard(id: number): Promise<Card | null> {
    const result = await run(`DELETE FROM cards WHERE id = ?`, [id]);
    if (!result) {
      return null;
    }
    return result as Card;
  }

  async fetchCards(
    pageNumber = 1,
    pageSize = 10,
  ): Promise<{
    rows: Card[];
    meta: {
      total: number;
      pageNumber: number;
      pageSize: number;
    };
  } | null> {
    const offset = (pageNumber - 1) * pageSize;
    const result = await all(`
      SELECT * FROM cards
      ORDER BY updateTime DESC
      LIMIT ${pageSize}
      OFFSET ${offset}
    `);

    const countResponse = await query(`
      SELECT COUNT(*) AS count FROM cards
    `);
    if (!result) {
      return null;
    }

    return {
      rows: result as Card[],
      meta: {
        total: (countResponse as { count: number }).count,
        pageNumber,
        pageSize,
      },
    };
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
