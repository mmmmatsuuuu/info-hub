export function Header1({
  title, borderColor, textColor
}: {
  title:string,
  borderColor?: string,
  textColor?: string,
}) {
  return (
    <div
      className={ `w-full border-b-2 ${ borderColor || "border-gray-400"} mt-6 mb-2` }
    >
      <h1
        className={ `text-2xl font-bold ${ textColor || "text-gray-600"}` }
      >
        { title }
      </h1>
    </div>
  );
}

export function Header2({
  title, textColor
}: {
  title:string,
  textColor?: string,
}) {
  return (
    <h2
      className={ `text-xl font-bold ${ textColor || "text-gray-600"} mt-4 mb-1` }
    >
      { title }
    </h2>
  );
}

export function Header3({
  title, textColor
}: {
  title:string,
  textColor?: string,
}) {
  return (
    <h3
      className={ `text-md font-bold ${ textColor || "text-gray-500"} mt-2 mb-1` }
    >
      { title }
    </h3>
  );
}