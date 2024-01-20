import { assertSnapshot } from 'std/testing/snapshot.ts'
import { Meta } from '../types/page.ts'
import { parseHTML } from './html-parser.ts'

const meta: Meta = {
  dateModified: '2000-01-02',
  datePublished: '2000-01-01',
  headline: 'Headline.',
  hideTitle: false,
  title: 'Title',
  keywords: [],
}

Deno.test('heading with empty body', async (test) => {
  await assertSnapshot(test, parseHTML(meta, '## 2'), { dir: '.' })
})

Deno.test('heading with nonempty body', async (test) => {
  await assertSnapshot(test, parseHTML(meta, '## 2\na'), { dir: '.' })
})

Deno.test('two headings', async (test) => {
  await assertSnapshot(test, parseHTML(meta, '## 2\na\n## 3\nb'), { dir: '.' })
})

Deno.test('h2-6', async (test) => {
  await assertSnapshot(
    test,
    parseHTML(
      meta,
      `
## 2
a

### 3
b
c

#### 4
d
e
f

##### 5
g
h
i
j

###### 6
k
l
m
n
o
`,
    ),
    { dir: '.' },
  )
})

Deno.test('fence', async (test) => {
  await assertSnapshot(
    test,
    parseHTML(
      meta,
      '\n\
```\n\
a\n\
b\n\
c\n\
```\n',
    ),
    { dir: '.' },
  )
})

Deno.test('indented fence', async (test) => {
  await assertSnapshot(
    test,
    parseHTML(
      meta,
      '\n\
```\n\
  a\n\
  b\n\
  c\n\
```\n',
    ),
    { dir: '.' },
  )
})

Deno.test('doubly indented fence', async (test) => {
  await assertSnapshot(
    test,
    parseHTML(
      meta,
      '\n\
```\n\
    a\n\
    b\n\
    c\n\
```\n',
    ),
    { dir: '.' },
  )
})

Deno.test('fence with hashes', async (test) => {
  await assertSnapshot(
    test,
    parseHTML(
      meta,
      '\n\
```\n\
  ## a\n\
  ## b\n\
  ## c\n\
```\n',
    ),
    { dir: '.' },
  )
})

Deno.test('heading before fence', async (test) => {
  await assertSnapshot(
    test,
    parseHTML(
      meta,
      '\n\
## 2\n\
a\n\
\n\
```\n\
b\n\
c\n\
d\n\
```\n',
    ),
    { dir: '.' },
  )
})

Deno.test('heading after fence', async (test) => {
  await assertSnapshot(
    test,
    parseHTML(
      meta,
      '\n\
```\n\
a\n\
b\n\
c\n\
```\n\
\n\
## 2\n\
d\n',
    ),
    { dir: '.' },
  )
})

Deno.test('heading, fence, heading', async (test) => {
  await assertSnapshot(
    test,
    parseHTML(
      meta,
      '\n\
## 2\n\
a\n\
\n\
```\n\
b\n\
c\n\
d\n\
```\n\
### 3\n\
e\n',
    ),
    { dir: '.' },
  )
})
