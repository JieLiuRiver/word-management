import { Card } from '@/interfaces/cards.interface';
import { formatNumber } from '@/utils';
import { get, all, run } from '@/utils/promise.db';

class CardsModel {
  /**
   * create card
   * @param user_input card's user_input
   * @returns Card
   */
  async createCard(user_input: string): Promise<Card | null> {
    try {
      await run('BEGIN');
      const maxId = await this.getMaxId();
      const result = await run('INSERT INTO cards (user_input, no) VALUES (?, ?)', [user_input, formatNumber(maxId + 1)]);
      await run('COMMIT');
      if (!result) {
        return null;
      }
      return result as Card;
    } catch (error) {
      await run('ROLLBACK');
    }
  }

  private async getMaxId() {
    let id = 1;
    try {
      const row = await get('SELECT MAX(id) as maxId FROM cards');
      id = row.maxId;
    } catch (error) {
      console.error(error);
    } finally {
      return id;
    }
  }

  /**
   * update card
   * @param id cardid
   * @param info info.user_input string
   * @returns Card
   */
  async updateCard(id: number, info: { user_input: string }): Promise<Card | null> {
    try {
      await run('BEGIN');
      await run(
        `UPDATE cards
         SET user_input = ? WHERE id = ?`,
        [info.user_input, id],
      );
      const newCard = await this.getCardById(id);
      await run('COMMIT');
      return newCard as Card;
    } catch (error) {
      await run('ROLLBACK');
    }
  }

  /**
   * delete card
   * @param id cardid
   * @returns Card
   */
  async deleteCard(id: number): Promise<Card | null> {
    const result = await run(`DELETE FROM cards WHERE id = ?`, [id]);
    if (!result) {
      return null;
    }
    return result as Card;
  }

  /**
   * fetch cards with page featiure
   * @param pageNumber default 1
   * @param pageSize default 10
   * @returns
   */
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

    const count = await this.getCount();
    if (!result) {
      return null;
    }

    return {
      rows: result as Card[],
      meta: {
        total: count,
        pageNumber,
        pageSize,
      },
    };
  }

  public async getCount() {
    const countResponse = await get(`
      SELECT COUNT(*) AS count FROM cards
    `);
    return (countResponse as { count: number }).count;
  }

  /**
   * get card by id
   * @param id  cardid
   * @returns
   */
  async getCardById(id: number): Promise<Card | null> {
    const result = await get('SELECT * FROM cards WHERE id = ?', [id]);
    if (!result) {
      return null;
    }
    return result as Card;
  }
}

export default CardsModel;
