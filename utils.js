const isArray = (arr) => Array.isArray(arr) && arr instanceof Array && Boolean(arr.length)

// NOTE: Flatten method based on [source](https://thewebdev.info/2021/04/18/how-to-flatten-a-nested-json-object-with-javascript/)
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