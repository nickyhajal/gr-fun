export async function post(path, body) {
  const res = await fetch(`/api/v1/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  return json;
}
