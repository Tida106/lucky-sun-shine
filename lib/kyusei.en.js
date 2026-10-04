// English-language content for the Nine Star Ki (九星気学) page.
//
// All calculation logic (honmeiseiNumber, yearChart, favorableDirections,
// and the five-element compatibility relationships) lives in lib/kyusei.js
// and is reused as-is — this file only adds English display text, so the
// compatibility/favorable-direction logic is never duplicated.
import { STARS, DIRECTIONS } from './kyusei';

export const DIRECTION_LABEL_EN = {
  N: 'North',
  NE: 'Northeast',
  E: 'East',
  SE: 'Southeast',
  S: 'South',
  SW: 'Southwest',
  W: 'West',
  NW: 'Northwest',
};

const CONTENT_EN = {
  1: {
    name: '1 White Water Star',
    reading: 'Ippaku Suisei',
    element: 'Water',
    colorLabel: 'White — a clear, pure white',
    personality:
      "Flexible and adaptable, you quietly settle into almost any environment. You may seem quiet on the surface, but underneath you carry real depth of thought and a steady persistence. You're a good listener who tends to pick up on how others are feeling, which makes people trust you quickly. Even in constantly shifting situations, you're able to read the flow — like water finding its way — and adjust smoothly.",
    stones: [
      { slug: 'clear-quartz', title: 'Clear Quartz' },
      { slug: 'aquamarine', title: 'Aquamarine' },
      { slug: 'moonstone', title: 'Moonstone' },
    ],
  },
  2: {
    name: '2 Black Earth Star',
    reading: 'Jikoku Dosei',
    element: 'Earth',
    colorLabel: 'Black — a grounded, steady black',
    personality:
      "Diligent and steady, you shine in supporting roles behind the scenes. You're not interested in flash — you're genuinely happy to play a quiet, essential part in helping someone else succeed. You build trust slowly, through small consistent efforts rather than big gestures, and you tend to do your best work when you're supporting a team rather than leading from the front.",
    stones: [
      { slug: 'obsidian', title: 'Obsidian' },
      { slug: 'onyx', title: 'Onyx' },
      { slug: 'morion', title: 'Morion (Black Quartz)' },
    ],
  },
  3: {
    name: '3 Jade Wood Star',
    reading: 'Sanpeki Mokusei',
    element: 'Wood',
    colorLabel: 'Jade — a fresh, blue-green shade',
    personality:
      "Curious and quick on your feet, you're the type to act the moment an idea excites you. You pick up on new trends early and bring a light, energizing presence wherever you go. You're a natural talker who loves sharing fresh topics and ideas with the people around you. Your interests move fast, which sometimes means you jump to the next thing before finishing the last — but that same restlessness is exactly what keeps you bringing in new energy.",
    stones: [
      { slug: 'aventurine', title: 'Aventurine' },
      { slug: 'malachite', title: 'Malachite' },
      { slug: 'jade', title: 'Jade' },
    ],
  },
  4: {
    name: '4 Green Wood Star',
    reading: 'Shiroku Mokusei',
    element: 'Wood',
    colorLabel: 'Green — a refreshing, gentle green',
    personality:
      "Easygoing and warm, you naturally put people at ease and often end up being the one who connects others together. People describe you as easy to talk to, and you have a gift for softening tense situations just by being present. You tend to get things done by building goodwill and relationships along the way, rather than pushing through on your own.",
    stones: [
      { slug: 'amazonite', title: 'Amazonite' },
      { slug: 'chrysoprase', title: 'Chrysoprase' },
      { slug: 'prehnite', title: 'Prehnite' },
    ],
  },
  5: {
    name: '5 Yellow Earth Star',
    reading: 'Goou Dosei',
    element: 'Earth',
    colorLabel: 'Yellow — an earthy, golden yellow',
    personality:
      "Big-picture and determined, you keep pushing toward ambitious goals with real staying power. For better or worse, you tend to have a strong influence on the people around you, and you're often the one who ends up in a leadership position whether you sought it out or not. There may be ups and downs along the way, but you have the strength to shape the outcome on your own terms in the end.",
    stones: [
      { slug: 'citrine', title: 'Citrine' },
      { slug: 'pyrite', title: 'Pyrite' },
      { slug: 'tigers-eye', title: "Tiger's Eye" },
    ],
  },
  6: {
    name: '6 White Metal Star',
    reading: 'Roppaku Kinsei',
    element: 'Metal',
    colorLabel: 'White — an elegant, refined white',
    personality:
      "Principled and sincere, you take your commitments seriously and work steadily toward whatever goal you set. Once you decide on a direction, you move straight toward it, building results through consistent effort. A strong sense of pride can tip into perfectionism at times, but that same drive is also what pushes your growth forward. People tend to trust you with leadership because of it.",
    stones: [
      { slug: 'opal', title: 'Opal' },
      { slug: 'hematite', title: 'Hematite' },
      { slug: 'labradorite', title: 'Labradorite' },
    ],
  },
  7: {
    name: '7 Red Metal Star',
    reading: 'Shichiseki Kinsei',
    element: 'Metal',
    colorLabel: 'Red — a vivid, lively red',
    personality:
      "Sociable and charming, you naturally draw people in and fill a room with good energy. You have a gift for conversation and know how to make an occasion feel enjoyable. Optimistic by nature, you tend to build connections easily and often have a knack for attracting opportunity. Your moods can shift, but that very human quality is part of what people find charming about you.",
    stones: [
      { slug: 'carnelian', title: 'Carnelian' },
      { slug: 'garnet', title: 'Garnet' },
      { slug: 'ruby', title: 'Ruby' },
    ],
  },
  8: {
    name: '8 White Earth Star',
    reading: 'Happaku Dosei',
    element: 'Earth',
    colorLabel: 'White — a warm, gentle white',
    personality:
      "Patient and persistent, you build toward big results by steadily stacking up small efforts over time. You can be stubborn in a good way — once you've come this far, you're not about to give up. You're known for handling turning points and big changes well, and once you've made a decision, you move things steadily in a better direction.",
    stones: [
      { slug: 'pearl', title: 'Pearl' },
      { slug: 'agate', title: 'Agate' },
      { slug: 'smoky-quartz', title: 'Smoky Quartz' },
    ],
  },
  9: {
    name: '9 Purple Fire Star',
    reading: 'Kyuushi Kasei',
    element: 'Fire',
    colorLabel: 'Purple — a noble, rich purple',
    personality:
      "Expressive and perceptive, you have a distinctive flair that tends to catch people's attention. Your intuition is sharp, and you draw people in through your ideas and your way of expressing yourself. You carry both a passionate side and a cool, clear-headed side, and that contrast is part of your charm. You tend to shine brightest in the spotlight, or in any role where people are paying attention to you.",
    stones: [
      { slug: 'amethyst', title: 'Amethyst' },
      { slug: 'charoite', title: 'Charoite' },
      { slug: 'sugilite', title: 'Sugilite' },
    ],
  },
};

export const STARS_EN = Object.fromEntries(
  Object.entries(CONTENT_EN).map(([key, content]) => {
    const number = Number(key);
    return [
      number,
      {
        ...content,
        number,
        compatibleNumbers: STARS[number].compatibleNumbers,
      },
    ];
  }),
);

export function getStarEn(number) {
  return STARS_EN[number] || null;
}

export function compatibleStarsEn(number) {
  const star = STARS_EN[number];
  if (!star) return [];
  return star.compatibleNumbers.map((n) => STARS_EN[n]);
}

export { DIRECTIONS };
