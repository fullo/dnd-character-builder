<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  scores: number[]
  rolling: boolean
}>()

const emit = defineEmits<{
  (e: 'animationDone'): void
}>()

const displayScores = ref<number[]>([])
const animating = ref(false)
const revealed = ref<boolean[]>([])

watch(() => props.rolling, (isRolling) => {
  if (isRolling && props.scores.length === 6) {
    animating.value = true
    revealed.value = [false, false, false, false, false, false]
    displayScores.value = [0, 0, 0, 0, 0, 0]

    // Animate random numbers rapidly
    const interval = setInterval(() => {
      displayScores.value = displayScores.value.map((_, i) =>
        revealed.value[i] ? props.scores[i]! : Math.floor(Math.random() * 13) + 3
      )
    }, 60)

    // Reveal each die with staggered delay
    props.scores.forEach((_, i) => {
      setTimeout(() => {
        revealed.value[i] = true
        displayScores.value[i] = props.scores[i]!
      }, 400 + i * 200)
    })

    // End animation
    setTimeout(() => {
      clearInterval(interval)
      displayScores.value = [...props.scores]
      animating.value = false
      emit('animationDone')
    }, 400 + 6 * 200 + 200)
  }
})
</script>

<template>
  <div class="flex gap-2 flex-wrap" role="status" aria-live="polite">
    <div
      v-for="(score, i) in displayScores"
      :key="i"
      class="dice-container"
      :class="{
        'dice-rolling': animating && !revealed[i],
        'dice-revealed': revealed[i],
      }"
    >
      <div class="w-12 h-12 flex items-center justify-center rounded-lg font-bold text-lg select-none"
        :class="revealed[i]
          ? 'bg-amber-600 text-stone-900 shadow-lg shadow-amber-600/30'
          : animating
            ? 'bg-stone-600 text-stone-400'
            : 'bg-stone-700 text-amber-400'"
      >
        {{ animating || revealed[i] ? score : '--' }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.dice-container {
  transition: transform 0.3s ease;
}

.dice-rolling {
  animation: dice-shake 0.15s infinite alternate;
}

.dice-revealed {
  animation: dice-pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes dice-shake {
  0% {
    transform: translateY(-2px) rotate(-3deg);
  }
  100% {
    transform: translateY(2px) rotate(3deg);
  }
}

@keyframes dice-pop {
  0% {
    transform: scale(0.8);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
