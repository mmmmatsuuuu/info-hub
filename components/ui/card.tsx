export function OuterCard({
  children, bgColor, textColor, borderColor
}: {
  children: React.ReactNode,
  bgColor?: string,
  textColor?: string,
  borderColor?: string
}) {
  return (
    <div
      className={ `p-6 rounded-md ${ bgColor || "bg-white"} border ${ borderColor || "border-gray-200"} ${ textColor || "text-gray-600"}` }
    >
      { children }
    </div>
  )
}

export function InnerCard({
  children, bgColor, textColor, borderColor
}: {
  children: React.ReactNode,
  bgColor?: string,
  textColor?: string,
  borderColor?: string
}) {
  return (
    <div
      className={ `p-2 rounded-md ${ bgColor || "bg-white"} border ${ borderColor || "border-gray-200"} ${ textColor || "text-gray-600"}` }
    >
      { children }
    </div>
  )
}