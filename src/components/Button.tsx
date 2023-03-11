import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes <HTMLButtonElement> & {
  isOutlined?: boolean,
}

export function Button({ isOutlined = false, ...props }: ButtonProps) {
  return (
    <button  className={ ` ${isOutlined ? ' text-purple  bg-white border border-purple dark:bg-black-400' : ' text-white '} flex items-center rounded-md justify-center bg-purple  pl-5 pr-5 h-10 w-full ` }  {...props} /> 
  )
}

