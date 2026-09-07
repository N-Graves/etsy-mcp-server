/**
 * GENERATED FILE - do not edit by hand.
 *
 * Produced by scripts/generate-operations.mjs from vendor/etsy-openapi.json
 * (Etsy Open API v3 3.0.0, OpenAPI 3.0.2).
 *
 * All 105 operations are covered. Etsy's v3 API is entirely seller-facing:
 * no admin tier, nothing an ordinary app cannot call given the right scopes.
 *
 * 64 read, 28 write, 13 destructive. 32 need no OAuth scope at all.
 *
 * The scope on each operation is the load-bearing detail. Of the 13 DELETE
 * endpoints, exactly ONE needs listings_d - deleting a whole live listing -
 * and the other twelve ride on scopes you already hold in order to edit
 * anything. So declining listings_d makes the catastrophic delete impossible
 * at the OAuth layer while leaving every normal operation working.
 */
import type { Operation } from "@nasdigital/mcp-server-core";

export interface CataloguedOperation extends Operation {
  tags: string[];
  summary: string;
  pathParams: string[];
  queryParams: string[];
  hasBody: boolean;
  /** Consequence, not HTTP verb: destructive means irreversible OR chargeable. */
  action: "read" | "write" | "destructive";
  /** OAuth scopes required. Empty means public, or unstated by the spec. */
  scopes: string[];
}

export const OPERATIONS: CataloguedOperation[] = [
  {
    "id": "getBuyerTaxonomyNodes",
    "method": "GET",
    "path": "/v3/application/buyer-taxonomy/nodes",
    "tags": [
      "BuyerTaxonomy"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "scopes": [],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "getPropertiesByBuyerTaxonomyId",
    "method": "GET",
    "path": "/v3/application/buyer-taxonomy/nodes/{taxonomy_id}/properties",
    "tags": [
      "BuyerTaxonomy"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "taxonomy_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "scopes": [],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "deleteListing",
    "method": "DELETE",
    "path": "/v3/application/listings/{listing_id}",
    "tags": [
      "ShopListing"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "listing_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "scopes": [
      "listings_d"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "destructive"
  },
  {
    "id": "getListing",
    "method": "GET",
    "path": "/v3/application/listings/{listing_id}",
    "tags": [
      "ShopListing"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "listing_id"
    ],
    "queryParams": [
      "includes",
      "language",
      "allow_suggested_title"
    ],
    "hasBody": false,
    "scopes": [],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "getListingImages",
    "method": "GET",
    "path": "/v3/application/listings/{listing_id}/images",
    "tags": [
      "ShopListing Image"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "listing_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "scopes": [],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "getListingImage",
    "method": "GET",
    "path": "/v3/application/listings/{listing_id}/images/{listing_image_id}",
    "tags": [
      "ShopListing Image"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "listing_id",
      "listing_image_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "scopes": [],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "getListingInventory",
    "method": "GET",
    "path": "/v3/application/listings/{listing_id}/inventory",
    "tags": [
      "ShopListing Inventory"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "listing_id"
    ],
    "queryParams": [
      "show_deleted",
      "includes"
    ],
    "hasBody": false,
    "scopes": [
      "listings_r"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "updateListingInventory",
    "method": "PUT",
    "path": "/v3/application/listings/{listing_id}/inventory",
    "tags": [
      "ShopListing Inventory"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "listing_id"
    ],
    "queryParams": [
      "max_variations_supported"
    ],
    "hasBody": true,
    "scopes": [
      "listings_w"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "write"
  },
  {
    "id": "getListingProduct",
    "method": "GET",
    "path": "/v3/application/listings/{listing_id}/inventory/products/{product_id}",
    "tags": [
      "ShopListing Product"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "listing_id",
      "product_id"
    ],
    "queryParams": [
      "legacy"
    ],
    "hasBody": false,
    "scopes": [
      "listings_r"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "getListingPersonalization",
    "method": "GET",
    "path": "/v3/application/listings/{listing_id}/personalization",
    "tags": [
      "ShopListing Personalization"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "listing_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "scopes": [],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "getListingOffering",
    "method": "GET",
    "path": "/v3/application/listings/{listing_id}/products/{product_id}/offerings/{product_offering_id}",
    "tags": [
      "ShopListing Offering"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "listing_id",
      "product_id",
      "product_offering_id"
    ],
    "queryParams": [
      "legacy"
    ],
    "hasBody": false,
    "scopes": [],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "getListingProperty",
    "method": "GET",
    "path": "/v3/application/listings/{listing_id}/properties/{property_id}",
    "tags": [
      "ShopListing"
    ],
    "summary": "Feedback only Give feedback Development for this endpoint is in progress. It will only return a 501 response.",
    "pathParams": [
      "listing_id",
      "property_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "scopes": [],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "getReviewsByListing",
    "method": "GET",
    "path": "/v3/application/listings/{listing_id}/reviews",
    "tags": [
      "Review"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "listing_id"
    ],
    "queryParams": [
      "limit",
      "offset",
      "min_created",
      "max_created"
    ],
    "hasBody": false,
    "scopes": [],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "getListingVideos",
    "method": "GET",
    "path": "/v3/application/listings/{listing_id}/videos",
    "tags": [
      "ShopListing Video"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "listing_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "scopes": [],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "getListingVideo",
    "method": "GET",
    "path": "/v3/application/listings/{listing_id}/videos/{video_id}",
    "tags": [
      "ShopListing Video"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "video_id",
      "listing_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "scopes": [],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "findAllListingsActive",
    "method": "GET",
    "path": "/v3/application/listings/active",
    "tags": [
      "ShopListing"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [],
    "queryParams": [
      "limit",
      "offset",
      "keywords",
      "sort_on",
      "sort_order",
      "min_price",
      "max_price",
      "taxonomy_id",
      "shop_location",
      "is_safe",
      "currency",
      "buyer_country"
    ],
    "hasBody": false,
    "scopes": [],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "getListingsByListingIds",
    "method": "GET",
    "path": "/v3/application/listings/batch",
    "tags": [
      "ShopListing"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [],
    "queryParams": [
      "listing_ids",
      "includes",
      "legacy",
      "currency",
      "buyer_country"
    ],
    "hasBody": false,
    "scopes": [],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "getListingsInventoryByListingIds",
    "method": "GET",
    "path": "/v3/application/listings/batch/inventory",
    "tags": [
      "ShopListing Inventory"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [],
    "queryParams": [
      "listing_ids"
    ],
    "hasBody": false,
    "scopes": [
      "listings_r"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "getListingsShippingByListingIds",
    "method": "GET",
    "path": "/v3/application/listings/batch/shipping",
    "tags": [
      "ShopListing"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [],
    "queryParams": [
      "listing_ids"
    ],
    "hasBody": false,
    "scopes": [
      "shops_r"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "ping",
    "method": "GET",
    "path": "/v3/application/openapi-ping",
    "tags": [
      "Other"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "scopes": [],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "tokenScopes",
    "method": "POST",
    "path": "/v3/application/scopes",
    "tags": [
      "Other"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "scopes": [],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "getSellerTaxonomyNodes",
    "method": "GET",
    "path": "/v3/application/seller-taxonomy/nodes",
    "tags": [
      "SellerTaxonomy"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "scopes": [],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "getPropertiesByTaxonomyId",
    "method": "GET",
    "path": "/v3/application/seller-taxonomy/nodes/{taxonomy_id}/properties",
    "tags": [
      "SellerTaxonomy"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "taxonomy_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "scopes": [],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "getShippingCarriers",
    "method": "GET",
    "path": "/v3/application/shipping-carriers",
    "tags": [
      "Shop ShippingProfile"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [],
    "queryParams": [
      "origin_country_iso"
    ],
    "hasBody": false,
    "scopes": [],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "findShops",
    "method": "GET",
    "path": "/v3/application/shops",
    "tags": [
      "Shop"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [],
    "queryParams": [
      "shop_name",
      "limit",
      "offset"
    ],
    "hasBody": false,
    "scopes": [],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "getShop",
    "method": "GET",
    "path": "/v3/application/shops/{shop_id}",
    "tags": [
      "Shop"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "scopes": [],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "updateShop",
    "method": "PUT",
    "path": "/v3/application/shops/{shop_id}",
    "tags": [
      "Shop"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "scopes": [
      "shops_r",
      "shops_w"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "write"
  },
  {
    "id": "getHolidayPreferences",
    "method": "GET",
    "path": "/v3/application/shops/{shop_id}/holiday-preferences",
    "tags": [
      "Shop HolidayPreferences"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "scopes": [
      "shops_r"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "updateHolidayPreferences",
    "method": "PUT",
    "path": "/v3/application/shops/{shop_id}/holiday-preferences/{holiday_id}",
    "tags": [
      "Shop HolidayPreferences"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "holiday_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "scopes": [
      "shops_w"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "write"
  },
  {
    "id": "getListingsByShop",
    "method": "GET",
    "path": "/v3/application/shops/{shop_id}/listings",
    "tags": [
      "ShopListing"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id"
    ],
    "queryParams": [
      "state",
      "limit",
      "offset",
      "sort_on",
      "sort_order",
      "includes"
    ],
    "hasBody": false,
    "scopes": [
      "listings_r"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "createDraftListing",
    "method": "POST",
    "path": "/v3/application/shops/{shop_id}/listings",
    "tags": [
      "ShopListing"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "scopes": [
      "listings_w"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "write"
  },
  {
    "id": "updateListing",
    "method": "PATCH",
    "path": "/v3/application/shops/{shop_id}/listings/{listing_id}",
    "tags": [
      "ShopListing"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "listing_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "scopes": [
      "listings_w"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "write"
  },
  {
    "id": "getAllListingFiles",
    "method": "GET",
    "path": "/v3/application/shops/{shop_id}/listings/{listing_id}/files",
    "tags": [
      "ShopListing File"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "listing_id",
      "shop_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "scopes": [
      "listings_r"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "uploadListingFile",
    "method": "POST",
    "path": "/v3/application/shops/{shop_id}/listings/{listing_id}/files",
    "tags": [
      "ShopListing File"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "listing_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "scopes": [
      "listings_w"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "write"
  },
  {
    "id": "deleteListingFile",
    "method": "DELETE",
    "path": "/v3/application/shops/{shop_id}/listings/{listing_id}/files/{listing_file_id}",
    "tags": [
      "ShopListing File"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "listing_id",
      "listing_file_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "scopes": [
      "listings_w"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "destructive"
  },
  {
    "id": "getListingFile",
    "method": "GET",
    "path": "/v3/application/shops/{shop_id}/listings/{listing_id}/files/{listing_file_id}",
    "tags": [
      "ShopListing File"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "listing_id",
      "listing_file_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "scopes": [
      "listings_r"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "uploadListingImage",
    "method": "POST",
    "path": "/v3/application/shops/{shop_id}/listings/{listing_id}/images",
    "tags": [
      "ShopListing Image"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "listing_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "scopes": [
      "listings_w"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "write"
  },
  {
    "id": "deleteListingImage",
    "method": "DELETE",
    "path": "/v3/application/shops/{shop_id}/listings/{listing_id}/images/{listing_image_id}",
    "tags": [
      "ShopListing Image"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "listing_id",
      "listing_image_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "scopes": [
      "listings_w"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "destructive"
  },
  {
    "id": "deleteListingPersonalization",
    "method": "DELETE",
    "path": "/v3/application/shops/{shop_id}/listings/{listing_id}/personalization",
    "tags": [
      "ShopListing Personalization"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "listing_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "scopes": [
      "listings_w"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "destructive"
  },
  {
    "id": "updateListingPersonalization",
    "method": "POST",
    "path": "/v3/application/shops/{shop_id}/listings/{listing_id}/personalization",
    "tags": [
      "ShopListing Personalization"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "listing_id"
    ],
    "queryParams": [
      "supports_multiple_personalization_questions"
    ],
    "hasBody": true,
    "scopes": [
      "listings_w"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "write"
  },
  {
    "id": "getListingProperties",
    "method": "GET",
    "path": "/v3/application/shops/{shop_id}/listings/{listing_id}/properties",
    "tags": [
      "ShopListing"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "listing_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "scopes": [],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "deleteListingProperty",
    "method": "DELETE",
    "path": "/v3/application/shops/{shop_id}/listings/{listing_id}/properties/{property_id}",
    "tags": [
      "ShopListing"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "listing_id",
      "property_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "scopes": [
      "listings_w"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "destructive"
  },
  {
    "id": "updateListingProperty",
    "method": "PUT",
    "path": "/v3/application/shops/{shop_id}/listings/{listing_id}/properties/{property_id}",
    "tags": [
      "ShopListing"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "listing_id",
      "property_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "scopes": [
      "listings_w"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "write"
  },
  {
    "id": "getShopReceiptTransactionsByListing",
    "method": "GET",
    "path": "/v3/application/shops/{shop_id}/listings/{listing_id}/transactions",
    "tags": [
      "Shop Receipt Transactions"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "listing_id"
    ],
    "queryParams": [
      "limit",
      "offset",
      "legacy"
    ],
    "hasBody": false,
    "scopes": [
      "transactions_r"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "getListingTranslation",
    "method": "GET",
    "path": "/v3/application/shops/{shop_id}/listings/{listing_id}/translations/{language}",
    "tags": [
      "ShopListing Translation"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "listing_id",
      "language"
    ],
    "queryParams": [],
    "hasBody": false,
    "scopes": [],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "createListingTranslation",
    "method": "POST",
    "path": "/v3/application/shops/{shop_id}/listings/{listing_id}/translations/{language}",
    "tags": [
      "ShopListing Translation"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "listing_id",
      "language"
    ],
    "queryParams": [],
    "hasBody": true,
    "scopes": [
      "listings_w"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "write"
  },
  {
    "id": "updateListingTranslation",
    "method": "PUT",
    "path": "/v3/application/shops/{shop_id}/listings/{listing_id}/translations/{language}",
    "tags": [
      "ShopListing Translation"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "listing_id",
      "language"
    ],
    "queryParams": [],
    "hasBody": true,
    "scopes": [
      "listings_w"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "write"
  },
  {
    "id": "getListingVariationImages",
    "method": "GET",
    "path": "/v3/application/shops/{shop_id}/listings/{listing_id}/variation-images",
    "tags": [
      "ShopListing VariationImage"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "listing_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "scopes": [],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "updateVariationImages",
    "method": "POST",
    "path": "/v3/application/shops/{shop_id}/listings/{listing_id}/variation-images",
    "tags": [
      "ShopListing VariationImage"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "listing_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "scopes": [
      "listings_w"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "write"
  },
  {
    "id": "uploadListingVideo",
    "method": "POST",
    "path": "/v3/application/shops/{shop_id}/listings/{listing_id}/videos",
    "tags": [
      "ShopListing Video"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "listing_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "scopes": [
      "listings_w"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "write"
  },
  {
    "id": "deleteListingVideo",
    "method": "DELETE",
    "path": "/v3/application/shops/{shop_id}/listings/{listing_id}/videos/{video_id}",
    "tags": [
      "ShopListing Video"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "listing_id",
      "video_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "scopes": [
      "listings_w"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "destructive"
  },
  {
    "id": "findAllActiveListingsByShop",
    "method": "GET",
    "path": "/v3/application/shops/{shop_id}/listings/active",
    "tags": [
      "ShopListing"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id"
    ],
    "queryParams": [
      "limit",
      "sort_on",
      "sort_order",
      "offset",
      "keywords"
    ],
    "hasBody": false,
    "scopes": [],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "getFeaturedListingsByShop",
    "method": "GET",
    "path": "/v3/application/shops/{shop_id}/listings/featured",
    "tags": [
      "ShopListing"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id"
    ],
    "queryParams": [
      "limit",
      "offset",
      "legacy"
    ],
    "hasBody": false,
    "scopes": [],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "getShopPaymentAccountLedgerEntries",
    "method": "GET",
    "path": "/v3/application/shops/{shop_id}/payment-account/ledger-entries",
    "tags": [
      "Ledger Entry"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id"
    ],
    "queryParams": [
      "min_created",
      "max_created",
      "limit",
      "offset"
    ],
    "hasBody": false,
    "scopes": [
      "transactions_r"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "getShopPaymentAccountLedgerEntry",
    "method": "GET",
    "path": "/v3/application/shops/{shop_id}/payment-account/ledger-entries/{ledger_entry_id}",
    "tags": [
      "Ledger Entry"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "ledger_entry_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "scopes": [
      "transactions_r"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "getPaymentAccountLedgerEntryPayments",
    "method": "GET",
    "path": "/v3/application/shops/{shop_id}/payment-account/ledger-entries/payments",
    "tags": [
      "Payment"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id"
    ],
    "queryParams": [
      "ledger_entry_ids"
    ],
    "hasBody": false,
    "scopes": [
      "transactions_r"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "getPayments",
    "method": "GET",
    "path": "/v3/application/shops/{shop_id}/payments",
    "tags": [
      "Payment"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id"
    ],
    "queryParams": [
      "payment_ids"
    ],
    "hasBody": false,
    "scopes": [
      "transactions_r"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "getShopReturnPolicies",
    "method": "GET",
    "path": "/v3/application/shops/{shop_id}/policies/return",
    "tags": [
      "Shop Return Policy"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "scopes": [],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "createShopReturnPolicy",
    "method": "POST",
    "path": "/v3/application/shops/{shop_id}/policies/return",
    "tags": [
      "Shop Return Policy"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "scopes": [
      "shops_w"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "write"
  },
  {
    "id": "deleteShopReturnPolicy",
    "method": "DELETE",
    "path": "/v3/application/shops/{shop_id}/policies/return/{return_policy_id}",
    "tags": [
      "Shop Return Policy"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "return_policy_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "scopes": [
      "shops_w"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "destructive"
  },
  {
    "id": "getShopReturnPolicy",
    "method": "GET",
    "path": "/v3/application/shops/{shop_id}/policies/return/{return_policy_id}",
    "tags": [
      "Shop Return Policy"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "return_policy_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "scopes": [],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "updateShopReturnPolicy",
    "method": "PUT",
    "path": "/v3/application/shops/{shop_id}/policies/return/{return_policy_id}",
    "tags": [
      "Shop Return Policy"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "return_policy_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "scopes": [
      "shops_w"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "write"
  },
  {
    "id": "getListingsByShopReturnPolicy",
    "method": "GET",
    "path": "/v3/application/shops/{shop_id}/policies/return/{return_policy_id}/listings",
    "tags": [
      "ShopListing"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "return_policy_id",
      "shop_id"
    ],
    "queryParams": [
      "legacy"
    ],
    "hasBody": false,
    "scopes": [
      "listings_r"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "consolidateShopReturnPolicies",
    "method": "POST",
    "path": "/v3/application/shops/{shop_id}/policies/return/consolidate",
    "tags": [
      "Shop Return Policy"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "scopes": [
      "shops_w"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "write"
  },
  {
    "id": "getShopProductionPartners",
    "method": "GET",
    "path": "/v3/application/shops/{shop_id}/production-partners",
    "tags": [
      "Shop ProductionPartner"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "scopes": [
      "shops_r"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "getShopReadinessStateDefinitions",
    "method": "GET",
    "path": "/v3/application/shops/{shop_id}/readiness-state-definitions",
    "tags": [
      "Shop ProcessingProfiles"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id"
    ],
    "queryParams": [
      "limit",
      "offset"
    ],
    "hasBody": false,
    "scopes": [
      "shops_r"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "createShopReadinessStateDefinition",
    "method": "POST",
    "path": "/v3/application/shops/{shop_id}/readiness-state-definitions",
    "tags": [
      "Shop ProcessingProfiles"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "scopes": [
      "shops_w"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "write"
  },
  {
    "id": "deleteShopReadinessStateDefinition",
    "method": "DELETE",
    "path": "/v3/application/shops/{shop_id}/readiness-state-definitions/{readiness_state_definition_id}",
    "tags": [
      "Shop ProcessingProfiles"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "readiness_state_definition_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "scopes": [
      "shops_w"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "destructive"
  },
  {
    "id": "getShopReadinessStateDefinition",
    "method": "GET",
    "path": "/v3/application/shops/{shop_id}/readiness-state-definitions/{readiness_state_definition_id}",
    "tags": [
      "Shop ProcessingProfiles"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "readiness_state_definition_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "scopes": [
      "shops_r"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "updateShopReadinessStateDefinition",
    "method": "PUT",
    "path": "/v3/application/shops/{shop_id}/readiness-state-definitions/{readiness_state_definition_id}",
    "tags": [
      "Shop ProcessingProfiles"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "readiness_state_definition_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "scopes": [
      "shops_w"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "write"
  },
  {
    "id": "getShopReceipts",
    "method": "GET",
    "path": "/v3/application/shops/{shop_id}/receipts",
    "tags": [
      "Shop Receipt"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id"
    ],
    "queryParams": [
      "min_created",
      "max_created",
      "min_last_modified",
      "max_last_modified",
      "limit",
      "offset",
      "sort_on",
      "sort_order",
      "was_paid",
      "was_shipped",
      "was_delivered",
      "was_canceled",
      "legacy"
    ],
    "hasBody": false,
    "scopes": [
      "transactions_r"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "getShopReceipt",
    "method": "GET",
    "path": "/v3/application/shops/{shop_id}/receipts/{receipt_id}",
    "tags": [
      "Shop Receipt"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "receipt_id"
    ],
    "queryParams": [
      "legacy"
    ],
    "hasBody": false,
    "scopes": [
      "transactions_r"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "updateShopReceipt",
    "method": "PUT",
    "path": "/v3/application/shops/{shop_id}/receipts/{receipt_id}",
    "tags": [
      "Shop Receipt"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "receipt_id"
    ],
    "queryParams": [
      "legacy"
    ],
    "hasBody": true,
    "scopes": [
      "transactions_w"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "write"
  },
  {
    "id": "getListingsByShopReceipt",
    "method": "GET",
    "path": "/v3/application/shops/{shop_id}/receipts/{receipt_id}/listings",
    "tags": [
      "ShopListing"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "receipt_id",
      "shop_id"
    ],
    "queryParams": [
      "limit",
      "offset",
      "legacy"
    ],
    "hasBody": false,
    "scopes": [
      "transactions_r"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "getShopPaymentByReceiptId",
    "method": "GET",
    "path": "/v3/application/shops/{shop_id}/receipts/{receipt_id}/payments",
    "tags": [
      "Payment"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "receipt_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "scopes": [
      "transactions_r"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "createReceiptShipment",
    "method": "POST",
    "path": "/v3/application/shops/{shop_id}/receipts/{receipt_id}/tracking",
    "tags": [
      "Shop Receipt"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "receipt_id"
    ],
    "queryParams": [
      "legacy"
    ],
    "hasBody": true,
    "scopes": [
      "transactions_w"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "write"
  },
  {
    "id": "getShopReceiptTransactionsByReceipt",
    "method": "GET",
    "path": "/v3/application/shops/{shop_id}/receipts/{receipt_id}/transactions",
    "tags": [
      "Shop Receipt Transactions"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "receipt_id"
    ],
    "queryParams": [
      "legacy"
    ],
    "hasBody": false,
    "scopes": [
      "transactions_r"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "getReviewsByShop",
    "method": "GET",
    "path": "/v3/application/shops/{shop_id}/reviews",
    "tags": [
      "Review"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id"
    ],
    "queryParams": [
      "limit",
      "offset",
      "min_created",
      "max_created"
    ],
    "hasBody": false,
    "scopes": [],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "getShopSections",
    "method": "GET",
    "path": "/v3/application/shops/{shop_id}/sections",
    "tags": [
      "Shop Section"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "scopes": [],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "createShopSection",
    "method": "POST",
    "path": "/v3/application/shops/{shop_id}/sections",
    "tags": [
      "Shop Section"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "scopes": [
      "shops_w"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "write"
  },
  {
    "id": "deleteShopSection",
    "method": "DELETE",
    "path": "/v3/application/shops/{shop_id}/sections/{shop_section_id}",
    "tags": [
      "Shop Section"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "shop_section_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "scopes": [
      "shops_w"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "destructive"
  },
  {
    "id": "getShopSection",
    "method": "GET",
    "path": "/v3/application/shops/{shop_id}/sections/{shop_section_id}",
    "tags": [
      "Shop Section"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "shop_section_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "scopes": [],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "updateShopSection",
    "method": "PUT",
    "path": "/v3/application/shops/{shop_id}/sections/{shop_section_id}",
    "tags": [
      "Shop Section"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "shop_section_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "scopes": [
      "shops_w"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "write"
  },
  {
    "id": "getShopShippingProfiles",
    "method": "GET",
    "path": "/v3/application/shops/{shop_id}/shipping-profiles",
    "tags": [
      "Shop ShippingProfile"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "scopes": [
      "shops_r"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "createShopShippingProfile",
    "method": "POST",
    "path": "/v3/application/shops/{shop_id}/shipping-profiles",
    "tags": [
      "Shop ShippingProfile"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "scopes": [
      "shops_w"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "write"
  },
  {
    "id": "deleteShopShippingProfile",
    "method": "DELETE",
    "path": "/v3/application/shops/{shop_id}/shipping-profiles/{shipping_profile_id}",
    "tags": [
      "Shop ShippingProfile"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "shipping_profile_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "scopes": [
      "shops_w"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "destructive"
  },
  {
    "id": "getShopShippingProfile",
    "method": "GET",
    "path": "/v3/application/shops/{shop_id}/shipping-profiles/{shipping_profile_id}",
    "tags": [
      "Shop ShippingProfile"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "shipping_profile_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "scopes": [
      "shops_r"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "updateShopShippingProfile",
    "method": "PUT",
    "path": "/v3/application/shops/{shop_id}/shipping-profiles/{shipping_profile_id}",
    "tags": [
      "Shop ShippingProfile"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "shipping_profile_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "scopes": [
      "shops_w"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "write"
  },
  {
    "id": "getShopShippingProfileDestinationsByShippingProfile",
    "method": "GET",
    "path": "/v3/application/shops/{shop_id}/shipping-profiles/{shipping_profile_id}/destinations",
    "tags": [
      "Shop ShippingProfile"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "shipping_profile_id"
    ],
    "queryParams": [
      "limit",
      "offset"
    ],
    "hasBody": false,
    "scopes": [
      "shops_r"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "createShopShippingProfileDestination",
    "method": "POST",
    "path": "/v3/application/shops/{shop_id}/shipping-profiles/{shipping_profile_id}/destinations",
    "tags": [
      "Shop ShippingProfile"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "shipping_profile_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "scopes": [
      "shops_w"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "write"
  },
  {
    "id": "deleteShopShippingProfileDestination",
    "method": "DELETE",
    "path": "/v3/application/shops/{shop_id}/shipping-profiles/{shipping_profile_id}/destinations/{shipping_profile_destination_id}",
    "tags": [
      "Shop ShippingProfile"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "shipping_profile_id",
      "shipping_profile_destination_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "scopes": [
      "shops_w"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "destructive"
  },
  {
    "id": "updateShopShippingProfileDestination",
    "method": "PUT",
    "path": "/v3/application/shops/{shop_id}/shipping-profiles/{shipping_profile_id}/destinations/{shipping_profile_destination_id}",
    "tags": [
      "Shop ShippingProfile"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "shipping_profile_id",
      "shipping_profile_destination_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "scopes": [
      "shops_w"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "write"
  },
  {
    "id": "getShopShippingProfileUpgrades",
    "method": "GET",
    "path": "/v3/application/shops/{shop_id}/shipping-profiles/{shipping_profile_id}/upgrades",
    "tags": [
      "Shop ShippingProfile"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "shipping_profile_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "scopes": [
      "shops_r"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "createShopShippingProfileUpgrade",
    "method": "POST",
    "path": "/v3/application/shops/{shop_id}/shipping-profiles/{shipping_profile_id}/upgrades",
    "tags": [
      "Shop ShippingProfile"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "shipping_profile_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "scopes": [
      "shops_w"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "write"
  },
  {
    "id": "deleteShopShippingProfileUpgrade",
    "method": "DELETE",
    "path": "/v3/application/shops/{shop_id}/shipping-profiles/{shipping_profile_id}/upgrades/{upgrade_id}",
    "tags": [
      "Shop ShippingProfile"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "shipping_profile_id",
      "upgrade_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "scopes": [
      "shops_w"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "destructive"
  },
  {
    "id": "updateShopShippingProfileUpgrade",
    "method": "PUT",
    "path": "/v3/application/shops/{shop_id}/shipping-profiles/{shipping_profile_id}/upgrades/{upgrade_id}",
    "tags": [
      "Shop ShippingProfile"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "shipping_profile_id",
      "upgrade_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "scopes": [
      "shops_w"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "write"
  },
  {
    "id": "getListingsByShopSectionId",
    "method": "GET",
    "path": "/v3/application/shops/{shop_id}/shop-sections/listings",
    "tags": [
      "ShopListing"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id"
    ],
    "queryParams": [
      "shop_section_ids",
      "limit",
      "offset",
      "sort_on",
      "sort_order",
      "legacy"
    ],
    "hasBody": false,
    "scopes": [],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "getShopReceiptTransactionsByShop",
    "method": "GET",
    "path": "/v3/application/shops/{shop_id}/transactions",
    "tags": [
      "Shop Receipt Transactions"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id"
    ],
    "queryParams": [
      "limit",
      "offset",
      "legacy"
    ],
    "hasBody": false,
    "scopes": [
      "transactions_r"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "getShopReceiptTransaction",
    "method": "GET",
    "path": "/v3/application/shops/{shop_id}/transactions/{transaction_id}",
    "tags": [
      "Shop Receipt Transactions"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "shop_id",
      "transaction_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "scopes": [
      "transactions_r"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "getUserAddresses",
    "method": "GET",
    "path": "/v3/application/user/addresses",
    "tags": [
      "UserAddress"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [],
    "queryParams": [
      "limit",
      "offset"
    ],
    "hasBody": false,
    "scopes": [
      "address_r"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "deleteUserAddress",
    "method": "DELETE",
    "path": "/v3/application/user/addresses/{user_address_id}",
    "tags": [
      "UserAddress"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "user_address_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "scopes": [
      "address_r"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "destructive"
  },
  {
    "id": "getUserAddress",
    "method": "GET",
    "path": "/v3/application/user/addresses/{user_address_id}",
    "tags": [
      "UserAddress"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "user_address_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "scopes": [
      "address_r"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "getUser",
    "method": "GET",
    "path": "/v3/application/users/{user_id}",
    "tags": [
      "User"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "user_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "scopes": [
      "email_r"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "getShopByOwnerUserId",
    "method": "GET",
    "path": "/v3/application/users/{user_id}/shops",
    "tags": [
      "Shop"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [
      "user_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "scopes": [],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  },
  {
    "id": "getMe",
    "method": "GET",
    "path": "/v3/application/users/me",
    "tags": [
      "User"
    ],
    "summary": "General Release This endpoint is ready for production use.",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "scopes": [
      "shops_r"
    ],
    "status": "covered",
    "tool": "etsy_call",
    "action": "read"
  }
];

export const OPERATIONS_BY_ID = new Map(OPERATIONS.map((o) => [o.id, o]));
