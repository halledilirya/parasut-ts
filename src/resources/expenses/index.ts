import type {
  GetPurchaseBillsParams,
  GetPurchaseBillsResponse,
} from "./purchase_bills";
import PurchaseBills from "./purchase_bills";

export default class Expenses {
  public purchase_bills: PurchaseBills = new PurchaseBills();

  /**
   * @param params {@link GetPurchaseBillsParams}
   * @returns Promise<{@link GetPurchaseBillsResponse}>
   * @example
   * const response = await expenses.getPurchaseBills({
   *    filter?: {
   *      issue_date?: "2021-01-01",
   *      due_date?: "2021-01-01",
   *      supplier_id?: 1,
   *      item_type?: "purchase_bill",
   *      spender_id?: 2,
   *    },
   *    sort?: "issue_date",
   *    page?: {
   *      number?: 2,
   *      size?: 25,
   *    },
   *    include?: "category,spender,details",
   * });
   * console.log(response);
   */
  async getPurchaseBills(
    params?: GetPurchaseBillsParams
  ): Promise<GetPurchaseBillsResponse> {
    return this.purchase_bills.retrieve(params);
  }
}

export type {
  GetPurchaseBillsParamsInclude,
  GetPurchaseBillsParams,
  GetPurchaseAttributes,
  GetPurchaseRelationships,
  GetPurchaseBillsResponse,
} from "./purchase_bills";
