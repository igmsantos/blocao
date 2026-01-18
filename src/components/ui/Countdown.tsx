import { useCountdown } from '../../hooks'

interface CountdownProps {
  targetDate: string
  title?: string
}

export function Countdown({ targetDate, title }: CountdownProps) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate)

  if (isExpired) {
    return (
      <div className="countdown-container">
        {title && <h3>{title}</h3>}
        <p className="muted">O evento já aconteceu!</p>
      </div>
    )
  }

  return (
    <div className="countdown-container">
      {title && <h3>{title}</h3>}
      <div className="countdown">
        <div className="countdown-item">
          <span className="countdown-value">{days}</span>
          <span className="countdown-label">dias</span>
        </div>
        <div className="countdown-item">
          <span className="countdown-value">{hours}</span>
          <span className="countdown-label">horas</span>
        </div>
        <div className="countdown-item">
          <span className="countdown-value">{minutes}</span>
          <span className="countdown-label">min</span>
        </div>
        <div className="countdown-item">
          <span className="countdown-value">{seconds}</span>
          <span className="countdown-label">seg</span>
        </div>
      </div>
    </div>
  )
}
