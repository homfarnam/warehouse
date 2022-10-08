import React from "react"
import { ClipLoader } from "react-spinners"

interface LoaderProps {
  loading: boolean
  size: number
  color?: string
}

const Loader = ({ loading, size, color = "black" }: LoaderProps) => {
  return (
    <ClipLoader
      className="loader"
      color={color}
      loading={loading}
      size={size}
    />
  )
}

export default Loader
