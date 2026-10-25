/**
 * Avid Eleven Rack — Portable Web MIDI Controller
 * Targets Firmware 2.0.1 (Expansion Pack / ERXP) over USB MIDI
 * Uses Official Eleven Rack User Guide Table 12 MIDI Continuous Controller Mappings
 */

// ============================================================================
// 1. OFFICIAL ELEVEN RACK TABLE 12 MIDI CC MAP
// ============================================================================
const DEFAULT_CC_MAP = {
  // Global / Pedals / Utility
  wah_pedal: 4,         // Wah Pedal Sweep (0-127)
  rig_volume: 7,        // Volume Pedal / Master Volume (0-127)
  exp_pedal: 11,        // Multi-FX Expression Control (0-127)
  bank_select_msb: 0,   // Bank Select: 0 = User (A-Z), 1 = Factory (a-z)
  tap_tempo: 64,        // Tap Tempo Trigger
  tuner: 69,            // Chromatic Tuner On/Off (0-63=Off, 64-127=On)

  // Global Block Bypasses (0-63 = Off, 64-127 = On)
  bypass_wah: 43,       // Wah Bypass
  bypass_dist: 25,      // Distortion Bypass
  bypass_fx1: 63,       // FX 1 Bypass
  bypass_fx2: 86,       // FX 2 Bypass
  bypass_amp: 92,       // Global Amp Bypass (ERXP CC 92; CC 111 is also used on some models)
  bypass_cab: 71,       // Cab / Mic Bypass
  bypass_fxloop: 107,   // FX Loop Bypass
  bypass_mod: 50,       // Modulation Bypass
  bypass_delay: 28,     // Delay Bypass
  bypass_reverb: 36,    // Reverb Bypass

  // Official Table 12: Amplifier Settings 1-10 (Page 1: 1-6, Page 2: 7-10 + Rig Vol)
  amp_p1: 14,   // Amp Setting 1 (Gain / Volume 1)
  amp_p2: 15,   // Amp Setting 2 (Bass)
  amp_p3: 16,   // Amp Setting 3 (Middle)
  amp_p4: 17,   // Amp Setting 4 (Treble)
  amp_p5: 21,   // Amp Setting 5 (Presence / Bright / Cut)
  amp_p6: 10,   // Amp Setting 6 (Master Volume)
  amp_p7: 113,  // Amp Setting 7 (Tremolo Speed / Boost / Deep)
  amp_p8: 3,    // Amp Setting 8 (Tremolo Depth / Variac / Bias)
  amp_p9: 85,   // Amp Setting 9 (Aux 1 / Bright Switch)
  amp_p10: 24,  // Amp Setting 10 (Aux 2 / Mode)
  amp_p11: 22,  // Amp Output Level
  amp_p12: 7,   // Volume Pedal / Master Level

  // Official Table 12: Distortion Settings 1-6
  dist_p1: 28,  // Distortion Setting 1 (Drive / Gain / Sustain)
  dist_p2: 79,  // Distortion Setting 2 (Tone / EQ)
  dist_p3: 80,  // Distortion Setting 3 (Level / Volume)
  dist_p4: 81,  // Distortion Setting 4 (Bass / Low)
  dist_p5: 82,  // Distortion Setting 5 (Treble / High)
  dist_p6: 83,  // Distortion Setting 6 (Boost / Mode)

  // Official Table 12: FX 1 Settings 1-14 (Page 1: 1-6, Page 2: 7-12, Page 3: 13-14)
  fx1_p1: 20,   // FX1 Setting 1
  fx1_p2: 42,   // FX1 Setting 2
  fx1_p3: 60,   // FX1 Setting 3
  fx1_p4: 77,   // FX1 Setting 4
  fx1_p5: 117,  // FX1 Setting 5
  fx1_p6: 118,  // FX1 Setting 6
  fx1_p7: 119,  // FX1 Setting 7
  fx1_p8: 120,  // FX1 Setting 8
  fx1_p9: 5,    // FX1 Setting 9 (Expression / Sweep)
  fx1_p10: 9,   // FX1 Setting 10
  fx1_p11: 12,  // FX1 Setting 11
  fx1_p12: 26,  // FX1 Setting 12
  fx1_p13: 29,  // FX1 Setting 13
  fx1_p14: 30,  // FX1 Setting 14

  // Official Table 12: FX 2 Settings 1-14 (Page 1: 1-6, Page 2: 7-12, Page 3: 13-14)
  fx2_p1: 114,  // FX2 Setting 1
  fx2_p2: 115,  // FX2 Setting 2
  fx2_p3: 116,  // FX2 Setting 3
  fx2_p4: 97,   // FX2 Setting 4
  fx2_p5: 98,   // FX2 Setting 5
  fx2_p6: 99,   // FX2 Setting 6
  fx2_p7: 78,   // FX2 Setting 7
  fx2_p8: 37,   // FX2 Setting 8
  fx2_p9: 46,   // FX2 Setting 9
  fx2_p10: 48,  // FX2 Setting 10
  fx2_p11: 59,  // FX2 Setting 11
  fx2_p12: 110, // FX2 Setting 12
  fx2_p13: 111, // FX2 Setting 13
  fx2_p14: 71,  // FX2 Setting 14

  // Official Table 12: Modulation Settings 1-7 (Page 1: 1-6, Page 2: 7)
  mod_p1: 62,   // Modulation Setting 1 (Speed / Rate)
  mod_p2: 52,   // Modulation Setting 2 (Depth / Intensity)
  mod_p3: 53,   // Modulation Setting 3 (Mix / Level)
  mod_p4: 54,   // Modulation Setting 4 (Feedback / Tone)
  mod_p5: 57,   // Modulation Setting 5 (Pre-Delay / Manual)
  mod_p6: 51,   // Modulation Setting 6 (Width / Sync)
  mod_p7: 56,   // Modulation Setting 7 (Aux / Mode)

  // Official Table 12: Delay Settings 1-12 (Page 1: 1-6, Page 2: 7-12)
  delay_p1: 71, // Delay Setting 1 (Delay Time / Rate)
  delay_p2: 72, // Delay Setting 2 (Feedback / Repeats)
  delay_p3: 73, // Delay Setting 3 (Mix / Level)
  delay_p4: 86, // Delay Setting 4 (Tone / High Cut)
  delay_p5: 87, // Delay Setting 5 (Mod Depth / Wow)
  delay_p6: 34, // Delay Setting 6 (Mod Speed / Ratio)
  delay_p7: 48, // Delay Setting 7 (Input / Sync)
  delay_p8: 49, // Delay Setting 8 (Release / Mode)
  delay_p9: 55, // Delay Setting 9 (Low Cut / Ducking)
  delay_p10: 60,// Delay Setting 10 (Smear / Tap)
  delay_p11: 73,// Delay Setting 11 (Stereo Width)
  delay_p12: 74,// Delay Setting 12 (Output / Balance)

  // Official Table 12: Reverb Settings 1-6
  reverb_p1: 74, // Reverb Setting 1 (Mix / Level)
  reverb_p2: 75, // Reverb Setting 2 (Decay)
  reverb_p3: 76, // Reverb Setting 3 (Tone)
  reverb_p4: 39, // Reverb Setting 4 (Pre-Delay)
  reverb_p5: 77, // Reverb Setting 5 (Hi Damp)
  reverb_p6: 41, // Reverb Setting 6 (Type / Balance)

  // Wah Settings
  wah_p1: 4,     // Wah Pedal Position (CC 4)
  wah_p2: 27,    // Wah Setting / Shine

  // Cab & Mic Block Settings
  cab_p1: 26,    // Speaker Breakup / Cab Setting (0.0-10.0)
  cab_p2: 22,    // Cab / Amp Output Level
  cab_p3: 72,    // Cab Model Index (Reference)
  cab_p4: 73,    // Mic Model Index (Reference)
  cab_p5: 74,    // Mic Axis (0-63 = Off-Axis, 64-127 = On-Axis)
  fxloop_p1: 108,// FX Loop Send (User Assignable)
  fxloop_p2: 109,// FX Loop Return (User Assignable)
  fxloop_p3: 110 // FX Loop Mix (User Assignable)
};

// ============================================================================
// 2. AMP MODELS & REPRESENTATIVE RIG LINKS
// ============================================================================
const AMP_MODELS = [
  { id: 'plexi_100', name: '1969 Plexiglas 100W', defaultRigPC: 0, knobs: ['VOL 1', 'VOL 2', 'BASS', 'MID', 'TREBLE', 'PRESENCE', 'BOOST', 'VARIAC', 'BRIGHT', 'HUM', 'AMP OUT', 'RIG VOL'] },
  { id: 'plexi_vari', name: '1967 Plexiglas Vari (ERXP)', defaultRigPC: 4, knobs: ['VOL 1', 'VOL 2', 'BASS', 'MID', 'TREBLE', 'PRESENCE', 'VARIAC', 'DEEP', 'BRIGHT', 'HUM', 'AMP OUT', 'RIG VOL'] },
  { id: 'lead_800', name: '1982 Lead 800 (JCM800)', defaultRigPC: 1, knobs: ['PREAMP', 'BASS', 'MID', 'TREBLE', 'PRESENCE', 'MASTER', 'BOOST', 'DEPTH', 'BRIGHT', 'GATE', 'AMP OUT', 'RIG VOL'] },
  { id: 'dc_mod_800', name: 'DC Modern 800 (ERXP)', defaultRigPC: 5, knobs: ['GAIN', 'BASS', 'MID', 'TREBLE', 'PRESENCE', 'MASTER', 'BOOST', 'DEPTH', 'BRIGHT', 'GATE', 'AMP OUT', 'RIG VOL'] },
  { id: 'treadplate', name: '1992 Treadplate Modern (Recto)', defaultRigPC: 3, knobs: ['GAIN', 'BASS', 'MID', 'TREBLE', 'PRESENCE', 'MASTER', 'BOLD/SPG', 'DIODE/TB', 'BOOST', 'GATE', 'AMP OUT', 'RIG VOL'] },
  { id: 'rb_01b', name: 'RB-01b Red/Blue/Grn (Bogner ERXP)', defaultRigPC: 6, knobs: ['GAIN', 'BASS', 'MID', 'TREBLE', 'PRESENCE', 'MASTER', 'EXCURSION', 'BOOST', 'ST-CLASS', 'GATE', 'AMP OUT', 'RIG VOL'] },
  { id: 'dc_mod_sod', name: 'DC Modern SOD (Suhr OD100 ERXP)', defaultRigPC: 7, knobs: ['GAIN', 'BASS', 'MID', 'TREBLE', 'PRESENCE', 'MASTER', 'WHOMP', 'BOOST', 'BRIGHT', 'GATE', 'AMP OUT', 'RIG VOL'] },
  { id: 'sl_100', name: '1989 SL-100 Drive/Crunch (SLO)', defaultRigPC: 8, knobs: ['PREAMP', 'BASS', 'MID', 'TREBLE', 'PRESENCE', 'MASTER', 'BRIGHT', 'DEEP', 'BOOST', 'GATE', 'AMP OUT', 'RIG VOL'] },
  { id: 'black_lux', name: '1965 Black Lux (Deluxe Reverb)', defaultRigPC: 2, knobs: ['VOLUME', 'BASS', 'TREBLE', 'SPEED', 'INTENSITY', 'MASTER', 'BRIGHT', 'TREMOLO', 'BIAS', 'HUM', 'AMP OUT', 'RIG VOL'] },
  { id: 'black_sr', name: '1966 Black SR (Super Rev ERXP)', defaultRigPC: 9, knobs: ['VOLUME', 'BASS', 'MID', 'TREBLE', 'BRIGHT', 'MASTER', 'SPEED', 'INTENSITY', 'BIAS', 'HUM', 'AMP OUT', 'RIG VOL'] },
  { id: 'black_vib', name: '1964 Black Vib (Vibrolux ERXP)', defaultRigPC: 10, knobs: ['VOLUME', 'BASS', 'TREBLE', 'BRIGHT', 'SPEED', 'INTENSITY', 'MASTER', 'BIAS', 'TREMOLO', 'HUM', 'AMP OUT', 'RIG VOL'] },
  { id: 'tweed_bass', name: '1959 Tweed Bass (Bassman)', defaultRigPC: 11, knobs: ['VOL NORM', 'VOL BRT', 'BASS', 'MID', 'TREBLE', 'PRESENCE', 'JUMPER', 'SAG', 'BIAS', 'HUM', 'AMP OUT', 'RIG VOL'] },
  { id: 'ac_hi_boost', name: '1963 AC Hi Boost (Vox AC30)', defaultRigPC: 12, knobs: ['VOLUME', 'BASS', 'TREBLE', 'CUT', 'SPEED', 'DEPTH', 'TREMOLO', 'BRILLIANT', 'SAG', 'HUM', 'AMP OUT', 'RIG VOL'] },
  { id: 'ms_30', name: 'MS-30 Boutique (Matchless ERXP)', defaultRigPC: 13, knobs: ['VOLUME', 'BASS', 'MID', 'TREBLE', 'BRILL', 'MASTER', 'CUT', 'SAG', 'BIAS', 'HUM', 'AMP OUT', 'RIG VOL'] },
  { id: 'blue_line', name: '1969 Blue Line Bass (SVT ERXP)', defaultRigPC: 14, knobs: ['VOLUME', 'BASS', 'MID', 'MID FREQ', 'TREBLE', 'MASTER', 'ULTRA HI', 'ULTRA LO', 'BOOST', 'GATE', 'AMP OUT', 'RIG VOL'] }
];

// All 15 Speaker Cabinets in Eleven Rack + Firmware 2.0.1 Expansion Pack (ERXP)
const CAB_MODELS = [
  { id: '4x12_classic_30', name: '4x12 Classic 30 (Marshall V30)' },
  { id: '4x12_green_25w', name: '4x12 Green 25W (\'68 Greenback)' },
  { id: '4x12_green_20w', name: '4x12 Green 20W (Heritage G12M)' },
  { id: '4x12_65w', name: '4x12 65W (Celestion G12-65)' },
  { id: '2x12_ac_blue', name: '2x12 AC Blue (\'66 Vox Alnico Blue)' },
  { id: '2x12_black_duo', name: '2x12 Black Duo (\'67 Twin C12N)' },
  { id: '2x12_b30', name: '2x12 B30 (Bogner Vintage 30)' },
  { id: '2x12_silver_cone', name: '2x12 Silver Cone (Roland JC-120)' },
  { id: '4x10_tweed_bass', name: '4x10 Tweed Bass (\'59 Bassman P10Q)' },
  { id: '4x10_black_sr', name: '4x10 Black SR (Super Reverb CTS)' },
  { id: '1x12_black_lux', name: '1x12 Black Lux (\'64 Deluxe P12N)' },
  { id: '1x12_tweed_lux', name: '1x12 Tweed Lux (\'59 Deluxe P12Q)' },
  { id: '1x15_open_back', name: '1x15 Open Back (Vibrolux C15N)' },
  { id: '1x8_custom', name: '1x8 Custom Mini (\'60s Champ)' },
  { id: '8x10_blue_line', name: '8x10 Blue Line (Ampeg SVT Bass)' }
];

// All Microphone Models in Eleven Rack
const MIC_MODELS = [
  { id: 'dyn_57', name: 'Dyn 57 (Shure SM57)' },
  { id: 'dyn_421', name: 'Dyn 421 (Sennheiser MD421)' },
  { id: 'dyn_409', name: 'Dyn 409 (Sennheiser MD409)' },
  { id: 'dyn_7', name: 'Dyn 7 (Shure SM7)' },
  { id: 'cond_67', name: 'Cond 67 (Neumann U67)' },
  { id: 'cond_87', name: 'Cond 87 (Neumann U87)' },
  { id: 'cond_414', name: 'Cond 414 (AKG C414)' },
  { id: 'rib_121', name: 'Ribbon 121 (Royer R-121)' },
  { id: 'dyn_20', name: 'Dyn 20 (EV RE20 Bass)' },
  { id: 'dyn_12', name: 'Dyn 12 (AKG D112 Bass)' }
];

// Default Rig Names for Banks A-Z (104 slots) so every Rig slot has a meaningful title out-of-the-box
const DEFAULT_FACTORY_RIG_NAMES = [
  // Bank A (0-3)
  'BIG BLUE PLEXI', 'MODERN 800 CRUNCH', 'BLACKFACE CHIME', 'TREADPLATE LEAD',
  // Bank B (4-7)
  'BROWN SOUND VARIAC', 'HOT ROD 800', 'BOGNER RED XTC', 'SUHR OD100 LEAD',
  // Bank C (8-11)
  'SOLDANO SLO OVERDRIVE', 'SUPER REVERB BLUES', '64 VIBROLUX TREM', '59 TWEED BASSMAN',
  // Bank D (12-15)
  'AC30 TOP BOOST CHIME', 'MATCHLESS CHIEFTAIN', 'AMPEG SVT BASS RIG', 'JTM45 VINTAGE CRUNCH',
  // Bank E (16-19)
  '50W PLEXI BARK', 'DC MODERN CLEAN', 'DC VINTAGE OVERDRIVE', 'BLACK MINI CHAMP',
  // Bank F (20-23)
  'TWIN REVERB SPARKLE', '92 RECTO RHYTHMWALL', 'BOGNER BLUE CRUNCH', 'SL-100 CLEAN CHORUS',
  // Bank G (24-27)
  'FUZZ FACE PLEXI', 'TAPE ECHO CATHEDRAL', 'ROTO SPEAKER ORGAN', 'ORANGE PHASER FUNK',
  // Bank H (28-31)
  '80S STADIUM SOLO', 'COUNTRY CHICKEN PICK', 'JAZZ WARMTH ARCHTOP', 'AMBIENT SWELL PAD'
];

function getDefaultRigName(bankType, pcNum) {
  if (pcNum < DEFAULT_FACTORY_RIG_NAMES.length) {
    return DEFAULT_FACTORY_RIG_NAMES[pcNum];
  }
  const bankIdx = Math.floor(pcNum / 4);
  const slotIdx = (pcNum % 4) + 1;
  const letter = bankType === 'USER'
    ? String.fromCharCode(65 + bankIdx)
    : String.fromCharCode(97 + bankIdx);
  const styles = ['CLEAN STUDIO', 'CRUNCH RHYTHM', 'HIGH GAIN', 'MOD AMBIENT'];
  return `${letter}${slotIdx} ${styles[pcNum % 4]}`;
}

// ============================================================================
// 3. SIGNAL CHAIN BLOCKS (WITH PAGE 1 & PAGE 2 SUPPORT & HOVER DETAILS)
// ============================================================================
const SIGNAL_BLOCKS = [
  {
    id: 'wah',
    short: 'WAH',
    title: 'WAH CONTROLLER',
    bypassKey: 'bypass_wah',
    params: [
      { key: 'wah_p1', name: 'SWEEP', desc: 'Wah Pedal Sweep Position' },
      { key: 'wah_p2', name: 'SHINE / Q', desc: 'Wah Shine / Vocal Peak Adjustment' }
    ]
  },
  {
    id: 'dist',
    short: 'DIST',
    title: 'DISTORTION / OVERDRIVE',
    bypassKey: 'bypass_dist',
    params: [
      { key: 'dist_p1', name: 'DRIVE', desc: 'Distortion Setting 1: Drive / Gain / Sustain' },
      { key: 'dist_p2', name: 'TONE', desc: 'Distortion Setting 2: Tone / Mid EQ' },
      { key: 'dist_p3', name: 'LEVEL', desc: 'Distortion Setting 3: Output Level / Volume' },
      { key: 'dist_p4', name: 'BASS', desc: 'Distortion Setting 4: Bass / Low Cut' },
      { key: 'dist_p5', name: 'TREBLE', desc: 'Distortion Setting 5: Treble / High Cut' },
      { key: 'dist_p6', name: 'BOOST / MODE', desc: 'Distortion Setting 6: Boost / Clipping Mode' }
    ]
  },
  {
    id: 'fx1',
    short: 'FX 1',
    title: 'FX 1 (COMP / EQ / PITCH / STOMP)',
    bypassKey: 'bypass_fx1',
    params: [
      // Page 1 (Knobs 1-6)
      { key: 'fx1_p1', name: 'GAIN / B1', desc: 'FX 1 Setting 1: Input Gain / Threshold / Para EQ Band 1 Gain' },
      { key: 'fx1_p2', name: 'TONE / B2', desc: 'FX 1 Setting 2: Tone / Compression Ratio / Para EQ Band 2 Gain' },
      { key: 'fx1_p3', name: 'LEVEL / B3', desc: 'FX 1 Setting 3: Output Level / Attack / Para EQ Band 3 Gain' },
      { key: 'fx1_p4', name: 'MIX / B4', desc: 'FX 1 Setting 4: Wet-Dry Mix / Release / Para EQ Band 4 Gain' },
      { key: 'fx1_p5', name: 'DEPTH / B5', desc: 'FX 1 Setting 5: Depth / Knee / Para EQ Band 5 Gain' },
      { key: 'fx1_p6', name: 'RATE / OUT', desc: 'FX 1 Setting 6: Rate / Output Gain' },
      // Page 2 (Knobs 7-12)
      { key: 'fx1_p7', name: 'VOICE / F1', desc: 'FX 1 Setting 7: Voice / Tempo Sync / Para EQ Band 1 Freq' },
      { key: 'fx1_p8', name: 'HARMONY / F2', desc: 'FX 1 Setting 8: Harmony Interval / Para EQ Band 2 Freq' },
      { key: 'fx1_p9', name: 'PEDAL SWEEP', desc: 'FX 1 Setting 9: Expression / Pitch Sweep Control' },
      { key: 'fx1_p10', name: 'KEY / F3', desc: 'FX 1 Setting 10: Pitch Scale / Para EQ Band 3 Freq' },
      { key: 'fx1_p11', name: 'DETUNE / F4', desc: 'FX 1 Setting 11: Detune / Para EQ Band 4 Freq' },
      { key: 'fx1_p12', name: 'LOW CUT / Q1', desc: 'FX 1 Setting 12: Low Cut / Para EQ Band 1 Q' },
      // Page 3 (Knobs 13-14)
      { key: 'fx1_p13', name: 'HI CUT / Q2', desc: 'FX 1 Setting 13: High Cut / Para EQ Band 2 Q' },
      { key: 'fx1_p14', name: 'TRIM / Q3', desc: 'FX 1 Setting 14: Trim / Para EQ Band 3 Q' }
    ]
  },
  {
    id: 'fx2',
    short: 'FX 2',
    title: 'FX 2 (EQ / CHORUS / FILTER / PITCH)',
    bypassKey: 'bypass_fx2',
    params: [
      // Page 1 (Knobs 1-6)
      { key: 'fx2_p1', name: 'SPEED / B1', desc: 'FX 2 Setting 1: Speed / Rate / Para EQ Band 1 Gain' },
      { key: 'fx2_p2', name: 'DEPTH / B2', desc: 'FX 2 Setting 2: Depth / Intensity / Para EQ Band 2 Gain' },
      { key: 'fx2_p3', name: 'MIX / B3', desc: 'FX 2 Setting 3: Wet-Dry Mix / Level / Para EQ Band 3 Gain' },
      { key: 'fx2_p4', name: 'FDBK / B4', desc: 'FX 2 Setting 4: Feedback / Tone / Para EQ Band 4 Gain' },
      { key: 'fx2_p5', name: 'PRE-DLY / B5', desc: 'FX 2 Setting 5: Pre-Delay / Width / Para EQ Band 5 Gain' },
      { key: 'fx2_p6', name: 'OUTPUT', desc: 'FX 2 Setting 6: Output Level / Volume' },
      // Page 2 (Knobs 7-12)
      { key: 'fx2_p7', name: 'RESON / F1', desc: 'FX 2 Setting 7: Resonance / Para EQ Band 1 Freq' },
      { key: 'fx2_p8', name: 'SYNC / F2', desc: 'FX 2 Setting 8: Tempo Sync / Voice / Para EQ Band 2 Freq' },
      { key: 'fx2_p9', name: 'PEDAL SWEEP', desc: 'FX 2 Setting 9: Expression / Filter Sweep Control' },
      { key: 'fx2_p10', name: 'ENV / F3', desc: 'FX 2 Setting 10: Envelope Sensitivity / Para EQ Band 3 Freq' },
      { key: 'fx2_p11', name: 'WIDTH / F4', desc: 'FX 2 Setting 11: Stereo Width / Para EQ Band 4 Freq' },
      { key: 'fx2_p12', name: 'LOW CUT / Q1', desc: 'FX 2 Setting 12: Low Cut / Para EQ Band 1 Q' },
      // Page 3 (Knobs 13-14)
      { key: 'fx2_p13', name: 'HI CUT / Q2', desc: 'FX 2 Setting 13: High Cut / Para EQ Band 2 Q' },
      { key: 'fx2_p14', name: 'TRIM / Q3', desc: 'FX 2 Setting 14: Trim / Para EQ Band 3 Q' }
    ]
  },
  {
    id: 'amp',
    short: 'AMP',
    title: 'AMPLIFIER BLOCK',
    bypassKey: 'bypass_amp',
    params: [
      // Page 1 (Knobs 1-6)
      { key: 'amp_p1', name: 'GAIN', desc: 'Amp Setting 1: Preamp Gain / Volume 1' },
      { key: 'amp_p2', name: 'BASS', desc: 'Amp Setting 2: Bass / Low EQ' },
      { key: 'amp_p3', name: 'MID', desc: 'Amp Setting 3: Middle EQ' },
      { key: 'amp_p4', name: 'TREBLE', desc: 'Amp Setting 4: Treble / High EQ' },
      { key: 'amp_p5', name: 'PRESENCE', desc: 'Amp Setting 5: Presence / High Cut / Bright' },
      { key: 'amp_p6', name: 'MASTER', desc: 'Amp Setting 6: Master Volume' },
      // Page 2 (Knobs 7-12)
      { key: 'amp_p7', name: 'BOOST / SPD', desc: 'Amp Setting 7: Boost / Tremolo Speed / Excursion' },
      { key: 'amp_p8', name: 'DEPTH / VAR', desc: 'Amp Setting 8: Depth / Variac / Tremolo Intensity' },
      { key: 'amp_p9', name: 'BRIGHT', desc: 'Amp Setting 9: Bright Switch / Class Mode' },
      { key: 'amp_p10', name: 'GATE / HUM', desc: 'Amp Setting 10: Noise Gate / Hum Level' },
      { key: 'amp_p11', name: 'AMP OUT', desc: 'Amp Output Level' },
      { key: 'amp_p12', name: 'RIG VOL', desc: 'Overall Rig Volume' }
    ]
  },
  {
    id: 'cab',
    short: 'CAB',
    title: 'CABINET & MICROPHONE',
    bypassKey: 'bypass_cab',
    params: [
      { key: 'cab_p1', name: 'SPK BREAKUP', desc: 'Speaker Breakup (0.0–10.0 Cone Distortion added in ERXP Firmware 2.0)' },
      { key: 'cab_p2', name: 'CAB OUTPUT', desc: 'Cabinet / Amp Output Level' },
      { key: 'cab_p3', name: 'CAB SELECT', desc: 'Speaker Cabinet Model Selector (15 Models)' },
      { key: 'cab_p4', name: 'MIC SELECT', desc: 'Microphone Model Selector (10 Models)' },
      { key: 'cab_p5', name: 'MIC AXIS', desc: 'Microphone Placement: On-Axis (Brighter) vs Off-Axis (Warmer)' }
    ]
  },
  {
    id: 'fxloop',
    short: 'LOOP',
    title: 'EXTERNAL FX LOOP',
    bypassKey: 'bypass_fxloop',
    params: [
      { key: 'fxloop_p1', name: 'SEND', desc: 'FX Loop Send Level' },
      { key: 'fxloop_p2', name: 'RETURN', desc: 'FX Loop Return Level' },
      { key: 'fxloop_p3', name: 'MIX', desc: 'FX Loop Wet / Dry Mix' }
    ]
  },
  {
    id: 'mod',
    short: 'MOD',
    title: 'MODULATION (CHORUS / PHASER / ROTO)',
    bypassKey: 'bypass_mod',
    params: [
      // Page 1 (Knobs 1-6)
      { key: 'mod_p1', name: 'RATE', desc: 'Modulation Setting 1: Speed / Rate' },
      { key: 'mod_p2', name: 'DEPTH', desc: 'Modulation Setting 2: Depth / Intensity' },
      { key: 'mod_p3', name: 'MIX', desc: 'Modulation Setting 3: Wet / Dry Mix / Level' },
      { key: 'mod_p4', name: 'FEEDBACK', desc: 'Modulation Setting 4: Feedback / Regeneration / Tone' },
      { key: 'mod_p5', name: 'PRE-DELAY', desc: 'Modulation Setting 5: Pre-Delay / Manual Sweep' },
      { key: 'mod_p6', name: 'SYNC', desc: 'Modulation Setting 6: Tempo Sync / Stereo Width' },
      // Page 2 (Knob 7)
      { key: 'mod_p7', name: 'MODE / VIBE', desc: 'Modulation Setting 7: Chorus-Vibrato Mode / Aux' }
    ]
  },
  {
    id: 'delay',
    short: 'DLY',
    title: 'DELAY (TAPE / BBD / DYN)',
    bypassKey: 'bypass_delay',
    params: [
      // Page 1 (Knobs 1-6)
      { key: 'delay_p1', name: 'TIME', desc: 'Delay Setting 1: Delay Time / Repeats Rate' },
      { key: 'delay_p2', name: 'FEEDBACK', desc: 'Delay Setting 2: Feedback / Number of Repeats' },
      { key: 'delay_p3', name: 'MIX', desc: 'Delay Setting 3: Wet / Dry Mix Level' },
      { key: 'delay_p4', name: 'TONE', desc: 'Delay Setting 4: Echo Tone / High Cut Filter' },
      { key: 'delay_p5', name: 'MOD DEPTH', desc: 'Delay Setting 5: Modulation Depth / Tape Wow' },
      { key: 'delay_p6', name: 'MOD SPEED', desc: 'Delay Setting 6: Modulation Rate / L-R Ratio' },
      // Page 2 (Knobs 7-12)
      { key: 'delay_p7', name: 'SYNC', desc: 'Delay Setting 7: Tempo Sync Subdivision' },
      { key: 'delay_p8', name: 'MODE', desc: 'Delay Setting 8: Routing Mode (Mono / Stereo / Pong)' },
      { key: 'delay_p9', name: 'LOW CUT', desc: 'Delay Setting 9: Low Cut / Ducking Threshold' },
      { key: 'delay_p10', name: 'SMEAR / TAP', desc: 'Delay Setting 10: Tape Smear / Head Select' },
      { key: 'delay_p11', name: 'WIDTH', desc: 'Delay Setting 11: Stereo Spread / Width' },
      { key: 'delay_p12', name: 'BALANCE', desc: 'Delay Setting 12: Left / Right Output Balance' }
    ]
  },
  {
    id: 'reverb',
    short: 'REV',
    title: 'REVERB (SPRING / STUDIO / HALL)',
    bypassKey: 'bypass_reverb',
    params: [
      { key: 'reverb_p1', name: 'MIX', desc: 'Reverb Setting 1: Wet / Dry Mix Level' },
      { key: 'reverb_p2', name: 'DECAY', desc: 'Reverb Setting 2: Reverb Decay Time' },
      { key: 'reverb_p3', name: 'TONE', desc: 'Reverb Setting 3: Reverb Tone / Brightness' },
      { key: 'reverb_p4', name: 'PRE-DELAY', desc: 'Reverb Setting 4: Pre-Delay Time' },
      { key: 'reverb_p5', name: 'HI DAMP', desc: 'Reverb Setting 5: High Frequency Damping' },
      { key: 'reverb_p6', name: 'TYPE', desc: 'Reverb Setting 6: Reverb Room / Spring Type' }
    ]
  }
];

// ============================================================================
// 4. APPLICATION STATE
// ============================================================================
const state = {
  poweredOn: true,
  theme: 'orange',
  midiAccess: null,
  midiOut: null,
  midiIn: null,
  midiChannel: 0, // 0 = Channel 1

  // Rig selection state (Banks A-Z = 0-25, Slots 1-4 = 0-3)
  bankType: 'USER', // 'USER' (CC0=0) or 'FACTORY' (CC0=1)
  bankIndex: 0,     // 0 = A, 1 = B ... 25 = Z
  slotIndex: 0,     // 0..3 -> Rig 1..4

  // Custom Rig Names dictionary keyed by e.g. "USER_0" .. "USER_103", "FACTORY_0" .. "FACTORY_103"
  customRigNames: {},

  // Active editing focus on the LCD & 6 Soft Knobs
  activeBlockId: 'amp',
  activePage: 0,    // 0 = Page 1 (params 0..5), 1 = Page 2 (params 6..11), 2 = Page 3 (params 12..17)
  selectedAmpId: 'plexi_100',
  selectedCabId: '4x12_classic_30',
  selectedMicId: 'dyn_57',
  micOnAxis: true,
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
    // Amp
    amp_p1: 88, amp_p2: 68, amp_p3: 75, amp_p4: 82, amp_p5: 70, amp_p6: 90,
    amp_p7: 64, amp_p8: 64, amp_p9: 64, amp_p10: 64, amp_p11: 100, amp_p12: 100,
    // Dist
    dist_p1: 72, dist_p2: 64, dist_p3: 85, dist_p4: 64, dist_p5: 64, dist_p6: 64,
    // FX1 & FX2 (14 settings across 3 pages)
    fx1_p1: 64, fx1_p2: 64, fx1_p3: 64, fx1_p4: 64, fx1_p5: 64, fx1_p6: 64,
    fx1_p7: 64, fx1_p8: 64, fx1_p9: 64, fx1_p10: 64, fx1_p11: 64, fx1_p12: 64, fx1_p13: 64, fx1_p14: 64,
    fx2_p1: 64, fx2_p2: 64, fx2_p3: 64, fx2_p4: 64, fx2_p5: 64, fx2_p6: 64,
    fx2_p7: 64, fx2_p8: 64, fx2_p9: 64, fx2_p10: 64, fx2_p11: 64, fx2_p12: 64, fx2_p13: 64, fx2_p14: 64,
    // Mod
    mod_p1: 48, mod_p2: 64, mod_p3: 50, mod_p4: 40, mod_p5: 20, mod_p6: 0, mod_p7: 64,
    // Delay (12 settings across 2 pages)
    delay_p1: 58, delay_p2: 45, delay_p3: 42, delay_p4: 70, delay_p5: 25, delay_p6: 64,
    delay_p7: 0, delay_p8: 0, delay_p9: 40, delay_p10: 64, delay_p11: 80, delay_p12: 64,
    // Reverb
    reverb_p1: 38, reverb_p2: 60, reverb_p3: 64, reverb_p4: 20, reverb_p5: 50, reverb_p6: 64,
    // Wah, Cab, Loop
    wah_p1: 0, wah_p2: 64,
    cab_p1: 50, cab_p2: 100, cab_p3: 0, cab_p4: 0, cab_p5: 127,
    fxloop_p1: 100, fxloop_p2: 100, fxloop_p3: 64
  },

  // Local Presets / Snapshots
  presets: {}
};

function getRigSlotKey(bankType, pcNum) {
  return `${bankType}_${pcNum}`;
}

function getRigNameForSlot(bankType, pcNum) {
  const key = getRigSlotKey(bankType, pcNum);
  return state.customRigNames[key] || getDefaultRigName(bankType, pcNum);
}

function setRigNameForCurrentSlot(newName) {
  const pcNum = state.bankIndex * 4 + state.slotIndex;
  const key = getRigSlotKey(state.bankType, pcNum);
  state.customRigNames[key] = newName;
  try {
    localStorage.setItem('11r_custom_rig_names', JSON.stringify(state.customRigNames));
  } catch (e) {
    console.warn('Could not save rig name:', e);
  }
}

// ============================================================================
// 5. WEB MIDI ENGINE (TX & LIVE RX)
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
  } else if (state.midiAccess.inputs.size === 1) {
    inSelect.value = Array.from(state.midiAccess.inputs.keys())[0];
  }

  bindSelectedMidiPorts();

  if (state.midiOut) {
    statusDot.className = 'status-dot connected';
    statusText.textContent = `Connected: ${state.midiOut.name}${state.midiIn ? ' (2-Way RX/TX)' : ' (TX Only)'}`;
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
    statusText.textContent = `Connected: ${state.midiOut.name}${state.midiIn ? ' (2-Way RX/TX)' : ' (TX Only)'}`;
    logMidi('info', `MIDI Ready — OUT: "${state.midiOut.name}" | IN: "${state.midiIn ? state.midiIn.name : 'None'}" (Ch ${state.midiChannel + 1})`);
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
  const bankCC = state.ccMap.bank_select_msb ?? 0;

  if (state.midiOut) {
    try {
      // Eleven Rack Manual: Send Bank Change CC# 0 (0=User, 1=Factory) + CC# 32 for compatibility, followed by PC
      state.midiOut.send([ccStatus, bankCC, bankVal]);
      state.midiOut.send([ccStatus, 32, bankVal]);
      state.midiOut.send([pcStatus, pc]);
    } catch (e) {
      logMidi('info', `MIDI PC Error: ${e.message}`);
    }
  }

  logMidi('tx', `TX [Ch ${state.midiChannel + 1}] Bank=${bankType}(${bankVal}) -> PC #${String(pc).padStart(3, '0')} ${label}`);
}

function handleIncomingMidi(event) {
  if (!event.data || event.data.length < 2) return;
  const [status, data1, data2] = event.data;
  const cmd = status & 0xF0;
  const ch = (status & 0x0F) + 1;

  if (cmd === 0xB0) {
    logMidi('rx', `RX [Ch ${ch}] CC #${String(data1).padStart(3, ' ')} = ${String(data2).padStart(3, ' ')}`);
    syncIncomingCCToUI(data1, data2);
  } else if (cmd === 0xC0) {
    logMidi('rx', `RX [Ch ${ch}] Program Change #${String(data1).padStart(3, '0')}`);
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
  // 1. Bank Select (CC 0 or CC 32)
  if (cc === (state.ccMap.bank_select_msb ?? 0) || cc === 32) {
    state.bankType = val >= 1 ? 'FACTORY' : 'USER';
    renderAll();
    return;
  }

  // 2. Tuner (CC 69)
  if (cc === state.ccMap.tuner) {
    state.tunerActive = val >= 64;
    renderAll();
    return;
  }

  // 3. Check Block Bypasses
  let matched = false;
  for (const block of SIGNAL_BLOCKS) {
    if (state.ccMap[block.bypassKey] === cc) {
      state.blockState[block.id] = val >= 64;
      matched = true;
    }
  }

  // 4. Check Continuous Parameters
  for (const [paramKey, mappedCC] of Object.entries(state.ccMap)) {
    if (mappedCC === cc && paramKey in state.paramValues) {
      state.paramValues[paramKey] = val;
      if (paramKey === 'wah_pedal') state.paramValues.wah_p1 = val;
      if (paramKey === 'wah_p1') state.paramValues.wah_pedal = val;
      if (paramKey === 'rig_volume') state.paramValues.amp_p12 = val;
      if (paramKey === 'amp_p12') state.paramValues.rig_volume = val;
      matched = true;
    }
  }

  if (matched) {
    renderAll();
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

  while (list.children.length > 70) {
    list.removeChild(list.firstChild);
  }
  list.scrollTop = list.scrollHeight;
}

// ============================================================================
// 6. UI RENDERING & PAGE 1 / PAGE 2 LOGIC
// ============================================================================
function getCurrentAmpModel() {
  return AMP_MODELS.find(m => m.id === state.selectedAmpId) || AMP_MODELS[0];
}

function getActiveBlockDef() {
  return SIGNAL_BLOCKS.find(b => b.id === state.activeBlockId) || SIGNAL_BLOCKS[4];
}

function getBlockTotalPages(block) {
  return Math.max(1, Math.ceil(block.params.length / 6));
}

function getActivePageParams() {
  const block = getActiveBlockDef();
  const totalPages = getBlockTotalPages(block);
  if (state.activePage >= totalPages) {
    state.activePage = 0;
  }

  const startIdx = state.activePage * 6;
  const slice = block.params.slice(startIdx, startIdx + 6);

  if (block.id === 'amp') {
    const ampModel = getCurrentAmpModel();
    return slice.map((p, idx) => {
      const knobName = ampModel.knobs[startIdx + idx] || p.name;
      return {
        key: p.key,
        name: knobName,
        desc: `${ampModel.name} — ${knobName} (${p.desc})`
      };
    });
  }
  return slice;
}

function buildInitialDOM() {
  // Apply saved theme
  document.body.setAttribute('data-theme', state.theme);
  document.getElementById('theme-select').value = state.theme;

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

  // Populate Cab & Mic Selectors
  const cabSelect = document.getElementById('cab-model-select');
  cabSelect.innerHTML = '';
  CAB_MODELS.forEach(cab => {
    const opt = document.createElement('option');
    opt.value = cab.id;
    opt.textContent = cab.name;
    cabSelect.appendChild(opt);
  });
  cabSelect.value = state.selectedCabId;

  const micSelect = document.getElementById('mic-model-select');
  micSelect.innerHTML = '';
  MIC_MODELS.forEach(mic => {
    const opt = document.createElement('option');
    opt.value = mic.id;
    opt.textContent = mic.name;
    micSelect.appendChild(opt);
  });
  micSelect.value = state.selectedMicId;

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
    slot.id = `encoder-slot-${i}`;
    slot.innerHTML = `
      <div class="knob-container" data-encoder-index="${i}">
        <div class="knob-led-ring" id="encoder-ring-${i}"></div>
        <div class="knob-body" id="encoder-knob-${i}" tabindex="0">
          <div class="knob-indicator"></div>
          <div class="knob-cap"></div>
        </div>
      </div>
      <span class="encoder-slot-label" id="encoder-label-${i}">KNOB ${i + 1}</span>
    `;
    encodersRow.appendChild(slot);
    setupRotaryKnobDrag(slot.querySelector('.knob-body'), i);
  }

  // Setup Master Volume Knob Drag
  setupMasterKnobDrag(document.getElementById('knob-rig_volume'));

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
  const deg = Math.round(norm * 270);
  const rot = -135 + deg;
  if (ringEl) ringEl.style.setProperty('--knob-deg', `${deg}deg`);
  if (knobEl) knobEl.style.setProperty('--knob-rot', `${rot}deg`);
}

function renderMasterVolume() {
  const val = state.paramValues.rig_volume ?? 100;
  const knobEl = document.getElementById('knob-rig_volume');
  updateKnobVisual(
    document.getElementById('ring-rig_volume'),
    knobEl,
    val
  );
  if (knobEl) {
    knobEl.title = `Master / Rig Volume: ${Math.round((val / 127) * 100)}% (Value: ${val}/127 | MIDI CC #${state.ccMap.rig_volume})`;
  }
}

function renderLCD() {
  const letter = state.bankType === 'USER'
    ? String.fromCharCode(65 + state.bankIndex)
    : String.fromCharCode(97 + state.bankIndex);
  const rigId = `${letter}${state.slotIndex + 1}`;
  const pcNum = state.bankIndex * 4 + state.slotIndex;
  const currentRigName = getRigNameForSlot(state.bankType, pcNum);

  const bankBadgeEl = document.getElementById('lcd-bank-type');
  const rigIdEl = document.getElementById('lcd-rig-id');
  bankBadgeEl.textContent = state.bankType;
  bankBadgeEl.title = `${state.bankType} Bank — Click to toggle User (A-Z) / Factory (a-z) Bank (MIDI CC #${state.ccMap.bank_select_msb ?? 0})`;
  rigIdEl.textContent = rigId;
  rigIdEl.title = `Rig Slot ${rigId} — MIDI Program Change #${String(pcNum).padStart(3, '0')}`;

  const rigNameInput = document.getElementById('lcd-rig-name');
  if (document.activeElement !== rigNameInput) {
    rigNameInput.value = currentRigName;
  }

  const blockDef = getActiveBlockDef();
  document.getElementById('lcd-block-badge').textContent = `${blockDef.short} VIEW`;

  // Contextual Amp or Cab/Mic Selectors: ONLY show on their respective blocks!
  const ampContextWrap = document.getElementById('lcd-amp-context-wrap');
  const cabContextWrap = document.getElementById('lcd-cab-context-wrap');

  if (blockDef.id === 'amp' && !state.tunerActive) {
    ampContextWrap.classList.remove('hidden');
  } else {
    ampContextWrap.classList.add('hidden');
  }

  if (blockDef.id === 'cab' && !state.tunerActive) {
    cabContextWrap.classList.remove('hidden');
    document.getElementById('cab-model-select').value = state.selectedCabId;
    document.getElementById('mic-model-select').value = state.selectedMicId;
    const axisBtn = document.getElementById('btn-mic-axis');
    axisBtn.textContent = state.micOnAxis ? 'ON-AXIS' : 'OFF-AXIS';
    axisBtn.title = `Mic Placement: ${state.micOnAxis ? 'On-Axis (Center cone, brighter)' : 'Off-Axis (Edge cone, warmer)'} — Click to toggle`;
  } else {
    cabContextWrap.classList.add('hidden');
  }

  // Signal Chain Bar
  const chainContainer = document.getElementById('lcd-signal-chain');
  chainContainer.innerHTML = '';
  SIGNAL_BLOCKS.forEach(block => {
    const node = document.createElement('div');
    const isEnabled = state.blockState[block.id];
    const isFocused = state.activeBlockId === block.id;
    const bypassCC = state.ccMap[block.bypassKey];
    node.className = `chain-node ${isEnabled ? 'active-block' : 'bypassed'} ${isFocused ? 'selected-focus' : ''}`;
    node.textContent = block.short;
    node.title = `${block.title} (${isEnabled ? 'Active' : 'Bypassed'} | MIDI CC #${bypassCC})\nLeft-Click: Edit parameters on the 6 Knobs\nDouble-Click: Toggle On/Off`;

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

  // Active Block Header & Page 1 / Page 2 Indicator
  const headerTitle = document.getElementById('lcd-active-block-title');
  const pageInd = document.getElementById('lcd-active-page-indicator');
  const totalPages = getBlockTotalPages(blockDef);

  if (state.tunerActive) {
    headerTitle.textContent = 'TUNER ACTIVE — OUTPUT MUTED';
    pageInd.textContent = 'PRESS TUNER TO EXIT';
  } else if (blockDef.id === 'amp') {
    headerTitle.textContent = `AMP [${state.blockState.amp ? 'ON' : 'BYP'}]`;
    pageInd.textContent = `PAGE ${state.activePage + 1}/${totalPages}`;
  } else if (blockDef.id === 'cab') {
    headerTitle.textContent = `CAB [${state.blockState.cab ? 'ON' : 'BYP'}]`;
    pageInd.textContent = `PAGE ${state.activePage + 1}/${totalPages}`;
  } else {
    const statusStr = state.blockState[blockDef.id] ? 'ON' : 'BYP';
    headerTitle.textContent = `${blockDef.title} [${statusStr}]`;
    pageInd.textContent = `PAGE ${state.activePage + 1}/${totalPages}`;
  }

  // Page 1 / Page 2 / Page 3 Buttons state
  const btnSw1 = document.getElementById('btn-sw1');
  const btnSw2 = document.getElementById('btn-sw2');
  const btnSw3 = document.getElementById('btn-sw3');
  btnSw1.classList.toggle('active', state.activePage === 0);
  btnSw2.classList.toggle('active', state.activePage === 1);
  btnSw3.classList.toggle('active', state.activePage === 2);
  btnSw2.disabled = totalPages < 2;
  btnSw3.disabled = totalPages < 3;

  // 6 Knobs LCD Readout Columns
  const readoutGrid = document.getElementById('lcd-knobs-readout');
  readoutGrid.innerHTML = '';
  const activeParams = getActivePageParams();

  for (let i = 0; i < 6; i++) {
    const param = activeParams[i];
    const cell = document.createElement('div');

    if (param) {
      const val = state.paramValues[param.key] ?? 64;
      const pct = Math.round((val / 127) * 100);
      const tenths = ((val / 127) * 10).toFixed(1);
      const cc = state.ccMap[param.key] ?? 0;
      cell.className = 'lcd-knob-cell';
      cell.title = `${param.desc || param.name}\nValue: ${tenths}/10.0 (${val}/127) | MIDI CC #${cc}`;
      cell.innerHTML = `
        <span class="lcd-param-name">${param.name}</span>
        <div class="lcd-param-bar-wrap">
          <div class="lcd-param-bar-fill" style="width: ${pct}%"></div>
        </div>
        <span class="lcd-param-val">${tenths}</span>
      `;
    } else {
      cell.className = 'lcd-knob-cell unused';
      cell.title = 'Unused Knob Slot on this Page';
      cell.innerHTML = `
        <span class="lcd-param-name">UNUSED</span>
        <div class="lcd-param-bar-wrap">
          <div class="lcd-param-bar-fill" style="width: 0%"></div>
        </div>
        <span class="lcd-param-val">--</span>
      `;
    }
    readoutGrid.appendChild(cell);
  }
}

function renderSixEncoders() {
  const activeParams = getActivePageParams();
  for (let i = 0; i < 6; i++) {
    const param = activeParams[i];
    const slotEl = document.getElementById(`encoder-slot-${i}`);
    const ringEl = document.getElementById(`encoder-ring-${i}`);
    const knobEl = document.getElementById(`encoder-knob-${i}`);
    const labelEl = document.getElementById(`encoder-label-${i}`);

    if (param) {
      slotEl.classList.remove('unused-slot');
      const val = state.paramValues[param.key] ?? 64;
      const tenths = ((val / 127) * 10).toFixed(1);
      const cc = state.ccMap[param.key] ?? 0;
      updateKnobVisual(ringEl, knobEl, val);
      labelEl.textContent = param.name;
      slotEl.title = `${param.desc || param.name}\nValue: ${tenths}/10.0 (${val}/127) | MIDI CC #${cc}\nDrag up/down or scroll wheel to adjust • Double-click to center`;
    } else {
      slotEl.classList.add('unused-slot');
      updateKnobVisual(ringEl, knobEl, 0);
      labelEl.textContent = '---';
      slotEl.title = 'Unused Knob Slot';
    }
  }
}

function renderFXButtons() {
  SIGNAL_BLOCKS.forEach(block => {
    const btn = document.getElementById(`fxbtn-${block.id}`);
    if (btn) {
      const isOn = !!state.blockState[block.id];
      const cc = state.ccMap[block.bypassKey];
      btn.classList.toggle('active', isOn);
      btn.title = `${block.title} — ${isOn ? 'ENGAGED (ON)' : 'BYPASSED (OFF)'}\nMIDI CC #${cc} (0-63=Off, 64-127=On)\nLeft-Click: Toggle On/Off & view parameters\nRight-Click: View parameters without toggling`;
    }
  });

  const tapBtn = document.getElementById('btn-tap-tempo');
  if (tapBtn) {
    tapBtn.title = `Tap Tempo Trigger (MIDI CC #${state.ccMap.tap_tempo})\nClick repeatedly to set tempo for time-based effects`;
  }

  const tunerBtn = document.getElementById('btn-tuner');
  if (tunerBtn) {
    tunerBtn.classList.toggle('active', state.tunerActive);
    tunerBtn.title = `Chromatic Tuner — ${state.tunerActive ? 'ACTIVE' : 'OFF'} (MIDI CC #${state.ccMap.tuner})`;
  }
}

function renderPedals() {
  // Wah Pedal (with Proportional Illumination matching Wah Bypass & Sweep!)
  const wahVal = state.paramValues.wah_pedal ?? 0;
  const wahPct = Math.round((wahVal / 127) * 100);
  const wahIntensity = (wahVal / 127).toFixed(3);
  const wahEngaged = !!state.blockState.wah;
  const wahUnit = document.getElementById('pedal-wah-unit');

  wahUnit.classList.toggle('wah-engaged', wahEngaged);
  wahUnit.style.setProperty('--wah-intensity', wahIntensity);
  wahUnit.style.setProperty('--pedal-pct', `${wahPct}%`);
  wahUnit.title = `Wah Expression Pedal — ${wahEngaged ? 'ENGAGED' : 'BYPASSED'}\nSweep Position: ${wahPct}% (${wahVal}/127 | MIDI CC #${state.ccMap.wah_pedal})\nBypass Switch: MIDI CC #${state.ccMap.bypass_wah}`;

  document.getElementById('slider-wah').value = wahVal;
  document.getElementById('val-wah').textContent = `${wahPct}%`;

  // Volume Pedal
  const volVal = state.paramValues.rig_volume ?? 100;
  const volPct = Math.round((volVal / 127) * 100);
  const volUnit = document.getElementById('pedal-vol-unit');
  if (volUnit) {
    volUnit.style.setProperty('--pedal-pct', `${volPct}%`);
    volUnit.title = `Volume Expression Pedal\nPosition: ${volPct}% (${volVal}/127 | MIDI CC #${state.ccMap.rig_volume})`;
  }
  document.getElementById('slider-vol').value = volVal;
  document.getElementById('val-vol').textContent = `${volPct}%`;

  // Multi-FX Expression Pedal
  const expVal = state.paramValues.exp_pedal ?? 64;
  const expPct = Math.round((expVal / 127) * 100);
  const expUnit = document.getElementById('pedal-exp-unit');
  if (expUnit) {
    expUnit.style.setProperty('--pedal-pct', `${expPct}%`);
    expUnit.title = `Multi-FX Expression Pedal\nPosition: ${expPct}% (${expVal}/127 | MIDI CC #${state.ccMap.exp_pedal})`;
  }
  document.getElementById('slider-exp').value = expVal;
  document.getElementById('val-exp').textContent = `${expPct}%`;
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
    const slotId = `${letter}${idx + 1}`;
    const slotRigName = getRigNameForSlot(state.bankType, pc);
    btn.classList.toggle('active', idx === state.slotIndex);
    btn.title = `Load Rig ${slotId}: ${slotRigName}\n Sends Bank Select (${state.bankType}) + MIDI Program Change #${String(pc).padStart(3, '0')}`;
    document.getElementById(`stomp-label-${idx}`).textContent = slotId;
    document.getElementById(`stomp-name-${idx}`).textContent = slotRigName;
  });
}

// ============================================================================
// 7. KNOB DRAG, SCROLL WHEEL & BUTTON HANDLERS
// ============================================================================
function setupRotaryKnobDrag(knobEl, encoderIdx) {
  let startY = 0;
  let startVal = 0;

  const updateEncoderParam = (newVal) => {
    const activeParams = getActivePageParams();
    const param = activeParams[encoderIdx];
    if (!param) return;

    if (state.paramValues[param.key] !== newVal) {
      state.paramValues[param.key] = newVal;
      if (param.key === 'wah_p1') state.paramValues.wah_pedal = newVal;
      if (param.key === 'amp_p12') state.paramValues.rig_volume = newVal;

      // Sync Cab Select, Mic Select & Mic Axis knobs with the CAB header dropdowns
      if (param.key === 'cab_p3') {
        const cabIdx = Math.min(CAB_MODELS.length - 1, Math.floor((newVal / 128) * CAB_MODELS.length));
        state.selectedCabId = CAB_MODELS[cabIdx].id;
      } else if (param.key === 'cab_p4') {
        const micIdx = Math.min(MIC_MODELS.length - 1, Math.floor((newVal / 128) * MIC_MODELS.length));
        state.selectedMicId = MIC_MODELS[micIdx].id;
      } else if (param.key === 'cab_p5') {
        state.micOnAxis = newVal >= 64;
      }

      const cc = state.ccMap[param.key];
      sendMidiCC(cc, newVal, param.name);
      renderAll();
    }
  };

  const onMove = (e) => {
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const deltaY = startY - clientY;
    const newVal = Math.max(0, Math.min(127, Math.round(startVal + deltaY * 0.85)));
    updateEncoderParam(newVal);
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

  knobEl.addEventListener('wheel', (e) => {
    e.preventDefault();
    const activeParams = getActivePageParams();
    const param = activeParams[encoderIdx];
    if (!param) return;
    const step = e.deltaY < 0 ? 2 : -2;
    const newVal = Math.max(0, Math.min(127, (state.paramValues[param.key] ?? 64) + step));
    updateEncoderParam(newVal);
  });

  knobEl.addEventListener('dblclick', () => {
    updateEncoderParam(64);
  });
}

function setupMasterKnobDrag(knobEl) {
  let startY = 0;
  let startVal = 0;

  const updateMaster = (newVal) => {
    if (state.paramValues.rig_volume !== newVal) {
      state.paramValues.rig_volume = newVal;
      state.paramValues.amp_p12 = newVal;
      sendMidiCC(state.ccMap.rig_volume, newVal, 'Master/Rig Volume');
      renderMasterVolume();
      renderPedals();
      if (state.activeBlockId === 'amp' && state.activePage === 1) {
        renderLCD();
        renderSixEncoders();
      }
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
    stepRig(e.deltaY < 0 ? 1 : -1);
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

function selectRigByPC(pcIndex) {
  let clamped = pcIndex;
  if (clamped < 0) clamped = 103;
  if (clamped > 103) clamped = 0;

  state.bankIndex = Math.floor(clamped / 4);
  state.slotIndex = clamped % 4;

  // Match representative Amp knob labels if switching to one of the known default slots
  const matchingAmp = AMP_MODELS.find(m => m.defaultRigPC === clamped);
  if (matchingAmp) {
    state.selectedAmpId = matchingAmp.id;
    const ampSel = document.getElementById('amp-model-select');
    if (ampSel) ampSel.value = matchingAmp.id;
  }

  const letter = state.bankType === 'USER'
    ? String.fromCharCode(65 + state.bankIndex)
    : String.fromCharCode(97 + state.bankIndex);
  const rigName = getRigNameForSlot(state.bankType, clamped);
  sendMidiPC(clamped, state.bankType, `[${letter}${state.slotIndex + 1}: ${rigName}]`);
  renderAll();
}

function stepRig(delta) {
  const totalIndex = state.bankIndex * 4 + state.slotIndex + delta;
  selectRigByPC(totalIndex);
}

function toggleBlockBypass(blockId) {
  const block = SIGNAL_BLOCKS.find(b => b.id === blockId);
  if (!block) return;

  state.blockState[blockId] = !state.blockState[blockId];
  const isOn = state.blockState[blockId];
  const cc = state.ccMap[block.bypassKey];
  sendMidiCC(cc, isOn ? 127 : 0, `${block.short} ${isOn ? 'ON' : 'OFF'}`);

  state.activeBlockId = blockId;
  state.activePage = 0;
  renderAll();
}

function pushEntireRigToHardware() {
  logMidi('info', 'Pushing all UI block bypass states & active parameters to Eleven Rack...');
  SIGNAL_BLOCKS.forEach(block => {
    const isOn = state.blockState[block.id];
    sendMidiCC(state.ccMap[block.bypassKey], isOn ? 127 : 0, `${block.short} Bypass`);
  });
  const blockDef = getActiveBlockDef();
  blockDef.params.forEach(p => {
    sendMidiCC(state.ccMap[p.key], state.paramValues[p.key] ?? 64, p.name);
  });
  sendMidiCC(state.ccMap.rig_volume, state.paramValues.rig_volume ?? 100, 'Rig Volume');
}

// ============================================================================
// 8. CC MAPPING MODAL & LOCAL STORAGE PERSISTENCE
// ============================================================================
function loadSavedState() {
  try {
    const savedTheme = localStorage.getItem('11r_theme');
    if (savedTheme) {
      state.theme = savedTheme;
    }
    const savedCC = localStorage.getItem('11r_cc_map_v2');
    if (savedCC) {
      state.ccMap = { ...DEFAULT_CC_MAP, ...JSON.parse(savedCC) };
    }
    const savedRigNames = localStorage.getItem('11r_custom_rig_names');
    if (savedRigNames) {
      state.customRigNames = JSON.parse(savedRigNames);
    }
    const savedPresets = localStorage.getItem('11r_presets_v2');
    if (savedPresets) {
      state.presets = JSON.parse(savedPresets);
    } else {
      state.presets = {
        'Big Blue Plexi Lead (A1)': {
          selectedAmpId: 'plexi_100',
          blockState: { wah: false, dist: true, fx1: false, fx2: false, amp: true, cab: true, fxloop: false, mod: false, delay: true, reverb: true },
          paramValues: { ...state.paramValues, amp_p1: 95, amp_p2: 70, amp_p3: 82, amp_p4: 88, amp_p5: 76, amp_p6: 92 }
        },
        'Blackface Clean Chime (A3)': {
          selectedAmpId: 'black_lux',
          blockState: { wah: false, dist: false, fx1: true, fx2: false, amp: true, cab: true, fxloop: false, mod: true, delay: true, reverb: true },
          paramValues: { ...state.paramValues, amp_p1: 48, amp_p2: 72, amp_p3: 64, amp_p4: 84, amp_p5: 40, amp_p6: 85 }
        },
        'Bogner Red XTC High-Gain (B3)': {
          selectedAmpId: 'rb_01b',
          blockState: { wah: true, dist: true, fx1: false, fx2: false, amp: true, cab: true, fxloop: false, mod: false, delay: true, reverb: false },
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
      title: 'Global, Pedals & Utility',
      items: [
        { key: 'wah_pedal', label: 'Wah Pedal Sweep' },
        { key: 'rig_volume', label: 'Volume Pedal / Master' },
        { key: 'exp_pedal', label: 'Multi-FX Expression' },
        { key: 'tap_tempo', label: 'Tap Tempo Trigger' },
        { key: 'tuner', label: 'Tuner On/Off' },
        { key: 'bank_select_msb', label: 'Bank Select (User/Fac)' }
      ]
    },
    {
      title: 'Effect Block Bypasses',
      items: [
        { key: 'bypass_dist', label: 'Distortion Bypass' },
        { key: 'bypass_fx1', label: 'FX 1 Bypass' },
        { key: 'bypass_fx2', label: 'FX 2 Bypass' },
        { key: 'bypass_amp', label: 'Global Amp Bypass (92/111)' },
        { key: 'bypass_cab', label: 'Cab / Mic Bypass' },
        { key: 'bypass_fxloop', label: 'FX Loop Bypass' },
        { key: 'bypass_mod', label: 'Modulation Bypass' },
        { key: 'bypass_delay', label: 'Delay Bypass' },
        { key: 'bypass_reverb', label: 'Reverb Bypass' },
        { key: 'bypass_wah', label: 'Wah Bypass' }
      ]
    },
    {
      title: 'Amp Settings 1–10 (Table 12)',
      items: [
        { key: 'amp_p1', label: 'Amp Setting 1 (Gain/Vol)' },
        { key: 'amp_p2', label: 'Amp Setting 2 (Bass)' },
        { key: 'amp_p3', label: 'Amp Setting 3 (Mid)' },
        { key: 'amp_p4', label: 'Amp Setting 4 (Treble)' },
        { key: 'amp_p5', label: 'Amp Setting 5 (Presence)' },
        { key: 'amp_p6', label: 'Amp Setting 6 (Master)' },
        { key: 'amp_p7', label: 'Amp Setting 7 (Page 2)' },
        { key: 'amp_p8', label: 'Amp Setting 8 (Page 2)' },
        { key: 'amp_p9', label: 'Amp Setting 9 (Page 2)' },
        { key: 'amp_p10', label: 'Amp Setting 10 (Page 2)' }
      ]
    },
    {
      title: 'Distortion & Modulation (Table 12)',
      items: [
        { key: 'dist_p1', label: 'Distortion Setting 1' },
        { key: 'dist_p2', label: 'Distortion Setting 2' },
        { key: 'dist_p3', label: 'Distortion Setting 3' },
        { key: 'dist_p4', label: 'Distortion Setting 4' },
        { key: 'mod_p1', label: 'Modulation Setting 1' },
        { key: 'mod_p2', label: 'Modulation Setting 2' },
        { key: 'mod_p3', label: 'Modulation Setting 3' },
        { key: 'mod_p4', label: 'Modulation Setting 4' }
      ]
    },
    {
      title: 'Delay & Reverb (Table 12)',
      items: [
        { key: 'delay_p1', label: 'Delay Setting 1 (Time)' },
        { key: 'delay_p2', label: 'Delay Setting 2 (Fdbk)' },
        { key: 'delay_p3', label: 'Delay Setting 3 (Mix)' },
        { key: 'delay_p4', label: 'Delay Setting 4' },
        { key: 'reverb_p1', label: 'Reverb Setting 1 (Mix)' },
        { key: 'reverb_p2', label: 'Reverb Setting 2 (Decay)' },
        { key: 'reverb_p3', label: 'Reverb Setting 3 (Tone)' },
        { key: 'reverb_p4', label: 'Reverb Setting 4 (PreDly)' }
      ]
    },
    {
      title: 'FX 1 & FX 2 (Table 12)',
      items: [
        { key: 'fx1_p1', label: 'FX 1 Setting 1' },
        { key: 'fx1_p2', label: 'FX 1 Setting 2' },
        { key: 'fx1_p3', label: 'FX 1 Setting 3' },
        { key: 'fx1_p4', label: 'FX 1 Setting 4' },
        { key: 'fx2_p1', label: 'FX 2 Setting 1' },
        { key: 'fx2_p2', label: 'FX 2 Setting 2' },
        { key: 'fx2_p3', label: 'FX 2 Setting 3' },
        { key: 'fx2_p4', label: 'FX 2 Setting 4' }
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
// 9. EVENT LISTENERS INITIALIZATION
// ============================================================================
window.addEventListener('DOMContentLoaded', () => {
  loadSavedState();
  buildInitialDOM();
  renderAll();
  initWebMIDI();

  // Theme Switcher
  document.getElementById('theme-select').addEventListener('change', (e) => {
    state.theme = e.target.value;
    document.body.setAttribute('data-theme', state.theme);
    try {
      localStorage.setItem('11r_theme', state.theme);
    } catch (_) {}
  });

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

  // Contextual Amp Model Selector (inside AMP LCD view)
  document.getElementById('amp-model-select').addEventListener('change', (e) => {
    state.selectedAmpId = e.target.value;
    state.activeBlockId = 'amp';
    renderAll();
    const amp = getCurrentAmpModel();
    logMidi('info', `Updated Amp Knob Labels to "${amp.name}". Click "LOAD RIG ➔" next to it if you want to switch the hardware Rig via Program Change.`);
  });

  // "LOAD RIG ➔" Button next to Amp Model Selector
  document.getElementById('btn-jump-amp-rig').addEventListener('click', () => {
    const amp = getCurrentAmpModel();
    selectRigByPC(amp.defaultRigPC ?? 0);
  });

  // Contextual Cab & Mic Selectors (inside CAB LCD view)
  document.getElementById('cab-model-select').addEventListener('change', (e) => {
    state.selectedCabId = e.target.value;
    const cabIdx = CAB_MODELS.findIndex(c => c.id === state.selectedCabId);
    const val = Math.round((cabIdx / Math.max(1, CAB_MODELS.length - 1)) * 127);
    state.paramValues.cab_p3 = val;
    sendMidiCC(state.ccMap.cab_p3, val, `Cab: ${CAB_MODELS[cabIdx]?.name || ''}`);
    renderAll();
  });

  document.getElementById('mic-model-select').addEventListener('change', (e) => {
    state.selectedMicId = e.target.value;
    const micIdx = MIC_MODELS.findIndex(m => m.id === state.selectedMicId);
    const val = Math.round((micIdx / Math.max(1, MIC_MODELS.length - 1)) * 127);
    state.paramValues.cab_p4 = val;
    sendMidiCC(state.ccMap.cab_p4, val, `Mic: ${MIC_MODELS[micIdx]?.name || ''}`);
    renderAll();
  });

  document.getElementById('btn-mic-axis').addEventListener('click', () => {
    state.micOnAxis = !state.micOnAxis;
    const val = state.micOnAxis ? 127 : 0;
    state.paramValues.cab_p5 = val;
    sendMidiCC(state.ccMap.cab_p5, val, `Mic Axis: ${state.micOnAxis ? 'ON-AXIS' : 'OFF-AXIS'}`);
    renderAll();
  });

  // Prominent Editable Rig Name Input (Auto-saves per slot!)
  const rigNameInput = document.getElementById('lcd-rig-name');
  rigNameInput.addEventListener('input', (e) => {
    setRigNameForCurrentSlot(e.target.value.toUpperCase());
    renderQuickRigSwitcher();
  });

  // Left Nav Buttons
  document.getElementById('btn-view-mode').addEventListener('click', () => {
    const idx = SIGNAL_BLOCKS.findIndex(b => b.id === state.activeBlockId);
    const nextIdx = (idx + 1) % SIGNAL_BLOCKS.length;
    state.activeBlockId = SIGNAL_BLOCKS[nextIdx].id;
    state.activePage = 0;
    renderAll();
  });

  document.getElementById('btn-sync-rig').addEventListener('click', pushEntireRigToHardware);

  document.getElementById('btn-sw1').addEventListener('click', () => {
    state.activePage = 0;
    renderAll();
  });

  document.getElementById('btn-sw2').addEventListener('click', () => {
    const block = getActiveBlockDef();
    if (getBlockTotalPages(block) >= 2) {
      state.activePage = 1;
      renderAll();
    }
  });

  document.getElementById('btn-sw3').addEventListener('click', () => {
    const block = getActiveBlockDef();
    if (getBlockTotalPages(block) >= 3) {
      state.activePage = 2;
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

  // Effects Stomp Buttons
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

  // Clicking the Wah Pedal Power LED also toggles Wah Bypass
  document.getElementById('wah-pedal-led').addEventListener('click', () => {
    toggleBlockBypass('wah');
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
    state.paramValues.amp_p12 = val;
    sendMidiCC(state.ccMap.rig_volume, val, 'Volume Pedal');
    renderMasterVolume();
    renderPedals();
    if (state.activeBlockId === 'amp' && state.activePage === 1) {
      renderLCD();
      renderSixEncoders();
    }
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
    selectRigByPC(pc);
  });

  document.getElementById('btn-quick-user').addEventListener('click', () => {
    state.bankType = 'USER';
    selectRigByPC(state.bankIndex * 4 + state.slotIndex);
  });

  document.getElementById('btn-quick-factory').addEventListener('click', () => {
    state.bankType = 'FACTORY';
    selectRigByPC(state.bankIndex * 4 + state.slotIndex);
  });

  document.querySelectorAll('.rig-stomp-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const slot = parseInt(btn.getAttribute('data-slot'), 10);
      state.slotIndex = slot;
      const pc = state.bankIndex * 4 + state.slotIndex;
      selectRigByPC(pc);
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
    localStorage.setItem('11r_presets_v2', JSON.stringify(state.presets));
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
    setRigNameForCurrentSlot(name);
    document.getElementById('amp-model-select').value = state.selectedAmpId;
    renderAll();
    pushEntireRigToHardware();
  });

  document.getElementById('btn-export-json').addEventListener('click', () => {
    const payload = {
      theme: state.theme,
      ccMap: state.ccMap,
      customRigNames: state.customRigNames,
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
        if (data.theme) {
          state.theme = data.theme;
          document.body.setAttribute('data-theme', state.theme);
          document.getElementById('theme-select').value = state.theme;
          localStorage.setItem('11r_theme', state.theme);
        }
        if (data.ccMap) {
          state.ccMap = { ...DEFAULT_CC_MAP, ...data.ccMap };
          localStorage.setItem('11r_cc_map_v2', JSON.stringify(state.ccMap));
        }
        if (data.customRigNames) {
          state.customRigNames = { ...state.customRigNames, ...data.customRigNames };
          localStorage.setItem('11r_custom_rig_names', JSON.stringify(state.customRigNames));
        }
        if (data.presets) {
          state.presets = { ...state.presets, ...data.presets };
          localStorage.setItem('11r_presets_v2', JSON.stringify(state.presets));
          refreshPresetDropdown();
        }
        renderAll();
        logMidi('info', 'Imported controller configuration, custom Rig names & snapshots.');
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

  // MIDI Guide Modal
  const infoModal = document.getElementById('info-modal-backdrop');
  document.getElementById('btn-midi-info-modal').addEventListener('click', () => infoModal.classList.remove('hidden'));
  document.getElementById('btn-close-info-modal').addEventListener('click', () => infoModal.classList.add('hidden'));
  document.getElementById('btn-ok-info-modal').addEventListener('click', () => infoModal.classList.add('hidden'));

  // CC Mapping Modal
  document.getElementById('btn-cc-map-modal').addEventListener('click', openCCModal);
  document.getElementById('btn-close-modal').addEventListener('click', () => {
    document.getElementById('cc-modal-backdrop').classList.add('hidden');
  });

  document.getElementById('btn-reset-default-ccs').addEventListener('click', () => {
    state.ccMap = { ...DEFAULT_CC_MAP };
    localStorage.setItem('11r_cc_map_v2', JSON.stringify(state.ccMap));
    openCCModal();
    renderAll();
    logMidi('info', 'Reset MIDI CC mappings to Official Table 12 Eleven Rack defaults.');
  });

  document.getElementById('btn-save-close-modal').addEventListener('click', () => {
    const inputs = document.querySelectorAll('#cc-config-container input[data-cc-key]');
    inputs.forEach(inp => {
      const key = inp.getAttribute('data-cc-key');
      const val = Math.max(0, Math.min(127, parseInt(inp.value, 10) || 0));
      state.ccMap[key] = val;
    });
    localStorage.setItem('11r_cc_map_v2', JSON.stringify(state.ccMap));
    document.getElementById('cc-modal-backdrop').classList.add('hidden');
    renderAll();
    logMidi('info', 'Saved custom MIDI CC mappings.');
  });
});
