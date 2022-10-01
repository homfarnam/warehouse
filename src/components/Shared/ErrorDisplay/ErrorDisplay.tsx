import React from "react"

interface ErrorDisplayProps {
  text: string
}

const ErrorDisplay = ({ text }: ErrorDisplayProps) => {
  return (
    <span className="flex justify-center w-full mx-auto text-2xl font-bold text-black">
      {text}
    </span>
  )
}

export default ErrorDisplay
