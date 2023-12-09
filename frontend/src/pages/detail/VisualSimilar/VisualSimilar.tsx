// Components Imports
import { RecsList, RecsItem } from "@/components/recs-list";

// API Imports
import { useVisual } from "@/hooks/api-visual";
import { useProducts } from "@/hooks/api-woo";

// Utils Imports
import { getJsonProduct } from "@/utils";

// React Imports
import React from "react";

export function VisualSearch() {
  const product = getJsonProduct();

  const vsrQuery = useVisual({
    shop_variant_id: String(product?.id || ""),
    top_k: 10,
  });

  const queries = useProducts(
    vsrQuery.data?.map((item) => {
      return item.product_id;
    }) || []
  );

  const mainNode = React.useMemo(() => {
    const itemNodeList = queries
      .filter(({ data }) => {
        /**
         * API Success
         * Product is on sale
         * Product is purchasable
         * Product ID is truth
         * Product name is truth
         * Product name is a string
         * Product price is truth
         * Product price is a string
         * Product permalink is truth
         * Product permalink is a string
         * Product images is a array
         * Product images has items
         */
        return [
          data,
          data?.on_sale,
          data?.purchasable,
          data?.id,
          data?.name,
          typeof data?.name === "string",
          data?.price,
          typeof data?.price === "string",
          data?.permalink,
          typeof data?.permalink === "string",
          Array.isArray(data?.images),
          data?.images.length,
        ].every(Boolean);
      })
      .map(({ data }) => {
        if (!data) return null;

        return (
          <RecsItem
            key={data.id}
            product={data}
            suffixSearch="vsr_click"
            intersectionEventName="WarpDrivenVSRView"
          ></RecsItem>
        );
      });

    // No products
    if (!itemNodeList.length) {
      return null;
    }

    // Has products
    return (
      <>
        <RecsList title="Visual Similar Recommendation">
          {itemNodeList}
        </RecsList>
      </>
    );
  }, [queries]);

  return <>{mainNode}</>;
}
