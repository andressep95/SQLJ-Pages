# Despliegue de SQLJ-Pages en GitHub Pages

Este README proporciona los pasos necesarios para desplegar y actualizar el proyecto SQLJ-Pages en GitHub Pages.

## Configuración Inicial

1. Asegúrate de tener instalado `gh-pages` como dependencia de desarrollo:
   ```
   npm install gh-pages --save-dev
   ```

2. En tu `package.json`, añade o modifica las siguientes secciones:

   ```json
   {
     "homepage": "https://andressep95.github.io/SQLJ-Pages",
     "scripts": {
       ...
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

## Proceso de Actualización y Despliegue

1. Realiza tus cambios en el código.

2. Añade los archivos modificados:
   ```
   git add .
   ```

3. Realiza el commit:
   ```
   git commit -m "Descripción de tus cambios"
   ```

4. Sube los cambios a GitHub:
   ```
   git push origin main
   ```

5. Despliega en GitHub Pages:
   ```
   npm run deploy
   ```

## Verificación

Después de ejecutar `npm run deploy`:

1. Espera unos minutos para que GitHub procese los cambios.
2. Visita https://andressep95.github.io/SQLJ-Pages para ver tu sitio actualizado.

Si encuentras algún problema durante el despliegue, revisa la configuración en GitHub (Settings > Pages) y asegúrate de que la fuente está configurada para usar la rama `gh-pages`.