import React, { FC, useState } from 'react'
import '../styles/style.css'

export const App: FC = () => {
  const [drag, setDrag] = useState(true)

  function dragStartHandler(e: any) {
    e.preventDefault()
    setDrag(true)
  }

  function dragLeaveHandler(e: any) {
    e.preventDefault()
    setDrag(false)
  }

  function onDropHandler(e: any) {
    e.preventDefault()
    setDrag(true)
    const files = [...e.dataTransfer.files]
    const reader = new FileReader()
    reader.readAsDataURL(files[0])

    console.log(reader.readAsDataURL(files[0]))

    // const formData = new FormData()
    // formData.append('file', files[0])
    // console.log(files.length);
    // console.log(files);
    // console.log(FormData);
  }

  return (
    <form className="app">
      {drag ? (
        <div
          className="drop"
          onDragStart={(e) => dragStartHandler(e)}
          onDragOver={(e) => dragLeaveHandler(e)}
          onDragLeave={(e) => dragStartHandler(e)}
        >
          Перетащите файл для загрузки
        </div>
      ) : (
        <div
          className="drop-area"
          onDragStart={(e) => dragStartHandler(e)}
          onDragOver={(e) => dragLeaveHandler(e)}
          onDragLeave={(e) => dragStartHandler(e)}
          onDrop={(e) => onDropHandler(e)}
        >
          Отпустите
        </div>
      )}
    </form>
  )
}
