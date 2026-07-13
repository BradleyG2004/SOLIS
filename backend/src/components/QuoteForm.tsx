'use client'

import { useSearchParams } from 'next/navigation'
import { useState, Suspense } from 'react'
import { createQuoteRequest } from '@/lib/client-api'
import { buildWhatsAppLink } from '@/lib/whatsapp'
import type { LaundryOffer } from '@/lib/types'

const defaultItems = [
  { itemType: 'Chemise', quantity: 1 },
  { itemType: 'Pantalon', quantity: 1 },
]

function QuoteFormInner({
  offers,
  whatsappNumber,
}: {
  offers: LaundryOffer[]
  whatsappNumber?: string | null
}) {
  const searchParams = useSearchParams()
  const preselectedSlug = searchParams.get('offre')

  const [customerName, setCustomerName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [offerSlug, setOfferSlug] = useState(preselectedSlug || '')
  const [items, setItems] = useState(defaultItems)
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const selectedOffer = offers.find((o) => o.slug === offerSlug)

  const updateItem = (index: number, field: 'itemType' | 'quantity', value: string | number) => {
    setItems(items.map((item, i) => (i === index ? { ...item, [field]: value } : item)))
  }

  const addItem = () => setItems([...items, { itemType: '', quantity: 1 }])
  const removeItem = (index: number) => setItems(items.filter((_, i) => i !== index))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validItems = items.filter((i) => i.itemType.trim() && i.quantity > 0)
    if (validItems.length === 0) {
      setErrorMsg('Ajoutez au moins un article.')
      setStatus('error')
      return
    }
    setStatus('loading')
    setErrorMsg('')
    try {
      await createQuoteRequest({
        customerName,
        email,
        phone: phone || undefined,
        offer: selectedOffer?.id,
        items: validItems,
        notes: notes || undefined,
      })
      setStatus('success')

      if (whatsappNumber) {
        const itemsText = validItems.map((i) => `- ${i.itemType} x${i.quantity}`).join('\n')
        const message = `Bonjour, je viens d'envoyer une demande de devis pressing :\n\n${selectedOffer ? `Offre : ${selectedOffer.name}\n` : ''}${itemsText}\n\nNom : ${customerName}\nTéléphone : ${phone || 'non renseigné'}`
        window.open(buildWhatsAppLink(whatsappNumber, message), '_blank', 'noopener,noreferrer')
      }
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Erreur lors de l\'envoi.')
    }
  }

  if (status === 'success') {
    return (
      <div className="alert alert-success">
        Votre demande de devis a été enregistrée. Nous vous répondrons sous 24 à 48 h.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="offer">Offre souhaitée</label>
        <select id="offer" value={offerSlug} onChange={(e) => setOfferSlug(e.target.value)}>
          <option value="">— Non précisé —</option>
          {offers.map((o) => (
            <option key={o.id} value={o.slug}>
              {o.name}
            </option>
          ))}
        </select>
      </div>

      <h3 style={{ fontSize: '1rem', margin: '1.5rem 0 0.75rem' }}>Articles à traiter</h3>
      {items.map((item, index) => (
        <div key={index} className="ingredient-row" style={{ marginBottom: '0.5rem' }}>
          <input
            placeholder="Type d'article (ex. Robe)"
            value={item.itemType}
            onChange={(e) => updateItem(index, 'itemType', e.target.value)}
          />
          <input
            type="number"
            min={1}
            value={item.quantity}
            onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value, 10) || 1)}
            style={{ width: '70px' }}
          />
          <span className="meta">pièce(s)</span>
          {items.length > 1 && (
            <button type="button" className="btn btn-outline" onClick={() => removeItem(index)}>
              Retirer
            </button>
          )}
        </div>
      ))}
      <button type="button" className="btn btn-outline" onClick={addItem} style={{ marginBottom: '1.5rem' }}>
        + Ajouter un article
      </button>

      <h3 style={{ fontSize: '1rem', margin: '0 0 0.75rem' }}>Vos coordonnées</h3>
      <div className="form-group">
        <label htmlFor="customerName">Nom</label>
        <input id="customerName" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
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
        <label htmlFor="notes">Instructions particulières</label>
        <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
      </div>

      {status === 'error' && <div className="alert alert-error" style={{ marginBottom: '1rem' }}>{errorMsg}</div>}

      <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
        {status === 'loading' ? 'Envoi…' : 'Envoyer ma demande de devis'}
      </button>
    </form>
  )
}

export function QuoteForm({
  offers,
  whatsappNumber,
}: {
  offers: LaundryOffer[]
  whatsappNumber?: string | null
}) {
  return (
    <Suspense fallback={<p>Chargement…</p>}>
      <QuoteFormInner offers={offers} whatsappNumber={whatsappNumber} />
    </Suspense>
  )
}
