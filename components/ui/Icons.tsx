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

export function ArrowForwardIcon({
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
      <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/>
    </svg>
  )
}

export function ArrowBackIcon({
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
      <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/>
    </svg>
  )
}
export function MovieIcon({
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
      <path d="m380-300 280-180-280-180v360ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/>
    </svg>
  )
}
export function QuizIcon({
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
      <path d="M560-360q17 0 29.5-12.5T602-402q0-17-12.5-29.5T560-444q-17 0-29.5 12.5T518-402q0 17 12.5 29.5T560-360Zm-30-128h60q0-29 6-42.5t28-35.5q30-30 40-48.5t10-43.5q0-45-31.5-73.5T560-760q-41 0-71.5 23T446-676l54 22q9-25 24.5-37.5T560-704q24 0 39 13.5t15 36.5q0 14-8 26.5T578-596q-33 29-40.5 45.5T530-488ZM320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z"/>
    </svg>
  )
}
export function OtherContentIcon({
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
      <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/>
    </svg>
  )
}

export function CloseIcon({
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
      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
    </svg>
  )
}
