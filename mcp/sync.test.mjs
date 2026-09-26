import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { syncRegistry } from './sync.mjs'

test('pagination is complete before replacing the published snapshot; failed sync preserves it', async () => {
  const root = await mkdtemp(join(tmpdir(), 'gf-mcp-sync-'))
  const target = join(root, 'catalog.json')
  try {
    await writeFile(target, 'previous')
    let calls = 0
    await assert.rejects(syncRegistry(target, async () => ++calls === 1
      ? Response.json({ servers: [{ server: { name: 'a', version: '1' } }], metadata: { nextCursor: 'page2' } })
      : new Response('unavailable', { status: 503 })), /503/)
    assert.equal(await readFile(target, 'utf8'), 'previous')
    calls = 0
    await syncRegistry(target, async url => {
      assert.equal(url.searchParams.get('cursor'), calls === 0 ? null : 'page2')
      return ++calls === 1
        ? Response.json({ servers: [{ server: { name: 'a', version: '1' } }], metadata: { nextCursor: 'page2' } })
        : Response.json({ servers: [{ server: { name: 'b', version: '2' } }] })
    })
    assert.deepEqual(JSON.parse(await readFile(target, 'utf8')).servers.map(row => row.server.name), ['a', 'b'])
  } finally { await rm(root, { recursive: true, force: true }) }
})
