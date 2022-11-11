import { data } from '$lib/table.json'

export function GET() {
  return new Response(JSON.stringify(data))
}
