# Avid Eleven Rack — Portable Web MIDI Controller

A zero-dependency, portable Web MIDI controller inspired by the physical **Avid / Digidesign Eleven Rack** 2U rack unit (targeting **Firmware 2.0.1 / Expansion Pack ERXP**).

## Quick Start (Windows PC with USB Link)

1. **Connect Eleven Rack via USB**: Ensure your Eleven Rack is connected via USB and powered on (with the Avid Eleven Rack Windows Driver installed).
2. **Verify MIDI Reception on Eleven Rack Hardware**:
   - Press and hold **Edit/Back** on the Eleven Rack front panel for ~1 second to open **User Options**.
   - Scroll to the **MIDI** section and ensure the MIDI Receive Channel matches the app (default is **Channel 1** or **Omni**).
3. **Open the App**:
   - Double-click [`index.html`](file:///c:/Users/okode/Desktop/DEV/11RControl/index.html) to open it in **Google Chrome** or **Microsoft Edge**.
   - Select **Eleven Rack** in both **MIDI OUT** and **MIDI IN** at the top (auto-selected when detected).

## Key Features & Official Table 12 MIDI Mapping

- **5 Custom Color Themes**: Switch on the fly between **Classic Eleven Orange**, **Cobalt Studio Blue**, **Matrix Phosphor Green**, **Mesa Crimson Red**, and **Boutique Cyber Violet**.
- **Prominent Per-Slot Rig Names**: Standard MIDI 1.0 does not transmit ASCII preset names from the hardware. Every slot (`A1–Z4` User / `a1–z4` Factory) displays a prominent Rig Banner on the LCD and on the 4 Rig Footswitches. Click the Rig Name on the LCD at any time to rename that slot (saved automatically to `localStorage`).
- **Contextual Amp View & Model Switching**:
  - The Eleven Rack firmware does not assign MIDI CCs to hot-swap Amp models, Cabinet models, or Speaker Breakup within a single patch; instead, models change by recalling complete **Rigs via Program Change (`PC 0–103`)**.
  - When viewing the **AMP** block on the LCD, you can adjust the **KNOB LABELS** profile to match your active amp or click **LOAD RIG &rarr;** to jump the hardware to a preset featuring that amp.
- **Full Page 1 & Page 2 Deep Editing (Official Table 12 CCs)**:
  - **Amp Settings 1–10**: `CC 14, 15, 16, 17, 21, 10` (Page 1) & `CC 113, 3, 85, 24, 22, 7` (Page 2)
  - **Distortion Settings 1–6**: `CC 28, 79, 80, 81, 82, 83`
  - **FX 1 Settings 1–9**: `CC 20, 42, 60, 77, 117, 118` (Page 1) & `CC 119, 5` (Page 2)
  - **FX 2 Settings 1–9**: `CC 114, 115, 116, 97, 98, 99` (Page 1) & `CC 37, 46` (Page 2)
  - **Modulation Settings 1–7**: `CC 62, 52, 53, 54, 57, 51` (Page 1) & `CC 56` (Page 2)
  - **Delay Settings 1–8**: `CC 71, 72, 73, 86, 87, 34` (Page 1) & `CC 48, 49` (Page 2)
  - **Reverb Settings 1–6**: `CC 74, 75, 76, 39, 77, 41`
- **Illuminated Wah Pedal & Toe-Switch**: Engaging the **WAH** button (or clicking the LED on the Wah pedal) lights up both the front-panel WAH button and the physical Wah expression treadle (`CC #43`).
- **Two-Way MIDI Sync (`PUSH TO 11R` + Live `MIDI IN`)**:
  - **PUSH TO 11R**: Sends all current UI knob values and bypass switches to the Eleven Rack.
  - **MIDI IN (Live RX)**: When Eleven Rack is selected in **MIDI IN**, turning physical knobs, toggling effects buttons, or scrolling Rigs on the Eleven Rack hardware updates the web UI in real time.
