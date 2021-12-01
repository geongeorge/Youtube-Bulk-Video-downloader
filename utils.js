const isArray = (arr) => Array.isArray(arr) && arr instanceof Array && Boolean(arr.length)

const flatten = (obj, prefix = [], current = {}) => {
  if (typeof(obj) === 'object' && obj !== null) {
    if(isArray(obj)){
      current[prefix.join('/')] = obj
    }else{ 
      for (const key of Object.keys(obj)) {
        flatten(obj[key], prefix.concat(key), current)
      }
    }
  } else {
    current[prefix.join('/')] = obj
  }
  return current
}

module.exports = flatten