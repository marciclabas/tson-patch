# TSON Patch

> Statically typed JSON Patch operations

## Usage

You have some kind of nested data that you want to work with. It could look something like this:

```typescript
export type User = {
	id: string;
	name: {
		first: string;
		last?: string;
	}
	friends: {
		[from: string]: Array<{ name: string }>
	}
};
```

A mess to work with, right? Not anymore:

### Basic operations

All operations are pure and return shallow copies

#### Get

```typescript
import * as tp from 'tson-patch'
tp.get(user, ['friends', 'college', 0, 'name']) // Compiles just fine
tp.get(user, ['friends', 'college', 0, 'age']) // COMPILE ERROR: 'age' doesn't exist in 'name'
```

#### Set

```typescript
tp.set(user, ['friends', 'college', 0, 'name'], 'John') // Now `user.friends.chess[0].name === 'John'`
tp.set(user, ['friends', 'college', 0], {name: 'John'}) // Exactly the same
tp.set(user, ['friends', 'college', 0, 'name'], {name: 'Oops'}) // COMPILE ERROR (types don't match)
```

#### Remove

```typescript
tp.remove(user, ['id']) // COMPILE ERROR ('id' is not nullable)
tp.remove(user, ['name', 'last']) // '<User but without last name>'
```

#### Move

```typescript
tp.move(user, ['id'], ['friends', 'college']) // COMPILE ERROR (Types don't match)
tp.move(user, ['id'], ['friends', 'college', 0, 'name']) // OK
```

#### Swap

```typescript
tp.swap(user, ['id'], ['friends', 'chess']) // COMPILE ERROR (Types don't match)
tp.swap(user, ['id'], ['friends', 'chess', 0, 'name']) // OK
```
