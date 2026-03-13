# SCI Benchmark Report

**Date**: 2026-03-13T16:47:47.957Z
**Commit**: 9d4221d
**Machine**: 14-inch MacBook Pro M1 Pro, 16GB, macOS 15
**Constants**: E power=18W, I=332 gCO₂eq/kWh, M embodied=211000g, lifetime=11680h
**LCA Source**: Apple 14-inch MacBook Pro PER Oct 2021

| Tool | Time (ms) | Input | Output | E (mgCO₂) | M (mgCO₂) | SCI (mgCO₂eq) |
|------|-----------|-------|--------|------------|------------|----------------|
| data-load-dnd5e | 15 | 0 B | 0 B | 24.840 | 0.075 | 24.915 |
| data-load-brancalonia | 5 | 0 B | 0 B | 8.829 | 0.027 | 8.856 |
| data-load-apocalisse | 6 | 0 B | 0 B | 10.223 | 0.031 | 10.254 |
| calculations-1000x | 2 | 0 B | 0 B | 2.639 | 0.008 | 2.647 |
| json-serialize-character | 1 | 0 B | 776 B | 1.038 | 0.003 | 1.042 |
| build-output-analysis | 1 | 4.60 MB | 0 B | 1.340 | 0.004 | 1.344 |
| pdf-template-read | 2 | 0 B | 3.03 MB | 3.486 | 0.011 | 3.497 |
| i18n-load-single-locale | 5 | 0 B | 0 B | 8.976 | 0.027 | 9.003 |

**Total**: 61.557 mgCO₂eq across 8 tools in 37ms
