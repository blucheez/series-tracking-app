export const formatSumm = (text) => {
    const textArr = text.split(' ')
    const newArr = textArr.map((word) => word.replace(/(<([^>]+)>)/gi, ''))
    return newArr.join(' ')
  }