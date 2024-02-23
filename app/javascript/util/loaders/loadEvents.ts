export async function loadEvents({ productId }) {
  const res = await fetch(
    `/api/v1/product_proof_events?product_id=${productId}`
  );
  const json = await res.json();
  return json;
}
