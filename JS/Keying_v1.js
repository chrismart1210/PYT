function KEYing_v1()
{
  // INPUTS

    // INPUT 1.1
      var BD_Destino = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('CLIENTES');
      // INPUT 1.2
        var Keyer1 = "A:A"; var Keyer1_col = 1;

    // INPUT 2.1
      var BD_Origen = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Import IG');
      // INPUT 2.2
        var Keyer2 = "AJ:AJ"; var Keyer2_col = 36;


  // TTT

    // Encuentra la última llave en BD_Destino
      var lastKEY_index1 = LastKEY_index(BD_Destino,Keyer1);
        var lastKEY1 = BD_Destino.getRange(lastKEY_index1,Keyer1_col).getValue();
        //Test
          //Browser.msgBox("El ultimo objeto llave en el Sheet de Destino es: " + lastKEY1);

    // Encuentra la última llave en BD_Origen
      var lastKEY_index2 = LastKEY_index(BD_Origen,Keyer2);
        var lastKEY2 = BD_Origen.getRange(lastKEY_index2,Keyer2_col).getValue();
        //Test
          //Browser.msgBox("El ultimo objeto llave en el Sheet de Origen es: " + lastKEY2); 

    // Encontrar el index del KEY1 en el KEYer2
      var key1_in_keyer2_index = BD_Origen.getRange(Keyer2).getValues().flat().indexOf(lastKEY1) + 1;

    // Instanciando el Llavero que falta registrar ...
      var array_a_copiar = BD_Origen.getRange(key1_in_keyer2_index + 1,Keyer2_col,lastKEY_index2,1).getValues();
      //Test
        //Browser.msgBox("El primer nuevo KEY es: " + array_a_copiar[0][0]);


  // OUTPUT
    BD_Destino.getRange(lastKEY_index1+1,1,array_a_copiar.length,1).setValues(array_a_copiar);

}

function LastKEY_index(sheet,rango_llavero)
{
  // INPUT
    var rango_llavero = sheet.getRange(rango_llavero).getValues();

  // TTT
  // Recorre las filas en reversa para encontrar la primera fila con datos
  for (var i = rango_llavero.length - 1; i >= 0; i--)
  {
    if (rango_llavero[i][0] !== "")
    { // Verifica si la celda no está vacía
      lastKEY_index = i + 1; // Agrega 1 porque los índices son basados en arrays.
      break; // Rompe el bucle una vez que encuentra una celda con datos.
    }
  }
  
  // OUTPUT
    return lastKEY_index;
}
