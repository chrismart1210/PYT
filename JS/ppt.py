import win32com.client

# Ruta de la imagen
imagen_ruta = r"C:\Users\cristian.santivanez\Documents\GitHub\PYT\imagen1.jpg"

# Crear una instancia de PowerPoint
ppt = win32com.client.Dispatch("PowerPoint.Application")

# Crear una nueva presentación
presentation = ppt.Presentations.Add()

# Diapositiva de título
title_slide = presentation.Slides.Add(1, 1)  # Tipo 1: Diapositiva de título
title = title_slide.Shapes.Title
title.TextFrame.TextRange.Text = "Mi Presentación"

# Diapositiva de contenido
content_slide = presentation.Slides.Add(2, 2)  # Tipo 2: Diapositiva de contenido
content = content_slide.Shapes.Placeholders(2)  # El número 2 representa el cuadro de texto para el contenido
content.TextFrame.TextRange.Text = "Hola, mundo"

# Agregar la imagen a la diapositiva de contenido
image_shape = content_slide.Shapes.AddPicture(FileName=imagen_ruta, LinkToFile=False, SaveWithDocument=True, Left=0, Top=0, Width=-1, Height=-1)

# Calcular el centro de la diapositiva
slide_width = content_slide.Master.Width
slide_height = content_slide.Master.Height
image_width = image_shape.Width
image_height = image_shape.Height

left = (slide_width - image_width) / 2
top = (slide_height - image_height) / 2

# Establecer la posición izquierda y superior para centrar la imagen
image_shape.Left = left
image_shape.Top = top


# Especificar la ubicación y el nombre del archivo de guardado
ruta_guardado = r"C:\Users\cristian.santivanez\Documents\GitHub\PYT\mi_presentacion.pptx"

# Guardar la presentación en la ubicación especificada
presentation.SaveAs(ruta_guardado)

# Cerrar PowerPoint
ppt.Quit()
