import { send } from "../../utils/requests";

export default class EArchives {
  /**
   * Codes: {@link https://ebelge.gib.gov.tr/dosyalar/kilavuzlar/UBLTR_1.2.1_Kilavuzlar.zip}
   * @param {CreateEArchivesParams} params {@link CreateEArchivesParams}
   * @param {string} params.data.attributes.internet_sale.payment_date YYYY-MM-DD format
   * @returns Promise<{@link CreateEArchivesResponse}>
   */
  async create(
    params: CreateEArchivesParams
  ): Promise<CreateEArchivesResponse> {
    const response = await send({
      path: `/e_archives`,
      method: "POST",
      body: params,
    });
    return response as CreateEArchivesResponse;
  }

  /**
   * @param id string
   * @param include string
   * @returns Promise<{@link ShowEArchivesResponse}>
   * @example
   * const response = await e_archives.show("id", "sales_invoice");
   * console.log(response);
   */
  async show(id: string, include?: string): Promise<ShowEArchivesResponse> {
    const response = await send({
      path: `/e_archives/${id}?${include ? `include=${include}` : ""}`,
      method: "GET",
    });
    return response as ShowEArchivesResponse;
  }

  /**
   * @param id string
   * @returns Promise<{@link ShowPDFEArchivesResponse}>
   */
  async showPDF(id: string): Promise<ShowPDFEArchivesResponse> {
    const response = await send({
      path: `/e_archives/${id}/pdf`,
      method: "GET",
    });
    return response as ShowPDFEArchivesResponse;
  }
}

export type CreateEArchivesAttributes = {
  vat_withholding_code?: string;
  vat_exemption_reason_code?: string;
  vat_exemption_reason?: string;
  note?: string;
  excise_duty_codes?: {
    product: number;
    sales_excise_duty_code: "57" | "59" | "60" | "61" | "62" | "63" | "9077";
  }[];
  internet_sale?: {
    url: string;
    payment_type:
      | "KREDIKARTI/BANKAKARTI"
      | "EFT/HAVALE"
      | "KAPIDAODEME"
      | "ODEMEARACISI";
    payment_platform: string;
    payment_date: string;
  };
  shipment?: {
    title?: string;
    vkn?: string;
    name?: string;
    tckn?: string;
    date: string;
  };
};

export type CreateEArchivesRelationships = {
  sales_invoice: {
    data: {
      id: string;
      type: "sales_invoices";
    };
  };
};

export type CreateEArchivesParams = {
  data: {
    id?: string;
    type: "e_archives";
    attributes: CreateEArchivesAttributes;
    relationships: CreateEArchivesRelationships;
  };
};

type CreateEArchivesResponseData = {
  id: string;
  type: "trackable_jobs";
  attributes: {
    status: "running" | "done" | "error";
    errors: string[];
  };
  relationships: any;
};

export type CreateEArchivesResponse = {
  data: CreateEArchivesResponseData;
  errors?: {
    title: string;
    detail: string;
  }[];
};

export type ShowEArchivesParams = {
  include?: "sales_invoice";
};

export type ShowEArchivesAttributes = {
  uuid: string;
  vkn: string;
  invoice_number: string;
  note: string;
  is_printed: boolean;
  status: "bounced" | "sent" | "printed" | "legalized";
  printed_at: string;
  cancellable_until: string;
  is_signed: boolean;
  created_at: string;
  updated_at: string;
};

export type ShowEArchivesRelationships = {
  sales_invoice: {
    data: {
      id: string;
      type: "sales_invoices";
    };
  };
};

export type ShowEArchivesResponse = {
  data: {
    id: string;
    type: "e_archives";
    attributes: ShowEArchivesAttributes;
    relationships: ShowEArchivesRelationships;
  };
  included?: {
    id: string;
    type: "sales_invoices";
    attributes: any;
    relationships: any;
  }[];
  errors?: {
    title: string;
    detail: string;
  }[];
};

export type ShowPDFEArchivesResponse = {
  data: {
    id: string;
    type: "e_document_pdfs";
    attributes: {
      url: string;
      expires_at: string;
    };
    relationships: any;
  };
  errors?: {
    title: string;
    detail: string;
  }[];
};
