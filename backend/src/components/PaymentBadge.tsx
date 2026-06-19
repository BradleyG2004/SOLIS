export function PaymentBadge({ message }: { message?: string }) {
  return (
    <span className="badge" title="Fonctionnalité à venir">
      {message || 'Paiement en ligne — bientôt disponible'}
    </span>
  )
}
