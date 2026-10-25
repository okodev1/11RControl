# Avid Eleven Rack — Portable Web MIDI Controller

A zero-dependency, portable Web MIDI controller inspired by the physical **Avid / Digidesign Eleven Rack** 2U rack unit (targeting **Firmware 2.0.1 / Expansion Pack ERXP**).

## Quick Start (Windows PC with USB Link)

1. **Connect Eleven Rack via USB**: Ensure your Eleven Rack is connected via USB and powered on (with the Avid Eleven Rack Windows Driver installed).
2. **Verify MIDI Reception on Eleven Rack Hardware**:
   - Press and hold **Edit/Back** on the Eleven Rack front panel for ~1 second to open **User Options**.
   - Scroll to the **MIDI** section and ensure the MIDI Receive Channel matches the app (default is **Channel 1** or **Omni**).
3. **Open the App**:
   - Double-click [`index.html`](file:///c:/Users/okode/Desktop/DEV/11RControl/index.html) to open it in **Google Chrome** or **Microsoft Edge** (both include native Windows Web MIDI API support).
   - Allow MIDI device permissions if prompted by the browser.
   - The app automatically detects and selects your **Eleven Rack** MIDI Output/Input ports.

## Features & Controls

- **Authentic 2U Faceplate Layout**:
  - **Left**: Power switch and Master / Rig Volume knob (`CC #7`).
  - **Center**: Backlit orange/amber LCD screen with live Signal Chain bar (`WAH` &rarr; `DIST` &rarr; `FX 1` &rarr; `FX 2` &rarr; `AMP` &rarr; `CAB` &rarr; `LOOP` &rarr; `MOD` &rarr; `DLY` &rarr; `REV`), Scroll Wheel for Program Changes, and **6 glowing rotary encoders** underneath that dynamically map to whichever block you select.
  - **Right**: Dedicated hardware-style illuminated stomp buttons for `FX 1`, `FX 2`, `DIST`, `MOD`, `DELAY`, `REVERB`, `FX LOOP`, `AMP`, `WAH`, `CAB`, `TAP TEMPO`, and `TUNER`.
- **Interactive Signal Chain & 6 Soft Encoders**:
  - **Left-click** any FX button to toggle its bypass state (`0` = Off, `127` = On).
  - **Right-click** any FX button (or click its block inside the LCD signal chain) to bring its internal parameters onto the **6 glowing rotary knobs** below the screen.
  - Drag knobs vertically, use your **mouse wheel** for fine adjustments, or **double-click** a knob to center it (`64`).
- **Expression Pedals & Rig Switcher**:
  - Dedicated vertical expression treadles for **Wah Pedal** (`CC #4`), **Volume Pedal** (`CC #7`), and **Multi-FX Expression** (`CC #11`).
  - Quick Bank (`A–Z` User / `a–z` Factory via `CC #32` Bank Select + `PC 0–103`) and 4-footswitch patch matrix.
- **Customizable MIDI CC Map**:
  - Click **CC Map & Setup** in the top bar to inspect or customize any CC number to match your hardware's **User Options &rarr; MIDI CC Reference** screen.
