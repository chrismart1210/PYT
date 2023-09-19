from PIL import Image

# INPUT 1
img_path = r'C:/Users/Chris/My Drive/000/PYT/Classing_muestra1.png'
img = Image.open(img_path)

#1img.show()

from matplotlib import pyplot as plt # Invocacion necesaria
import numpy as npy # Invocacion necesaria
# Creando 4 sub_plots dentro del plot de un shape 1x4,
Fig, subFig = plt.subplots(nrows=1, ncols=4, figsize=(15, 15))

# Instanciando el array de bits de colores que presenta cada pixel de la img de muestra
muestra = npy.array(img)
#print(muestra)

# Seteando el valor KEY (index 0) de Fig
subFig[0].imshow(muestra)
subFig[0].title.set_text('Original')

channel_red = muestra[:,:,0]
channel_green = muestra[:,:,1]
channel_blue = muestra[:,:,2]

# Seteando valores con index 1,2,3 de Fig
subFig[1].imshow(channel_red, cmap='Reds')
subFig[1].title.set_text('Rojo')

subFig[2].imshow(channel_green, cmap='Greens')
subFig[2].title.set_text('Verde')

subFig[3].imshow(channel_blue, cmap='Blues')
subFig[3].title.set_text('Azul')

#plt.show()

dimensiones = muestra.shape # (100,100,4) # Es 4 pq hay un canal mas de transparencia
#print (dimensiones) # (100,100,4)
alto = dimensiones[0]
ancho = dimensiones[1]
n_pixels = alto * ancho
#print(n_pixels) # da 10'000 pixeles

# Haciendo un arreglo en blanco en donde se enlistan todos los pixeles en una fila y en las otras 3 columnas 
pixels = npy.zeros([n_pixels,3], dtype='int')
#print(pixels) # muestra todo cero obviamente

# Eliminando el canal de transparencia
muestra = muestra[:, :, :3] 

# Se crea un array inteligente --> pixels en donde el KEY es el pixel en si mismo, y los att son los dB de Colores en R,G,B 
# Cuando termina de iterarse una fila, la siguiente fila arranca con un salto en funcion al ancho y a la fila en cuestion.
# Se piensa asi debido a que se esta aplanando una matriz a una lista.
for fila in range(alto):
  for columna in range(ancho):
    pixels[(fila*ancho) + columna , 0:3] = muestra[fila,columna,:]
#print(pixels)
# NOTA: un pixel con una combinacion de [255,255,255] indica que es blanco.
# NOTA: un pixel con una combinacion de [0,0,0] indica que es negro.


# Importamos pandas para mejorar la visualizacion de los datos
import pandas as pd
pixels_df = pd.DataFrame(data = pixels, columns=['blue', 'green', 'red']) 
print(pixels_df)

# Ploteado 3D de la distribucion de los pixels respecto a sus componentes en R,G,B
# Modificación del tamaño de la imagen
fig = plt.figure(figsize=(10, 8))
ax = fig.add_subplot(111, projection='3d')

atributos = ['blue', 'green', 'red']
x1 = pixels_df[atributos[0]].values
x2 = pixels_df[atributos[1]].values
x3 = pixels_df[atributos[2]].values

ax.scatter(x1, x2, x3, s=1, label='Pixels')
ax.scatter(0, 0, 0, c='black', s=50, label='Negro ideal')
ax.scatter(255, 255, 255, c='white', s=50, label='Blanco ideal')

ax.set_xlabel(atributos[0])
ax.set_ylabel(atributos[1])
ax.set_zlabel(atributos[2])
ax.set_title('Pixels en el espacio RxGxB')
ax.legend()

ax.view_init(azim=0, elev=0)

#plt.show()

# Clustering
# Se hace el analisis de inercia, que significa cuan compactos estan los datos en un det. cluster
# mathly, es la suma de distancias al cuadrado entre el centroide y los datos circundantes.
from sklearn.cluster import KMeans
scores = [KMeans(n_clusters=i+2).fit(pixels_df).inertia_ for i in range(8)]
plt.plot(npy.arange(2, 10), scores)
plt.xlabel('Numero de Clusters')
plt.ylabel("Inercia")
plt.title("Inercia vs Clusters")

plt.show()


# Instanciando el modelo de Clustering --> Kmeans
modelo = KMeans(n_clusters=3, random_state=0)

labels = modelo.fit_predict(muestra.reshape(-1, 3))
cluster_colors = [(255, 0, 0), (0, 255, 0), (0, 0, 255), (255, 255, 0)]  # Rojo, Verde, Azul, Amarillo
colored_pixels = [cluster_colors[label] for label in labels]
clustered_img = npy.array(colored_pixels).reshape(alto, ancho, 3).astype('uint8')
