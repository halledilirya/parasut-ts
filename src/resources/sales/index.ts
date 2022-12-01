import type {
  GetContactParams,
  GetContactResponse,
  CreateContactResponse,
  UpdateContactResponse,
  ShowContactResponse,
  DeleteContactResponse,
  CreateContactAttributes,
  CreateContactRelationships,
} from "./contacts";
import type {
  ArchiveSalesInvoicesResponse,
  CreateSalesInvoicesAttributes,
  CreateSalesInvoicesRelationships,
  CreateSalesInvoicesResponse,
  ShowSalesInvoicesResponse,
  DeleteSalesInvoicesResponse,
  CancelSalesInvoicesResponse,
  GetSalesInvoicesParams,
  GetSalesInvoicesResponse,
  RecoverSalesInvoicesResponse,
  UnarchiveSalesInvoicesResponse,
  UpdateSalesInvoicesResponse,
} from "./sales_invoices";
import Contacts from "./contacts";
import SalesInvoices from "./sales_invoices";

export default class Sales {
  public contacts: Contacts = new Contacts();
  public sales_invoices: SalesInvoices = new SalesInvoices();

  /**
   * @param params {@link GetContactParams}
   * @returns Promise<{@link GetContactResponse}>
   */
  async getContacts(params?: GetContactParams): Promise<GetContactResponse> {
    return this.contacts.retrieve(params);
  }

  /**
   * @param params.attributes {@link CreateContactAttributes}
   * @param params.relationships {@link CreateContactRelationships}
   * @returns Promise<{@link CreateContactResponse}>
   * @example
   * const attributes = {
   *  name: "John Doe",
   *  account_type: "customer",
   *  email?: "john@doe.com",
   *  short_name?: "John",
   *  contact_type?: "person",
   *  tax_office?: "İstanbul",
   *  tax_number?: "1234567890",
   *  district?: "Kartal",
   *  city?: "İstanbul",
   *  country?: "Türkiye",
   *  address?: "Kartal",
   *  phone?: "1234567890",
   *  fax?: "1234567890",
   *  is_abroad?: false,
   *  archived?: false,
   *  iban?: "TR1234567890",
   *  untrackable?: false,
   * };
   * const relationships = {
   *  category?: {
   *    data: {
   *      id: "1",
   *      type: "item_categories",
   *    },
   *  },
   *  contact_people?: {
   *   data: [
   *    {
   *      id: "1",
   *      type: "contact_people",
   *      attributes?: {
   *        name?: "John Doe",
   *        email?: "john@doe.com",
   *        phone?: "1234567890",
   *        notes?: "John Doe",
   *      },
   *    },
   *   ],
   *  },
   * };
   * const response = await client.sales.createContact({ attributes, relationships });
   * console.log(response);
   */
  async createContact(params: {
    attributes: CreateContactAttributes;
    relationships?: CreateContactRelationships;
  }): Promise<CreateContactResponse> {
    const { attributes, relationships } = params;
    return this.contacts.create({
      data: {
        type: "contacts",
        attributes,
        relationships,
      },
    });
  }

  /**
   * @param id string
   * @returns Promise<{@link ShowContactResponse}>
   * @example
   * const response = await client.sales.showContact("1");
   * console.log(response);
   */
  async showContact(id: string): Promise<ShowContactResponse> {
    return this.contacts.show(id);
  }

  /**
   * @param params.id string
   * @param params.attributes {@link CreateContactAttributes}
   * @param params.relationships {@link CreateContactRelationships}
   * @returns Promise<{@link UpdateContactResponse}>
   * @example
   * const attributes = {
   *    name: "John Doe",
   *    account_type: "customer",
   *    email?: "john@doe.com",
   *    short_name?: "John",
   *    contact_type?: "person",
   *    tax_office?: "İstanbul",
   *    tax_number?: "1234567890",
   *    district?: "Kartal",
   *    city?: "İstanbul",
   *    country?: "Türkiye",
   *    address?: "Kartal",
   *    phone?: "1234567890",
   *    fax?: "1234567890",
   *    is_abroad?: false,
   *    archived?: false,
   *    iban?: "TR1234567890",
   *    untrackable?: false,
   * };
   * const relationships = {
   *   category?: {
   *     data: {
   *       id: "1",
   *       type: "item_categories",
   *     },
   *   },
   *   contact_people?: {
   *     data: [
   *       {
   *         id: "1",
   *         type: "contact_people",
   *         attributes?: {
   *           name?: "John Doe",
   *           email?: "john@doe.com",
   *           phone?: "1234567890",
   *           notes?: "John Doe",
   *         },
   *       },
   *     ],
   *   },
   * };
   * const response = await client.sales.updateContact({ id: "1", attributes, relationships });
   * console.log(response);
   */
  async updateContact(params: {
    id: string;
    attributes: CreateContactAttributes;
    relationships?: CreateContactRelationships;
  }): Promise<UpdateContactResponse> {
    const { id, attributes, relationships } = params;
    return this.contacts.update(id, {
      data: {
        id,
        type: "contacts",
        attributes,
        relationships,
      },
    });
  }

  /**
   * @param id string
   * @returns Promise<{@link DeleteContactResponse}>
   * @example
   * const response = await client.sales.deleteContact("1");
   * console.log(response);
   */
  async deleteContact(id: string): Promise<DeleteContactResponse> {
    return this.contacts.delete(id);
  }

  /**
   * @param params {@link GetSalesInvoicesParams}
   * @returns Promise<{@link GetSalesInvoicesResponse}>
   * @example
   * const response = await client.sales.getSalesInvoices();
   * console.log(response);
   * @example
   * const response = await client.sales.getSalesInvoices({ page: { size: 10, number: 1 } });
   * console.log(response);
   * @example
   * const response = await client.sales.getSalesInvoices({ filter: { contact_id: "1" } });
   * console.log(response);
   * @example
   * const response = await client.sales.getSalesInvoices({ include: "contact" });
   * console.log(response);
   * @example
   * const response = await client.sales.getSalesInvoices({ sort: "issue_date" });
   * console.log(response);
   */
  async getSalesInvoices(
    params?: GetSalesInvoicesParams
  ): Promise<GetSalesInvoicesResponse> {
    return this.sales_invoices.retrieve(params);
  }

  /**
   * @param params.attributes {@link CreateSalesInvoicesAttributes}
   * @param params.relationships {@link CreateSalesInvoicesRelationships}
   * @returns Promise<{@link CreateSalesInvoicesResponse}>
   * @example
   * const attributes = {
   *    item_type: "invoice",
   *    description?: "John Doe",
   *    issue_date: "2021-01-01",
   *    due_date?: "2021-01-01",
   *    invoice_series?: "A",
   *    invoice_id?: 1,
   *    currency?: "TRL",
   *    exchange_rate?: 1,
   *    withholding_rate?: 1,
   *    vat_withholding_rate?: 1,
   *    invoice_discount_type?: "percentage",
   *    invoice_discount?: 1,
   *    billing_address?: "İstanbul",
   *    billing_phone?: "1234567890",
   *    billing_fax?: "1234567890",
   *    tax_office?: "İstanbul",
   *    tax_number?: "1234567890",
   *    country?: "Türkiye",
   *    city?: "İstanbul",
   *    district?: "Kartal",
   *    is_abroad?: false,
   *    order_no?: "1234567890",
   *    order_date?: "2021-01-01",
   *    shipment_addres?: "İstanbul",
   *    shipment_included?: false,
   *    cash_sale?: false,
   *    payment_account_id?: 1,
   *    payment_date?: "2021-01-01",
   *    payment_description?: "John Doe",
   * };
   * const relationships = {
   *    details?: {
   *      data: [
   *        {
   *          id?: "1",
   *          type: "sales_invoice_details",
   *          attributes: {
   *            quantity: 1,
   *            unit_price: 1,
   *            vat_rate: 1,
   *            discount_type?: "percentage",
   *            discount_value?: 1,
   *            excise_duty_type?: "percentage",
   *            excise_duty_value?: 1,
   *            communications_tax_rate?: 1,
   *            description?: "John Doe",
   *            delivery_method?: "CFR",
   *            shipping_method?: "Belirtilmedi",
   *          },
   *          relationships?: {
   *            product?: {
   *              data: {
   *                id: "1",
   *                type: "products",
   *              },
   *            },
   *            warehouse?: {
   *              data: {
   *                id: "1",
   *                type: "warehouses",
   *              },
   *            },
   *          },
   *        },
   *      ],
   *    },
   *    contact?: {
   *      data: {
   *        id: "1",
   *        type: "contacts",
   *      },
   *    },
   *    category?: {
   *      data: {
   *        id: "1",
   *        type: "item_categories",
   *      },
   *    },
   *    tags?: {
   *      data: [
   *        {
   *          id: "1",
   *          type: "tags",
   *        },
   *      ],
   *    },
   *    sales_offer?: {
   *      data: {
   *        id: "1",
   *        type: "sales_offers",
   *      },
   *    },
   * };
   * const response = await client.createSalesInvoices({ attributes, relationships });
   * console.log(response);
   */
  async createSalesInvoice(params: {
    attributes: CreateSalesInvoicesAttributes;
    relationships?: CreateSalesInvoicesRelationships;
  }): Promise<CreateSalesInvoicesResponse> {
    const { attributes, relationships } = params;
    return this.sales_invoices.create({
      data: {
        type: "sales_invoices",
        attributes,
        relationships,
      },
    });
  }

  /**
   * @param id string
   * @param include string (category, contact, details, details.product, details.warehouse, payments, payments.transaction, tags, sharings, recurrence_plan, active_e_document)
   * @returns Promise<{@link ShowSalesInvoicesResponse}>
   * @example
   * const response = await client.sales.showSalesInvoice("1");
   * console.log(response);
   * @example
   * const response = await client.sales.showSalesInvoice("1", "category");
   * console.log(response);
   * @example
   * const response = await client.sales.showSalesInvoice("1", "contact,details");
   * console.log(response);
   */
  async showSalesInvoice(
    id: string,
    include?: string
  ): Promise<ShowSalesInvoicesResponse> {
    return this.sales_invoices.show(id, include);
  }

  /**
   * @param params.id string
   * @param params.attributes {@link CreateSalesInvoicesAttributes}
   * @param params.relationships {@link CreateSalesInvoicesRelationships}
   * @returns Promise<{@link UpdateSalesInvoicesResponse}>
   * @example
   * const attributes = {
   *    item_type: "invoice",
   *    description?: "John Doe",
   *    issue_date: "2021-01-01",
   *    due_date?: "2021-01-01",
   *    invoice_series?: "A",
   *    invoice_id?: 1,
   *    currency?: "TRL",
   *    exchange_rate?: 1,
   *    withholding_rate?: 1,
   *    vat_withholding_rate?: 1,
   *    invoice_discount_type?: "percentage",
   *    invoice_discount?: 1,
   *    billing_address?: "İstanbul",
   *    billing_phone?: "1234567890",
   *    billing_fax?: "1234567890",
   *    tax_office?: "İstanbul",
   *    tax_number?: "1234567890",
   *    country?: "Türkiye",
   *    city?: "İstanbul",
   *    district?: "Kartal",
   *    is_abroad?: false,
   *    order_no?: "1234567890",
   *    order_date?: "2021-01-01",
   *    shipment_addres?: "İstanbul",
   *    shipment_included?: false,
   *    cash_sale?: false,
   *    payment_account_id?: 1,
   *    payment_date?: "2021-01-01",
   *    payment_description?: "John Doe",
   * };
   * const relationships = {
   *    details?: {
   *      data: [
   *        {
   *          id?: "1",
   *          type: "sales_invoice_details",
   *          attributes: {
   *            quantity: 1,
   *            unit_price: 1,
   *            vat_rate: 1,
   *            discount_type?: "percentage",
   *            discount_value?: 1,
   *            excise_duty_type?: "percentage",
   *            excise_duty_value?: 1,
   *            communications_tax_rate?: 1,
   *            description?: "John Doe",
   *            delivery_method?: "CFR",
   *            shipping_method?: "Belirtilmedi",
   *          },
   *          relationships?: {
   *            product?: {
   *              data: {
   *                id: "1",
   *                type: "products",
   *              },
   *            },
   *            warehouse?: {
   *              data: {
   *                id: "1",
   *                type: "warehouses",
   *              },
   *            },
   *          },
   *        },
   *      ],
   *    },
   *    contact?: {
   *      data: {
   *        id: "1",
   *        type: "contacts",
   *      },
   *    },
   *    category?: {
   *      data: {
   *        id: "1",
   *        type: "item_categories",
   *      },
   *    },
   *    tags?: {
   *      data: [
   *        {
   *          id: "1",
   *          type: "tags",
   *        },
   *      ],
   *    },
   *    sales_offer?: {
   *      data: {
   *        id: "1",
   *        type: "sales_offers",
   *      },
   *    },
   * };
   * const response = await client.updateSalesInvoices({
   *    id: "1",
   *    attributes,
   *    relationships,
   * });
   * console.log(response);
   */
  async updateSalesInvoice(params: {
    id: string;
    attributes: CreateSalesInvoicesAttributes;
    relationships?: CreateSalesInvoicesRelationships;
  }): Promise<UpdateSalesInvoicesResponse> {
    const { id, attributes, relationships } = params;
    return this.sales_invoices.update(id, {
      data: {
        type: "sales_invoices",
        attributes,
        relationships,
      },
    });
  }

  /**
   * @param id string
   * @returns Promise<{@link DeleteSalesInvoicesResponse}>
   * @example
   * const response = await client.deleteSalesInvoice("1");
   * console.log(response);
   */
  async deleteSalesInvoice(id: string): Promise<DeleteSalesInvoicesResponse> {
    return this.sales_invoices.delete(id);
  }

  /**
   * @param id string
   * @param include string (category, contact, details, details.product, details.warehouse, payments, payments.transaction, tags, sharings, recurrence_plan, active_e_document)
   * @returns Promise<{@link CancelSalesInvoicesResponse}>
   * @example
   * const response = await client.sales.cancelSalesInvoices("1");
   * console.log(response);
   * @example
   * const response = await client.sales.cancelSalesInvoices("1", "contact");
   * console.log(response);
   */
  async cancelSalesInvoice(
    id: string,
    include?: string
  ): Promise<CancelSalesInvoicesResponse> {
    return this.sales_invoices.cancel(id, include);
  }

  /**
   * @param id string
   * @returns Promise<{@link RecoverSalesInvoicesResponse}>
   * @example
   * const response = await client.recoverSalesInvoice("1");
   * console.log(response);
   */
  async recoverSalesInvoice(id: string): Promise<RecoverSalesInvoicesResponse> {
    return this.sales_invoices.recover(id);
  }

  /**
   * @param id string
   * @returns Promise<{@link ArchiveSalesInvoicesResponse}>
   * @example
   * const response = await client.archiveSalesInvoice("1");
   * console.log(response);
   */
  async archiveSalesInvoice(id: string): Promise<ArchiveSalesInvoicesResponse> {
    return this.sales_invoices.archive(id);
  }

  /**
   * @param id string
   * @returns Promise<{@link UnarchiveSalesInvoicesResponse}>
   * @example
   * const response = await client.unarchiveSalesInvoice("1");
   * console.log(response);
   */
  async unarchiveSalesInvoice(
    id: string
  ): Promise<UnarchiveSalesInvoicesResponse> {
    return this.sales_invoices.unarchive(id);
  }
}

export type {
  GetContactParams,
  GetContactAttributes,
  GetContactRelationships,
  GetContactResponse,
  CreateContactParams,
  CreateContactAttributes,
  CreateContactRelationships,
  CreateContactResponse,
  ShowContactResponse,
  UpdateContactParams,
  UpdateContactResponse,
  DeleteContactResponse,
} from "./contacts";

export type {
  GetSalesInvoicesParams,
  GetSalesInvoicesAttributes,
  GetSalesInvoicesRelationships,
  GetSalesInvoicesResponse,
  CreateSalesInvoicesParams,
  CreateSalesInvoicesAttributes,
  CreateSalesInvoicesRelationships,
  CreateSalesInvoicesResponse,
  ShowSalesInvoicesResponse,
  UpdateSalesInvoicesParams,
  UpdateSalesInvoicesResponse,
  DeleteSalesInvoicesResponse,
  CancelSalesInvoicesResponse,
  RecoverSalesInvoicesResponse,
  ArchiveSalesInvoicesResponse,
  UnarchiveSalesInvoicesResponse,
} from "./sales_invoices";
