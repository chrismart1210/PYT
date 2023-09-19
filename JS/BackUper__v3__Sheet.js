function BackUper__Fotos()
{
  // INPUT's
  var Sheet_origen = SpreadsheetApp.openById("1MhkBpaoeQJpyxoBLFC2H-zNlyY-QfRo9RvJM5NrdLRc").getSheetByName("Export GdO");
  var Sheet_destino = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Import Fotos");

  // Obtener los valores de todo el rango de datos
  var data = Sheet_origen.getDataRange().getValues();

  // Pegar los valores en la hoja de destino manteniendo los hipervínculos
  var numRows = data.length;
  var numCols = data[0].length;
  var destRange = Sheet_destino.getRange(1, 1, numRows, numCols);
  destRange.setValues(data);

  // Copiar los hipervínculos desde la hoja de origen a la hoja de destino
  var origHyperlinks = Sheet_origen.getRange(1, 1, numRows, numCols).getRichTextValues();
  var destHyperlinks = destRange.getRichTextValues();
  for (var i = 0; i < numRows; i++)
  {
    for (var j = 0; j < numCols; j++)
    {
      destHyperlinks[i][j] = origHyperlinks[i][j];
    }
  }
  destRange.setRichTextValues(destHyperlinks);

  // Agregar estampa de tiempo en el formato deseado
  var fechaActual = new Date();
  var estampaTiempo = Utilities.formatDate(fechaActual, "GMT-3", "dd/MM - HH:mm");

  // Establecer el formato para la celda en la fila 1, columna 1
  var cell = Sheet_destino.getRange(1, 1);
  cell.setValue(estampaTiempo);
  cell.setBackground("black");
  cell.setFontColor("green");
  cell.setFontWeight("bold");
}
