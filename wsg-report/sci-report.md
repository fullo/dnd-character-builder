# SCI Benchmark Report

**Date**: 2026-03-13T12:11:48.740Z
**Commit**: b6aa5cc
**Machine**: 14-inch MacBook Pro M1 Pro, 16GB, macOS 15
**Constants**: E power=18W, I=332 gCO₂eq/kWh, M embodied=211000g, lifetime=11680h
**LCA Source**: Apple 14-inch MacBook Pro PER Oct 2021

| Tool | Time (ms) | Input | Output | E (mgCO₂) | M (mgCO₂) | SCI (mgCO₂eq) |
|------|-----------|-------|--------|------------|------------|----------------|
| data-load-dnd5e | 13 | 0 B | 0 B | 21.161 | 0.064 | 21.225 |
| data-load-brancalonia | 5 | 0 B | 0 B | 8.500 | 0.026 | 8.525 |
| data-load-apocalisse | 4 | 0 B | 0 B | 6.659 | 0.020 | 6.679 |
| calculations-1000x | 1 | 0 B | 0 B | 1.981 | 0.006 | 1.987 |
| json-serialize-character | 1 | 0 B | 776 B | 0.842 | 0.003 | 0.845 |
| build-output-analysis | 1 | 4.59 MB | 0 B | 0.891 | 0.003 | 0.894 |
| pdf-template-read | 2 | 0 B | 3.03 MB | 2.786 | 0.008 | 2.794 |
| i18n-load-single-locale | 11 | 0 B | 0 B | 18.508 | 0.056 | 18.564 |

**Total**: 61.514 mgCO₂eq across 8 tools in 38ms
