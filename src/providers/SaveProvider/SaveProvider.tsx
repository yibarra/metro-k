import React, { createContext } from 'react'
import jsPDF from 'jspdf'

// save context
const SaveContext = createContext({})

// save provider
const SaveProvider: React.FC<any> = ({ children, stage }) => {
  // on save
  const onSave = () => {
    var pdf = new jsPDF('l', 'px', [stage.width(), stage.height()])
    pdf.setTextColor('#000000')

    // then put image on top of texts (so texts are not visible)
    pdf.addImage(
      stage.toDataURL({ pixelRatio: 2 }),
      0,
      0,
      stage.width(),
      stage.height()
    )

    pdf.save('map.pdf')
  }
  
  // render
  return (
    <SaveContext.Provider value={{ onSave }}>
      {children}
    </SaveContext.Provider>
  )
}

export default SaveProvider
