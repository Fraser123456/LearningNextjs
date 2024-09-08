import React from "react";

interface Props {
  params: { slug: string[] };
  searchParams: {
    sortOrder: string;
  };
}

function ProductPage({ params: { slug }, searchParams: { sortOrder } }: Props) {
  return (
    <div>
      ProductPage {slug} Order: {sortOrder}
    </div>
  );
}

export default ProductPage;
