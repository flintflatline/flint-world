// Flint World's hosted entrypoint (Render). Identical to `worldnew run`
// except it binds 0.0.0.0, which hosts require; the stock CLI binds
// 127.0.0.1 only. All protocol behaviour is the SDK's own runWorld.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { loadWorld } from 'grift-worlds-sdk/js/worlds/deployer.js';
import { runWorld } from 'grift-worlds-sdk/js/worlds/runworld.js';
import * as P from 'grift-worlds-sdk/js/worlds/protocol.js';

const id = 'flintworld';
const dir = join(process.cwd(), 'worlds', id);
const deployment = JSON.parse(readFileSync(join(dir, 'deploy.46630.json'), 'utf8'));
const keys = JSON.parse(readFileSync(process.env.FLINTWORLD_KEYS_PATH, 'utf8'));
const def = await loadWorld(dir);
const r = await runWorld({
  def,
  rpc: process.env.WORLD_RPC || P.RPC_FOR[deployment.chainId],
  deployment,
  keys,
  storePath: join(dir, `.store.${deployment.chainId}.json`),
  port: Number(process.env.PORT || 8790),
  host: '0.0.0.0',
  proxy: 'last-hop',
  log: console.log,
});
console.log(`${def.name} is up: ${r.url}/.well-known/world.json`);
for (const sig of ['SIGINT', 'SIGTERM']) {
  process.on(sig, async () => { await r.stop(); process.exit(0); });
}
