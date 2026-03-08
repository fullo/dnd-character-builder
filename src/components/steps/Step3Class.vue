<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCharacterStore } from '@/stores/character'
import { getClasses } from '@/data'
import type { CharacterClass } from '@/data/dnd5e/classes'
import { SKILLS } from '@/data/dnd5e/skills'
import { useGameTerms } from '@/composables/useGameTerms'
import VariantPromo from '@/components/shared/VariantPromo.vue'

const { t } = useI18n()
const characterStore = useCharacterStore()
const gt = useGameTerms()

const variant = computed(() => characterStore.character.variant)

function skillDisplayName(skillId: string): string {
  const skill = SKILLS.find(s => s.id === skillId)
  return skill ? gt.skill(skill.name) : skillId
}

const classes = computed(() => getClasses(characterStore.character.variant))
const selectedClass = ref<CharacterClass | null>(null)
const selectedSkills = ref<string[]>([])

function selectClass(cls: CharacterClass) {
  selectedClass.value = cls
  characterStore.character.className = cls.id
  characterStore.character.hitDie = cls.hitDie
  characterStore.character.savingThrowProficiencies = [...cls.savingThrows]
  selectedSkills.value = []

  // Set spellcasting info
  if (cls.spellcasting) {
    characterStore.character.spellcastingClass = cls.id
    characterStore.character.spellcastingAbility = cls.spellcasting.ability
  } else {
    characterStore.character.spellcastingClass = ''
    characterStore.character.spellcastingAbility = ''
  }
}

function toggleSkill(skill: string) {
  if (!selectedClass.value) return
  const idx = selectedSkills.value.indexOf(skill)
  if (idx >= 0) {
    selectedSkills.value.splice(idx, 1)
  } else if (selectedSkills.value.length < selectedClass.value.numSkillChoices) {
    selectedSkills.value.push(skill)
  }
  characterStore.character.skillProficiencies = [...selectedSkills.value]
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-amber-500 mb-6">{{ t('class.title') }}</h2>

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      <button
        v-for="cls in classes"
        :key="cls.id"
        @click="selectClass(cls)"
        class="bg-stone-800 border-2 rounded-lg p-3 text-left transition-all cursor-pointer"
        :class="characterStore.character.className === cls.id ? 'border-amber-500' : 'border-stone-700 hover:border-stone-600'"
      >
        <h3 class="font-bold text-amber-400 text-sm">{{ gt.className(cls.name, variant) }}</h3>
        <p class="text-xs text-stone-500 mt-1">d{{ cls.hitDie }} &bull; {{ cls.primaryAbility.map((a: string) => a.toUpperCase()).join(', ') }}</p>
      </button>
    </div>

    <!-- Class Details -->
    <div v-if="selectedClass" class="mt-6 bg-stone-800 border border-stone-700 rounded-lg p-6">
      <h3 class="text-xl font-bold text-amber-400 mb-3">{{ gt.className(selectedClass.name, variant) }}</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <h4 class="font-semibold text-stone-300 mb-1">{{ t('class.hitDie') }}</h4>
          <p class="text-stone-400">d{{ selectedClass.hitDie }}</p>
        </div>
        <div>
          <h4 class="font-semibold text-stone-300 mb-1">{{ t('class.savingThrows') }}</h4>
          <p class="text-stone-400">{{ selectedClass.savingThrows.map(s => s.toUpperCase()).join(', ') }}</p>
        </div>
        <div>
          <h4 class="font-semibold text-stone-300 mb-1">{{ t('class.proficiencies') }}</h4>
          <p class="text-stone-400 text-xs">
            {{ selectedClass.armorProficiencies.map(p => gt.proficiency(p)).join(', ') }}<br>
            {{ selectedClass.weaponProficiencies.map(p => gt.proficiency(p)).join(', ') }}
          </p>
        </div>
        <div v-if="selectedClass.spellcasting">
          <h4 class="font-semibold text-stone-300 mb-1">{{ t('spells.spellcastingAbility') }}</h4>
          <p class="text-stone-400">{{ selectedClass.spellcasting.ability.toUpperCase() }} ({{ selectedClass.spellcasting.casterType }})</p>
        </div>
      </div>

      <!-- Skill Selection -->
      <div class="mt-4">
        <h4 class="font-semibold text-stone-300 mb-2">
          {{ t('class.skillChoices', { count: selectedClass.numSkillChoices }) }}
          <span class="text-stone-500">({{ selectedSkills.length }}/{{ selectedClass.numSkillChoices }})</span>
        </h4>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="skill in selectedClass.skillChoices"
            :key="skill"
            @click="toggleSkill(skill)"
            class="px-3 py-1 rounded text-xs transition-colors cursor-pointer"
            :class="selectedSkills.includes(skill)
              ? 'bg-amber-600 text-stone-900 font-medium'
              : selectedSkills.length >= selectedClass.numSkillChoices
                ? 'bg-stone-800 text-stone-600 cursor-not-allowed'
                : 'bg-stone-700 text-stone-300 hover:bg-stone-600'"
          >
            {{ skillDisplayName(skill) }}
          </button>
        </div>
      </div>

      <!-- Features -->
      <div v-if="selectedClass.features?.length" class="mt-4">
        <h4 class="font-semibold text-stone-300 mb-2">{{ t('class.features') }}</h4>
        <div class="space-y-2">
          <div v-for="feature in selectedClass.features.filter(f => f.level <= characterStore.character.level)" :key="feature.name" class="text-sm">
            <span class="text-amber-400 font-medium">Lv.{{ feature.level }}:</span>
            <span class="text-stone-400 ml-1">{{ gt.feature(feature.name) }}</span>
            <p v-if="feature.description" class="text-stone-500 text-xs ml-4">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <VariantPromo :variant="characterStore.character.variant" />
  </div>
</template>
