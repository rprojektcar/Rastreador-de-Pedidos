
# CÓMO SUBIR TU APP (MÉTODO MANUAL / "A LA BRUTA")

Si no encuentras los botones de Git en tu editor, usa este método. Es más lento pero **siempre funciona**.

### PASO 1: Descargar tu Código
1. En tu editor de código (donde estás leyendo esto), busca en la barra de menú superior:
   - **File** (Archivo) > **Download Project** (Descargar Proyecto) o **Download Zip**.
   - Si no lo ves, busca **Save All** y luego intenta buscar una opción para exportar.
   - *Nota: Si estás en un entorno online como IDX, Project IDX o StackBlitz, suele haber una opción para descargar.*

2. Descomprime el archivo ZIP en tu ordenador (tendrás una carpeta con todos los archivos: `index.html`, `App.tsx`, etc.).

### PASO 2: Crear el Repositorio en GitHub
1. Ve a [github.com](https://github.com) e inicia sesión.
2. Haz clic en el botón verde **"New"** (o el símbolo `+` arriba a la derecha).
3. **Repository name**: Escribe `rastreador-rprojekt`.
4. Marca "Public".
5. Dale al botón verde **"Create repository"**.

### PASO 3: Subir los archivos
1. Verás una pantalla llena de código y comandos raros. **Ignóralos**.
2. Busca un enlace pequeño en el texto que dice:
   > ...or **upload an existing file** from your command line
   *(o subir un archivo existente)*.
   
   Haz clic en ese enlace azul **"upload an existing file"**.

3. Se abrirá una pantalla gris que dice "Drag files here".
4. Abre la carpeta que descargaste en el PASO 1.
5. Selecciona **TODOS** los archivos y arrástralos dentro de esa zona gris en el navegador.
6. Espera a que se carguen las barritas verdes.
7. Abajo del todo, dale al botón verde **"Commit changes"**.

### PASO 4: Publicar en Vercel
1. Ve a [vercel.com](https://vercel.com).
2. **Add New...** > **Project**.
3. Verás tu repositorio `rastreador-rprojekt` en la lista. Dale a **Import**.
4. **IMPORTANTE**: En "Environment Variables", añade una nueva:
   - Name: `API_KEY`
   - Value: (Pega aquí tu clave de API de Google Gemini).
5. Dale a **Deploy**.

¡Y listo!
