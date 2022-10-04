import React from "react"
import { ClipLoader } from "react-spinners"

interface LoaderProps {
  loading: boolean
  size: number
}

const Loader = ({ loading, size }: LoaderProps) => {
  return (
    <ClipLoader
      className="flex items-center justify-center w-full my-10"
      color="black"
      loading={loading}
      size={size}
    />
  )
}

export default Loader
