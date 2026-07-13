'use client'

import { useState } from 'react'
import { buildWhatsAppLink } from '@/lib/whatsapp'

export function ImmoDevisForm({ whatsappNumber }: { whatsappNumber?: string | null }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    pickup: '',
    dropoff: '',
    description: '',
    date: '',
  })

  function handle(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/quote-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          service: 'immo',
          details: `Départ : ${form.pickup}\nArrivée : ${form.dropoff}\nDate souhaitée : ${form.date}\nDescription : ${form.description}`,
        }),
      })
      if (!res.ok) throw new Error()
      setStatus('ok')

      if (whatsappNumber) {
        const message = `Bonjour, je viens d'envoyer une demande de devis transport :\n\nDépart : ${form.pickup}\nArrivée : ${form.dropoff}\nDate souhaitée : ${form.date || 'non précisée'}\nDescription : ${form.description}\n\nNom : ${form.name}\nTéléphone : ${form.phone}`
        window.open(buildWhatsAppLink(whatsappNumber, message), '_blank', 'noopener,noreferrer')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'ok') {
    return (
      <div className="alert alert-success">
        <strong>Demande envoyée !</strong> Nous vous recontactons rapidement pour confirmer le créneau et le prix.
      </div>
    )
  }

  return (
    <form onSubmit={submit}>
      <div className="form-group">
        <label htmlFor="name">Nom complet</label>
        <input id="name" name="name" type="text" required value={form.name} onChange={handle} placeholder="Jean Dupont" />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Téléphone</label>
        <input id="phone" name="phone" type="tel" required value={form.phone} onChange={handle} placeholder="+237 6XX XXX XXX" />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email (optionnel)</label>
        <input id="email" name="email" type="email" value={form.email} onChange={handle} placeholder="vous@exemple.com" />
      </div>
      <div className="form-group">
        <label htmlFor="pickup">Adresse de départ</label>
        <input id="pickup" name="pickup" type="text" required value={form.pickup} onChange={handle} placeholder="Quartier, rue, point de repère" />
      </div>
      <div className="form-group">
        <label htmlFor="dropoff">Adresse d'arrivée</label>
        <input id="dropoff" name="dropoff" type="text" required value={form.dropoff} onChange={handle} placeholder="Quartier, rue, point de repère" />
      </div>
      <div className="form-group">
        <label htmlFor="date">Date souhaitée</label>
        <input id="date" name="date" type="date" value={form.date} onChange={handle} />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description de la charge</label>
        <textarea id="description" name="description" required value={form.description} onChange={handle} placeholder="Type d'objets, dimensions approximatives, étage…" />
      </div>

      {status === 'error' && (
        <div className="alert alert-error" style={{ marginBottom: '16px' }}>
          Une erreur est survenue. Veuillez réessayer.
        </div>
      )}

      <button type="submit" className="btn immo-cta" disabled={status === 'sending'}>
        {status === 'sending' ? 'Envoi…' : 'Envoyer la demande'}
      </button>
    </form>
  )
}
