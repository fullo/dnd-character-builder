import type { CharacterClass } from '../dnd5e/classes'

/**
 * Burattinaio (Puppeteer) - A Brancalonia-exclusive class.
 *
 * The Burattinaio is a master puppeteer who controls magical marionettes in combat.
 * They are a unique class found only in the Brancalonia setting, drawing on the
 * rich tradition of Italian puppet theater (teatro dei pupi).
 *
 * The Burattinaio is a half-caster who uses Charisma as their primary ability,
 * controlling puppets that fight, distract, and spy for them.
 */

const burattinaiCantrips = [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
const burattinaiSpellsKnown = [0, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11]

export const burattinaioBrancaloniaClass: CharacterClass = {
  id: 'burattinaio',
  name: 'Burattinaio',
  description:
    'A master puppeteer who commands magical marionettes in combat. Drawing on the ancient tradition of Italian puppet theater, the Burattinaio brings wooden figures to life, sending them to fight, spy, and perform in their stead. Part artisan, part spellcaster, the Burattinaio blurs the line between performer and warrior.',
  hitDie: 8,
  primaryAbility: ['cha'],
  savingThrows: ['dex', 'cha'],
  armorProficiencies: ['light'],
  weaponProficiencies: ['simple', 'hand crossbow', 'rapier', 'shortsword'],
  toolProficiencies: ['woodcarver\'s tools', 'one musical instrument of your choice'],
  skillChoices: [
    'acrobatics', 'arcana', 'deception', 'insight',
    'investigation', 'perception', 'performance',
    'persuasion', 'sleight-of-hand', 'stealth',
  ],
  numSkillChoices: 3,
  startingEquipment: [
    'rapier',
    'entertainer-pack',
    'leather armor',
    'woodcarver\'s tools',
    'puppet theater kit (3 marionettes)',
  ],
  subclassLevel: 3,
  subclassName: 'Puppet Tradition',
  spellcasting: {
    ability: 'cha',
    cantripsKnown: burattinaiCantrips,
    spellsKnown: burattinaiSpellsKnown,
    preparedCaster: false,
    casterType: 'half',
  },
  features: [
    {
      id: 'puppet-master',
      name: 'Puppet Master',
      level: 1,
      description:
        'You can control a magical marionette as a bonus action. The marionette occupies a space within 30 feet of you and can make a single melee attack using your spell attack modifier, dealing 1d6 + CHA modifier bludgeoning damage. The marionette has AC 13, hit points equal to your Burattinaio level + CHA modifier, and uses your saving throw bonuses. It moves up to 30 feet on your turn. If destroyed, you can rebuild it during a long rest.',
    },
    {
      id: 'puppet-strings',
      name: 'Strings of Fate',
      level: 1,
      description:
        'Your magical connection to your puppets allows you to perceive through their senses. As an action, you can see through your marionette\'s eyes and hear through its ears for up to 10 minutes. While doing so, you are blind and deaf to your own surroundings.',
    },
    {
      id: 'spellcasting-burattinaio',
      name: 'Spellcasting',
      level: 2,
      description:
        'You have learned to channel magic through your puppets and performances. Charisma is your spellcasting ability. You can use your marionettes as a spellcasting focus.',
    },
    {
      id: 'puppet-tradition',
      name: 'Puppet Tradition',
      level: 3,
      description:
        'You choose a Puppet Tradition that shapes how you use your marionettes: the Tradition of the Stage or the Tradition of War.',
    },
    {
      id: 'extra-marionette',
      name: 'Extra Marionette',
      level: 5,
      description:
        'You can control a second marionette simultaneously. When you use your bonus action to command your marionettes, both can act. Additionally, your marionettes\' attacks count as magical for the purpose of overcoming resistance.',
    },
    {
      id: 'grand-puppeteer',
      name: 'Grand Puppeteer',
      level: 6,
      description:
        'Your marionettes become extensions of your will. Their attack damage die increases to 1d8. You can now deliver your spells through your marionettes, using their position as the origin point for spells with a range of Touch or Self.',
    },
  ],
  subclasses: [
    {
      id: 'stage',
      name: 'Tradition of the Stage',
      description:
        'You follow the theatrical tradition of the great puppet masters, using your marionettes to deceive, distract, and charm. Your puppets are works of art that captivate audiences and befuddle enemies.',
      features: [
        {
          id: 'theatrical-misdirection',
          name: 'Theatrical Misdirection',
          level: 3,
          description:
            'Your marionettes can serve as perfect distractions. When your marionette is within 5 feet of a creature, you and your allies have advantage on attack rolls against that creature. Additionally, you can cast illusion spells through your marionettes.',
        },
        {
          id: 'dramatic-performance',
          name: 'Dramatic Performance',
          level: 6,
          description:
            'As an action, your marionettes perform a captivating show. Each creature of your choice within 30 feet that can see your marionettes must make a Wisdom saving throw or be charmed for 1 minute. A charmed creature can repeat the save if it takes damage. You can use this once per short rest.',
        },
      ],
    },
    {
      id: 'war',
      name: 'Tradition of War',
      description:
        'You craft your marionettes for battle, turning them into deadly weapons. Your puppets are armored and armed, fighting alongside you as tireless warriors.',
      features: [
        {
          id: 'battle-puppets',
          name: 'Battle Puppets',
          level: 3,
          description:
            'Your marionettes are reinforced for combat. Their AC increases to 15, their HP increases by your proficiency bonus, and they can make opportunity attacks. When a creature attacks you while your marionette is within 5 feet of it, you can use your reaction to have the marionette make an attack against that creature.',
        },
        {
          id: 'puppet-swarm',
          name: 'Puppet Swarm',
          level: 6,
          description:
            'You can control up to three marionettes simultaneously. Additionally, when you command your marionettes to attack, one of them can make two attacks instead of one. Your marionettes gain a climbing speed equal to their walking speed.',
        },
      ],
    },
  ],
}
