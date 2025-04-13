import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
      className={ `p-2 rounded-md ${ bgColor || "bg-white"} border ${ borderColor || "border-gray-200"} ${ textColor || "text-gray-600"}` }
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
      className={ `w-full p-2 rounded-md ${ bgColor || "bg-white"} border ${ borderColor || "border-gray-200"} ${ textColor || "text-gray-600"}` }
    >
      { children }
    </div>
  )
}

export function SmallCard({
  children, bgColor, textColor, borderColor
}: {
  children: React.ReactNode,
  bgColor?: string,
  textColor?: string,
  borderColor?: string
}) {
  return (
    <TooltipProvider
      delayDuration={100}
    >
      <Tooltip>
        <TooltipTrigger
          className={ `w-full p-1 text-left rounded-sm text-sm truncate ${ bgColor || "bg-white"} border ${ borderColor || "border-gray-200"} ${ textColor || "text-gray-600"}` }
        >
            { children }
        </TooltipTrigger>
        <TooltipContent
          side="right"
        >
          <p>{ children }</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

  )
}