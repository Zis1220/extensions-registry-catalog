export async function handleHealth() {
  return Response.json({ status: 'ok' });
}