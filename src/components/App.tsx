import React, { FC, useEffect, useState } from 'react'
import '../styles/style.css'

export const App: FC = () => {
  const [drag, setDrag] = useState<boolean>(false)
  const [image, setImage] = useState<File | null>()
  const [preview, setPreview] = useState<string | null>()

  useEffect(() => {
    if (image) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(image)
    } else {
      setPreview(null)
    }
  }, [image])
  // Если пишешь на typescript 'any' нужно избегать как можно больше. Иначе какой смысл TS?
  function dragStartHandler(e: Event) {
    e.preventDefault()
    e.stopPropagation()
    setDrag(true)
  }

  function dragLeaveHandler(e: any) {
    e.preventDefault()
    e.stopPropagation()
    setDrag(false)
  }

  function onDropHandler(e: any) {
    e.preventDefault()
    // TODO: comment
    e.stopPropagation()
    // const reader = new FileReader()
    const files = [...e.dataTransfer.files]
    const file = files[0]
    // reader.readAsDataURL(files[0])
    console.log(file)
    if (file) {
      setImage(file)
    } else {
      // TODO: comment
      setImage(null)
    }
    setDrag(false)
  }

  return (
    <div
      // лучше обойтись без двойного отрицания где возможно
      className={!drag ? 'wrapper' : `wrapper active`}
      // onDragEnter={(e) => dragStartHandler(e)}
      onDragOver={(e) => dragStartHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
      onDrop={(e) => onDropHandler(e)}
    >
      {preview && (
        <div className={'img-wrap'}>
          {/* alt=123 почему? */}
          <img src={preview as string} alt="123" />
        </div>
      )}
    </div>
  )
}
