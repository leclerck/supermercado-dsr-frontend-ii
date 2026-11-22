/** Letras con acentos, números y signos habituales en nombres de producto. */
const NOMBRE_REGEX = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9][A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9 .,\-/]{1,79}$/

/** Letras con acentos, números, espacios y guiones (marcas). */
const MARCA_REGEX = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9][A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9 \-]{0,39}$/

/** Solo letras con acentos y espacios (categorías). */
const CATEGORIA_REGEX = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:\s[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/

/** Entero no negativo (precio en pesos). */
const PRECIO_REGEX = /^\d+$/

/** Entero no negativo (stock). */
const CANTIDAD_REGEX = /^\d+$/

/**
 * @param {string} value
 * @returns {string | null} Mensaje de error, o null si es válido.
 */
export function validateNombre(value) {
  const trimmed = value.trim()
  if (!trimmed) {
    return 'El nombre es obligatorio.'
  }
  if (!NOMBRE_REGEX.test(trimmed)) {
    return 'El nombre debe tener 2 a 80 caracteres (letras, números, espacios, . , - /).'
  }
  return null
}

/**
 * @param {string} value
 * @returns {string | null}
 */
export function validateMarca(value) {
  const trimmed = value.trim()
  if (!trimmed) {
    return 'La marca es obligatoria.'
  }
  if (!MARCA_REGEX.test(trimmed)) {
    return 'La marca debe tener 1 a 40 caracteres (letras, números, espacios o guiones).'
  }
  return null
}

/**
 * @param {string} value
 * @returns {string | null}
 */
export function validateCategoria(value) {
  const trimmed = value.trim()
  if (!trimmed) {
    return 'La categoría es obligatoria.'
  }
  if (!CATEGORIA_REGEX.test(trimmed)) {
    return 'La categoría solo admite letras y espacios (sin números ni símbolos).'
  }
  return null
}

/**
 * @param {string} value
 * @returns {string | null}
 */
export function validatePrecio(value) {
  const trimmed = String(value).trim()
  if (!trimmed) {
    return 'El precio es obligatorio.'
  }
  if (!PRECIO_REGEX.test(trimmed)) {
    return 'El precio debe ser un número entero mayor o igual a 0 (sin decimales ni símbolos).'
  }
  return null
}

/**
 * @param {string} value
 * @returns {string | null}
 */
export function validateCantidad(value) {
  const trimmed = String(value).trim()
  if (!trimmed) {
    return 'La cantidad es obligatoria.'
  }
  if (!CANTIDAD_REGEX.test(trimmed)) {
    return 'La cantidad debe ser un número entero mayor o igual a 0 (sin decimales).'
  }
  return null
}

/**
 * Valida todos los campos del formulario de producto.
 * @param {{ nombre: string, marca: string, categoria: string, precio: string, cantidad: string }} form
 * @returns {Record<string, string>} Mapa campo → mensaje; vacío si no hay errores.
 */
export function validateProductoForm(form) {
  const errors = {}

  const nombreError = validateNombre(form.nombre)
  if (nombreError) errors.nombre = nombreError

  const marcaError = validateMarca(form.marca)
  if (marcaError) errors.marca = marcaError

  const categoriaError = validateCategoria(form.categoria)
  if (categoriaError) errors.categoria = categoriaError

  const precioError = validatePrecio(form.precio)
  if (precioError) errors.precio = precioError

  const cantidadError = validateCantidad(form.cantidad)
  if (cantidadError) errors.cantidad = cantidadError

  return errors
}
