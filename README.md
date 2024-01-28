# TSON Patch

> Statically typed JSON Patch operations

## API

Setup:

```typescript
import * as tp from 'tson-patch'

export type User = {
    id: string;
    name: {
        first: string;
        last?: string;
    }
    friends: {
        [topic: string]: Array<{ name: string }>
    }
};

export const user: User = {
    id: "userId",
    name: {
        first: "Marsh",
        last: "Mellow",
    },
    friends: {
        chess: [
            { name: "Magnus" },
            { name: "Fabi" },
        ],
    },
};
```

### Get

```typescript
tp.get(user, ['friends', 'chess', 0, 'name']) // 'Magnus'
tp.get(user, ['friends', 'chess', 0, 'elo']) // COMPILE ERROR: 'elo' doesn't exist in 'name'
```

### Set

```typescript
tp.set(user, ['friends', 'chess', 0, 'name'], 'Ian') // '<User but with 'Ian' instead of 'Magnus'>
tp.set(user, ['friends', 'chess', 0], {name: 'Ian'}) // Exactly the same
tp.set(user, ['friends', 'chess', 0, 'name'], {name: 'Oops'}) // COMPILE ERROR (types don't match)
```

### Remove

```typescript
tp.remove(user, ['id']) // COMPILE ERROR ('id' is not nullable)
tp.remove(user, ['name', 'last']) // '<User but without last name>'
```

### Move

```typescript
tp.move(user, ['id'], ['friends', 'chess']) // COMPILE ERROR (Types don't match)
tp.move(user, ['id'], ['friends', 'chess', 0, 'name']) // OK
```

### Swap

```typescript
tp.swap(user, ['id'], ['friends', 'chess']) // COMPILE ERROR (Types don't match)
tp.swap(user, ['id'], ['friends', 'chess', 0, 'name']) // OK
```