import { writeFile, rename } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { gzipSync } from 'node:zlib'

const origin = 'https://registry.modelcontextprotocol.io'

/** A full snapshot removes upstream deletions without maintaining a second ledger. */
export async function syncRegistry(destination, request = fetch) {
  const servers = new Map()
  const cursors = new Set()
  let cursor
  do {
    const url = new URL('/v0.1/servers', origin)
    url.searchParams.set('version', 'latest')
    url.searchParams.set('limit', '100')
    if (cursor) url.searchParams.set('cursor', cursor)
    const response = await request(url, { signal: AbortSignal.timeout(60_000) })
    if (!response.ok) throw new Error(`Registry returned HTTP ${response.status}`)
    const page = await response.json()
    if (!Array.isArray(page.servers)) throw new Error('Registry response has no servers array')
    for (const row of page.servers) {
      if (typeof row.server?.name !== 'string' || typeof row.server?.version !== 'string') throw new Error('Registry returned an invalid server identity')
      if (row._meta?.['io.modelcontextprotocol.registry/official']?.status === 'deleted') continue
      if (servers.has(row.server.name)) throw new Error(`Duplicate latest server: ${row.server.name}`)
      servers.set(row.server.name, row)
    }
    console.log(`Read ${servers.size} servers`)
    cursor = page.metadata?.nextCursor
    if (cursor != null && typeof cursor !== 'string') throw new Error('Invalid registry cursor')
    if (cursor && cursors.has(cursor)) throw new Error('Registry pagination repeated a cursor')
    if (cursor) cursors.add(cursor)
  } while (cursor)
  const snapshot = { source: origin, syncedAt: new Date().toISOString(), servers: [...servers.values()] }
  // Do not replace the last complete snapshot with a partially fetched catalog.
  await writeFile(`${destination}.tmp`, destination.endsWith('.gz') ? gzipSync(JSON.stringify(snapshot) + '\n') : JSON.stringify(snapshot) + '\n')
  await rename(`${destination}.tmp`, destination)
  return snapshot.servers.length
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const destination = fileURLToPath(new URL('./catalog.json.gz', import.meta.url))
  console.log(`Synced ${await syncRegistry(destination)} MCP servers to ${destination}`)
}
