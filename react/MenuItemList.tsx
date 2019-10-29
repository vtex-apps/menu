import React from 'react'
import { useListContext } from 'vtex.list-context'

export default function MenuItemList() {
  const { list } = useListContext()
  return (
    <>
      {list}
    </>
  )
}
