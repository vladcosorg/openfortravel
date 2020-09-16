interface Named {
  name: string
}
function addName<Obj extends object>(obj: Obj, name: string): Obj & Named {
  // (A)
  const namedObj = obj as Obj & Named
  namedObj.name = name
  return namedObj
}

const obj = {
  last: 'Doe',
}

// %inferred-type: { last: string; } & Named
const namedObj = addName(obj, 'Jane')
