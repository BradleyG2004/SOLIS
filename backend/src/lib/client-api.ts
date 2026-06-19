async function postAPI<T>(path: string, data: unknown): Promise<T> {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Erreur ${res.status}: ${text}`)
  }
  return res.json() as Promise<T>
}

export async function createCocktailOrder(data: {
  cocktailName: string
  customerName: string
  email: string
  phone?: string
  ingredients: { name: string; quantity: number; unit: string }[]
  notes?: string
  estimatedPrice?: number
}) {
  return postAPI('/api/cocktail-orders', data)
}

export async function createQuoteRequest(data: {
  customerName: string
  email: string
  phone?: string
  offer?: string
  items: { itemType: string; quantity: number }[]
  notes?: string
}) {
  return postAPI('/api/quote-requests', data)
}
