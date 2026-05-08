import { Howl } from 'howler';

// --- UI Sounds ---
export const sfx = {
  click: new Howl({
    src: ['/audio/ui-click.mp3'],
    volume: 0.3, // Keep UI sounds subtle
  }),
  engine: new Howl({
    src: ['/audio/engine-rev.mp3'],
    volume: 0.8,
  }),
};

// --- Ambient Soundscapes ---
// We use a separate object for ambient sounds so we can loop and fade them
export const ambient = {
  studio: new Howl({
    src: ['/audio/ambient-studio.mp3'],
    loop: true,
    volume: 0, // Start at 0 for smooth fading
  }),
  city: new Howl({
    src: ['/audio/ambient-city.mp3'],
    loop: true,
    volume: 0,
  }),
};

// --- Utility Function: Crossfade Environments ---
export const switchEnvironmentAudio = (newEnv) => {
  // 1. Fade out everything currently playing
  if (ambient.studio.playing()) ambient.studio.fade(0.5, 0, 1000);
  if (ambient.city.playing()) ambient.city.fade(0.5, 0, 1000);

  // 2. Fade in the new environment after a short delay
  setTimeout(() => {
    if (newEnv === 'studio') {
      if (!ambient.studio.playing()) ambient.studio.play();
      ambient.studio.fade(0, 0.5, 2000);
    } else if (newEnv === 'city' || newEnv === 'night') {
      // We'll use the city audio for both sunset and night scenes
      if (!ambient.city.playing()) ambient.city.play();
      ambient.city.fade(0, 0.5, 2000);
    }
  }, 500); // 500ms delay creates a dramatic pause during the switch
};