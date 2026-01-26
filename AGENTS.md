# AGENTS.md

Instructions for AI coding agents working on the Home Assistant frontend repository.

## Project Overview

The Home Assistant frontend is the official web interface for [Home Assistant](https://home-assistant.io), an open-source home automation platform. It provides a responsive, performant interface for controlling smart home devices.

**Tech Stack:**

- **Framework**: Lit 3.x Web Components (custom elements)
- **Language**: TypeScript with strict type checking
- **Backend Communication**: WebSocket API via `home-assistant-js-websocket`
- **Testing**: Vitest
- **Bundler**: Rspack (previously Webpack)
- **License**: Apache 2.0

## Repository Structure

```bash
home_assistant-frontend/
├── src/                    # Main application source
│   ├── components/         # Reusable UI components (ha-* prefix)
│   ├── panels/             # Main UI panels (config, lovelace, etc.)
│   ├── dialogs/            # Dialog components
│   ├── data/               # Data fetching and WebSocket API calls
│   ├── common/             # Shared utilities and helpers
│   ├── mixins/             # Lit mixins (SubscribeMixin, etc.)
│   ├── translations/       # i18n files (en.json is the source)
│   ├── resources/          # Theme, styles, and static resources
│   ├── types.ts            # Core TypeScript type definitions
│   └── entrypoints/        # Application entry points
├── gallery/                # Component documentation and examples
│   └── src/pages/          # Component demos and usage docs
├── test/                   # Vitest test files
├── build-scripts/          # Build configuration
├── cast/                   # Chromecast receiver application
├── hassio/                 # Home Assistant Supervisor UI
├── landing-page/           # HAOS initial setup page
└── demo/                   # Demo mode application
```

## Essential Commands

```bash
script/setup         # Initial setup and dependency installation
script/develop       # Start development server
yarn lint            # Run all linters (ESLint + Prettier + TypeScript + Lit)
yarn format          # Auto-fix linting issues
yarn test            # Run Vitest tests
script/build_frontend # Production build
```

## Component Naming Conventions

- `ha-*` — Home Assistant components (e.g., `ha-button`, `ha-dialog`)
- `hui-*` — Lovelace UI components (e.g., `hui-entity-card`)
- `dialog-*` — Dialog components (e.g., `dialog-restart`)

## Key Patterns

**Lit Component Structure:**

```typescript
@customElement('ha-my-component')
export class HaMyComponent extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant
  @state() private _config?: MyConfig
  // ...
}
```

**Import Conventions:**

```typescript
import type { HomeAssistant } from '../types'
import { fireEvent } from '../common/dom/fire_event'
```

**Styling:**

- Use CSS custom properties from theme (e.g., `--primary-text-color`)
- Use spacing tokens: `--ha-space-0` through `--ha-space-20` (4px increments)
- Mobile-first responsive design
- Support RTL layouts

## Documentation References

| Resource                        | Location                                                                                        |
| ------------------------------- | ----------------------------------------------------------------------------------------------- |
| Component examples and API docs | [gallery/src/pages/components/](gallery/src/pages/components/)                                  |
| Detailed coding guidelines      | [/.github/copilot-instructions.md](.github/copilot-instructions.md)                             |
| Build pipeline docs             | [build-scripts/README.md](build-scripts/README.md)                                              |
| Cast development                | [cast/README.md](cast/README.md)                                                                |
| Landing page development        | [landing-page/README.md](landing-page/README.md)                                                |
| External developer docs         | [developers.home-assistant.io](https://developers.home-assistant.io/docs/frontend/development/) |

## Important Conventions

**Code Quality:**

- No `console.*` statements (enforced by ESLint)
- Use `import type` for type-only imports
- Private methods use leading underscore (`_methodName`)
- Always handle loading and error states

**Text and Terminology:**

- Always use "Home Assistant" (never "HA" or "HASS")
- Use sentence case for all UI text
- "Delete" for permanent actions, "Remove" for reversible ones
- "Create" for new items, "Add" for existing items
- All user-facing text must use translation keys (`this.hass.localize()`)

**Dialogs:**

- Prefer `ha-wa-dialog` for new dialogs
- Implement `HassDialog<T>` interface
- Use predefined width sizes: `"small"`, `"medium"`, `"large"`, `"full"`

## Testing

Tests are located in `test/` and use Vitest. Test coverage focuses on:

- [src/data/](src/data/) — Data processing and API calls
- [src/common/](src/common/) — Utility functions
- [src/util/](src/util/) — Helper utilities

Run tests with `yarn test` or `yarn test:coverage` for coverage reports.

## Additional Context

- The `HomeAssistant` type (in `src/types.ts`) is the central interface passed to components
- WebSocket subscriptions should be managed via `SubscribeMixin` or cleaned up in `disconnectedCallback`
- Translation keys are defined in `src/translations/en.json`
- Theme variables are defined in `src/resources/theme/`
