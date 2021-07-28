/* 
  本地存储封装模块
*/

// 获取本地储存
export const getItem = (name) => {
  const data = window.localStorage.getItem(name)
  // 为什么把 JSON.parse 放到 try-catch 中
  // 因为 data 可能不是 JSON 格式字符串
  try {
    // 把 data 转为 javascript 对象
    // 正确的话会进入 try 里面就会把 data 转换为 对象
    return JSON.parse(data)
  } catch (error) {
    // 错误的话 就会进入 catch 里面 就说明 data 就是个对象就直接返回
    return data
  }
}

// 存储本地存储
export const setItem = (name, value) => {
  // 如果 value 是对象，就把 value 转换为 JSON 格式的字符串再存储
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  return window.localStorage.setItem(name, value)
}

// 删除本地存储
export const removeItem = (name) => {
  return window.localStorage.removeItem(name)
}
