function BackUper_v2__Sheet()
{
  // INPUTs
    // Origen 
      var Sheet_origen = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Import Sheet");
        var Upload_Row = 1;
        var Upload_Col = 1;
    
    // Destino
      var Sheet_destino = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Import Sheet duro");
        var Download_Row = 1;
        var Download_Col = 1;


  // TTT
    var data_range = Sheet_origen.getRange(Upload_Row, Upload_Col, Sheet_origen.getLastRow() - Upload_Row + 1, Sheet_origen.getLastColumn() - Upload_Col + 1);
    var data_values = data_range.getValues();

  
  // OUTPUTs
    // Setting
      Sheet_destino.getRange(Download_Row, Download_Col, data_values.length, data_values[0].length).setValues(data_values);

    // Time-Stamp
      Sheet_destino.getRange(1, 1).setValue(Utilities.formatDate(new Date(), "GMT-3", "dd/MM - HH:mm"));  
      Sheet_destino.getRange(1, 1).setBackground("black");
      Sheet_destino.getRange(1, 1).setFontColor("#00FF00");
      Sheet_destino.getRange(1, 1).setFontWeight("bold");
}
