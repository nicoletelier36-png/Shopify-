"""Original 16 s, 120 BPM electro-pop bed for the AeroBoost reel (deterministic, royalty-free).

Layout (bar = 2 s): 0-4 intro + riser · 4 DROP · 4-12 groove · 12-13.5 build · 13.5-14 stop · 14 final hit · 16 end.
"""
import numpy as np
import soundfile as sf
import sys

SR = 44100
BPM = 120
BEAT = 60 / BPM
DUR = 16.0
N = int(SR * DUR)
rng = np.random.default_rng(7)
L = np.zeros(N)
R = np.zeros(N)


def t_arr(sec):
    return np.arange(int(sec * SR)) / SR


def place(sig, at, gain=1.0, pan=0.0):
    i = int(at * SR)
    if i >= N:
        return
    sig = sig[: N - i]
    L[i : i + len(sig)] += sig * gain * np.sqrt((1 - pan) / 2) * np.sqrt(2)
    R[i : i + len(sig)] += sig * gain * np.sqrt((1 + pan) / 2) * np.sqrt(2)


def env(t, a, d):
    return np.minimum(t / a, 1.0) * np.exp(-t / d)


def kick(big=False):
    t = t_arr(0.6 if big else 0.4)
    f = 45 + 120 * np.exp(-t * 35)
    ph = 2 * np.pi * np.cumsum(f) / SR
    s = np.sin(ph) * env(t, 0.002, 0.25 if big else 0.14)
    click = rng.standard_normal(len(t)) * np.exp(-t * 400) * 0.3
    return np.tanh((s + click) * 1.6)


def clap():
    t = t_arr(0.35)
    n = rng.standard_normal(len(t))
    e = sum(np.exp(-np.maximum(t - o, 0) * 60) * (t >= o) for o in (0, 0.012, 0.024)) + np.exp(-t * 14) * 0.6
    sig = n * e
    return np.convolve(sig, [1, -0.9], "same") * 0.5


def hat(open_=False):
    t = t_arr(0.25 if open_ else 0.06)
    n = rng.standard_normal(len(t))
    hp = np.diff(n, prepend=0)
    return hp * np.exp(-t * (14 if open_ else 90)) * 0.35


def crash():
    t = t_arr(2.0)
    n = np.diff(rng.standard_normal(len(t)), prepend=0)
    return n * np.exp(-t * 2.2) * 0.35


def saw(freq, sec, detune=0.0):
    t = t_arr(sec)
    out = 0
    for d in (-detune, 0, detune):
        p = (t * freq * (1 + d)) % 1.0
        out = out + (2 * p - 1)
    return out / 3


def lowpass(x, cutoff):
    a = np.exp(-2 * np.pi * cutoff / SR)
    y = np.zeros_like(x)
    acc = 0.0
    for i, v in enumerate(x):
        acc = (1 - a) * v + a * acc
        y[i] = acc
    return y


def note(midi):
    return 440 * 2 ** ((midi - 69) / 12)


# Am - F - C - G, one chord per bar
CHORDS = [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]]
ROOTS = [33, 29, 36, 31]
bar = lambda b: b * 4 * BEAT  # 4 beats per bar = 2 s

# --- Intro (bars 0-1): filtered chord stabs + closed hats + riser
for b in range(2):
    ch = CHORDS[b % 4]
    for k in range(4):
        at = bar(b) + k * BEAT + BEAT / 2
        stab = sum(saw(note(m), 0.22, 0.004) for m in ch) / 3
        stab = lowpass(stab, 700 + 900 * (b * 4 + k) / 8) * env(t_arr(0.22), 0.003, 0.09)
        place(stab, at, 0.55)
    for k in range(8):
        place(hat(), bar(b) + k * BEAT / 2, 0.5 if k % 2 else 0.3, pan=0.3)
# snare roll + noise riser into the drop
for i in range(16):
    place(clap(), 2.0 + i * BEAT / 4 * (1 if i < 8 else 1), 0.15 + 0.03 * i)
t = t_arr(2.0)
riser = np.diff(rng.standard_normal(len(t)), prepend=0) * (t / 2.0) ** 2 * 0.25
place(riser, 2.0, 1.0)

# --- Groove (bars 2-5 = 4-12 s) and final bar (14-16 s)
def groove_bar(b, with_kick=True, fill=False):
    ch = CHORDS[b % 4]
    root = ROOTS[b % 4]
    base = bar(b)
    for k in range(4):
        if with_kick:
            place(kick(), base + k * BEAT, 0.95)
        if k in (1, 3):
            place(clap(), base + k * BEAT, 0.55)
        place(hat(open_=True), base + k * BEAT + BEAT / 2, 0.45, pan=-0.2)
        # offbeat bass
        bs = saw(note(root), BEAT / 2 * 0.9, 0.002)
        bs = lowpass(bs, 380) * env(t_arr(BEAT / 2 * 0.9), 0.004, 0.18)
        bs += np.sin(2 * np.pi * note(root) * t_arr(BEAT / 2 * 0.9)) * env(t_arr(BEAT / 2 * 0.9), 0.004, 0.2) * 0.8
        place(bs, base + k * BEAT + BEAT / 2, 0.7)
        # chord stab on the offbeat
        stab = sum(saw(note(m + 12), 0.2, 0.006) for m in ch) / 3
        stab = lowpass(stab, 2600) * env(t_arr(0.2), 0.003, 0.08)
        place(stab, base + k * BEAT + BEAT / 2, 0.35, pan=0.25)
    for k in range(8):
        place(hat(), base + k * BEAT / 2, 0.25, pan=0.35)
    # 16th pluck arpeggio
    arp = [ch[0] + 24, ch[1] + 24, ch[2] + 24, ch[1] + 24]
    for k in range(16 if not fill else 12):
        pl = saw(note(arp[k % 4]), 0.12, 0.003)
        pl = lowpass(pl, 3200) * env(t_arr(0.12), 0.002, 0.05)
        place(pl, base + k * BEAT / 4, 0.22, pan=(-0.4 if k % 2 else 0.4))

place(kick(big=True), 4.0, 1.1)
place(crash(), 4.0, 1.0)
for b in (2, 3, 4, 5):
    groove_bar(b)
# bar 6 (12-14 s): no kick, rising snare roll, cut to silence at 13.5
groove_bar(6, with_kick=False, fill=True)
for i in range(12):
    place(clap(), 12.0 + i * BEAT / 4, 0.12 + 0.04 * i)
L[int(13.5 * SR) : int(14.0 * SR)] *= 0.0
R[int(13.5 * SR) : int(14.0 * SR)] *= 0.0
# bar 7 (14-16 s): final hit, half bar of groove, then the tail
place(kick(big=True), 14.0, 1.1)
place(crash(), 14.0, 1.0)
groove_bar(7)
fin = sum(saw(note(m), 1.2, 0.006) for m in (57, 64, 69, 72)) / 4
place(lowpass(fin, 2400) * env(t_arr(1.2), 0.004, 0.45), 15.0, 0.5)

mix = np.stack([L, R], axis=1)
# gentle master: soft clip + fade-out over the last 0.25 s
mix = np.tanh(mix * 0.9)
fade = np.ones(N)
fade[-int(0.25 * SR):] = np.linspace(1, 0, int(0.25 * SR))
mix *= fade[:, None]
mix /= np.max(np.abs(mix)) / 0.89
sf.write(sys.argv[1], mix, SR)
print("wrote", sys.argv[1], mix.shape[0] / SR, "s")
