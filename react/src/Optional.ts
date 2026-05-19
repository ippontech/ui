const checkIsNaN = <Value>(value: Value) => typeof value === 'number' && Number.isNaN(value);

export abstract class Optional<Value> {
  static empty<Value>(): Optional<Value> {
    return new EmptyOptional();
  }

  static of<Value>(value: Value): Optional<Value> {
    return new ValuatedOptional(value);
  }

  static ofNullable<Value>(value: Value | null): Optional<Value> {
    if (value === null) {
      return Optional.empty();
    }
    return Optional.of(value);
  }

  static ofUndefinable<Value>(value?: Value): Optional<Value> {
    if (value === undefined) {
      return Optional.empty();
    }
    return Optional.of(value);
  }

  static ofFalsifiable<Value>(value?: Value | null): Optional<Value> {
    if (value === undefined || value === null || checkIsNaN(value)) {
      return Optional.empty();
    }
    if (typeof value === 'string' && value.trim() === '') {
      return Optional.empty();
    }
    return Optional.of(value);
  }

  static every<Structure extends Record<string, unknown>>(
    optionalStructure: OptionalStructure<Structure>,
  ): Optional<Structure> {
    const keys = Object.keys(optionalStructure) as Array<keyof Structure>;
    if (keys.some((key) => optionalStructure[key].isEmpty())) {
      return Optional.empty();
    }
    const entries = keys.map((key) => [key, optionalStructure[key].orElseThrow()]);
    return Optional.of(Object.fromEntries(entries));
  }

  abstract map<Output>(mapper: (value: Value) => Output): Optional<Output>;
  abstract flatMap<Output>(mapper: (feature: Value) => Optional<Output>): Optional<Output>;
  abstract or(factory: () => Optional<Value>): Optional<Value>;
  abstract orElse(value: Value): Value;
  abstract orElseGet(factory: () => Value): Value;
  abstract orElseThrow<U = Error>(throwable?: () => U): Value;
  abstract filter<To extends Value>(predicate: (value: Value) => boolean): Optional<To>;
  abstract isEmpty(): boolean;
  abstract isPresent(): boolean;
  abstract ifAbsent(consumer: () => void): void;
  abstract ifPresent(consumer: (feature: Value) => void): void;
  abstract orUndefined(): Value | undefined;
}

class EmptyOptional<Value> extends Optional<Value> {
  map<Output>(): Optional<Output> {
    return Optional.empty();
  }

  flatMap<Output>(): Optional<Output> {
    return Optional.empty();
  }

  or(factory: () => Optional<Value>): Optional<Value> {
    return factory();
  }

  orElse(value: Value): Value {
    return value;
  }

  orElseGet(factory: () => Value): Value {
    return factory();
  }

  orElseThrow<U>(throwable?: () => U): Value {
    if (throwable === undefined) {
      throw new Error("Can't get value from an empty optional");
    }

    throw throwable();
  }

  filter<To extends Value>(): Optional<To> {
    return Optional.empty();
  }

  isEmpty(): boolean {
    return true;
  }

  isPresent(): boolean {
    return false;
  }

  ifAbsent(consumer: () => void): void {
    consumer();
  }

  ifPresent(): void {
    // Nothing to do
  }

  orUndefined(): Value | undefined {
    return undefined;
  }
}

class ValuatedOptional<Value> extends Optional<Value> {
  constructor(private readonly value: Value) {
    super();
  }

  map<Output>(mapper: (value: Value) => Output): Optional<Output> {
    return Optional.of(mapper(this.value));
  }

  flatMap<Output>(mapper: (feature: Value) => Optional<Output>): Optional<Output> {
    return mapper(this.value);
  }

  or(): Optional<Value> {
    return Optional.of(this.value);
  }

  orElse(): Value {
    return this.value;
  }

  orElseGet(): Value {
    return this.value;
  }

  orElseThrow(): Value {
    return this.value;
  }

  filter<To extends Value>(predicate: (value: Value) => value is To): Optional<To> {
    if (predicate(this.value)) {
      return Optional.of(this.value);
    }

    return Optional.empty();
  }

  isEmpty(): boolean {
    return false;
  }

  isPresent(): boolean {
    return true;
  }

  ifAbsent(): void {
    // Nothing to do
  }

  ifPresent(consumer: (feature: Value) => void): void {
    consumer(this.value);
  }

  orUndefined(): Value | undefined {
    return this.value;
  }
}

type OptionalValue<Structure, K extends keyof Structure> = Optional<Structure[K]>;

type OptionalStructure<Structure> = {
  [key in keyof Structure]: OptionalValue<Structure, key>;
};
