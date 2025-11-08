interface BadgeProps {
  number?: number;
}

function Badge({ number = 1 }: BadgeProps) {
  return <span className="badge ">{number}</span>;
}

export default Badge;
