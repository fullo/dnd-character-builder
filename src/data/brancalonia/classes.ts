import type { ClassFeature } from '../dnd5e/classes'

export interface BrancaloniaSubclass {
  id: string
  /** ID of the parent D&D 5e class (e.g. 'barbarian', 'bard') */
  parentClassId: string
  name: string
  nameOriginal?: string
  description: string
  features: ClassFeature[]
}

export const brancaloniaSubclasses: readonly BrancaloniaSubclass[] = [
  // ─── Barbarian - Pagan (Pagano) ───────────────────────────────────
  {
    id: 'pagan',
    parentClassId: 'barbarian',
    name: 'Pagan',
    nameOriginal: 'Pagano',
    description:
      'Pagans are barbarians connected to the ancient pagan traditions of the plains and hills. Their rage is fueled by primal spirits and forgotten rites predating the Creed. When they rage, the old gods seem to whisper through them, granting ferocious power drawn from the untamed land itself.',
    features: [
      {
        id: 'pagan-fury',
        name: 'Pagan Fury',
        level: 3,
        description:
          'When you enter your rage, choose one of the ancient pagan rites. You channel the spirit of the wild plains, gaining advantage on Survival checks and immunity to the frightened condition for the duration of your rage.',
      },
      {
        id: 'rite-of-the-horned-one',
        name: 'Rite of the Horned One',
        level: 3,
        description:
          'While raging, your unarmed strikes deal an additional 1d4 damage as you channel the spirit of the ancient horned deity of the plains.',
      },
      {
        id: 'spirit-of-the-land',
        name: 'Spirit of the Land',
        level: 6,
        description:
          'You gain a supernatural bond with the earth beneath your feet. While raging and standing on natural ground, you cannot be knocked prone, and your movement speed increases by 10 feet.',
      },
    ],
  },

  // ─── Bard - Harlequin (Arlecchino) ───────────────────────────────
  {
    id: 'harlequin',
    parentClassId: 'bard',
    name: 'Harlequin',
    nameOriginal: 'Arlecchino',
    description:
      'Harlequins are bards who have mastered the art of Commedia dell\'Arte, the raucous theatrical tradition of Brancalonia. Part actor, part trickster, they use masks, pratfalls, and razor-sharp wit to entertain, deceive, and inspire. Each Harlequin adopts a stage persona -- the Lover, the Captain, the Doctor, or the Servant -- that shapes their magical style.',
    features: [
      {
        id: 'stage-persona',
        name: 'Stage Persona',
        level: 3,
        description:
          'You adopt a Commedia dell\'Arte mask that defines your performance style. Choose a persona: the Lover (advantage on Persuasion), the Captain (advantage on Intimidation), the Doctor (advantage on Medicine), or the Servant (advantage on Sleight of Hand). You can change your persona after a long rest.',
      },
      {
        id: 'comedic-timing',
        name: 'Comedic Timing',
        level: 3,
        description:
          'When you use Bardic Inspiration, the target can also use the die to add to their AC against one attack they can see, representing a perfectly timed pratfall or dodge.',
      },
      {
        id: 'improvised-scene',
        name: 'Improvised Scene',
        level: 6,
        description:
          'You can use your action to create an illusory theatrical scene in a 15-foot cube. Creatures within must succeed on a Wisdom saving throw or be charmed or frightened (your choice) for 1 minute. You can use this feature a number of times equal to your Charisma modifier per long rest.',
      },
    ],
  },

  // ─── Cleric - Miracolaro (Miracolaro) ────────────────────────────
  {
    id: 'miracolaro',
    parentClassId: 'cleric',
    name: 'Miracolaro',
    nameOriginal: 'Miracolaro',
    description:
      'Miracolari are priests of the Creed, the dominant faith of Brancalonia. Rather than serving a single deity, they venerate a vast pantheon of saints, each patron of a specific trade, virtue, or malady. Miracolari channel divine power through relics, holy water, and fervent prayer, performing miracles that range from the genuinely divine to the suspiciously theatrical.',
    features: [
      {
        id: 'patron-saint',
        name: 'Patron Saint',
        level: 1,
        description:
          'Choose a patron saint. You gain a bonus cantrip and an expanded spell list based on your saint. Your holy symbol is a relic associated with your patron.',
      },
      {
        id: 'miraculous-intercession',
        name: 'Miraculous Intercession',
        level: 1,
        description:
          'When you use Channel Divinity, you can invoke your patron saint to perform a minor miracle. One creature you can see within 30 feet regains hit points equal to 2d6 + your cleric level, and one condition affecting them (blinded, deafened, or poisoned) ends.',
      },
      {
        id: 'festival-of-the-saint',
        name: 'Festival of the Saint',
        level: 6,
        description:
          'You can spend 10 minutes leading a prayer or procession honoring your patron saint. All allies within 30 feet who participate gain temporary hit points equal to your Wisdom modifier + your proficiency bonus, lasting 8 hours.',
      },
    ],
  },

  // ─── Druid - Benandante ───────────────────────────────────────────
  {
    id: 'benandante',
    parentClassId: 'druid',
    name: 'Benandante',
    nameOriginal: 'Benandante',
    description:
      'The Benandanti are druids of the Circle of the Dance Macabre, who walk the boundary between life and death. They deal with the restless dead, guiding lost spirits and combating undead threats that plague the countryside. Their rituals involve ecstatic dances, nighttime processions, and communion with ancestral spirits. They are both revered and feared by common folk.',
    features: [
      {
        id: 'dance-macabre',
        name: 'Dance Macabre',
        level: 2,
        description:
          'As an action, you begin a spectral dance. For 1 minute, undead creatures within 30 feet of you must succeed on a Wisdom saving throw or be charmed by you. Charmed undead will not attack you or your allies and will follow simple commands. You can use this feature a number of times equal to your proficiency bonus per long rest.',
      },
      {
        id: 'spirit-sight',
        name: 'Spirit Sight',
        level: 2,
        description:
          'You can cast speak with dead without expending a spell slot. When you do so, the spirit appears visually to you as it was in life. You can use this feature once per short rest.',
      },
      {
        id: 'requiem-form',
        name: 'Requiem Form',
        level: 6,
        description:
          'When you use Wild Shape, you can assume the form of a spectral version of a beast. In this form, you gain resistance to necrotic damage and can move through creatures and objects as if they were difficult terrain. You take 1d10 force damage if you end your turn inside an object.',
      },
    ],
  },

  // ─── Fighter - Sword-player (Spadaccino) ──────────────────────────
  {
    id: 'sword-player',
    parentClassId: 'fighter',
    name: 'Sword-player',
    nameOriginal: 'Spadaccino',
    description:
      'Sword-players are master duelists who treat combat as an art form. Trained in the fencing schools of Brancalonia\'s great cities, they favor speed and precision over brute force. A Spadaccino\'s blade dances in elegant patterns, each thrust and parry a calculated performance. Many earn their living fighting duels for hire or teaching the art of the sword to noble brats.',
    features: [
      {
        id: 'dueling-stance',
        name: 'Dueling Stance',
        level: 3,
        description:
          'When you are wielding a melee weapon in one hand and no other weapons, you can enter a dueling stance as a bonus action. While in this stance, you gain +2 to attack rolls against a single designated opponent and can use your reaction to impose disadvantage on one attack that opponent makes against you.',
      },
      {
        id: 'riposte',
        name: 'Riposte',
        level: 3,
        description:
          'When a creature misses you with a melee attack while you are in your Dueling Stance, you can use your reaction to make a melee weapon attack against that creature. If it hits, you deal an additional 1d8 damage.',
      },
      {
        id: 'fencing-flourish',
        name: 'Fencing Flourish',
        level: 6,
        description:
          'When you hit a creature with a melee weapon attack, you can expend one use of Action Surge to force the target to make a Strength saving throw (DC 8 + your proficiency bonus + your Dexterity modifier). On a failure, the target is disarmed, and their weapon lands at your feet.',
      },
    ],
  },

  // ─── Monk - Friar (Frate) ─────────────────────────────────────────
  {
    id: 'friar',
    parentClassId: 'monk',
    name: 'Friar',
    nameOriginal: 'Frate',
    description:
      'Friars follow the Way of the Brawly Rule, an order of itinerant preachers who spread the word of the Creed through deeds rather than sermons. Equal parts holy man and street brawler, a Friar settles disputes with fists as readily as with prayer. They wander the roads of Brancalonia, offering counsel to the faithful and knuckle sandwiches to the wicked.',
    features: [
      {
        id: 'righteous-sermon',
        name: 'Righteous Sermon',
        level: 3,
        description:
          'You can spend 1 ki point to deliver a booming sermon as a bonus action. Each creature of your choice within 15 feet that can hear you must succeed on a Wisdom saving throw or be stunned until the end of your next turn. Once a creature succeeds on this save, it is immune for 24 hours.',
      },
      {
        id: 'holy-brawler',
        name: 'Holy Brawler',
        level: 3,
        description:
          'Your unarmed strikes count as blessed weapons for the purpose of overcoming resistance and immunity to nonmagical attacks. Additionally, when you hit an undead or fiend with an unarmed strike, you deal an extra 1d4 radiant damage.',
      },
      {
        id: 'mendicants-fortitude',
        name: 'Mendicant\'s Fortitude',
        level: 6,
        description:
          'Your life of poverty and hardship has made you remarkably tough. You gain proficiency in Constitution saving throws. Additionally, you can spend 2 ki points to end one disease or the poisoned condition affecting you.',
      },
    ],
  },

  // ─── Paladin - Knight-Errant (Cavalier Errante) ───────────────────
  {
    id: 'knight-errant',
    parentClassId: 'paladin',
    name: 'Knight-Errant',
    nameOriginal: 'Cavalier Errante',
    description:
      'Knights-Errant are impoverished aristocrats who cling to the chivalric ideals of a bygone age. Having lost their estates to debt, war, or treachery, they wander the land in rusted armor, tilting at windmills and defending the honor of damsels who neither need nor want defending. Despite their absurd pretensions, their devotion to their oaths is sincere, and their martial skill is no laughing matter.',
    features: [
      {
        id: 'oath-of-errantry',
        name: 'Oath of Errantry',
        level: 3,
        description:
          'You swear an oath to uphold the chivalric code, protect the weak, and never refuse a challenge to single combat. You gain proficiency in Persuasion and History. When you use Channel Divinity, you can challenge a creature to a duel: for 1 minute, you and the target have advantage on attack rolls against each other and disadvantage on attack rolls against other targets.',
      },
      {
        id: 'threadbare-nobility',
        name: 'Threadbare Nobility',
        level: 3,
        description:
          'Despite your poverty, your noble bearing commands respect. You have advantage on Charisma checks made to interact with nobility and common folk alike, provided you have introduced yourself with your full title (no matter how obscure or obsolete it may be).',
      },
      {
        id: 'undying-chivalry',
        name: 'Undying Chivalry',
        level: 6,
        description:
          'When you are reduced to 0 hit points while defending an ally (an ally within 5 feet of you was the target of the attack that would have reduced you to 0 hp, or you used a feature to protect them), you can instead drop to 1 hit point. You can use this feature once per long rest.',
      },
    ],
  },

  // ─── Ranger - Mattatore ─────────────────────────────────────────
  {
    id: 'mattatore',
    parentClassId: 'ranger',
    name: 'Mattatore',
    nameOriginal: 'Mattatore',
    description:
      'Mattatori are monster-hunters who ply their trade in the fighting pits and arenas of Brancalonia. They capture and study beasts and monstrosities, learning their weaknesses and fighting styles. Some do it for coin, others for glory, and a few for the sheer thrill of facing a raging beast with nothing but a cape and a blade.',
    features: [
      {
        id: 'beast-lore',
        name: 'Beast Lore',
        level: 3,
        description:
          'You can spend 1 minute studying a creature you can see. You learn its damage vulnerabilities, resistances, and immunities, as well as its highest and lowest ability scores. You can use this feature a number of times equal to your Wisdom modifier per long rest.',
      },
      {
        id: 'pit-fighter',
        name: 'Pit Fighter',
        level: 3,
        description:
          'When a Large or larger creature within 5 feet of you makes a melee attack against you, you can use your reaction to move up to half your speed without provoking opportunity attacks. If the creature\'s attack misses, you have advantage on your next attack roll against it before the end of your next turn.',
      },
      {
        id: 'monster-wrangler',
        name: 'Monster Wrangler',
        level: 6,
        description:
          'You have advantage on checks made to grapple or restrain beasts and monstrosities. Additionally, when you hit a beast or monstrosity with a weapon attack, you can force it to make a Wisdom saving throw against your spell save DC. On a failure, the creature is frightened of you for 1 minute.',
      },
    ],
  },

  // ─── Rogue - Brigand (Brigante) ───────────────────────────────────
  {
    id: 'brigand',
    parentClassId: 'rogue',
    name: 'Brigand',
    nameOriginal: 'Brigante',
    description:
      'Brigands are highway bandits and outlaws who haunt the roads between cities. They know every mountain pass, hidden trail, and safe house in the countryside. While some are simple cutthroats, many Brigands follow a code of honor -- robbing from the rich and (occasionally) sharing with the poor. They are experts at ambush, escape, and living off the land.',
    features: [
      {
        id: 'ambush-master',
        name: 'Ambush Master',
        level: 3,
        description:
          'You have advantage on initiative rolls. Additionally, when you hit a creature that has not yet acted in combat with a weapon attack during the first round of combat, the attack deals an extra 2d6 damage.',
      },
      {
        id: 'highway-robbery',
        name: 'Highway Robbery',
        level: 3,
        description:
          'You have proficiency with disguise kits and forgery kits. You can use Thieves\' Cant to leave markings that other Brigands can read, indicating safe routes, ambush points, and the wealth of nearby targets.',
      },
      {
        id: 'bandits-escape',
        name: 'Bandit\'s Escape',
        level: 6,
        description:
          'When you take damage from a creature you can see, you can use your reaction to move up to half your speed. This movement does not provoke opportunity attacks. Additionally, you can use the Hide action as part of this movement if you end in a space where you could hide. You can use this feature a number of times equal to your Dexterity modifier per long rest.',
      },
    ],
  },

  // ─── Sorcerer - Scaramante ──────────────────────────────────────
  {
    id: 'scaramante',
    parentClassId: 'sorcerer',
    name: 'Scaramante',
    nameOriginal: 'Scaramante',
    description:
      'Scaramanti draw their magical power from the deep well of folk superstition and fairy lore that permeates Brancalonia. Connected to the fey and the old ways, their magic is erratic, fortune-driven, and often expressed through charms, amulets, and gestures against the evil eye. They read omens in flights of birds and predict fate with cards and bones.',
    features: [
      {
        id: 'fortunes-favor',
        name: 'Fortune\'s Favor',
        level: 1,
        description:
          'You can sense the currents of fate. After finishing a long rest, roll 2d20 and record the results. Before any creature you can see makes an attack roll, saving throw, or ability check, you can replace their roll with one of your recorded results. Each recorded result can be used only once. Unused results are lost when you finish your next long rest.',
      },
      {
        id: 'warding-sign',
        name: 'Warding Sign',
        level: 1,
        description:
          'You know the traditional gestures and charms to ward off evil. As a reaction when a creature you can see within 30 feet casts a spell, you can spend 2 sorcery points to force the caster to make a Charisma saving throw against your spell save DC. On a failure, the spell fails and has no effect.',
      },
      {
        id: 'fey-touched',
        name: 'Fey Touched',
        level: 6,
        description:
          'Your connection to the fey deepens. You gain resistance to charm effects and can see invisible creatures within 30 feet. Once per long rest, you can cast misty step without expending a spell slot or sorcery points.',
      },
    ],
  },

  // ─── Warlock - Menagramo ───────────────────────────────────────
  {
    id: 'menagramo',
    parentClassId: 'warlock',
    name: 'Menagramo',
    nameOriginal: 'Menagramo',
    description:
      'Menagrami are warlocks bound to Madame Jinx, the capricious spirit of misfortune and bad luck. They channel their patron\'s power through the evil eye, cursing enemies with spectacularly bad luck. Menagrami are both feared and pitied -- their powers are formidable, but misfortune clings to them like a shadow, affecting not just their enemies but occasionally themselves and their allies.',
    features: [
      {
        id: 'evil-eye',
        name: 'Evil Eye',
        level: 1,
        description:
          'As a bonus action, you can fix your gaze upon a creature within 30 feet. The target must succeed on a Wisdom saving throw against your spell save DC or be cursed for 1 minute. While cursed, the target has disadvantage on the next attack roll or ability check it makes each turn. You can use this feature a number of times equal to your proficiency bonus per long rest.',
      },
      {
        id: 'misfortunes-embrace',
        name: 'Misfortune\'s Embrace',
        level: 1,
        description:
          'Madame Jinx\'s influence seeps into your magic. When a creature affected by your Evil Eye rolls a 1 on an attack roll or saving throw, they also fall prone and drop whatever they are holding.',
      },
      {
        id: 'aura-of-calamity',
        name: 'Aura of Calamity',
        level: 6,
        description:
          'A subtle aura of bad luck radiates from you. Hostile creatures within 10 feet of you cannot benefit from advantage on attack rolls against you or your allies. Additionally, when a hostile creature within 10 feet rolls a natural 20, you can use your reaction to force them to reroll. They must use the new result. You can use this reaction a number of times equal to your Charisma modifier per long rest.',
      },
    ],
  },

  // ─── Wizard - Guiscardo ───────────────────────────────────────────
  {
    id: 'guiscardo',
    parentClassId: 'wizard',
    name: 'Guiscardo',
    nameOriginal: 'Guiscardo',
    description:
      'Guiscardi are wizards steeped in the folk magic traditions of Brancalonia. Rather than studying in academies, they learn their craft from old grimoires passed down through generations of cunning folk. Their magic draws on fairy tales, folk remedies, and the traditions of the common people. A Guiscardo is as comfortable casting spells in a piazza as in a tower.',
    features: [
      {
        id: 'folk-magic',
        name: 'Folk Magic',
        level: 2,
        description:
          'You learn magic through folk traditions rather than formal study. You can add two spells from any class\'s spell list to your spellbook when you gain this feature. These spells count as wizard spells for you. Each time you gain a wizard level, you can add one spell from any class\'s spell list to your spellbook.',
      },
      {
        id: 'street-savvy',
        name: 'Street Savvy',
        level: 2,
        description:
          'Your practical background grants you proficiency in Sleight of Hand and one of the following: Persuasion, Deception, or Intimidation. Additionally, you can use Intelligence instead of Charisma for these skill checks.',
      },
      {
        id: 'tale-spinner',
        name: 'Tale Spinner',
        level: 6,
        description:
          'You can weave folk tales into your magic. When you cast an illusion or enchantment spell, you can spend 1 minute telling a related folk tale before casting. If you do, the spell\'s saving throw DC increases by 2 and its duration is doubled (up to a maximum of 24 hours). You can use this feature a number of times equal to your Intelligence modifier per long rest.',
      },
    ],
  },
]

export function getBrancaloniaSubclassById(id: string): BrancaloniaSubclass | undefined {
  return brancaloniaSubclasses.find(s => s.id === id)
}

export function getBrancaloniaSubclassesForClass(parentClassId: string): BrancaloniaSubclass[] {
  return brancaloniaSubclasses.filter(s => s.parentClassId === parentClassId)
}
