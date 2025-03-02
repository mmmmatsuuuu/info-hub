type Icon = {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}


export function LoadingIcon({
  width, height, fill, className
}: Icon) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className={ className ? className : ""}
      height={ height ? height: "24px"} 
      viewBox="0 -960 960 960" 
      width={ width ? width: "24px"} 
      fill={ fill ? fill: "#e3e3e3"}
    >
        <path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z"/>
    </svg>
  )
}

export function ErrorIcon({
  width, height, fill, className
}: Icon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={ className ? className : ""} 
      height={ height ? height: "24px"} 
      viewBox="0 -960 960 960" 
      width={ width ? width: "24px"} 
      fill={ fill ? fill: "#e3e3e3"}
    >
      <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
    </svg>
  )
}

export function ExclamationIcon({
  width, height, fill, className
}: Icon) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className={ className ? className : ""} 
      height={ height ? height: "24px"} 
      viewBox="0 -960 960 960" 
      width={ width ? width: "24px"} 
      fill={ fill ? fill: "#e3e3e3"}
    >
      <path d="M440-400v-360h80v360h-80Zm0 200v-80h80v80h-80Z"/>
    </svg>
  )
}