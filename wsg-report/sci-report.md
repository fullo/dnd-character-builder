# SCI Benchmark Report

**Date**: 2026-03-13T11:45:21.742Z
**Commit**: 03b2265
**Machine**: 14-inch MacBook Pro M1 Pro, 16GB, macOS 15
**Constants**: E power=18W, I=332 gCO₂eq/kWh, M embodied=211000g, lifetime=11680h
**LCA Source**: Apple 14-inch MacBook Pro PER Oct 2021

| Tool | Time (ms) | Input | Output | E (mgCO₂) | M (mgCO₂) | SCI (mgCO₂eq) |
|------|-----------|-------|--------|------------|------------|----------------|
| data-load-dnd5e | 13 | 0 B | 0 B | 21.124 | 0.064 | 21.188 |
| data-load-brancalonia | 5 | 0 B | 0 B | 8.309 | 0.025 | 8.335 |
| data-load-apocalisse | 5 | 0 B | 0 B | 8.127 | 0.025 | 8.152 |
| calculations-1000x | 1 | 0 B | 0 B | 2.343 | 0.007 | 2.350 |
| json-serialize-character | 0 | 0 B | 776 B | 0.789 | 0.002 | 0.791 |
| build-output-analysis | 1 | 4.58 MB | 0 B | 0.856 | 0.003 | 0.858 |
| pdf-template-read | 2 | 0 B | 3.03 MB | 3.690 | 0.011 | 3.701 |
| i18n-load-locales | 9 | 0 B | 0 B | 15.560 | 0.047 | 15.607 |

**Total**: 60.982 mgCO₂eq across 8 tools in 36ms
