// 1. CORREGIR EL 2do PARAMETRO DE LA FUNCION LastKEY__index

function LastKEY_index(KEYER_range)
{
  // INPUT

    var KEYer_values = KEYER_range.getValues();


  // TTT

    // Recorre las filas en reversa para encontrar la primera fila con datos
    for (var i = KEYer_values.length - 1; i >= 0; i--)
    {
      if (KEYer_values[i][0] !== "")
      { // Verifica si la celda no está vacía
        lastKEY_index = i + 1; // Agrega 1 porque los índices son basados en arrays.
        break; // Rompe el bucle una vez que encuentra una celda con datos.
      }
    }
  

  // OUTPUT

    return lastKEY_index;
}


function ATTer__Indexing(ATTer_range,ATTs__Origen_to_Destino)
{
  var ATTer_values = ATTer_range.getValues().flat();


  for (att_origen in ATTs__Origen_to_Destino)
  {
    var att = ATTs__Origen_to_Destino[i] ;
    var index = ATTer_values.indexOf(att) +1 ;
    var valor = ;
    .append(valor);
  }
}