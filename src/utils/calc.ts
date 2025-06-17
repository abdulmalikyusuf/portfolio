import * as THREE from 'three'

/**
 * Get window width/height ratio
 */
export const getWindowRatio = () => {
  return window.innerWidth / window.innerHeight
}

/**
 * Calculate texture factor to maintain the image ratio
 */
export const getTextureFactor = (planeRatio: number, texture: THREE.Texture) => {
  let factorX = 1
  let factorY = 1

  if (texture) {
    const textureRatio = texture.image.width / texture.image.height

    if (planeRatio > textureRatio) {
      factorY = textureRatio / planeRatio
    } else {
      factorX = planeRatio / textureRatio
    }
  }

  return new THREE.Vector2(factorX, factorY)
}

/**
 * Clamp
 */
export const clamp = (num: number, min: number, max: number) => {
  return Math.max(min, Math.min(num, max))
}
