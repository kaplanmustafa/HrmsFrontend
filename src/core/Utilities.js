export const objectsToOptions = (list, name, value) => {
  return list.map((item, index) => ({
    key: index,
    text: item[name],
    value: item[value],
  }));
};
