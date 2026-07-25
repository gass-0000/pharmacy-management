# Image asset structure

All runtime images are external files under `assets/images/`. Do not add image
files to the repository root and do not embed images as `data:image/...` Base64
URLs in HTML, CSS, or JavaScript.

```text
assets/images/
├── home/
│   ├── facility-strip.png
│   └── pharmacy-home-map.png
├── meeting/
│   └── monthly-closing-meeting.png
├── pharmacy/
│   └── backgrounds/
│       └── pharmacy-weekly-review-bg.jpeg
├── scenes/
│   ├── complete.png
│   ├── consult.png
│   ├── crisis.png
│   ├── evaluation-legacy.png
│   ├── home.png
│   ├── inventory.png
│   ├── monthly.png
│   ├── notebook.png
│   ├── policy.png
│   ├── staffing.png
│   ├── weekly-plan.png
│   └── weekly-result.png
└── staff/
    ├── ito/
    │   └── ito_profile.png
    ├── sato/
    │   └── sato_profile.png
    ├── suzuki/
    │   └── suzuki_profile.png
    ├── tanaka/
    │   ├── tanaka_profile.png
    │   └── tanaka_fatigue_*.png
    └── watanabe/
        └── watanabe_profile.png
```

Run the same validation used in CI before committing:

```text
node scripts/validate-assets.mjs
```

The validation fails when an image reference is missing, an image is stored at
the repository root, Base64 image data is embedded in HTML, or duplicate image
content exists under `assets/images`.
