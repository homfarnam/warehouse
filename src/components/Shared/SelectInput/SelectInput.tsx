import { useState } from "react"

interface SelectInputProps {
  initialValue: number | string
  getSelectValue: (value: number | string) => void
}

const SelectInput = ({ initialValue, getSelectValue }: SelectInputProps) => {
  const [selectValue, setSelectValue] = useState<number | string>(initialValue)

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const data = e.target.value
    setSelectValue(data)
    getSelectValue(data)
  }

  return (
    <select value={selectValue} onChange={handleSelectChange}>
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
      <option>6</option>
      <option>7</option>
      <option>8</option>
      <option>9</option>
      <option>10</option>
    </select>
  )
}

export default SelectInput
