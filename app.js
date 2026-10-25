/**
 * Avid Eleven Rack — Portable Web MIDI Controller
 * Targets Firmware 2.0.1 (Expansion Pack / ERXP) over USB MIDI
 */

// ============================================================================
// 1. DEFAULT FACTORY ELEVEN RACK MIDI CC MAP & BLOCK DEFINITIONS
// ============================================================================
const DEFAULT_CC_MAP = {
  // Global / Pedals / Utility
  wah_pedal: 4,
  rig_volume: 7,
  exp_pedal: 11,
  bank_select_lsb: 32,
  tap_tempo: 64,
  tuner: 69,

  // Global Block Bypasses (0-63 = Off, 64-127 = On)
  bypass_wah: 43,
  bypass_dist: 25,
  bypass_fx1: 63,
  bypass_fx2: 86,
  bypass_amp: 111,   // Note: CC 92 is also Amp Output / Global Amp Bypass on ERXP
  bypass_cab: 71,
  bypass_fxloop: 107,
  bypass_mod: 50,
  bypass_delay: 28,
  bypass_reverb: 36,

  // Amp Parameters (Page 1: Knobs 1-6, Page 2: Knobs 7-12)
  amp_p1: 13, // Gain / Volume 1
  amp_p2: 14, // Bass
  amp_p3: 15, // Middle
  amp_p4: 16, // Treble
  amp_p5: 21, // Presence / Bright
  amp_p6: 10, // Master Volume
  amp_p7: 92, // Amp Output Level
  amp_p8: 3,  // Speaker Breakup / Depth (ERXP)
  amp_p9: 17, // Rig Volume
  amp_p10: 80, // Tremolo Speed / Custom 1
  amp_p11: 81, // Tremolo Depth / Custom 2
  amp_p12: 82, // Amp Setting Aux

  // Distortion Parameters
  dist_p1: 26, // Drive / Gain
  dist_p2: 27, // Tone
  dist_p3: 29, // Level / Output
  dist_p4: 30, // Aux 1
  dist_p5: 31, // Aux 2
  dist_p6: 33, // Aux 3

  // Modulation Parameters
  mod_p1: 51, // Speed / Rate
  mod_p2: 52, // Depth
  mod_p3: 53, // Mix / Level
  mod_p4: 54, // Feedback / Tone
  mod_p5: 55, // Pre-Delay / Width
  mod_p6: 56, // Sync / Aux

  // Delay Parameters
  delay_p1: 12, // Delay Time / Rate
  delay_p2: 34, // Feedback / Repeats
  delay_p3: 35, // Mix / Level
  delay_p4: 37, // Tone / High Cut
  delay_p5: 39, // Depth / Mod
  delay_p6: 41, // Release / Aux

  // Reverb Parameters
  reverb_p1: 18, // Mix
  reverb_p2: 38, // Decay
  reverb_p3: 40, // Tone
  reverb_p4: 42, // Pre-Delay
  reverb_p5: 44, // Type / Damping
  reverb_p6: 45, // Level

  // FX1 Parameters
  fx1_p1: 20, // Setting 1
  fx1_p2: 22, // Setting 2
  fx1_p3: 23, // Setting 3
  fx1_p4: 24, // Setting 4
  fx1_p5: 46, // Setting 5
  fx1_p6: 47, // Setting 6

  // FX2 Parameters
  fx2_p1: 87, // Setting 1
  fx2_p2: 88, // Setting 2
  fx2_p3: 89, // Setting 3
  fx2_p4: 90, // Setting 4
  fx2_p5: 91, // Setting 5
  fx2_p6: 93, // Setting 6

  // Cab / Mic Parameters
  cab_p1: 72, // Cab Type / Model
  cab_p2: 73, // Mic Model
  cab_p3: 74, // Mic Axis (On/Off)
  cab_p4: 75, // Speaker Breakup
  cab_p5: 76, // Low Cut
  cab_p6: 77, // Output

  // FX Loop Parameters
  fxloop_p1: 108, // Send Level
  fxloop_p2: 109, // Return Level
  fxloop_p3: 110, // Mix (Wet/Dry)
  fxloop_p4: 112, // Low Cut
  fxloop_p5: 113, // Parallel/Series
  fxloop_p6: 114, // Aux

  // Wah Block Parameters
  wah_p1: 4,  // Wah Position (Pedal)
  wah_p2: 48, // Wah Mix / Level
  wah_p3: 49, // Wah Vocal / Q
  wah_p4: 57, // Low Freq
  wah_p5: 58, // High Freq
  wah_p6: 59  // Boost
};

// Amp Models from Eleven Rack + Firmware 2.0.1 Expansion Pack (ERXP)
const AMP_MODELS = [
  { id: 'plexi_100', name: '1969 Plexiglas 100W', knobs: ['VOL 1', 'VOL 2', 'BASS', 'MID', 'TREBLE', 'PRESENCE', 'AMP OUT', 'SPK BRK', 'RIG VOL', 'BRIGHT', 'VARIAC', 'HUM'] },
  { id: 'plexi_vari', name: '1967 Plexiglas Vari (ERXP)', knobs: ['VOL 1', 'VOL 2', 'BASS', 'MID', 'TREBLE', 'PRESENCE', 'AMP OUT', 'SPK BRK', 'RIG VOL', 'BRIGHT', 'VARIAC', 'HUM'] },
  { id: 'lead_800', name: '1982 Lead 800 (JCM800)', knobs: ['PREAMP', 'BASS', 'MID', 'TREBLE', 'PRESENCE', 'MASTER', 'AMP OUT', 'SPK BRK', 'RIG VOL', 'BOOST', 'DEPTH', 'GATE'] },
  { id: 'dc_mod_800', name: 'DC Modern 800 (ERXP)', knobs: ['GAIN', 'BASS', 'MID', 'TREBLE', 'PRESENCE', 'MASTER', 'AMP OUT', 'SPK BRK', 'RIG VOL', 'BOOST', 'DEPTH', 'GATE'] },
  { id: 'treadplate', name: '1992 Treadplate Modern (Recto)', knobs: ['GAIN', 'BASS', 'MID', 'TREBLE', 'PRESENCE', 'MASTER', 'AMP OUT', 'SPK BRK', 'RIG VOL', 'BOLD/SPG', 'DIODE/TB', 'GATE'] },
  { id: 'rb_01b', name: 'RB-01b Red/Blue/Grn (Bogner ERXP)', knobs: ['GAIN', 'BASS', 'MID', 'TREBLE', 'PRESENCE', 'MASTER', 'AMP OUT', 'SPK BRK', 'RIG VOL', 'EXCURS', 'BOOST', 'ST-CLASS'] },
  { id: 'dc_mod_sod', name: 'DC Modern SOD (Suhr OD100 ERXP)', knobs: ['GAIN', 'BASS', 'MID', 'TREBLE', 'PRESENCE', 'MASTER', 'AMP OUT', 'SPK BRK', 'RIG VOL', 'WHOMP', 'BOOST', 'GATE'] },
  { id: 'sl_100', name: '1989 SL-100 Drive/Crunch (SLO)', knobs: ['PREAMP', 'BASS', 'MID', 'TREBLE', 'PRESENCE', 'MASTER', 'AMP OUT', 'SPK BRK', 'RIG VOL', 'BRIGHT', 'DEEP', 'GATE'] },
  { id: 'black_lux', name: '1965 Black Lux (Deluxe Reverb)', knobs: ['VOLUME', 'BASS', 'TREBLE', 'SPEED', 'INTENSITY', 'MASTER', 'AMP OUT', 'SPK BRK', 'RIG VOL', 'BRIGHT', 'BIAS', 'HUM'] },
  { id: 'black_sr', name: '1966 Black SR (Super Rev ERXP)', knobs: ['VOLUME', 'BASS', 'MID', 'TREBLE', 'BRIGHT', 'MASTER', 'AMP OUT', 'SPK BRK', 'RIG VOL', 'SPEED', 'INTENS', 'HUM'] },
  { id: 'black_vib', name: '1964 Black Vib (Vibrolux ERXP)', knobs: ['VOLUME', 'BASS', 'TREBLE', 'BRIGHT', 'SPEED', 'INTENS', 'AMP OUT', 'SPK BRK', 'RIG VOL', 'MASTER', 'BIAS', 'HUM'] },
  { id: 'tweed_bass', name: '1959 Tweed Bass (Bassman)', knobs: ['VOL NORM', 'VOL BRT', 'BASS', 'MID', 'TREBLE', 'PRESENCE', 'AMP OUT', 'SPK BRK', 'RIG VOL', 'JUMPER', 'SAG', 'HUM'] },
  { id: 'ac_hi_boost', name: '1963 AC Hi Boost (Vox AC30)', knobs: ['VOLUME', 'BASS', 'TREBLE', 'CUT', 'SPEED', 'DEPTH', 'AMP OUT', 'SPK BRK', 'RIG VOL', 'MASTER', 'BRILL', 'HUM'] },
  { id: 'ms_30', name: 'MS-30 Boutique (Matchless ERXP)', knobs: ['VOLUME', 'BASS', 'MID', 'TREBLE', 'BRILL', 'MASTER', 'AMP OUT', 'SPK BRK', 'RIG VOL', 'CUT', 'SAG', 'HUM'] },
  { id: 'blue_line', name: '1969 Blue Line Bass (SVT ERXP)', knobs: ['VOLUME', 'BASS', 'MID', 'MID FREQ', 'TREBLE', 'MASTER', 'AMP OUT', 'SPK BRK', 'RIG VOL', 'ULTRA HI', 'ULTRA LO', 'GATE'] }
];

// Signal Chain Blocks Order
const SIGNAL_BLOCKS = [
  {
    id: 'wah',
    short: 'WAH',
    title: 'WAH CONTROLLER',
    bypassKey: 'bypass_wah',
    params: [
      { key: 'wah_p1', name: 'POSITION' },
      { key: 'wah_p2', name: 'MIX' },
      { key: 'wah_p3', name: 'VOCAL / Q' },
      { key: 'wah_p4', name: 'LOW FREQ' },
      { key: 'wah_p5', name: 'HIGH FREQ' },
      { key: 'wah_p6', name: 'BOOST' }
    ]
  },
  {
    id: 'dist',
    short: 'DIST',
    title: 'DISTORTION / OD STOMP',
    bypassKey: 'bypass_dist',
    params: [
      { key: 'dist_p1', name: 'DRIVE / GAIN' },
      { key: 'dist_p2', name: 'TONE' },
      { key: 'dist_p3', name: 'LEVEL' },
      { key: 'dist_p4', name: 'BASS / LOW' },
      { key: 'dist_p5', name: 'TREB / HI' },
      { key: 'dist_p6', name: 'CLIP / MODE' }
    ]
  },
  {
    id: 'fx1',
    short: 'FX 1',
    title: 'FX 1 MULTI-SLOT (COMP / EQ / PITCH)',
    bypassKey: 'bypass_fx1',
    params: [
      { key: 'fx1_p1', name: 'PARAM 1' },
      { key: 'fx1_p2', name: 'PARAM 2' },
      { key: 'fx1_p3', name: 'PARAM 3' },
      { key: 'fx1_p4', name: 'PARAM 4' },
      { key: 'fx1_p5', name: 'PARAM 5' },
      { key: 'fx1_p6', name: 'LEVEL / MIX' }
    ]
  },
  {
    id: 'fx2',
    short: 'FX 2',
    title: 'FX 2 MULTI-SLOT (EQ / CHORUS / FILTER)',
    bypassKey: 'bypass_fx2',
    params: [
      { key: 'fx2_p1', name: 'PARAM 1' },
      { key: 'fx2_p2', name: 'PARAM 2' },
      { key: 'fx2_p3', name: 'PARAM 3' },
      { key: 'fx2_p4', name: 'PARAM 4' },
      { key: 'fx2_p5', name: 'PARAM 5' },
      { key: 'fx2_p6', name: 'LEVEL / MIX' }
    ]
  },
  {
    id: 'amp',
    short: 'AMP',
    title: 'AMPLIFIER BLOCK',
    bypassKey: 'bypass_amp',
    // Amp params are dynamically named based on selected Amp Model
    params: [
      { key: 'amp_p1', name: 'GAIN' },
      { key: 'amp_p2', name: 'BASS' },
      { key: 'amp_p3', name: 'MID' },
      { key: 'amp_p4', name: 'TREBLE' },
      { key: 'amp_p5', name: 'PRESENCE' },
      { key: 'amp_p6', name: 'MASTER' },
      { key: 'amp_p7', name: 'AMP OUT' },
      { key: 'amp_p8', name: 'SPK BREAKUP' },
      { key: 'amp_p9', name: 'RIG VOL' },
      { key: 'amp_p10', name: 'AUX 1' },
      { key: 'amp_p11', name: 'AUX 2' },
      { key: 'amp_p12', name: 'AUX 3' }
    ]
  },
  {
    id: 'cab',
    short: 'CAB',
    title: 'CABINET & MICROPHONE',
    bypassKey: 'bypass_cab',
    params: [
      { key: 'cab_p1', name: 'CAB TYPE' },
      { key: 'cab_p2', name: 'MIC MODEL' },
      { key: 'cab_p3', name: 'ON/OFF AXIS' },
      { key: 'cab_p4', name: 'SPK BREAKUP' },
      { key: 'cab_p5', name: 'LOW CUT' },
      { key: 'cab_p6', name: 'CAB LEVEL' }
    ]
  },
  {
    id: 'fxloop',
    short: 'LOOP',
    title: 'EXTERNAL FX LOOP',
    bypassKey: 'bypass_fxloop',
    params: [
      { key: 'fxloop_p1', name: 'SEND LVL' },
      { key: 'fxloop_p2', name: 'RETURN LVL' },
      { key: 'fxloop_p3', name: 'MIX' },
      { key: 'fxloop_p4', name: 'LOW CUT' },
      { key: 'fxloop_p5', name: 'MODE' },
      { key: 'fxloop_p6', name: 'OUTPUT' }
    ]
  },
  {
    id: 'mod',
    short: 'MOD',
    title: 'MODULATION (CHORUS / PHASER / ROTO)',
    bypassKey: 'bypass_mod',
    params: [
      { key: 'mod_p1', name: 'SPEED / RATE' },
      { key: 'mod_p2', name: 'DEPTH' },
      { key: 'mod_p3', name: 'MIX' },
      { key: 'mod_p4', name: 'FEEDBACK' },
      { key: 'mod_p5', name: 'PRE-DELAY' },
      { key: 'mod_p6', name: 'SYNC' }
    ]
  },
  {
    id: 'delay',
    short: 'DLY',
    title: 'DELAY (TAPE / BBD / DYN)',
    bypassKey: 'bypass_delay',
    params: [
      { key: 'delay_p1', name: 'TIME' },
      { key: 'delay_p2', name: 'FEEDBACK' },
      { key: 'delay_p3', name: 'MIX' },
      { key: 'delay_p4', name: 'TONE / CUT' },
      { key: 'delay_p5', name: 'MOD DEPTH' },
      { key: 'delay_p6', name: 'SYNC' }
    ]
  },
  {
    id: 'reverb',
    short: 'REV',
    title: 'REVERB (SPRING / STUDIO / HALL)',
    bypassKey: 'bypass_reverb',
    params: [
      { key: 'reverb_p1', name: 'MIX' },
      { key: 'reverb_p2', name: 'DECAY' },
      { key: 'reverb_p3', name: 'TONE' },
      { key: 'reverb_p4', name: 'PRE-DELAY' },
      { key: 'reverb_p5', name: 'HI DAMP' },
      { key: 'reverb_p6', name: 'TYPE' }
    ]
  }
];

// ============================================================================
// 2. APPLICATION STATE
// ============================================================================
const state = {
  poweredOn: true,
  midiAccess: null,
  midiOut: null,
  midiIn: null,
  midiChannel: 0, // 0 = Channel 1

  // Rig selection state (Banks A-Z = 0-25, Slots 1-4 = 0-3)
  bankType: 'USER', // 'USER' (CC32=0) or 'FACTORY' (CC32=1)
  bankIndex: 0,     // 0 = A, 1 = B ... 25 = Z
  slotIndex: 0,     // 0..3 -> Rig 1..4
  rigName: 'MODERN PLEXI LEAD',

  // Active editing focus on the LCD & 6 Soft Knobs
  activeBlockId: 'amp',
  activePage: 0,    // 0 = Page 1 (params 0..5), 1 = Page 2 (params 6..11)
  selectedAmpId: 'plexi_100',
  tunerActive: false,

  // CC Mapping table (persisted to localStorage)
  ccMap: { ...DEFAULT_CC_MAP },

  // Block Active States (true = On/64-127, false = Bypassed/0-63)
  blockState: {
    wah: false,
    dist: true,
    fx1: false,
    fx2: false,
    amp: true,
    cab: true,
    fxloop: false,
    mod: false,
    delay: true,
    reverb: true
  },

  // Continuous Parameter Values (0-127)
  paramValues: {
    rig_volume: 100,
    wah_pedal: 0,
    exp_pedal: 64,
    // Default starting values for all block params
    amp_p1: 88, amp_p2: 68, amp_p3: 75, amp_p4: 82, amp_p5: 70, amp_p6: 90,
    amp_p7: 100, amp_p8: 55, amp_p9: 100, amp_p10: 0, amp_p11: 0, amp_p12: 64,
    dist_p1: 72, dist_p2: 64, dist_p3: 85, dist_p4: 64, dist_p5: 64, dist_p6: 64,
    mod_p1: 48, mod_p2: 64, mod_p3: 50, mod_p4: 40, mod_p5: 20, mod_p6: 0,
    delay_p1: 58, delay_p2: 45, delay_p3: 42, delay_p4: 70, delay_p5: 25, delay_p6: 0,
    reverb_p1: 38, reverb_p2: 60, reverb_p3: 64, reverb_p4: 20, reverb_p5: 50, reverb_p6: 64,
    fx1_p1: 64, fx1_p2: 64, fx1_p3: 64, fx1_p4: 64, fx1_p5: 64, fx1_p6: 64,
    fx2_p1: 64, fx2_p2: 64, fx2_p3: 64, fx2_p4: 64, fx2_p5: 64, fx2_p6: 64,
    cab_p1: 40, cab_p2: 30, cab_p3: 127, cab_p4: 55, cab_p5: 20, cab_p6: 100,
    fxloop_p1: 100, fxloop_p2: 100, fxloop_p3: 64, fxloop_p4: 0, fxloop_p5: 0, fxloop_p6: 100,
    wah_p1: 0, wah_p2: 127, wah_p3: 64, wah_p4: 40, wah_p5: 90, wah_p6: 64
  },

  // Local Presets / Snapshots
  presets: {}
};

// ============================================================================
// 3. WEB MIDI ENGINE
// ============================================================================
async function initWebMIDI() {
  const statusDot = document.getElementById('midi-status-dot');
  const statusText = document.getElementById('midi-status-text');

  if (!navigator.requestMIDIAccess) {
    statusDot.className = 'status-dot error';
    statusText.textContent = 'Web MIDI API Not Supported (Use Chrome / Edge)';
    logMidi('info', 'Browser does not support Web MIDI API. Please open in Chrome or Microsoft Edge on Windows.');
    return;
  }

  try {
    state.midiAccess = await navigator.requestMIDIAccess({ sysex: false });
    state.midiAccess.onstatechange = () => populateMidiDevices();
    populateMidiDevices();
  } catch (err) {
    statusDot.className = 'status-dot error';
    statusText.textContent = 'MIDI Access Denied';
    logMidi('info', `Failed to acquire Web MIDI: ${err.message}`);
  }
}

function populateMidiDevices() {
  if (!state.midiAccess) return;

  const outSelect = document.getElementById('midi-out-select');
  const inSelect = document.getElementById('midi-in-select');
  const statusDot = document.getElementById('midi-status-dot');
  const statusText = document.getElementById('midi-status-text');

  const prevOutId = outSelect.value;
  const prevInId = inSelect.value;

  outSelect.innerHTML = '<option value="">-- No MIDI Output (Simulation Mode) --</option>';
  inSelect.innerHTML = '<option value="">-- Optional MIDI Input --</option>';

  let autoSelectedOut = '';
  let autoSelectedIn = '';

  for (const output of state.midiAccess.outputs.values()) {
    const opt = document.createElement('option');
    opt.value = output.id;
    opt.textContent = output.name || `MIDI Out (${output.id})`;
    outSelect.appendChild(opt);

    if (/eleven|avid|digidesign|11r/i.test(output.name)) {
      autoSelectedOut = output.id;
    }
  }

  for (const input of state.midiAccess.inputs.values()) {
    const opt = document.createElement('option');
    opt.value = input.id;
    opt.textContent = input.name || `MIDI In (${input.id})`;
    inSelect.appendChild(opt);

    if (/eleven|avid|digidesign|11r/i.test(input.name)) {
      autoSelectedIn = input.id;
    }
  }

  // Restore previous or auto-select Eleven Rack if found
  if (prevOutId && state.midiAccess.outputs.has(prevOutId)) {
    outSelect.value = prevOutId;
  } else if (autoSelectedOut) {
    outSelect.value = autoSelectedOut;
  } else if (state.midiAccess.outputs.size === 1) {
    outSelect.value = Array.from(state.midiAccess.outputs.keys())[0];
  }

  if (prevInId && state.midiAccess.inputs.has(prevInId)) {
    inSelect.value = prevInId;
  } else if (autoSelectedIn) {
    inSelect.value = autoSelectedIn;
  }

  bindSelectedMidiPorts();

  if (state.midiOut) {
    statusDot.className = 'status-dot connected';
    statusText.textContent = `Connected: ${state.midiOut.name}`;
  } else {
    statusDot.className = 'status-dot';
    statusText.textContent = state.midiAccess.outputs.size > 0
      ? 'Select MIDI Out Device'
      : 'No USB MIDI Devices Found (UI Active)';
  }
}

function bindSelectedMidiPorts() {
  if (!state.midiAccess) return;
  const outId = document.getElementById('midi-out-select').value;
  const inId = document.getElementById('midi-in-select').value;

  state.midiOut = outId ? state.midiAccess.outputs.get(outId) : null;

  if (state.midiIn) {
    state.midiIn.onmidimessage = null;
  }
  state.midiIn = inId ? state.midiAccess.inputs.get(inId) : null;
  if (state.midiIn) {
    state.midiIn.onmidimessage = handleIncomingMidi;
  }

  const statusDot = document.getElementById('midi-status-dot');
  const statusText = document.getElementById('midi-status-text');
  if (state.midiOut) {
    statusDot.className = 'status-dot connected';
    statusText.textContent = `Connected: ${state.midiOut.name}`;
    logMidi('info', `Bound MIDI Output to "${state.midiOut.name}" on Ch ${state.midiChannel + 1}`);
  } else {
    statusDot.className = 'status-dot';
    statusText.textContent = 'Simulation Mode (No MIDI Out)';
  }
}

function sendMidiCC(ccNumber, value, label = '') {
  if (!state.poweredOn) return;
  const cc = Math.max(0, Math.min(127, Math.round(Number(ccNumber))));
  const val = Math.max(0, Math.min(127, Math.round(Number(value))));
  const statusByte = 0xB0 | (state.midiChannel & 0x0F);

  if (state.midiOut) {
    try {
      state.midiOut.send([statusByte, cc, val]);
    } catch (e) {
      logMidi('info', `MIDI Send Error: ${e.message}`);
    }
  }

  logMidi('tx', `TX [Ch ${state.midiChannel + 1}] CC #${String(cc).padStart(3, ' ')} = ${String(val).padStart(3, ' ')} ${label ? `(${label})` : ''}`);
}

function sendMidiPC(pcNumber, bankType = state.bankType, label = '') {
  if (!state.poweredOn) return;
  const pc = Math.max(0, Math.min(127, Math.round(Number(pcNumber))));
  const ccStatus = 0xB0 | (state.midiChannel & 0x0F);
  const pcStatus = 0xC0 | (state.midiChannel & 0x0F);
  const bankVal = bankType === 'FACTORY' ? 1 : 0;
  const bankCC = state.ccMap.bank_select_lsb ?? 32;

  if (state.midiOut) {
    try {
      // Send Bank Select LSB (CC 32: 0=User, 1=Factory) followed by Program Change
      state.midiOut.send([ccStatus, bankCC, bankVal]);
      state.midiOut.send([pcStatus, pc]);
    } catch (e) {
      logMidi('info', `MIDI PC Error: ${e.message}`);
    }
  }

  logMidi('tx', `TX [Ch ${state.midiChannel + 1}] Bank CC#${bankCC}=${bankVal} (${bankType}) -> PC #${String(pc).padStart(3, '0')} ${label}`);
}

function handleIncomingMidi(event) {
  const [status, data1, data2] = event.data;
  const cmd = status & 0xF0;
  const ch = (status & 0x0F) + 1;

  if (cmd === 0xB0) {
    logMidi('rx', `RX [Ch ${ch}] CC #${data1} = ${data2}`);
    // Update matching parameter or bypass in UI if applicable
    syncIncomingCCToUI(data1, data2);
  } else if (cmd === 0xC0) {
    logMidi('rx', `RX [Ch ${ch}] Program Change #${data1}`);
    const bankIdx = Math.floor(data1 / 4);
    const slotIdx = data1 % 4;
    if (bankIdx >= 0 && bankIdx < 26) {
      state.bankIndex = bankIdx;
      state.slotIndex = slotIdx;
      renderAll();
    }
  }
}

function syncIncomingCCToUI(cc, val) {
  // Check bypasses first
  for (const block of SIGNAL_BLOCKS) {
    if (state.ccMap[block.bypassKey] === cc) {
      state.blockState[block.id] = val >= 64;
      renderAll();
      return;
    }
  }
  // Check continuous params
  for (const [paramKey, mappedCC] of Object.entries(state.ccMap)) {
    if (mappedCC === cc && paramKey in state.paramValues) {
      state.paramValues[paramKey] = val;
      renderAll();
      return;
    }
  }
}

function logMidi(type, message) {
  const list = document.getElementById('midi-log-list');
  if (!list) return;
  const item = document.createElement('div');
  item.className = `log-entry ${type}`;
  const time = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  item.textContent = `[${time}] ${message}`;
  list.appendChild(item);

  while (list.children.length > 60) {
    list.removeChild(list.firstChild);
  }
  list.scrollTop = list.scrollHeight;
}

// ============================================================================
// 4. UI RENDERING & INTERACTION LOGIC
// ============================================================================
function getCurrentAmpModel() {
  return AMP_MODELS.find(m => m.id === state.selectedAmpId) || AMP_MODELS[0];
}

function getActiveBlockDef() {
  return SIGNAL_BLOCKS.find(b => b.id === state.activeBlockId) || SIGNAL_BLOCKS[4];
}

function getActivePageParams() {
  const block = getActiveBlockDef();
  const ampModel = getCurrentAmpModel();

  if (block.id === 'amp') {
    const startIdx = state.activePage * 6;
    const slice = block.params.slice(startIdx, startIdx + 6);
    return slice.map((p, idx) => ({
      key: p.key,
      name: ampModel.knobs[startIdx + idx] || p.name
    }));
  } else {
    // Effects blocks have 6 primary parameters on Page 1
    return block.params.slice(0, 6);
  }
}

function buildInitialDOM() {
  // Populate Amp Model Selector
  const ampSelect = document.getElementById('amp-model-select');
  ampSelect.innerHTML = '';
  AMP_MODELS.forEach(model => {
    const opt = document.createElement('option');
    opt.value = model.id;
    opt.textContent = model.name;
    ampSelect.appendChild(opt);
  });
  ampSelect.value = state.selectedAmpId;

  // Populate Quick Bank Letter Selector (A-Z)
  const bankSelect = document.getElementById('quick-bank-letter');
  bankSelect.innerHTML = '';
  for (let i = 0; i < 26; i++) {
    const letter = String.fromCharCode(65 + i);
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = `Bank ${letter}`;
    bankSelect.appendChild(opt);
  }

  // Build 6 Soft Rotary Encoders Row
  const encodersRow = document.getElementById('six-encoders-row');
  encodersRow.innerHTML = '';
  for (let i = 0; i < 6; i++) {
    const slot = document.createElement('div');
    slot.className = 'encoder-slot';
    slot.innerHTML = `
      <div class="knob-container" data-encoder-index="${i}">
        <div class="knob-led-ring" id="encoder-ring-${i}"></div>
        <div class="knob-body" id="encoder-knob-${i}" tabindex="0">
          <div class="knob-indicator"></div>
          <div class="knob-cap"></div>
        </div>
      </div>
      <span class="encoder-slot-label" id="encoder-label-${i}">KNOB ${i + 1}</span>
      <span class="cc-badge" id="encoder-cc-${i}">CC --</span>
    `;
    encodersRow.appendChild(slot);
    setupRotaryKnobDrag(slot.querySelector('.knob-body'), i);
  }

  // Setup Master Volume Knob Drag
  const masterKnob = document.getElementById('knob-rig_volume');
  setupMasterKnobDrag(masterKnob);

  // Setup Rig Scroll Wheel
  setupScrollWheel();
}

function renderAll() {
  renderPowerState();
  renderMasterVolume();
  renderLCD();
  renderSixEncoders();
  renderFXButtons();
  renderPedals();
  renderQuickRigSwitcher();
}

function renderPowerState() {
  const rack = document.getElementById('rack-unit');
  const powerBtn = document.getElementById('power-switch');
  if (state.poweredOn) {
    rack.classList.remove('powered-off');
    powerBtn.classList.add('active');
  } else {
    rack.classList.add('powered-off');
    powerBtn.classList.remove('active');
  }
}

function updateKnobVisual(ringEl, knobEl, val) {
  const norm = Math.max(0, Math.min(1, val / 127));
  const deg = Math.round(norm * 270); // 0 to 270 deg sweep
  const rot = -135 + deg;             // -135deg to +135deg
  if (ringEl) ringEl.style.setProperty('--knob-deg', `${deg}deg`);
  if (knobEl) knobEl.style.setProperty('--knob-rot', `${rot}deg`);
}

function renderMasterVolume() {
  const val = state.paramValues.rig_volume ?? 100;
  updateKnobVisual(
    document.getElementById('ring-rig_volume'),
    document.getElementById('knob-rig_volume'),
    val
  );
  document.getElementById('badge-rig_volume').textContent = `CC ${state.ccMap.rig_volume}`;
}

function renderLCD() {
  const letter = state.bankType === 'USER'
    ? String.fromCharCode(65 + state.bankIndex)
    : String.fromCharCode(97 + state.bankIndex);
  const rigId = `${letter}${state.slotIndex + 1}`;
  const pcNum = state.bankIndex * 4 + state.slotIndex;

  document.getElementById('lcd-bank-type').textContent = state.bankType;
  document.getElementById('lcd-rig-id').textContent = rigId;
  document.getElementById('lcd-rig-pc').textContent = `(PC ${String(pcNum).padStart(3, '0')})`;

  // Signal Chain Bar
  const chainContainer = document.getElementById('lcd-signal-chain');
  chainContainer.innerHTML = '';
  SIGNAL_BLOCKS.forEach(block => {
    const node = document.createElement('div');
    const isEnabled = state.blockState[block.id];
    const isFocused = state.activeBlockId === block.id;
    node.className = `chain-node ${isEnabled ? 'active-block' : 'bypassed'} ${isFocused ? 'selected-focus' : ''}`;
    node.textContent = block.short;
    node.title = `Left-click: Focus ${block.title} on Knobs | Double-click: Toggle Bypass`;

    node.addEventListener('click', () => {
      state.activeBlockId = block.id;
      state.activePage = 0;
      renderAll();
    });

    node.addEventListener('dblclick', () => {
      toggleBlockBypass(block.id);
    });

    chainContainer.appendChild(node);
  });

  // Active Block Header
  const blockDef = getActiveBlockDef();
  const ampModel = getCurrentAmpModel();
  const headerTitle = document.getElementById('lcd-active-block-title');
  const pageInd = document.getElementById('lcd-active-page-indicator');

  if (state.tunerActive) {
    headerTitle.textContent = 'TUNER ACTIVE — OUTPUT MUTED (CC 69 = 127)';
    pageInd.textContent = 'PRESS TUNER TO EXIT';
  } else if (blockDef.id === 'amp') {
    headerTitle.textContent = `AMP: ${ampModel.name.toUpperCase()} [${state.blockState.amp ? 'ON' : 'BYPASSED'}]`;
    pageInd.textContent = `PAGE ${state.activePage + 1}/2`;
  } else {
    const statusStr = state.blockState[blockDef.id] ? 'ON' : 'BYPASSED';
    headerTitle.textContent = `${blockDef.title} [${statusStr}]`;
    pageInd.textContent = 'PAGE 1/1';
  }

  // Page 1 / Page 2 Button highlights
  document.getElementById('btn-sw1').classList.toggle('active', state.activePage === 0);
  document.getElementById('btn-sw2').classList.toggle('active', state.activePage === 1 && blockDef.id === 'amp');

  // 6 Knobs LCD Readout Columns
  const readoutGrid = document.getElementById('lcd-knobs-readout');
  readoutGrid.innerHTML = '';
  const activeParams = getActivePageParams();

  activeParams.forEach(param => {
    const val = state.paramValues[param.key] ?? 64;
    const pct = Math.round((val / 127) * 100);
    const tenths = ((val / 127) * 10).toFixed(1);

    const cell = document.createElement('div');
    cell.className = 'lcd-knob-cell';
    cell.innerHTML = `
      <span class="lcd-param-name">${param.name}</span>
      <div class="lcd-param-bar-wrap">
        <div class="lcd-param-bar-fill" style="width: ${pct}%"></div>
      </div>
      <span class="lcd-param-val">${tenths} <small>(${val})</small></span>
    `;
    readoutGrid.appendChild(cell);
  });
}

function renderSixEncoders() {
  const activeParams = getActivePageParams();
  for (let i = 0; i < 6; i++) {
    const param = activeParams[i];
    const ringEl = document.getElementById(`encoder-ring-${i}`);
    const knobEl = document.getElementById(`encoder-knob-${i}`);
    const labelEl = document.getElementById(`encoder-label-${i}`);
    const ccEl = document.getElementById(`encoder-cc-${i}`);

    if (param) {
      const val = state.paramValues[param.key] ?? 64;
      const cc = state.ccMap[param.key] ?? 0;
      updateKnobVisual(ringEl, knobEl, val);
      labelEl.textContent = param.name;
      ccEl.textContent = `CC ${cc}`;
    }
  }
}

function renderFXButtons() {
  SIGNAL_BLOCKS.forEach(block => {
    const btn = document.getElementById(`fxbtn-${block.id}`);
    const ccSpan = document.getElementById(`fxcc-${block.id}`);
    if (btn) {
      btn.classList.toggle('active', !!state.blockState[block.id]);
    }
    if (ccSpan) {
      ccSpan.textContent = `CC ${state.ccMap[block.bypassKey]}`;
    }
  });

  const tunerBtn = document.getElementById('btn-tuner');
  if (tunerBtn) tunerBtn.classList.toggle('active', state.tunerActive);
  document.getElementById('fxcc-tap').textContent = `CC ${state.ccMap.tap_tempo}`;
  document.getElementById('fxcc-tuner').textContent = `CC ${state.ccMap.tuner}`;
}

function renderPedals() {
  // Wah Pedal
  const wahVal = state.paramValues.wah_pedal ?? 0;
  document.getElementById('slider-wah').value = wahVal;
  document.getElementById('val-wah').textContent = `${Math.round((wahVal / 127) * 100)}% (${wahVal})`;
  document.getElementById('badge-wah_pedal').textContent = `CC ${state.ccMap.wah_pedal}`;

  // Volume Pedal
  const volVal = state.paramValues.rig_volume ?? 100;
  document.getElementById('slider-vol').value = volVal;
  document.getElementById('val-vol').textContent = `${Math.round((volVal / 127) * 100)}% (${volVal})`;
  document.getElementById('badge-vol_pedal').textContent = `CC ${state.ccMap.rig_volume}`;

  // Multi-FX Expression Pedal
  const expVal = state.paramValues.exp_pedal ?? 64;
  document.getElementById('slider-exp').value = expVal;
  document.getElementById('val-exp').textContent = `${Math.round((expVal / 127) * 100)}% (${expVal})`;
  document.getElementById('badge-exp_pedal').textContent = `CC ${state.ccMap.exp_pedal}`;
}

function renderQuickRigSwitcher() {
  document.getElementById('quick-bank-letter').value = state.bankIndex;
  document.getElementById('btn-quick-user').classList.toggle('active', state.bankType === 'USER');
  document.getElementById('btn-quick-factory').classList.toggle('active', state.bankType === 'FACTORY');

  const letter = state.bankType === 'USER'
    ? String.fromCharCode(65 + state.bankIndex)
    : String.fromCharCode(97 + state.bankIndex);

  const stompBtns = document.querySelectorAll('.rig-stomp-btn');
  stompBtns.forEach((btn, idx) => {
    const pc = state.bankIndex * 4 + idx;
    btn.classList.toggle('active', idx === state.slotIndex);
    document.getElementById(`stomp-label-${idx}`).textContent = `${letter}${idx + 1}`;
    document.getElementById(`stomp-pc-${idx}`).textContent = `PC ${pc}`;
  });
}

// ============================================================================
// 5. KNOB DRAG, SCROLL WHEEL & BUTTON HANDLERS
// ============================================================================
function setupRotaryKnobDrag(knobEl, encoderIdx) {
  let startY = 0;
  let startVal = 0;

  const onMove = (e) => {
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const deltaY = startY - clientY;
    const newVal = Math.max(0, Math.min(127, Math.round(startVal + deltaY * 0.85)));

    const activeParams = getActivePageParams();
    const param = activeParams[encoderIdx];
    if (!param) return;

    if (state.paramValues[param.key] !== newVal) {
      state.paramValues[param.key] = newVal;
      const cc = state.ccMap[param.key];
      sendMidiCC(cc, newVal, param.name);
      renderLCD();
      renderSixEncoders();
    }
  };

  const onUp = () => {
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('mouseup', onUp);
    window.removeEventListener('touchmove', onMove);
    window.removeEventListener('touchend', onUp);
  };

  const onDown = (e) => {
    e.preventDefault();
    const activeParams = getActivePageParams();
    const param = activeParams[encoderIdx];
    if (!param) return;
    startY = e.touches ? e.touches[0].clientY : e.clientY;
    startVal = state.paramValues[param.key] ?? 64;
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', onUp);
  };

  knobEl.addEventListener('mousedown', onDown);
  knobEl.addEventListener('touchstart', onDown, { passive: false });

  // Mouse wheel fine-tuning
  knobEl.addEventListener('wheel', (e) => {
    e.preventDefault();
    const activeParams = getActivePageParams();
    const param = activeParams[encoderIdx];
    if (!param) return;
    const step = e.deltaY < 0 ? 2 : -2;
    const newVal = Math.max(0, Math.min(127, (state.paramValues[param.key] ?? 64) + step));
    state.paramValues[param.key] = newVal;
    sendMidiCC(state.ccMap[param.key], newVal, param.name);
    renderLCD();
    renderSixEncoders();
  });

  // Double-click resets to noon (64)
  knobEl.addEventListener('dblclick', () => {
    const activeParams = getActivePageParams();
    const param = activeParams[encoderIdx];
    if (!param) return;
    state.paramValues[param.key] = 64;
    sendMidiCC(state.ccMap[param.key], 64, `${param.name} Reset`);
    renderLCD();
    renderSixEncoders();
  });
}

function setupMasterKnobDrag(knobEl) {
  let startY = 0;
  let startVal = 0;

  const updateMaster = (newVal) => {
    if (state.paramValues.rig_volume !== newVal) {
      state.paramValues.rig_volume = newVal;
      sendMidiCC(state.ccMap.rig_volume, newVal, 'Master/Rig Volume');
      renderMasterVolume();
      renderPedals();
    }
  };

  const onMove = (e) => {
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const deltaY = startY - clientY;
    const newVal = Math.max(0, Math.min(127, Math.round(startVal + deltaY * 0.85)));
    updateMaster(newVal);
  };

  const onUp = () => {
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('mouseup', onUp);
  };

  knobEl.addEventListener('mousedown', (e) => {
    e.preventDefault();
    startY = e.clientY;
    startVal = state.paramValues.rig_volume ?? 100;
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  });

  knobEl.addEventListener('wheel', (e) => {
    e.preventDefault();
    const step = e.deltaY < 0 ? 3 : -3;
    const newVal = Math.max(0, Math.min(127, (state.paramValues.rig_volume ?? 100) + step));
    updateMaster(newVal);
  });
}

function setupScrollWheel() {
  const wheel = document.getElementById('rig-scroll-wheel');
  wheel.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      stepRig(1);
    } else {
      stepRig(-1);
    }
  });

  let startY = 0;
  const onMove = (e) => {
    const dy = startY - e.clientY;
    if (Math.abs(dy) >= 18) {
      stepRig(dy > 0 ? 1 : -1);
      startY = e.clientY;
    }
  };
  const onUp = () => {
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('mouseup', onUp);
  };
  wheel.addEventListener('mousedown', (e) => {
    e.preventDefault();
    startY = e.clientY;
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  });
}

function stepRig(delta) {
  let totalIndex = state.bankIndex * 4 + state.slotIndex + delta;
  if (totalIndex < 0) totalIndex = 103; // 26 banks * 4 = 104 rigs (0..103)
  if (totalIndex > 103) totalIndex = 0;

  state.bankIndex = Math.floor(totalIndex / 4);
  state.slotIndex = totalIndex % 4;

  const letter = state.bankType === 'USER'
    ? String.fromCharCode(65 + state.bankIndex)
    : String.fromCharCode(97 + state.bankIndex);
  sendMidiPC(totalIndex, state.bankType, `[Rig ${letter}${state.slotIndex + 1}]`);
  renderAll();
}

function toggleBlockBypass(blockId) {
  const block = SIGNAL_BLOCKS.find(b => b.id === blockId);
  if (!block) return;

  state.blockState[blockId] = !state.blockState[blockId];
  const isOn = state.blockState[blockId];
  const cc = state.ccMap[block.bypassKey];
  sendMidiCC(cc, isOn ? 127 : 0, `${block.short} ${isOn ? 'ON' : 'OFF'}`);

  // Focus this block on the LCD when interacted with
  state.activeBlockId = blockId;
  state.activePage = 0;
  renderAll();
}

function syncEntireRigToHardware() {
  logMidi('info', 'Syncing all active block bypasses & current parameters to Eleven Rack...');
  SIGNAL_BLOCKS.forEach(block => {
    const isOn = state.blockState[block.id];
    sendMidiCC(state.ccMap[block.bypassKey], isOn ? 127 : 0, `${block.short} Bypass`);
  });
  const activeParams = getActivePageParams();
  activeParams.forEach(p => {
    sendMidiCC(state.ccMap[p.key], state.paramValues[p.key] ?? 64, p.name);
  });
  sendMidiCC(state.ccMap.rig_volume, state.paramValues.rig_volume ?? 100, 'Rig Volume');
}

// ============================================================================
// 6. CC MAPPING MODAL & LOCAL STORAGE PERSISTENCE
// ============================================================================
function loadSavedState() {
  try {
    const savedCC = localStorage.getItem('11r_cc_map');
    if (savedCC) {
      state.ccMap = { ...DEFAULT_CC_MAP, ...JSON.parse(savedCC) };
    }
    const savedPresets = localStorage.getItem('11r_presets');
    if (savedPresets) {
      state.presets = JSON.parse(savedPresets);
    } else {
      // Seed default starter snapshots
      state.presets = {
        'Plexi Arena Lead (A1)': {
          selectedAmpId: 'plexi_100',
          blockState: { wah: false, dist: true, fx1: false, fx2: false, amp: true, cab: true, fxloop: false, mod: false, delay: true, reverb: true },
          paramValues: { ...state.paramValues, amp_p1: 95, amp_p2: 70, amp_p3: 82, amp_p4: 88, amp_p5: 76, amp_p6: 92 }
        },
        'Blackface Clean Chime (A2)': {
          selectedAmpId: 'black_lux',
          blockState: { wah: false, dist: false, fx1: true, fx2: false, amp: true, cab: true, fxloop: false, mod: true, delay: true, reverb: true },
          paramValues: { ...state.paramValues, amp_p1: 48, amp_p2: 72, amp_p3: 64, amp_p4: 84, amp_p5: 40, amp_p6: 85 }
        },
        'Bogner Red Modern High-Gain (B1)': {
          selectedAmpId: 'rb_01b',
          blockState: { wah: false, dist: true, fx1: false, fx2: false, amp: true, cab: true, fxloop: false, mod: false, delay: true, reverb: false },
          paramValues: { ...state.paramValues, amp_p1: 108, amp_p2: 86, amp_p3: 62, amp_p4: 90, amp_p5: 80, amp_p6: 88 }
        }
      };
    }
  } catch (e) {
    console.warn('Could not load local state:', e);
  }
  refreshPresetDropdown();
}

function refreshPresetDropdown() {
  const sel = document.getElementById('preset-list-select');
  sel.innerHTML = '<option value="">-- Load Saved Snapshot --</option>';
  Object.keys(state.presets).forEach(name => {
    const opt = document.createElement('option');
    opt.value = name;
    opt.textContent = name;
    sel.appendChild(opt);
  });
}

function openCCModal() {
  const container = document.getElementById('cc-config-container');
  container.innerHTML = '';

  const groups = [
    {
      title: 'Global & Pedals',
      items: [
        { key: 'wah_pedal', label: 'Wah Pedal Position' },
        { key: 'rig_volume', label: 'Volume Pedal / Master' },
        { key: 'exp_pedal', label: 'Multi-FX Expression' },
        { key: 'tap_tempo', label: 'Tap Tempo Trigger' },
        { key: 'tuner', label: 'Tuner On/Off' },
        { key: 'bank_select_lsb', label: 'Bank Select (User/Fac)' }
      ]
    },
    {
      title: 'Effect Block Bypasses',
      items: [
        { key: 'bypass_dist', label: 'Distortion Bypass' },
        { key: 'bypass_fx1', label: 'FX 1 Bypass' },
        { key: 'bypass_fx2', label: 'FX 2 Bypass' },
        { key: 'bypass_amp', label: 'Amp Bypass (111 or 92)' },
        { key: 'bypass_cab', label: 'Cab / Mic Bypass' },
        { key: 'bypass_fxloop', label: 'FX Loop Bypass' },
        { key: 'bypass_mod', label: 'Modulation Bypass' },
        { key: 'bypass_delay', label: 'Delay Bypass' },
        { key: 'bypass_reverb', label: 'Reverb Bypass' },
        { key: 'bypass_wah', label: 'Wah Bypass' }
      ]
    },
    {
      title: 'Amp Controls (Page 1 & 2)',
      items: [
        { key: 'amp_p1', label: 'Amp Knob 1 (Gain/Vol)' },
        { key: 'amp_p2', label: 'Amp Knob 2 (Bass)' },
        { key: 'amp_p3', label: 'Amp Knob 3 (Mid)' },
        { key: 'amp_p4', label: 'Amp Knob 4 (Treble)' },
        { key: 'amp_p5', label: 'Amp Knob 5 (Presence)' },
        { key: 'amp_p6', label: 'Amp Knob 6 (Master)' },
        { key: 'amp_p7', label: 'Amp Output Level' },
        { key: 'amp_p8', label: 'Speaker Breakup (ERXP)' }
      ]
    },
    {
      title: 'Delay & Reverb Primary CCs',
      items: [
        { key: 'delay_p1', label: 'Delay Time' },
        { key: 'delay_p2', label: 'Delay Feedback' },
        { key: 'delay_p3', label: 'Delay Mix' },
        { key: 'reverb_p1', label: 'Reverb Mix' },
        { key: 'reverb_p2', label: 'Reverb Decay' },
        { key: 'reverb_p3', label: 'Reverb Tone' }
      ]
    }
  ];

  groups.forEach(group => {
    const box = document.createElement('div');
    box.className = 'cc-group-box';
    box.innerHTML = `<h4>${group.title}</h4>`;
    group.items.forEach(item => {
      const row = document.createElement('div');
      row.className = 'cc-row';
      row.innerHTML = `
        <span>${item.label}</span>
        <input type="number" min="0" max="127" data-cc-key="${item.key}" value="${state.ccMap[item.key] ?? 0}" />
      `;
      box.appendChild(row);
    });
    container.appendChild(box);
  });

  document.getElementById('cc-modal-backdrop').classList.remove('hidden');
}

// ============================================================================
// 7. EVENT LISTENERS INITIALIZATION
// ============================================================================
window.addEventListener('DOMContentLoaded', () => {
  loadSavedState();
  buildInitialDOM();
  renderAll();
  initWebMIDI();

  // MIDI Selectors
  document.getElementById('midi-out-select').addEventListener('change', bindSelectedMidiPorts);
  document.getElementById('midi-in-select').addEventListener('change', bindSelectedMidiPorts);
  document.getElementById('midi-channel-select').addEventListener('change', (e) => {
    state.midiChannel = parseInt(e.target.value, 10) || 0;
    logMidi('info', `Set MIDI Channel to ${state.midiChannel + 1}`);
  });
  document.getElementById('btn-refresh-midi').addEventListener('click', populateMidiDevices);

  // Power Switch
  document.getElementById('power-switch').addEventListener('click', () => {
    state.poweredOn = !state.poweredOn;
    renderPowerState();
  });

  // Amp Model Selector
  document.getElementById('amp-model-select').addEventListener('change', (e) => {
    state.selectedAmpId = e.target.value;
    state.activeBlockId = 'amp';
    renderAll();
  });

  // Rig Name Input
  document.getElementById('lcd-rig-name').addEventListener('input', (e) => {
    state.rigName = e.target.value;
  });

  // Left Nav Buttons
  document.getElementById('btn-view-mode').addEventListener('click', () => {
    // Cycle through main signal blocks on LCD
    const idx = SIGNAL_BLOCKS.findIndex(b => b.id === state.activeBlockId);
    const nextIdx = (idx + 1) % SIGNAL_BLOCKS.length;
    state.activeBlockId = SIGNAL_BLOCKS[nextIdx].id;
    state.activePage = 0;
    renderAll();
  });

  document.getElementById('btn-sync-rig').addEventListener('click', syncEntireRigToHardware);

  document.getElementById('btn-sw1').addEventListener('click', () => {
    state.activePage = 0;
    renderAll();
  });

  document.getElementById('btn-sw2').addEventListener('click', () => {
    if (state.activeBlockId === 'amp') {
      state.activePage = 1;
      renderAll();
    }
  });

  // Right Nav Buttons
  document.getElementById('btn-rig-prev').addEventListener('click', () => stepRig(-1));
  document.getElementById('btn-rig-next').addEventListener('click', () => stepRig(1));

  const toggleBankType = () => {
    state.bankType = state.bankType === 'USER' ? 'FACTORY' : 'USER';
    const pc = state.bankIndex * 4 + state.slotIndex;
    sendMidiPC(pc, state.bankType, '[Bank Type Toggle]');
    renderAll();
  };
  document.getElementById('btn-bank-toggle').addEventListener('click', toggleBankType);
  document.getElementById('lcd-bank-type').addEventListener('click', toggleBankType);

  // Effects Stomp Buttons (Left-click = toggle bypass, Right-click = focus parameters on 6 knobs)
  SIGNAL_BLOCKS.forEach(block => {
    const btn = document.getElementById(`fxbtn-${block.id}`);
    if (!btn) return;
    btn.addEventListener('click', () => toggleBlockBypass(block.id));
    btn.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      state.activeBlockId = block.id;
      state.activePage = 0;
      renderAll();
    });
  });

  // Tap Tempo Button
  document.getElementById('btn-tap-tempo').addEventListener('click', () => {
    sendMidiCC(state.ccMap.tap_tempo, 127, 'Tap Tempo');
    const tapBtn = document.getElementById('btn-tap-tempo');
    tapBtn.classList.add('active');
    setTimeout(() => tapBtn.classList.remove('active'), 140);
  });

  // Tuner Button
  document.getElementById('btn-tuner').addEventListener('click', () => {
    state.tunerActive = !state.tunerActive;
    sendMidiCC(state.ccMap.tuner, state.tunerActive ? 127 : 0, `Tuner ${state.tunerActive ? 'ON' : 'OFF'}`);
    renderAll();
  });

  // Expression Pedals
  document.getElementById('slider-wah').addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    state.paramValues.wah_pedal = val;
    state.paramValues.wah_p1 = val;
    sendMidiCC(state.ccMap.wah_pedal, val, 'Wah Pedal');
    renderPedals();
    if (state.activeBlockId === 'wah') {
      renderLCD();
      renderSixEncoders();
    }
  });

  document.getElementById('slider-vol').addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    state.paramValues.rig_volume = val;
    sendMidiCC(state.ccMap.rig_volume, val, 'Volume Pedal');
    renderMasterVolume();
    renderPedals();
  });

  document.getElementById('slider-exp').addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    state.paramValues.exp_pedal = val;
    sendMidiCC(state.ccMap.exp_pedal, val, 'Multi-FX Expression');
    renderPedals();
  });

  // Quick Bank / Patch Matrix
  document.getElementById('quick-bank-letter').addEventListener('change', (e) => {
    state.bankIndex = parseInt(e.target.value, 10) || 0;
    const pc = state.bankIndex * 4 + state.slotIndex;
    sendMidiPC(pc, state.bankType);
    renderAll();
  });

  document.getElementById('btn-quick-user').addEventListener('click', () => {
    state.bankType = 'USER';
    sendMidiPC(state.bankIndex * 4 + state.slotIndex, 'USER');
    renderAll();
  });

  document.getElementById('btn-quick-factory').addEventListener('click', () => {
    state.bankType = 'FACTORY';
    sendMidiPC(state.bankIndex * 4 + state.slotIndex, 'FACTORY');
    renderAll();
  });

  document.querySelectorAll('.rig-stomp-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const slot = parseInt(btn.getAttribute('data-slot'), 10);
      state.slotIndex = slot;
      const pc = state.bankIndex * 4 + state.slotIndex;
      const letter = state.bankType === 'USER'
        ? String.fromCharCode(65 + state.bankIndex)
        : String.fromCharCode(97 + state.bankIndex);
      sendMidiPC(pc, state.bankType, `[Rig ${letter}${slot + 1}]`);
      renderAll();
    });
  });

  // Snapshots Save / Load / Export / Import
  document.getElementById('btn-save-preset').addEventListener('click', () => {
    const name = (document.getElementById('lcd-rig-name').value || 'CUSTOM RIG').trim();
    state.presets[name] = {
      selectedAmpId: state.selectedAmpId,
      blockState: { ...state.blockState },
      paramValues: { ...state.paramValues }
    };
    localStorage.setItem('11r_presets', JSON.stringify(state.presets));
    refreshPresetDropdown();
    document.getElementById('preset-list-select').value = name;
    logMidi('info', `Saved local snapshot "${name}"`);
  });

  document.getElementById('preset-list-select').addEventListener('change', (e) => {
    const name = e.target.value;
    if (!name || !state.presets[name]) return;
    const p = state.presets[name];
    state.selectedAmpId = p.selectedAmpId || 'plexi_100';
    state.blockState = { ...state.blockState, ...p.blockState };
    state.paramValues = { ...state.paramValues, ...p.paramValues };
    state.rigName = name;
    document.getElementById('lcd-rig-name').value = name;
    document.getElementById('amp-model-select').value = state.selectedAmpId;
    renderAll();
    syncEntireRigToHardware();
  });

  document.getElementById('btn-export-json').addEventListener('click', () => {
    const payload = {
      ccMap: state.ccMap,
      presets: state.presets
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'eleven-rack-controller-backup.json';
    a.click();
    URL.revokeObjectURL(url);
  });

  document.getElementById('btn-import-json').addEventListener('click', () => {
    document.getElementById('import-file-input').click();
  });

  document.getElementById('import-file-input').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (data.ccMap) {
          state.ccMap = { ...DEFAULT_CC_MAP, ...data.ccMap };
          localStorage.setItem('11r_cc_map', JSON.stringify(state.ccMap));
        }
        if (data.presets) {
          state.presets = { ...state.presets, ...data.presets };
          localStorage.setItem('11r_presets', JSON.stringify(state.presets));
          refreshPresetDropdown();
        }
        renderAll();
        logMidi('info', 'Imported controller configuration & presets.');
      } catch (err) {
        logMidi('info', `Import error: ${err.message}`);
      }
    };
    reader.readAsText(file);
  });

  // Live MIDI Stream Actions
  document.getElementById('btn-clear-log').addEventListener('click', () => {
    document.getElementById('midi-log-list').innerHTML = '';
  });

  document.getElementById('btn-send-manual-cc').addEventListener('click', () => {
    const cc = parseInt(document.getElementById('manual-cc-num').value, 10) || 0;
    const val = parseInt(document.getElementById('manual-cc-val').value, 10) || 0;
    sendMidiCC(cc, val, 'Manual Test');
  });

  // CC Mapping Modal
  document.getElementById('btn-cc-map-modal').addEventListener('click', openCCModal);
  document.getElementById('btn-close-modal').addEventListener('click', () => {
    document.getElementById('cc-modal-backdrop').classList.add('hidden');
  });

  document.getElementById('btn-reset-default-ccs').addEventListener('click', () => {
    state.ccMap = { ...DEFAULT_CC_MAP };
    localStorage.setItem('11r_cc_map', JSON.stringify(state.ccMap));
    openCCModal();
    renderAll();
    logMidi('info', 'Reset MIDI CC mappings to Factory Eleven Rack defaults.');
  });

  document.getElementById('btn-save-close-modal').addEventListener('click', () => {
    const inputs = document.querySelectorAll('#cc-config-container input[data-cc-key]');
    inputs.forEach(inp => {
      const key = inp.getAttribute('data-cc-key');
      const val = Math.max(0, Math.min(127, parseInt(inp.value, 10) || 0));
      state.ccMap[key] = val;
    });
    localStorage.setItem('11r_cc_map', JSON.stringify(state.ccMap));
    document.getElementById('cc-modal-backdrop').classList.add('hidden');
    renderAll();
    logMidi('info', 'Saved custom MIDI CC mappings.');
  });
});
