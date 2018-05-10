/*
 * 模型加载cache模块，避免重复加载
 */

let cache = {};

export default {

  has(modelName) {
  	return !!cache[modelName]
  },

  set(modelName, cubes = {}) {
  	console.log(`cache model: ${modelName}`);

    cache[modelName] = {
      cube: cubes.cube || {},
      cube_vr: cubes.cube_vr || {}
    }
  },

  get(modelName) {
  	return cache[modelName]
  }
}