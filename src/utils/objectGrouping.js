export default function groupBy(objectArray, properties) {
  return objectArray.reduce((acc, obj) => {
    const arrayProperties = properties.split(".");
    let key = obj;
    for (const property of arrayProperties) {
      key = key[property];
    }
    if (!acc[key]) {
      acc[key] = [];
    }
    // Add object to list for given key's value
    acc[key].push(obj);
    return acc;
  }, {});
}
