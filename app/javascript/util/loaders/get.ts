export async function get(path) {
  const res = await fetch(`/api/v1/${path}`);
  const json = await res.json();
  return json;
}
