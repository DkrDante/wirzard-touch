// js/recognition.js

export function norm(pts) {
    if(pts.length < 2) return pts;
    const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
    const mx = Math.min(...xs), MX = Math.max(...xs), my = Math.min(...ys), MY = Math.max(...ys);
    const rng = Math.max(MX - mx, MY - my, 1);
    return pts.map(p => [(p[0] - mx) / rng, (p[1] - my) / rng]);
}

export function plen(pts) {
    let l = 0;
    for(let i = 1; i < pts.length; i++) {
        l += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    }
    return l;
}

export function resamp(pts, n = 64) {
    if(pts.length < 2) return pts;
    let p = [...pts];
    const tot = plen(p), iv = tot / (n - 1);
    const out = [p[0]];
    let acc = 0, i = 1;
    while(out.length < n && i < p.length) {
        const d = Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]);
        if(acc + d >= iv) {
            const t = (iv - acc) / d;
            const x = p[i - 1][0] + t * (p[i][0] - p[i - 1][0]);
            const y = p[i - 1][1] + t * (p[i][1] - p[i - 1][1]);
            out.push([x, y]);
            p = [[x, y], ...p.slice(i)];
            acc = 0; i = 1;
        } else {
            acc += d; i++;
        }
    }
    while(out.length < n) out.push(p[p.length - 1]);
    return out;
}

export function av(pts) {
    const r = resamp(pts, 64), a = [];
    for(let i = 2; i < r.length; i++) {
        const a1 = Math.atan2(r[i - 1][1] - r[i - 2][1], r[i - 1][0] - r[i - 2][0]);
        const a2 = Math.atan2(r[i][1] - r[i - 1][1], r[i][0] - r[i - 1][0]);
        let da = a2 - a1;
        while(da > Math.PI) da -= 2 * Math.PI;
        while(da < -Math.PI) da += 2 * Math.PI;
        a.push(da);
    }
    return a;
}

export function trot(pts) {
    return av(pts).reduce((s, a) => s + a, 0);
}

export function corners(raw, th = 0.8) {
    const a = av(raw);
    let n = 0, p = 0;
    for(let i = 4; i < a.length - 4; i++) {
        const l = a.slice(i - 4, i + 4).reduce((s, x) => s + Math.abs(x), 0);
        if(l > th) {
            const s = Math.sign(a[i]);
            if(s !== 0 && s !== p) { n++; p = s; }
        }
    }
    return n;
}

export const CHECKS = {
    circle: r => { /* paste your circle check */ },
    triangle: r => { /* paste your triangle check */ },
    // ... paste the rest of your CHECKS object functions ...
};
