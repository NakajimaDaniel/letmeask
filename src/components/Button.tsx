import { ButtonHTMLAttributes } from "react";

// import '../styles/button.scss'


type ButtonProps = ButtonHTMLAttributes <HTMLButtonElement> & {
  isOutlined?: boolean,
}

export function Button({ isOutlined = false, ...props }: ButtonProps) {
  return (
    // <button className={`button ${isOutlined ? 'outlined' : ''}`} {...props} /> 


    <button  className={ " flex items-center rounded-md justify-center bg-purple text-white pl-5 pr-5 w-10/12 h-10" }  {...props} /> 

  )
}