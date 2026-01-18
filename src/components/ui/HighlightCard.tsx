interface HighlightCardProps {
  title: string
  description: string
  badge?: string
  icon?: string
}

export function HighlightCard({ title, description, badge, icon }: HighlightCardProps) {
  return (
    <div className="panel">
      {badge && <p className="eyebrow">{badge}</p>}
      <h3>
        {icon && <span style={{ marginRight: '0.5rem' }}>{icon}</span>}
        {title}
      </h3>
      <p className="muted">{description}</p>
    </div>
  )
}
