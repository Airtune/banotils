// @ts-nocheck
/* eslint-disable */

import blake from "blakejs";
import crypto from "crypto";

function hexToBytes(hex: string): Uint8Array {
  const result = new Uint8Array(hex.length / 2);
  for (let ii = 0; ii < result.length; ++ii) {
    result[ii] = parseInt(hex.substring((ii * 2) + 0, (ii * 2) + 2), 16);
  }
  return result;
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.prototype.map.call(bytes, (x) => ("00" + x.toString(16)).slice(-2)).join("").toUpperCase();
}

const u64 = function (h, l) {
  this.hi = h | 0 >>> 0;
  this.lo = l | 0 >>> 0;
};
const gf = function (init) {
  let i; const r = new Float64Array(16);
  if (init) {
    for (i = 0; i < init.length; i++) {
      r[i] = init[i];
    }
  }
  return r;
};

// Pluggable, initialized in high-level API below.
function randombytes(x, n) {
  // Browsers.
  const QUOTA = 65536;
  let i; const v = new Uint8Array(n);
  for (i = 0; i < n; i += QUOTA) {
    crypto.getRandomValues(v.subarray(i, i + Math.min(n - i, QUOTA)));
  }
  for (i = 0; i < n; i++) {
    x[i] = v[i];
  }
  cleanup(v);
}

const _0 = new Uint8Array(16);
const _9 = new Uint8Array(32);
_9[0] = 9;

const gf0 = gf(); const gf1 = gf([1]); const _121665 = gf([0xdb41, 1]); const D = gf([0x78a3, 0x1359, 0x4dca, 0x75eb, 0xd8ab, 0x4141, 0x0a4d, 0x0070, 0xe898, 0x7779, 0x4079,
  0x8cc7, 0xfe73, 0x2b6f, 0x6cee, 0x5203]); const D2 = gf([0xf159, 0x26b2, 0x9b94, 0xebd6, 0xb156, 0x8283, 0x149a, 0x00e0, 0xd130, 0xeef3, 0x80f2, 0x198e,
    0xfce7, 0x56df, 0xd9dc, 0x2406]); const X = gf([0xd51a, 0x8f25, 0x2d60, 0xc956, 0xa7b2, 0x9525, 0xc760, 0x692c, 0xdc5c, 0xfdd6, 0xe231, 0xc0a4, 0x53fe, 0xcd6e,
      0x36d3, 0x2169]); const Y = gf([0x6658, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666]); const I = gf([
        0xa0b0, 0x4a0e, 0x1b27, 0xc4ee, 0xe478, 0xad2f, 0x1806, 0x2f43, 0xd7a7, 0x3dfb, 0x0099, 0x2b4d, 0xdf0b, 0x4fc1, 0x2480, 0x2b83]);

function L32(x, c) {
  return (x << c) | (x >>> (32 - c));
}

function ld32(x, i) {
  let u = x[i + 3] & 0xff;
  u = (u << 8) | (x[i + 2] & 0xff);
  u = (u << 8) | (x[i + 1] & 0xff);
  return (u << 8) | (x[i + 0] & 0xff);
}

function dl64(x, i) {
  const h = (x[i] << 24) | (x[i + 1] << 16) | (x[i + 2] << 8) | x[i + 3];
  const l = (x[i + 4] << 24) | (x[i + 5] << 16) | (x[i + 6] << 8) | x[i + 7];
  return new u64(h, l);
}

function st32(x, j, u) {
  let i;
  for (i = 0; i < 4; i++) {
    x[j + i] = u & 255;
    u >>>= 8;
  }
}

function ts64(x, i, u) {
  x[i] = (u.hi >> 24) & 0xff;
  x[i + 1] = (u.hi >> 16) & 0xff;
  x[i + 2] = (u.hi >> 8) & 0xff;
  x[i + 3] = u.hi & 0xff;
  x[i + 4] = (u.lo >> 24) & 0xff;
  x[i + 5] = (u.lo >> 16) & 0xff;
  x[i + 6] = (u.lo >> 8) & 0xff;
  x[i + 7] = u.lo & 0xff;
}

function vn(x, xi, y, yi, n) {
  let i; let d = 0;
  for (i = 0; i < n; i++) {
    d |= x[xi + i] ^ y[yi + i];
  }
  return (1 & ((d - 1) >>> 8)) - 1;
}

function crypto_verify_16(x, xi, y, yi) {
  return vn(x, xi, y, yi, 16);
}

function crypto_verify_32(x, xi, y, yi) {
  return vn(x, xi, y, yi, 32);
}

function core(out, inp, k, c, h) {
  const w = new Uint32Array(16); const x = new Uint32Array(16); const y = new Uint32Array(16); const t = new Uint32Array(4);
  let i; let j; let m;

  for (i = 0; i < 4; i++) {
    x[5 * i] = ld32(c, 4 * i);
    x[1 + i] = ld32(k, 4 * i);
    x[6 + i] = ld32(inp, 4 * i);
    x[11 + i] = ld32(k, 16 + 4 * i);
  }

  for (i = 0; i < 16; i++) {
    y[i] = x[i];
  }

  for (i = 0; i < 20; i++) {
    for (j = 0; j < 4; j++) {
      for (m = 0; m < 4; m++) {
        t[m] = x[(5 * j + 4 * m) % 16];
      }
      t[1] ^= L32((t[0] + t[3]) | 0, 7);
      t[2] ^= L32((t[1] + t[0]) | 0, 9);
      t[3] ^= L32((t[2] + t[1]) | 0, 13);
      t[0] ^= L32((t[3] + t[2]) | 0, 18);
      for (m = 0; m < 4; m++) {
        w[4 * j + (j + m) % 4] = t[m];
      }
    }
    for (m = 0; m < 16; m++) {
      x[m] = w[m];
    }
  }

  if (h) {
    for (i = 0; i < 16; i++) {
      x[i] = (x[i] + y[i]) | 0;
    }
    for (i = 0; i < 4; i++) {
      x[5 * i] = (x[5 * i] - ld32(c, 4 * i)) | 0;
      x[6 + i] = (x[6 + i] - ld32(inp, 4 * i)) | 0;
    }
    for (i = 0; i < 4; i++) {
      st32(out, 4 * i, x[5 * i]);
      st32(out, 16 + 4 * i, x[6 + i]);
    }
  } else {
    for (i = 0; i < 16; i++) {
      st32(out, 4 * i, (x[i] + y[i]) | 0);
    }
  }
}

function crypto_core_salsa20(out, inp, k, c) {
  core(out, inp, k, c, false);
  return 0;
}

function crypto_core_hsalsa20(out, inp, k, c) {
  core(out, inp, k, c, true);
  return 0;
}

const sigma = new Uint8Array([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107]);
// "expand 32-byte k"

function crypto_stream_salsa20_xor(c, cpos, m, mpos, b, n, k) {
  const z = new Uint8Array(16); const x = new Uint8Array(64);
  let u; let i;
  if (!b) {
    return 0;
  }
  for (i = 0; i < 16; i++) {
    z[i] = 0;
  }
  for (i = 0; i < 8; i++) {
    z[i] = n[i];
  }
  while (b >= 64) {
    crypto_core_salsa20(x, z, k, sigma);
    for (i = 0; i < 64; i++) {
      c[cpos + i] = (m ? m[mpos + i] : 0) ^ x[i];
    }
    u = 1;
    for (i = 8; i < 16; i++) {
      u = u + (z[i] & 0xff) | 0;
      z[i] = u & 0xff;
      u >>>= 8;
    }
    b -= 64;
    cpos += 64;
    if (m) {
      mpos += 64;
    }
  }
  if (b > 0) {
    crypto_core_salsa20(x, z, k, sigma);
    for (i = 0; i < b; i++) {
      c[cpos + i] = (m ? m[mpos + i] : 0) ^ x[i];
    }
  }
  return 0;
}

function crypto_stream_salsa20(c, cpos, d, n, k) {
  return crypto_stream_salsa20_xor(c, cpos, null, 0, d, n, k);
}

function crypto_stream(c, cpos, d, n, k) {
  const s = new Uint8Array(32);
  crypto_core_hsalsa20(s, n, k, sigma);
  return crypto_stream_salsa20(c, cpos, d, n.subarray(16), s);
}

function crypto_stream_xor(c, cpos, m, mpos, d, n, k) {
  const s = new Uint8Array(32);
  crypto_core_hsalsa20(s, n, k, sigma);
  return crypto_stream_salsa20_xor(c, cpos, m, mpos, d, n.subarray(16), s);
}

function add1305(h, c) {
  let j; let u = 0;
  for (j = 0; j < 17; j++) {
    u = (u + ((h[j] + c[j]) | 0)) | 0;
    h[j] = u & 255;
    u >>>= 8;
  }
}

const minusp = new Uint32Array([5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 252]);

function crypto_onetimeauth(out, outpos, m, mpos, n, k) {
  let i; let j; let u;
  const x = new Uint32Array(17); const r = new Uint32Array(17); const h = new Uint32Array(17); const c = new Uint32Array(17); const g = new Uint32Array(17);
  for (j = 0; j < 17; j++) {
    r[j] = h[j] = 0;
  }
  for (j = 0; j < 16; j++) {
    r[j] = k[j];
  }
  r[3] &= 15;
  r[4] &= 252;
  r[7] &= 15;
  r[8] &= 252;
  r[11] &= 15;
  r[12] &= 252;
  r[15] &= 15;

  while (n > 0) {
    for (j = 0; j < 17; j++) {
      c[j] = 0;
    }
    for (j = 0; (j < 16) && (j < n); ++j) {
      c[j] = m[mpos + j];
    }
    c[j] = 1;
    mpos += j;
    n -= j;
    add1305(h, c);
    for (i = 0; i < 17; i++) {
      x[i] = 0;
      for (j = 0; j < 17; j++) {
        x[i] = (x[i] + (h[j] * ((j <= i) ? r[i - j] : ((320 * r[i + 17 - j]) | 0))) | 0) | 0;
      }
    }
    for (i = 0; i < 17; i++) {
      h[i] = x[i];
    }
    u = 0;
    for (j = 0; j < 16; j++) {
      u = (u + h[j]) | 0;
      h[j] = u & 255;
      u >>>= 8;
    }
    u = (u + h[16]) | 0;
    h[16] = u & 3;
    u = (5 * (u >>> 2)) | 0;
    for (j = 0; j < 16; j++) {
      u = (u + h[j]) | 0;
      h[j] = u & 255;
      u >>>= 8;
    }
    u = (u + h[16]) | 0;
    h[16] = u;
  }

  for (j = 0; j < 17; j++) {
    g[j] = h[j];
  }
  add1305(h, minusp);
  const s = (-(h[16] >>> 7) | 0);
  for (j = 0; j < 17; j++) {
    h[j] ^= s & (g[j] ^ h[j]);
  }

  for (j = 0; j < 16; j++) {
    c[j] = k[j + 16];
  }
  c[16] = 0;
  add1305(h, c);
  for (j = 0; j < 16; j++) {
    out[outpos + j] = h[j];
  }
  return 0;
}

function crypto_onetimeauth_verify(h, hpos, m, mpos, n, k) {
  const x = new Uint8Array(16);
  crypto_onetimeauth(x, 0, m, mpos, n, k);
  return crypto_verify_16(h, hpos, x, 0);
}

function crypto_secretbox(c, m, d, n, k) {
  let i;
  if (d < 32) {
    return -1;
  }
  crypto_stream_xor(c, 0, m, 0, d, n, k);
  crypto_onetimeauth(c, 16, c, 32, d - 32, c);
  for (i = 0; i < 16; i++) {
    c[i] = 0;
  }
  return 0;
}

function crypto_secretbox_open(m, c, d, n, k) {
  let i;
  const x = new Uint8Array(32);
  if (d < 32) {
    return -1;
  }
  crypto_stream(x, 0, 32, n, k);
  if (crypto_onetimeauth_verify(c, 16, c, 32, d - 32, x) !== 0) {
    return -1;
  }
  crypto_stream_xor(m, 0, c, 0, d, n, k);
  for (i = 0; i < 32; i++) {
    m[i] = 0;
  }
  return 0;
}

function set25519(r, a) {
  let i;
  for (i = 0; i < 16; i++) {
    r[i] = a[i] | 0;
  }
}

function car25519(o) {
  let c;
  let i;
  for (i = 0; i < 16; i++) {
    o[i] += 65536;
    c = Math.floor(o[i] / 65536);
    o[(i + 1) * (i < 15 ? 1 : 0)] += c - 1 + 37 * (c - 1) * (i === 15 ? 1 : 0);
    o[i] -= (c * 65536);
  }
}

function sel25519(p, q, b) {
  let t; const c = ~(b - 1);
  for (let i = 0; i < 16; i++) {
    t = c & (p[i] ^ q[i]);
    p[i] ^= t;
    q[i] ^= t;
  }
}

function pack25519(o, n) {
  let i; let j; let b;
  const m = gf(); const t = gf();
  for (i = 0; i < 16; i++) {
    t[i] = n[i];
  }
  car25519(t);
  car25519(t);
  car25519(t);
  for (j = 0; j < 2; j++) {
    m[0] = t[0] - 0xffed;
    for (i = 1; i < 15; i++) {
      m[i] = t[i] - 0xffff - ((m[i - 1] >> 16) & 1);
      m[i - 1] &= 0xffff;
    }
    m[15] = t[15] - 0x7fff - ((m[14] >> 16) & 1);
    b = (m[15] >> 16) & 1;
    m[14] &= 0xffff;
    sel25519(t, m, 1 - b);
  }
  for (i = 0; i < 16; i++) {
    o[2 * i] = t[i] & 0xff;
    o[2 * i + 1] = t[i] >> 8;
  }
}

function neq25519(a, b) {
  const c = new Uint8Array(32); const d = new Uint8Array(32);
  pack25519(c, a);
  pack25519(d, b);
  return crypto_verify_32(c, 0, d, 0);
}

function par25519(a) {
  const d = new Uint8Array(32);
  pack25519(d, a);
  return d[0] & 1;
}

function unpack25519(o, n) {
  let i;
  for (i = 0; i < 16; i++) {
    o[i] = n[2 * i] + (n[2 * i + 1] << 8);
  }
  o[15] &= 0x7fff;
}

function A(o, a, b) {
  let i;
  for (i = 0; i < 16; i++) {
    o[i] = (a[i] + b[i]) | 0;
  }
}

function Z(o, a, b) {
  let i;
  for (i = 0; i < 16; i++) {
    o[i] = (a[i] - b[i]) | 0;
  }
}

function M(o, a, b) {
  let i; let j; const t = new Float64Array(31);
  for (i = 0; i < 31; i++) {
    t[i] = 0;
  }
  for (i = 0; i < 16; i++) {
    for (j = 0; j < 16; j++) {
      t[i + j] += a[i] * b[j];
    }
  }
  for (i = 0; i < 15; i++) {
    t[i] += 38 * t[i + 16];
  }
  for (i = 0; i < 16; i++) {
    o[i] = t[i];
  }
  car25519(o);
  car25519(o);
}

function S(o, a) {
  M(o, a, a);
}

function inv25519(o, i) {
  const c = gf();
  let a;
  for (a = 0; a < 16; a++) {
    c[a] = i[a];
  }
  for (a = 253; a >= 0; a--) {
    S(c, c);
    if (a !== 2 && a !== 4) {
      M(c, c, i);
    }
  }
  for (a = 0; a < 16; a++) {
    o[a] = c[a];
  }
}

function pow2523(o, i) {
  const c = gf();
  let a;
  for (a = 0; a < 16; a++) {
    c[a] = i[a];
  }
  for (a = 250; a >= 0; a--) {
    S(c, c);
    if (a !== 1) {
      M(c, c, i);
    }
  }
  for (a = 0; a < 16; a++) {
    o[a] = c[a];
  }
}

function crypto_scalarmult(q, n, p) {
  const z = new Uint8Array(32);
  const x = new Float64Array(80); let r; let i;
  const a = gf(); const b = gf(); const c = gf(); const d = gf(); const e = gf(); const f = gf();
  for (i = 0; i < 31; i++) {
    z[i] = n[i];
  }
  z[31] = (n[31] & 127) | 64;
  z[0] &= 248;
  unpack25519(x, p);
  for (i = 0; i < 16; i++) {
    b[i] = x[i];
    d[i] = a[i] = c[i] = 0;
  }
  a[0] = d[0] = 1;
  for (i = 254; i >= 0; --i) {
    r = (z[i >>> 3] >>> (i & 7)) & 1;
    sel25519(a, b, r);
    sel25519(c, d, r);
    A(e, a, c);
    Z(a, a, c);
    A(c, b, d);
    Z(b, b, d);
    S(d, e);
    S(f, a);
    M(a, c, a);
    M(c, b, e);
    A(e, a, c);
    Z(a, a, c);
    S(b, a);
    Z(c, d, f);
    M(a, c, _121665);
    A(a, a, d);
    M(c, c, a);
    M(a, d, f);
    M(d, b, x);
    S(b, e);
    sel25519(a, b, r);
    sel25519(c, d, r);
  }
  for (i = 0; i < 16; i++) {
    x[i + 16] = a[i];
    x[i + 32] = c[i];
    x[i + 48] = b[i];
    x[i + 64] = d[i];
  }
  const x32 = x.subarray(32);
  const x16 = x.subarray(16);
  inv25519(x32, x32);
  M(x16, x16, x32);
  pack25519(q, x16);
  return 0;
}

function crypto_scalarmult_base(q, n) {
  return crypto_scalarmult(q, n, _9);
}

function crypto_box_keypair(y, x) {
  randombytes(x, 32);
  return crypto_scalarmult_base(y, x);
}

function crypto_box_beforenm(k, y, x) {
  const s = new Uint8Array(32);
  crypto_scalarmult(s, x, y);
  return crypto_core_hsalsa20(k, _0, s, sigma);
}

const crypto_box_afternm = crypto_secretbox;
const crypto_box_open_afternm = crypto_secretbox_open;

function crypto_box(c, m, d, n, y, x) {
  const k = new Uint8Array(32);
  crypto_box_beforenm(k, y, x);
  return crypto_box_afternm(c, m, d, n, k);
}

function crypto_box_open(m, c, d, n, y, x) {
  const k = new Uint8Array(32);
  crypto_box_beforenm(k, y, x);
  return crypto_box_open_afternm(m, c, d, n, k);
}

function add64() {
  let a = 0; let b = 0; let c = 0; let d = 0; const m16 = 65535; let l; let h; let i;
  for (i = 0; i < arguments.length; i++) {
    // eslint-disable-next-line prefer-rest-params
    l = arguments[i].lo;
    // eslint-disable-next-line prefer-rest-params
    h = arguments[i].hi;
    a += (l & m16);
    b += (l >>> 16);
    c += (h & m16);
    d += (h >>> 16);
  }

  b += (a >>> 16);
  c += (b >>> 16);
  d += (c >>> 16);

  return new u64((c & m16) | (d << 16), (a & m16) | (b << 16));
}

function shr64(x, c) {
  return new u64((x.hi >>> c), (x.lo >>> c) | (x.hi << (32 - c)));
}

function xor64() {
  let l = 0; let h = 0; let i;
  for (i = 0; i < arguments.length; i++) {
    // eslint-disable-next-line prefer-rest-params
    l ^= arguments[i].lo;
    // eslint-disable-next-line prefer-rest-params
    h ^= arguments[i].hi;
  }
  return new u64(h, l);
}

function R(x, c) {
  let h; let l; const c1 = 32 - c;
  if (c < 32) {
    h = (x.hi >>> c) | (x.lo << c1);
    l = (x.lo >>> c) | (x.hi << c1);
  } else if (c < 64) {
    h = (x.lo >>> c) | (x.hi << c1);
    l = (x.hi >>> c) | (x.lo << c1);
  }
  return new u64(h, l);
}

function Ch(x, y, z) {
  const h = (x.hi & y.hi) ^ (~x.hi & z.hi); const l = (x.lo & y.lo) ^ (~x.lo & z.lo);
  return new u64(h, l);
}

function Maj(x, y, z) {
  const h = (x.hi & y.hi) ^ (x.hi & z.hi) ^ (y.hi & z.hi); const l = (x.lo & y.lo) ^ (x.lo & z.lo) ^ (y.lo & z.lo);
  return new u64(h, l);
}

function Sigma0(x) {
  return xor64(R(x, 28), R(x, 34), R(x, 39));
}
function Sigma1(x) {
  return xor64(R(x, 14), R(x, 18), R(x, 41));
}
function sigma0(x) {
  return xor64(R(x, 1), R(x, 8), shr64(x, 7));
}
function sigma1(x) {
  return xor64(R(x, 19), R(x, 61), shr64(x, 6));
}

const K = [new u64(0x428a2f98, 0xd728ae22), new u64(0x71374491, 0x23ef65cd), new u64(0xb5c0fbcf, 0xec4d3b2f), new u64(0xe9b5dba5, 0x8189dbbc),
new u64(0x3956c25b, 0xf348b538), new u64(0x59f111f1, 0xb605d019), new u64(0x923f82a4, 0xaf194f9b), new u64(0xab1c5ed5, 0xda6d8118),
new u64(0xd807aa98, 0xa3030242), new u64(0x12835b01, 0x45706fbe), new u64(0x243185be, 0x4ee4b28c), new u64(0x550c7dc3, 0xd5ffb4e2),
new u64(0x72be5d74, 0xf27b896f), new u64(0x80deb1fe, 0x3b1696b1), new u64(0x9bdc06a7, 0x25c71235), new u64(0xc19bf174, 0xcf692694),
new u64(0xe49b69c1, 0x9ef14ad2), new u64(0xefbe4786, 0x384f25e3), new u64(0x0fc19dc6, 0x8b8cd5b5), new u64(0x240ca1cc, 0x77ac9c65),
new u64(0x2de92c6f, 0x592b0275), new u64(0x4a7484aa, 0x6ea6e483), new u64(0x5cb0a9dc, 0xbd41fbd4), new u64(0x76f988da, 0x831153b5),
new u64(0x983e5152, 0xee66dfab), new u64(0xa831c66d, 0x2db43210), new u64(0xb00327c8, 0x98fb213f), new u64(0xbf597fc7, 0xbeef0ee4),
new u64(0xc6e00bf3, 0x3da88fc2), new u64(0xd5a79147, 0x930aa725), new u64(0x06ca6351, 0xe003826f), new u64(0x14292967, 0x0a0e6e70),
new u64(0x27b70a85, 0x46d22ffc), new u64(0x2e1b2138, 0x5c26c926), new u64(0x4d2c6dfc, 0x5ac42aed), new u64(0x53380d13, 0x9d95b3df),
new u64(0x650a7354, 0x8baf63de), new u64(0x766a0abb, 0x3c77b2a8), new u64(0x81c2c92e, 0x47edaee6), new u64(0x92722c85, 0x1482353b),
new u64(0xa2bfe8a1, 0x4cf10364), new u64(0xa81a664b, 0xbc423001), new u64(0xc24b8b70, 0xd0f89791), new u64(0xc76c51a3, 0x0654be30),
new u64(0xd192e819, 0xd6ef5218), new u64(0xd6990624, 0x5565a910), new u64(0xf40e3585, 0x5771202a), new u64(0x106aa070, 0x32bbd1b8),
new u64(0x19a4c116, 0xb8d2d0c8), new u64(0x1e376c08, 0x5141ab53), new u64(0x2748774c, 0xdf8eeb99), new u64(0x34b0bcb5, 0xe19b48a8),
new u64(0x391c0cb3, 0xc5c95a63), new u64(0x4ed8aa4a, 0xe3418acb), new u64(0x5b9cca4f, 0x7763e373), new u64(0x682e6ff3, 0xd6b2b8a3),
new u64(0x748f82ee, 0x5defb2fc), new u64(0x78a5636f, 0x43172f60), new u64(0x84c87814, 0xa1f0ab72), new u64(0x8cc70208, 0x1a6439ec),
new u64(0x90befffa, 0x23631e28), new u64(0xa4506ceb, 0xde82bde9), new u64(0xbef9a3f7, 0xb2c67915), new u64(0xc67178f2, 0xe372532b),
new u64(0xca273ece, 0xea26619c), new u64(0xd186b8c7, 0x21c0c207), new u64(0xeada7dd6, 0xcde0eb1e), new u64(0xf57d4f7f, 0xee6ed178),
new u64(0x06f067aa, 0x72176fba), new u64(0x0a637dc5, 0xa2c898a6), new u64(0x113f9804, 0xbef90dae), new u64(0x1b710b35, 0x131c471b),
new u64(0x28db77f5, 0x23047d84), new u64(0x32caab7b, 0x40c72493), new u64(0x3c9ebe0a, 0x15c9bebc), new u64(0x431d67c4, 0x9c100d4c),
new u64(0x4cc5d4be, 0xcb3e42b6), new u64(0x597f299c, 0xfc657e2a), new u64(0x5fcb6fab, 0x3ad6faec), new u64(0x6c44198c, 0x4a475817)];

function crypto_hashblocks(x, m, n) {
  const z = []; const b = []; const a = []; const w = []; let t; let i; let j;

  for (i = 0; i < 8; i++) {
    z[i] = a[i] = dl64(x, 8 * i);
  }

  let pos = 0;
  while (n >= 128) {
    for (i = 0; i < 16; i++) {
      w[i] = dl64(m, 8 * i + pos);
    }
    for (i = 0; i < 80; i++) {
      for (j = 0; j < 8; j++) {
        b[j] = a[j];
      }
      t = add64(a[7], Sigma1(a[4]), Ch(a[4], a[5], a[6]), K[i], w[i % 16]);
      b[7] = add64(t, Sigma0(a[0]), Maj(a[0], a[1], a[2]));
      b[3] = add64(b[3], t);
      for (j = 0; j < 8; j++) {
        a[(j + 1) % 8] = b[j];
      }
      if (i % 16 === 15) {
        for (j = 0; j < 16; j++) {
          w[j] = add64(w[j], w[(j + 9) % 16], sigma0(w[(j + 1) % 16]), sigma1(w[(j + 14) % 16]));
        }
      }
    }

    for (i = 0; i < 8; i++) {
      a[i] = add64(a[i], z[i]);
      z[i] = a[i];
    }

    pos += 128;
    n -= 128;
  }

  for (i = 0; i < 8; i++) {
    ts64(x, 8 * i, z[i]);
  }
  return n;
}

const iv = new Uint8Array([0x6a, 0x09, 0xe6, 0x67, 0xf3, 0xbc, 0xc9, 0x08, 0xbb, 0x67, 0xae, 0x85, 0x84, 0xca, 0xa7, 0x3b, 0x3c, 0x6e, 0xf3, 0x72, 0xfe, 0x94,
  0xf8, 0x2b, 0xa5, 0x4f, 0xf5, 0x3a, 0x5f, 0x1d, 0x36, 0xf1, 0x51, 0x0e, 0x52, 0x7f, 0xad, 0xe6, 0x82, 0xd1, 0x9b, 0x05, 0x68, 0x8c, 0x2b, 0x3e, 0x6c, 0x1f,
  0x1f, 0x83, 0xd9, 0xab, 0xfb, 0x41, 0xbd, 0x6b, 0x5b, 0xe0, 0xcd, 0x19, 0x13, 0x7e, 0x21, 0x79]);

function crypto_hash(out, m, n) {
  const h = new Uint8Array(64); const x = new Uint8Array(256);
  let i; const b = n;

  for (i = 0; i < 64; i++) {
    h[i] = iv[i];
  }

  crypto_hashblocks(h, m, n);
  n %= 128;

  for (i = 0; i < 256; i++) {
    x[i] = 0;
  }
  for (i = 0; i < n; i++) {
    x[i] = m[b - n + i];
  }
  x[n] = 128;

  n = 256 - 128 * (n < 112 ? 1 : 0);
  x[n - 9] = 0;
  ts64(x, n - 8, new u64((b / 0x20000000) | 0, b << 3));
  crypto_hashblocks(h, x, n);

  for (i = 0; i < 64; i++) {
    out[i] = h[i];
  }

  return 0;
}

function add(p, q) {
  const a = gf(); const b = gf(); const c = gf(); const d = gf(); const e = gf(); const f = gf(); const g = gf(); const h = gf(); const t = gf();

  Z(a, p[1], p[0]);
  Z(t, q[1], q[0]);
  M(a, a, t);
  A(b, p[0], p[1]);
  A(t, q[0], q[1]);
  M(b, b, t);
  M(c, p[3], q[3]);
  M(c, c, D2);
  M(d, p[2], q[2]);
  A(d, d, d);
  Z(e, b, a);
  Z(f, d, c);
  A(g, d, c);
  A(h, b, a);

  M(p[0], e, f);
  M(p[1], h, g);
  M(p[2], g, f);
  M(p[3], e, h);
}

function cswap(p, q, b) {
  let i;
  for (i = 0; i < 4; i++) {
    sel25519(p[i], q[i], b);
  }
}

function pack(r, p) {
  const tx = gf(); const ty = gf(); const zi = gf();
  inv25519(zi, p[2]);
  M(tx, p[0], zi);
  M(ty, p[1], zi);
  pack25519(r, ty);
  r[31] ^= par25519(tx) << 7;
}

function scalarmult(p, q, s) {
  let b; let i;
  set25519(p[0], gf0);
  set25519(p[1], gf1);
  set25519(p[2], gf1);
  set25519(p[3], gf0);
  for (i = 255; i >= 0; --i) {
    b = (s[(i / 8) | 0] >> (i & 7)) & 1;
    cswap(p, q, b);
    add(q, p);
    add(p, p);
    cswap(p, q, b);
  }
}

function scalarbase(p, s) {
  const q = [gf(), gf(), gf(), gf()];
  set25519(q[0], X);
  set25519(q[1], Y);
  set25519(q[2], gf1);
  M(q[3], X, Y);
  scalarmult(p, q, s);
}

function crypto_sign_keypair(pk, sk, seeded) {
  let d = new Uint8Array(64);
  const p = [gf(), gf(), gf(), gf()];
  let i;

  if (!seeded) {
    randombytes(sk, 32);
  }

  const context = blake.blake2bInit(64);
  blake.blake2bUpdate(context, sk);
  d = blake.blake2bFinal(context);

  d[0] &= 248;
  d[31] &= 127;
  d[31] |= 64;

  scalarbase(p, d);
  pack(pk, p);

  return 0;
}

const hashSecret = (sk) => {
  let d = new Uint8Array(64);
  const pk = new Uint8Array(32);
  const context = blake.blake2bInit(64);
  blake.blake2bUpdate(context, sk);
  d = blake.blake2bFinal(context);
  return d;
};

const uint5ToUint4 = (uint5) => {
  const length = uint5.length / 4 * 5;
  const uint4 = new Uint8Array(length);
  for (let i = 1; i <= length; i++) {
    const n = i - 1;
    const m = i % 5;
    const z = n - ((i - m) / 5);
    const right = uint5[z - 1] << (5 - m);
    const left = uint5[z] >> m;
    uint4[n] = (left + right) % 16;
  }
  return uint4;
};

const arrayCrop = (array) => {
  const length = array.length - 1;
  const croppedArray = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    croppedArray[i] = array[i + 1];
  }
  return croppedArray;
};

const uint4ToHex = (uint4) => {
  let hex = '';
  for (let i = 0; i < uint4.length; i++) {
    hex += uint4[i].toString(16).toUpperCase();
  }
  return hex;
};

const uint8ToUint4 = (uintValue) => {
  const uint4 = new Uint8Array(uintValue.length * 2);
  for (let i = 0; i < uintValue.length; i++) {
    uint4[i * 2] = uintValue[i] / 16 | 0;
    uint4[i * 2 + 1] = uintValue[i] % 16;
  }

  return uint4;
};

const equalArrays = (array1, array2) => {
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] != array2[i]) return false;
  }
  return true;
};

const uint4ToUint8 = (uintValue) => {
  const length = uintValue.length / 2;
  const uint8 = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    uint8[i] = (uintValue[i * 2] * 16) + uintValue[i * 2 + 1];
  }

  return uint8;
};

const stringToUint5 = (string) => {
  const letterList = '13456789abcdefghijkmnopqrstuwxyz'.split('');
  const length = string.length;
  const stringArray = string.split('');
  const uint5 = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    uint5[i] = letterList.indexOf(stringArray[i]);
  }
  return uint5;
};

const hexToUint4 = (hexValue) => {
  const uint4 = new Uint8Array(hexValue.length);
  for (let i = 0; i < hexValue.length; i++) {
    uint4[i] = parseInt(hexValue.substr(i, 1), 16);
  }

  return uint4;
};

const uint4ToUint5 = (uintValue) => {
  const length = uintValue.length / 5 * 4;
  const uint5 = new Uint8Array(length);
  for (let i = 1; i <= length; i++) {
    const n = i - 1;
    const m = i % 4;
    const z = n + ((i - m) / 4);
    const right = uintValue[z] << m;
    let left;
    if (((length - i) % 4) == 0) {
      left = uintValue[z - 1] << 4;
    } else {
      left = uintValue[z + 1] >> (4 - m);
    }
    uint5[n] = (left + right) % 32;
  }
  return uint5;
};

const uint5ToString = (uint5) => {
  const letterList = '13456789abcdefghijkmnopqrstuwxyz'.split('');
  let string = '';
  for (let i = 0; i < uint5.length; i++) {
    string += letterList[uint5[i]];
  }

  return string;
};

const L = new Float64Array([0xed, 0xd3, 0xf5, 0x5c, 0x1a, 0x63, 0x12, 0x58, 0xd6, 0x9c, 0xf7, 0xa2, 0xde, 0xf9, 0xde, 0x14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0x10]);

function modL(r, x) {
  let carry; let i; let j; let k;
  for (i = 63; i >= 32; --i) {
    carry = 0;
    for (j = i - 32, k = i - 12; j < k; ++j) {
      x[j] += carry - 16 * x[i] * L[j - (i - 32)];
      carry = (x[j] + 128) >> 8;
      x[j] -= carry * 256;
    }
    x[j] += carry;
    x[i] = 0;
  }
  carry = 0;
  for (j = 0; j < 32; j++) {
    x[j] += carry - (x[31] >> 4) * L[j];
    carry = x[j] >> 8;
    x[j] &= 255;
  }
  for (j = 0; j < 32; j++) {
    x[j] -= carry * L[j];
  }
  for (i = 0; i < 32; i++) {
    x[i + 1] += x[i] >> 8;
    r[i] = x[i] & 255;
  }
}

function reduce(r) {
  const x = new Float64Array(64); let i;
  for (i = 0; i < 64; i++) {
    x[i] = r[i];
  }
  for (i = 0; i < 64; i++) {
    r[i] = 0;
  }
  modL(r, x);
}

// Note: difference from C - smlen returned, not passed as argument.
function crypto_sign(sm, m, n, sk) {
  let d = new Uint8Array(64); let h = new Uint8Array(64); let r = new Uint8Array(64);
  let i; let j; const x = new Float64Array(64);
  const p = [gf(), gf(), gf(), gf()];

  const pk = derivePublicKeyFromPrivateKey(sk);

  let context = blake.blake2bInit(64, null);
  blake.blake2bUpdate(context, sk);
  d = blake.blake2bFinal(context);
  d[0] &= 248;
  d[31] &= 127;
  d[31] |= 64;

  const smlen = n + 64;
  for (i = 0; i < n; i++) {
    sm[64 + i] = m[i];
  }
  for (i = 0; i < 32; i++) {
    sm[32 + i] = d[32 + i];
  }

  context = blake.blake2bInit(64, null);
  blake.blake2bUpdate(context, sm.subarray(32));
  r = blake.blake2bFinal(context);

  reduce(r);
  scalarbase(p, r);
  pack(sm, p);

  for (i = 32; i < 64; i++) {
    sm[i] = pk[i - 32];
  }

  context = blake.blake2bInit(64, null);
  blake.blake2bUpdate(context, sm);
  h = blake.blake2bFinal(context);

  reduce(h);

  for (i = 0; i < 64; i++) {
    x[i] = 0;
  }
  for (i = 0; i < 32; i++) {
    x[i] = r[i];
  }
  for (i = 0; i < 32; i++) {
    for (j = 0; j < 32; j++) {
      x[i + j] += h[i] * d[j];
    }
  }

  modL(sm.subarray(32), x);
  return smlen;
}

export function deriveAddressFromPublicKey(publicKey: string): string {
  const keyBytes = uint4ToUint8(hexToUint4(publicKey)); // For some reason here we go from u, to hex, to 4, to 8??
  const checksum = uint5ToString(uint4ToUint5(uint8ToUint4(blake.blake2b(keyBytes, null, 5).reverse())));
  const address = uint5ToString(uint4ToUint5(hexToUint4(`0${publicKey}`)));
  return `ban_${address}${checksum}`;
}

export function derivePublicKeyFromPrivateKey(privateKey: Uint8Array): Uint8Array {
  let d = new Uint8Array(64);
  const p = [gf(), gf(), gf(), gf()];
  const pk = new Uint8Array(32);
  const context = blake.blake2bInit(64);
  blake.blake2bUpdate(context, privateKey);
  d = blake.blake2bFinal(context);

  d[0] &= 248;
  d[31] &= 127;
  d[31] |= 64;

  scalarbase(p, d);
  pack(pk, p);
  return pk;
}

export function derivePublicKeyFromAddress(address: string): Uint8Array {
  let addressCrop = address.substring(4, 64);

  const keyUint4 = arrayCrop(uint5ToUint4(stringToUint5(addressCrop.substring(0, 52))));
  const hashUint4 = uint5ToUint4(stringToUint5(addressCrop.substring(52, 60)));
  const keyArray = uint4ToUint8(keyUint4);
  const blakeHash = blake.blake2b(keyArray, null, 5).reverse();

  const left = hashUint4;
  const right = uint8ToUint4(blakeHash);
  if (!equalArrays(left, right)) {
    const leftStr = uint5ToString(uint4ToUint5(left));
    const rightStr = uint5ToString(uint4ToUint5(right));
    throw new Error(`Incorrect checksum ${leftStr} != ${rightStr}`);
  }

  return hexToBytes(uint4ToHex(keyUint4));
}

export function signHash(privateKey: Uint8Array, hash: Uint8Array): Uint8Array {
  const signedMsg = new Uint8Array(64 + hash.length);
  crypto_sign(signedMsg, hash, hash.length, privateKey);
  const sig = new Uint8Array(64);
  for (let i = 0; i < sig.length; i++) {
    sig[i] = signedMsg[i];
  }
  return sig;
}
