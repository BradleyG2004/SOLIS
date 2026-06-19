'use client'

import { useState } from 'react'
import { createCocktailOrder } from '@/lib/client-api'
import { formatPrice } from '@/lib/format'
import type { Ingredient } from '@/lib/types'

type SelectedIngredient = {
  ingredient: Ingredient
  quantity: number
}

export function CocktailBuilder({ ingredients }: { ingredients: Ingredient[] }) {
  const [cocktailName, setCocktailName] = useState('Mon cocktail')
  const [selected, setSelected] = useState<SelectedIngredient[]>([])
  const [customerName, setCustomerName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const addIngredient = (ingredientId: string) => {
    const ingredient = ingredients.find((i) => i.id === ingredientId)
    if (!ingredient) return
    if (selected.some((s) => s.ingredient.id === ingredientId)) return
    setSelected([...selected, { ingredient, quantity: 2 }])
  }

  const updateQuantity = (id: string, quantity: number) => {
    setSelected(
      selected.map((s) =>
        s.ingredient.id === id ? { ...s, quantity: Math.max(0.5, quantity) } : s,
      ),
    )
  }

  const removeIngredient = (id: string) => {
    setSelected(selected.filter((s) => s.ingredient.id !== id))
  }

  const estimatedPrice = selected.reduce(
    (sum, s) => sum + s.ingredient.pricePerUnit * s.quantity,
    0,
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selected.length === 0) {
      setErrorMsg('Ajoutez au moins un ingrédient.')
      setStatus('error')
      return
    }
    setStatus('loading')
    setErrorMsg('')
    try {
      await createCocktailOrder({
        cocktailName,
        customerName,
        email,
        phone: phone || undefined,
        notes: notes || undefined,
        estimatedPrice: Math.round(estimatedPrice * 100) / 100,
        ingredients: selected.map((s) => ({
          name: s.ingredient.name,
          quantity: s.quantity,
          unit: s.ingredient.unit,
        })),
      })
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Erreur lors de la commande.')
    }
  }

  if (status === 'success') {
    return (
      <div className="alert alert-success">
        Votre commande a été enregistrée. Nous vous recontacterons prochainement.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="cocktailName">Nom de votre cocktail</label>
        <input
          id="cocktailName"
          value={cocktailName}
          onChange={(e) => setCocktailName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="addIngredient">Ajouter un ingrédient</label>
        <select
          id="addIngredient"
          defaultValue=""
          onChange={(e) => {
            if (e.target.value) addIngredient(e.target.value)
            e.target.value = ''
          }}
        >
          <option value="">— Choisir —</option>
          {ingredients.map((ing) => (
            <option key={ing.id} value={ing.id}>
              {ing.name} ({ing.type}) — {formatPrice(ing.pricePerUnit)}/{ing.unit}
            </option>
          ))}
        </select>
      </div>

      {selected.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Votre composition</h3>
          {selected.map((s) => (
            <div key={s.ingredient.id} className="ingredient-row">
              <span>{s.ingredient.name}</span>
              <input
                type="number"
                min={0.5}
                step={0.5}
                value={s.quantity}
                onChange={(e) => updateQuantity(s.ingredient.id, parseFloat(e.target.value))}
                style={{ width: '70px' }}
              />
              <span className="meta">{s.ingredient.unit}</span>
              <button type="button" className="btn btn-outline" onClick={() => removeIngredient(s.ingredient.id)}>
                Retirer
              </button>
            </div>
          ))}
          <p className="price">Prix estimé : {formatPrice(estimatedPrice)}</p>
        </div>
      )}

      <h3 style={{ fontSize: '1rem', margin: '1.5rem 0 0.75rem' }}>Vos coordonnées</h3>

      <div className="form-group">
        <label htmlFor="customerName">Nom</label>
        <input
          id="customerName"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Téléphone (optionnel)</label>
        <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="notes">Notes (optionnel)</label>
        <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
      </div>

      {status === 'error' && <div className="alert alert-error" style={{ marginBottom: '1rem' }}>{errorMsg}</div>}

      <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
        {status === 'loading' ? 'Envoi…' : 'Commander mon cocktail'}
      </button>
    </form>
  )
}
