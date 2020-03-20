# KVDB (Key Value Database)
A simple nodejs database solution.
Data stays in memory for fast access and stays synced with a JSON file for persistency.

## constructor
`constructor<T>(location?: string, syncThreshold: number = 200): KVDB<T>`

The location points to a JSON file. It will create the file if it doesn't exist.
The syncThreshold is the debounce threshold that the persistent JSON file gets written to. 
Pass a 0 to disable debouncing and write directly after each database edit.

```typescript
const db = new KVDB<string>("D:/projectData/data.json", 0)
```

## set
`set(key: string, value: T): string`
```typescript
set("myKey", "my data") // "myKey"
set("otherKey", "some other data") // "otherKey"
```

## get
`get(key: string): T`
```typescript
get("myKey") // "my data"
get("otherKey") // "some other data"
```

## has
`has(key: string): boolean`
```typescript
has("myKey") // true
has("bar") // false
```

## getAll
`getAll(): [string, string][]`
```typescript
getAll() // [["myKey", "my data"], ["otherKey", "some other data"]]
```