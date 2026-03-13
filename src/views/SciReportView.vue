<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface SciResult {
  service: string
  wallTimeMs: number
  inputBytes: number
  outputBytes: number
  sciMgCO2eq: number
}

interface SciReport {
  commit: string
  date: string
  machine: string
  lcaSource: string
  constants: {
    devicePowerW: number
    carbonIntensity: number
    embodiedG: number
    lifetimeH: number
  }
  results: SciResult[]
  totalSciMg: number
}

const report = ref<SciReport | null>(null)
const loading = ref(true)
const error = ref(false)

onMounted(async () => {
  try {
    const res = await fetch(new URL('/dnd-character-builder/sci-report.json', window.location.origin).href)
    if (res.ok) {
      report.value = await res.json()
    } else {
      error.value = true
    }
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
})

function formatBytes(bytes: number): string {
  if (bytes === 0) return '—'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

const totalTime = computed(() =>
  report.value?.results.reduce((s, r) => s + r.wallTimeMs, 0) ?? 0
)

/** Equivalent in everyday terms */
const equivalence = computed(() => {
  if (!report.value) return ''
  const mgTotal = report.value.totalSciMg
  // 1 Google search ≈ 300 mg CO₂ (IEA estimate)
  const searches = (mgTotal / 300).toFixed(2)
  return searches
})
</script>

<template>
  <section class="max-w-3xl mx-auto py-12" aria-labelledby="sci-heading">
    <h2 id="sci-heading" class="text-3xl font-bold text-amber-500 mb-2">
      {{ t('sci.title') }}
    </h2>
    <p class="text-stone-400 text-sm mb-8">{{ t('sci.subtitle') }}</p>

    <!-- Loading -->
    <div v-if="loading" class="text-stone-400 py-8 text-center" role="status">
      {{ t('sci.loading') }}
    </div>

    <!-- Error -->
    <div v-else-if="error" class="bg-red-900/30 border border-red-700 rounded-lg p-6 text-red-300">
      {{ t('sci.error') }}
    </div>

    <!-- Report -->
    <template v-else-if="report">
      <!-- Summary card -->
      <div class="bg-stone-800 border border-stone-700 rounded-lg p-6 mb-6">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div>
            <div class="text-3xl font-bold text-emerald-400">{{ report.totalSciMg.toFixed(1) }}</div>
            <div class="text-xs text-stone-400 mt-1">mgCO₂eq {{ t('sci.perCycle') }}</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-amber-400">{{ totalTime }}</div>
            <div class="text-xs text-stone-400 mt-1">ms {{ t('sci.wallTime') }}</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-sky-400">{{ equivalence }}</div>
            <div class="text-xs text-stone-400 mt-1">{{ t('sci.googleSearches') }}</div>
          </div>
        </div>
      </div>

      <!-- Formula -->
      <div class="bg-stone-800/50 border border-stone-700/50 rounded-lg p-4 mb-6">
        <p class="text-xs text-stone-400 mb-2 font-semibold uppercase tracking-wider">{{ t('sci.formula') }}</p>
        <p class="text-stone-300 font-mono text-sm">
          SCI = ((E &times; I) + M) / R
        </p>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3 text-xs text-stone-400">
          <div><span class="text-emerald-400 font-semibold">E</span> = {{ report.constants.devicePowerW }}W &times; time</div>
          <div><span class="text-emerald-400 font-semibold">I</span> = {{ report.constants.carbonIntensity }} gCO₂eq/kWh</div>
          <div><span class="text-emerald-400 font-semibold">M</span> = {{ (report.constants.embodiedG / 1000).toFixed(0) }}kg / {{ (report.constants.lifetimeH / 8760).toFixed(1) }}y</div>
          <div><span class="text-emerald-400 font-semibold">R</span> = 1 {{ t('sci.functionalUnit') }}</div>
        </div>
      </div>

      <!-- Results table -->
      <div class="overflow-x-auto mb-6">
        <table class="w-full text-sm" aria-label="SCI benchmark results">
          <thead>
            <tr class="border-b border-stone-700 text-stone-400 text-xs uppercase tracking-wider">
              <th class="text-left py-3 px-2">{{ t('sci.operation') }}</th>
              <th class="text-right py-3 px-2">{{ t('sci.time') }}</th>
              <th class="text-right py-3 px-2">{{ t('sci.input') }}</th>
              <th class="text-right py-3 px-2">{{ t('sci.output') }}</th>
              <th class="text-right py-3 px-2">SCI (mgCO₂eq)</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="r in report.results"
              :key="r.service"
              class="border-b border-stone-800 hover:bg-stone-800/50 transition-colors"
            >
              <td class="py-2.5 px-2 font-mono text-stone-300 text-xs">{{ r.service }}</td>
              <td class="py-2.5 px-2 text-right text-stone-400">{{ r.wallTimeMs }}ms</td>
              <td class="py-2.5 px-2 text-right text-stone-500">{{ formatBytes(r.inputBytes) }}</td>
              <td class="py-2.5 px-2 text-right text-stone-500">{{ formatBytes(r.outputBytes) }}</td>
              <td class="py-2.5 px-2 text-right font-semibold text-emerald-400">{{ r.sciMgCO2eq.toFixed(3) }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="border-t border-stone-600 font-semibold">
              <td class="py-3 px-2 text-stone-300">{{ t('sci.total') }}</td>
              <td class="py-3 px-2 text-right text-stone-300">{{ totalTime }}ms</td>
              <td class="py-3 px-2"></td>
              <td class="py-3 px-2"></td>
              <td class="py-3 px-2 text-right text-emerald-400">{{ report.totalSciMg.toFixed(3) }}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <!-- Metadata -->
      <div class="bg-stone-800/50 border border-stone-700/50 rounded-lg p-4 mb-6 text-xs text-stone-500 space-y-1">
        <p><span class="text-stone-400">{{ t('sci.commit') }}:</span> <code class="text-amber-400/70">{{ report.commit }}</code></p>
        <p><span class="text-stone-400">{{ t('sci.date') }}:</span> {{ formatDate(report.date) }}</p>
        <p><span class="text-stone-400">{{ t('sci.machine') }}:</span> {{ report.machine }}</p>
        <p><span class="text-stone-400">{{ t('sci.lcaSource') }}:</span> {{ report.lcaSource }}</p>
      </div>

      <!-- Methodology -->
      <div class="bg-stone-800/50 border border-stone-700/50 rounded-lg p-4 mb-6">
        <p class="text-xs text-stone-400 mb-2 font-semibold uppercase tracking-wider">{{ t('sci.methodology') }}</p>
        <p class="text-sm text-stone-400 leading-relaxed">{{ t('sci.methodologyText') }}</p>
        <div class="flex flex-wrap gap-3 mt-3">
          <a
            href="https://sci-guide.greensoftware.foundation/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            GSF SCI Specification &rarr;
          </a>
          <a
            href="https://www.w3.org/TR/web-sustainability-guidelines/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            W3C WSG 1.0 &rarr;
          </a>
        </div>
      </div>
    </template>

    <div class="mt-8">
      <router-link to="/" class="text-amber-400 hover:text-amber-300 transition-colors">
        &larr; {{ t('nav.home') }}
      </router-link>
    </div>
  </section>
</template>
