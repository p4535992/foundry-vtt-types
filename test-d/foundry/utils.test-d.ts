import { expectType } from 'tsd';
import '../../index';

expectType<string>(duplicate(''));

expectType<number>(duplicate(0));

expectType<0 | 1>(duplicate<0 | 1>(0));

expectType<'foo' | 'bar'>(duplicate<'foo' | 'bar'>('foo'));

expectType<number>(duplicate<number>(0));

/* `NaN` will actually be converted to `null` but for ease of use, this is ignored. */
expectType<number>(duplicate<number>(NaN));

expectType<boolean>(duplicate(((): boolean => false)()));

expectType<null>(duplicate(null));

expectType<never>(duplicate(undefined));

expectType<never>(duplicate(() => 0));

expectType<never>(duplicate(Symbol('')));

expectType<false>(duplicate(false));

expectType<string | boolean>(duplicate(((): string | boolean => '')()));

expectType<string | number>(duplicate(((): string | number => '')()));

expectType<string | null>(duplicate(((): string | null => '')()));

expectType<string>(duplicate(((): string | undefined => '')()));

expectType<string>(duplicate(((): string | Function => '')()));

expectType<string>(duplicate(((): string | symbol => '')()));

expectType<Array<string>>(duplicate(['']));

expectType<Array<number>>(duplicate([0]));

expectType<Array<boolean>>(duplicate([false, true]));

expectType<Array<null>>(duplicate([null]));

expectType<Array<null>>(duplicate([undefined]));

expectType<Array<null>>(duplicate([() => 0]));

expectType<Array<null>>(duplicate([Symbol('')]));

expectType<Array<false>>(duplicate([false]));

expectType<Array<string | boolean>>(duplicate(['', false, true]));

expectType<Array<string | number>>(duplicate(['', 0]));

expectType<Array<string | null>>(duplicate(['', null]));

expectType<Array<string | null>>(duplicate(['', undefined]));

expectType<Array<string | null>>(duplicate(['', () => 0]));

expectType<Array<string | null>>(duplicate(['', Symbol('')]));

expectType<Array<'a' | 'b'>>(duplicate([((): 'a' | 'b' => 'a')()]));

expectType<Array<Array<boolean>>>(duplicate([[false, true]]));

expectType<Array<{ a: string }>>(duplicate([{ a: '' }]));

expectType<{ a: string }>(duplicate({ a: '' }));

expectType<{ a: number }>(duplicate({ a: 0 }));

expectType<{ a: boolean }>(duplicate({ a: ((): boolean => false)() }));

expectType<{ a: null }>(duplicate({ a: null }));

expectType<{}>(duplicate({ a: undefined }));

expectType<{}>(duplicate({ a: () => 0 }));

expectType<{}>(duplicate({ a: Symbol('') }));

expectType<{ a: string | boolean }>(duplicate({ a: ((): string | boolean => '')() }));

expectType<{ a: string | number }>(duplicate({ a: ((): string | number => '')() }));

expectType<{ a: string | null }>(duplicate({ a: ((): string | null => '')() }));

expectType<{ a?: string }>(duplicate({ a: ((): string | undefined => '')() }));

expectType<{ a?: string }>(duplicate({ a: ((): string | Function => '')() }));

expectType<{ a?: string }>(duplicate({ a: ((): string | symbol => '')() }));

expectType<{ a: Array<string> }>(duplicate({ a: [''] }));

expectType<{ a: { b: string } }>(duplicate({ a: { b: '' } }));

expectType<{ a: false }>(duplicate({ a: false }));

expectType<{ a: 'a' | 'b' }>(duplicate({ a: ((): 'a' | 'b' => 'a')() }));

expectType<string>(duplicate({ a: 0, b: '', c: false, toJSON: (): string => '' }));

expectType<{ foo: string; bar: boolean }>(
  duplicate({ a: 0, b: '', c: false, toJSON: () => ({ foo: '', bar: ((): boolean => false)() }) })
);

expectType<{ foo: string; bar: boolean }>(
  duplicate({ a: 0, b: '', c: false, toJSON: () => ({ foo: '', bar: ((): boolean => false)(), toJSON: () => '' }) })
);

expectType<{ foo: string; bar: false }>(
  duplicate({ a: 0, b: '', c: false, toJSON: () => ({ foo: '', bar: { baz: '', toJSON: () => false } }) })
);

const complexObject = {
  a: '',
  b: 0,
  toJSON: () => [
    false,
    undefined,
    {
      c: undefined,
      d: ((): boolean | symbol => false)(),
      e: [true],
      f: { g: 0, h: ((): number | undefined => 0)() }
    }
  ]
};

expectType<
  Array<
    | boolean
    | null
    | {
        d?: boolean;
        e: Array<boolean>;
        f: { g: number; h?: number };
      }
  >
>(duplicate(complexObject));

type SomeItemData = Item.Data<{}>;
class SomeItem extends Item<SomeItemData> {}
const someItem = new SomeItem();
const someItemData = duplicate<SomeItem>(someItem);
SomeItem.create(someItemData);

type SomeActorData = Actor.Data<{}, SomeItemData>;
class SomeActor extends Actor<SomeActorData, SomeItem> {}
const someActor = new SomeActor();
const someActorData = duplicate<SomeActor>(someActor);
SomeActor.create(someActorData);
