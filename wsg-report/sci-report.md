# SCI Benchmark Report

**Date**: 2026-03-13T11:41:49.041Z
**Commit**: 0f8ead9
**Machine**: 14-inch MacBook Pro M1 Pro, 16GB, macOS 15
**Constants**: E power=18W, I=332 gCO₂eq/kWh, M embodied=211000g, lifetime=11680h
**LCA Source**: Apple 14-inch MacBook Pro PER Oct 2021

| Tool | Time (ms) | Input | Output | E (mgCO₂) | M (mgCO₂) | SCI (mgCO₂eq) |
|------|-----------|-------|--------|------------|------------|----------------|
| data-load-dnd5e | 52 | 0 B | 0 B | 85.660 | 0.259 | 85.919 |
| data-load-brancalonia | 14 | 0 B | 0 B | 22.794 | 0.069 | 22.863 |
| data-load-apocalisse | 16 | 0 B | 0 B | 25.958 | 0.078 | 26.036 |
| calculations-1000x | 4 | 0 B | 0 B | 6.834 | 0.021 | 6.855 |
| json-serialize-character | 1 | 0 B | 776 B | 1.960 | 0.006 | 1.966 |
| build-output-analysis | 1 | 4.58 MB | 0 B | 1.184 | 0.004 | 1.187 |
| pdf-template-read | 4 | 0 B | 3.03 MB | 6.540 | 0.020 | 6.559 |
| i18n-load-locales | 39 | 0 B | 0 B | 63.964 | 0.193 | 64.158 |

**Total**: 215.543 mgCO₂eq across 8 tools in 131ms
