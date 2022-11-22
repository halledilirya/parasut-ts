import type {
  CreateEArchivesAttributes,
  CreateEArchivesParams,
  CreateEArchivesRelationships,
  CreateEArchivesResponse,
  ShowEArchivesResponse,
  ShowPDFEArchivesResponse,
} from "./e_archives";
import type {
  GetEInvoiceInboxesParams,
  GetEInvoiceInboxesResponse,
} from "./e_invoice_inboxes";
import EArchives from "./e_archives";
import EInvoiceInboxes from "./e_invoice_inboxes";

export default class Legalize {
  public e_archives: EArchives = new EArchives();
  public e_invoice_inboxes: EInvoiceInboxes = new EInvoiceInboxes();

  /**
   * Codes: {@link https://ebelge.gib.gov.tr/dosyalar/kilavuzlar/UBLTR_1.2.1_Kilavuzlar.zip}
   * @param {CreateEArchivesAttributes} params.attributes {@link CreateEArchivesAttributes}
   * @param {CreateEArchivesRelationships} params.relationships {@link CreateEArchivesRelationships}
   * @param {string} params.attributes.internet_sale.payment_date YYYY-MM-DD format
   * @returns Promise<{@link CreateEArchivesResponse}>
   * @example
   * const attributes = {
   *    vat_withholding_code?: "1",
   *    vat_exemption_reason_code?: "1",
   *    vat_exemption_reason?: "KDV Muafiyet Nedeni",
   *    note?: "Not",
   *    excise_duty_codes?: [
   *      {
   *        product: 1,
   *        sales_excise_duty_code: "57",
   *      },
   *    ],
   *    internet_sale?: {
   *      url: "https://www.example.com",
   *      payment_type: "KREDIKARTI/BANKAKARTI",
   *      payment_platform: "PayTR",
   *      payment_date: "2021-01-01",
   *    },
   *    shipment?: {
   *      title?: "Kargo Şirketi",
   *      vkn?: "1234567890",
   *      name?: "Kurye Adı",
   *      tckn?: "12345678901",
   *      date: "2021-01-01",
   *    },
   * };
   * const relationships = {
   *    sales_invoice: {
   *      data: {
   *        id: "1",
   *        type: "sales_invoices",
   *      },
   *    },
   * };
   * const response = await legalize.createEArchives({ attributes, relationships });
   * console.log(response);
   */
  async createEArchives(params: {
    attributes: CreateEArchivesAttributes;
    relationships: CreateEArchivesRelationships;
  }): Promise<CreateEArchivesResponse> {
    const { attributes, relationships } = params;
    return this.e_archives.create({
      data: {
        type: "e_archives",
        attributes,
        relationships,
      },
    });
  }

  /**
   * @param id string
   * @param include "sales_invoice"
   * @returns Promise<{@link ShowEArchivesResponse}>
   * @example
   * const response = await legalize.showEArchives("1", "sales_invoice");
   * console.log(response);
   */
  async showEArchives(
    id: string,
    include?: "sales_invoice"
  ): Promise<ShowEArchivesResponse> {
    return this.e_archives.show(id, include);
  }

  /**
   * @param id string
   * @returns Promise<{@link ShowPDFEArchivesResponse}>
   * @example
   * const response = await legalize.showPDFEArchives("1");
   * console.log(response);
   */
  async showPDFEArchives(id: string): Promise<ShowPDFEArchivesResponse> {
    return this.e_archives.showPDF(id);
  }

  /**
   * @param params {@link GetEInvoiceInboxesParams}
   * @returns Promise<{@link GetEInvoiceInboxesResponse}>
   * @example
   * const response = await legalize.getEInvoiceInboxes();
   * console.log(response);
   * @example
   * const response = await legalize.getEInvoiceInboxes({
   *    filter: {
   *      vkn: "1234567890",
   *    },
   *    page: {
   *      size: 10,
   *      number: 1,
   *    },
   * });
   * console.log(response);
   */
  async getEInvoiceInboxes(
    params?: GetEInvoiceInboxesParams
  ): Promise<GetEInvoiceInboxesResponse> {
    return this.e_invoice_inboxes.retrieve(params);
  }
}

export type {
  CreateEArchivesParams,
  CreateEArchivesAttributes,
  CreateEArchivesRelationships,
  CreateEArchivesResponse,
  ShowEArchivesResponse,
  ShowPDFEArchivesResponse,
} from "./e_archives";
export type {
  GetEInvoiceInboxesParams,
  GetEInvoiceInboxesResponse,
} from "./e_invoice_inboxes";
