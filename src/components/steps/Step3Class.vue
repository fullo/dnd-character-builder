<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCharacterStore } from '@/stores/character'
import { getClasses } from '@/data'
import type { CharacterClass } from '@/data/dnd5e/classes'
import { SKILLS } from '@/data/dnd5e/skills'
import { useGameTerms } from '@/composables/useGameTerms'
import VariantPromo from '@/components/shared/VariantPromo.vue'

// Multiclass support (D&D 5e only)

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

// Multiclass: only D&D 5e, only if primary class is selected
const canMulticlass = computed(() =>
  variant.value === 'dnd5e' && !!characterStore.character.className
)

const multiclassOptions = computed(() => {
  if (!canMulticlass.value) return []
  const takenIds = new Set(characterStore.character.classes.map(c => c.classId))
  // Also exclude primary class if classes array is empty
  if (takenIds.size === 0) takenIds.add(characterStore.character.className)
  return classes.value.filter(c => !takenIds.has(c.id))
})

const multiclassDisplay = computed(() => {
  if (characterStore.character.classes.length < 2) return ''
  return characterStore.character.classes
    .map(c => {
      const cls = classes.value.find(cl => cl.id === c.classId)
      const name = cls ? gt.className(cls.name, variant.value) : c.classId
      return `${name} ${c.level}`
    })
    .join(' / ')
})

const showMulticlassAdd = ref(false)

function addSecondaryClass(clsId: string) {
  characterStore.addMulticlass(clsId)
  showMulticlassAdd.value = false
}

function removeSecondaryClass(clsId: string) {
  characterStore.removeMulticlass(clsId)
}
</script>

<template>
  <section aria-labelledby="class-heading">
    <h2 id="class-heading" class="text-2xl font-bold text-amber-500 mb-6">{{ t('class.title') }}</h2>

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3" role="radiogroup" :aria-label="t('class.title')">
      <button
        v-for="cls in classes"
        :key="cls.id"
        @click="selectClass(cls)"
        class="bg-stone-800 border-2 rounded-lg p-3 text-left transition-all cursor-pointer"
        :class="characterStore.character.className === cls.id ? 'border-amber-500' : 'border-stone-700 hover:border-stone-600'"
        role="radio"
        :aria-checked="characterStore.character.className === cls.id"
        :aria-label="gt.className(cls.name, variant)"
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
        <div class="flex flex-wrap gap-2" role="group" :aria-label="t('class.skillChoices', { count: selectedClass.numSkillChoices })">
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
            :aria-pressed="selectedSkills.includes(skill)"
            :aria-disabled="!selectedSkills.includes(skill) && selectedSkills.length >= selectedClass.numSkillChoices"
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

    <!-- Multiclass (D&D 5e only) -->
    <div v-if="canMulticlass" class="mt-6 bg-stone-800 border border-purple-700/30 rounded-lg p-4" role="region" :aria-label="t('class.multiclass')">
      <h3 class="font-semibold text-purple-400 mb-3">{{ t('class.multiclass') }}</h3>

      <!-- Current multiclass breakdown -->
      <div v-if="characterStore.character.classes.length >= 2" class="mb-3">
        <p class="text-stone-300 text-sm font-medium mb-2">{{ multiclassDisplay }} ({{ t('common.level') }} {{ characterStore.character.level }})</p>
        <div class="flex flex-wrap gap-2">
          <div
            v-for="entry in characterStore.character.classes"
            :key="entry.classId"
            class="flex items-center gap-2 bg-stone-700 rounded px-3 py-1.5 text-sm"
          >
            <span class="text-amber-400 font-medium">
              {{ classes.find(c => c.id === entry.classId) ? gt.className(classes.find(c => c.id === entry.classId)!.name, variant) : entry.classId }}
            </span>
            <span class="text-stone-400">Lv.{{ entry.level }}</span>
            <span class="text-stone-500 text-xs">(d{{ entry.hitDie }})</span>
            <!-- Remove button (only for secondary classes) -->
            <button
              v-if="entry.classId !== characterStore.character.classes[0]?.classId"
              @click="removeSecondaryClass(entry.classId)"
              class="text-red-400 hover:text-red-300 text-xs ml-1 cursor-pointer"
              :aria-label="t('class.removeClass')"
            >✕</button>
          </div>
        </div>
      </div>

      <!-- Add class button/selector -->
      <div v-if="!showMulticlassAdd">
        <button
          @click="showMulticlassAdd = true"
          class="px-4 py-2 bg-purple-700 hover:bg-purple-600 text-purple-100 rounded-lg text-sm font-medium transition-colors cursor-pointer"
          :disabled="multiclassOptions.length === 0"
        >
          <span aria-hidden="true">+</span> {{ t('class.addClass') }}
        </button>
      </div>
      <div v-else>
        <p class="text-stone-400 text-sm mb-2">{{ t('class.selectClassToAdd') }}:</p>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <button
            v-for="cls in multiclassOptions"
            :key="cls.id"
            @click="addSecondaryClass(cls.id)"
            class="bg-stone-700 hover:bg-stone-600 border border-stone-600 rounded-lg p-2 text-left transition-colors cursor-pointer"
          >
            <span class="text-amber-400 text-sm font-medium">{{ gt.className(cls.name, variant) }}</span>
            <span class="text-stone-500 text-xs ml-1">(d{{ cls.hitDie }})</span>
          </button>
        </div>
        <button
          @click="showMulticlassAdd = false"
          class="mt-2 text-stone-500 hover:text-stone-400 text-sm cursor-pointer"
        >{{ t('common.cancel') }}</button>
      </div>
    </div>

    <VariantPromo :variant="characterStore.character.variant" />
  </section>
</template>
