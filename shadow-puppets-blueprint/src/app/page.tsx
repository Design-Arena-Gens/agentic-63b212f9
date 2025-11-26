const colorToken = {
  section: "section",
  sectionHeader: "section-header",
  tag: "tag",
  gridTwoCol: "grid twocol",
  content: "content",
  subsectionTitle: "subsection-title",
  table: "table",
  listCompact: "list-compact"
} as const;

const blueprintMeta = {
  projectName: "Shadow Puppets Theater",
  version: "v0.9.0-blueprint",
  owner: "Immersive Storytelling Platform Guild",
  targetRelease: "2025-Q2"
} as const;

export default function Page() {
  return (
    <main>
      <h1>{blueprintMeta.projectName} — Engineering Blueprint</h1>
      <p>
        Authoritative specification for a production-grade web application
        delivering interactive shadow puppet performances by fusing React 18,
        Next.js app router, TypeScript, Three.js r155, and glTF 2.0 animations
        with a FastAPI orchestration layer.
      </p>
      <div className={colorToken.content}>
        <section className={colorToken.section}>
          <div className={colorToken.sectionHeader}>
            <h2>System Overview</h2>
            <span className={colorToken.tag}>Scope</span>
          </div>
          <div className={colorToken.gridTwoCol}>
            <div>
              <h3 className={colorToken.subsectionTitle}>Mandate</h3>
              <ul className={colorToken.listCompact}>
                <li>
                  Deliver a responsive progressive web app showcasing
                  physically-plausible shadow puppetry against virtual
                  backdrops.
                </li>
                <li>
                  Support full creative pipeline: asset ingestion, rigging specs,
                  animation playback, live cueing, performance recording, and
                  export.
                </li>
                <li>
                  Guarantee deterministic rendering with adjustable artistic
                  overrides under strict performance budgets for desktop and
                  StagePad tablets.
                </li>
              </ul>
              <h3 className={colorToken.subsectionTitle}>
                High-Level Architecture
              </h3>
              <ul className={colorToken.listCompact}>
                <li>
                  Client: Next.js/React SPA with select SSR for SEO-critical
                  landing, hydrated via app router.
                </li>
                <li>
                  Runtime modules: Three.js renderer in WebGL2 + WebGPU
                  progressive enhancement, stateful orchestrator using Zustand +
                  React context for deterministic animation cues.
                </li>
                <li>
                  Backend: FastAPI service mesh (api, orchestration, auth proxy)
                  backed by PostgreSQL 15, Redis 7 for session/caching, MinIO S3
                  for asset blobs.
                </li>
              </ul>
            </div>
            <div>
              <h3 className={colorToken.subsectionTitle}>Foundational Specs</h3>
              <table className={colorToken.table}>
                <thead>
                  <tr>
                    <th>Facet</th>
                    <th>Selection</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Rendering</td>
                    <td>Three.js r155, WebGL2 primary</td>
                    <td>WebGPU path compiled via navigator.gpu feature detection</td>
                  </tr>
                  <tr>
                    <td>Animation</td>
                    <td>glTF 2.0 + KHR_animation_pointer</td>
                    <td>Procedural IK overlays via CCD + FABRIK solvers</td>
                  </tr>
                  <tr>
                    <td>State</td>
                    <td>Zustand + Immer + RxJS bridges</td>
                    <td>Time-sliced playback bus, deterministic tick sequencing</td>
                  </tr>
                  <tr>
                    <td>Transport</td>
                    <td>gRPC-over-HTTP via Connect protocol</td>
                    <td>Binary timeline sync, JSON fallback</td>
                  </tr>
                </tbody>
              </table>
              <h3 className={colorToken.subsectionTitle}>Release Metadata</h3>
              <ul className={colorToken.listCompact}>
                <li>Blueprint version: {blueprintMeta.version}</li>
                <li>Program owner: {blueprintMeta.owner}</li>
                <li>Target release window: {blueprintMeta.targetRelease}</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={colorToken.section}>
          <div className={colorToken.sectionHeader}>
            <h2>Rendering Pipeline</h2>
            <span className={colorToken.tag}>Real-Time Graphics</span>
          </div>
          <p>
            The rendering stack must simulate theatre lighting, translucent
            puppets, and volumetric curtains at 60 FPS on stage hardware.
          </p>
          <h3 className={colorToken.subsectionTitle}>Stages</h3>
          <ol>
            <li>
              <strong>Scene Assembly:</strong> React suspense boundary mounts the
              <code>&lt;ShadowStageCanvas /&gt;</code> component. Scene graph
              built from declarative JSON descriptors (SceneDoc v2) translated
              into Three.js Object3D hierarchy. Asset cache loads glTF nodes via
              GLTFLoader with DRACOLoader + MeshoptDecoder.
            </li>
            <li>
              <strong>Material Compilation:</strong> Custom shader chunks extend
              <code>MeshPhysicalMaterial</code> with dual lobe BRDF for puppet
              skin and shadow catcher plane. Uniform buffers managed by
              <code>WebGLUniforms</code> with dedicated binding pools.
            </li>
            <li>
              <strong>Shadow Pass:</strong> Cascaded shadow maps (3 cascades),
              2048² resolution per cascade, PCSS filtering, depth-only render
              using <code>THREE.CameraHelper</code> instrumentation in dev.
            </li>
            <li>
              <strong>Main Pass:</strong> Deferred shading pipeline simulated
              within forward+ technique using clustered light culling (64×64×32
              clusters) to support dynamic lanterns and footlights.
            </li>
            <li>
              <strong>Post-Processing:</strong> EffectComposer chain with SSAO,
              bloom, LUT-based color grading, chromatic defocus for lens
              dramatization; guard rails maintain <code>&lt; 5ms</code> GPU time.
            </li>
          </ol>
          <h3 className={colorToken.subsectionTitle}>Configuration Keys</h3>
          <table className={colorToken.table}>
            <thead>
              <tr>
                <th>Config</th>
                <th>Default</th>
                <th>Bounds</th>
                <th>Failure Mode</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>renderer.shadowMap.type</td>
                <td>PCFSoftShadowMap</td>
                <td>PCFSoft | VSM</td>
                <td>Fallback to PCF if floating point unavailable</td>
              </tr>
              <tr>
                <td>renderer.toneMapping</td>
                <td>ACESFilmicToneMapping</td>
                <td>ACES | Cineon | Reinhard</td>
                <td>Auto-switch to Reinhard on mobile GPUs</td>
              </tr>
              <tr>
                <td>clusteredLights.maxLights</td>
                <td>64</td>
                <td>32-128</td>
                <td>Clamp to 32 on low-tier devices to prevent overflow</td>
              </tr>
              <tr>
                <td>post.effects.bloom.intensity</td>
                <td>0.35</td>
                <td>0-1.2</td>
                <td>Disable bloom if GPU frame time &gt; 14ms avg</td>
              </tr>
            </tbody>
          </table>
          <h3 className={colorToken.subsectionTitle}>Optimization Techniques</h3>
          <ul className={colorToken.listCompact}>
            <li>GPU instancing for crowd props; puppet meshes isolated.</li>
            <li>
              Multi-resolution shadow maps with logarithmic split distribution
              constant <code>λ=0.7</code>.
            </li>
            <li>
              Staggered animation sampling: evaluate IK at 30 Hz with Hermite
              interpolation to 60 Hz render ticks.
            </li>
            <li>
              RenderDoc instrumentation accessible via developer overlay
              triggered by <code>Ctrl+Shift+G</code>.
            </li>
          </ul>
        </section>

        <section className={colorToken.section}>
          <div className={colorToken.sectionHeader}>
            <h2>Shadow Mathematics</h2>
            <span className={colorToken.tag}>Optics</span>
          </div>
          <p>
            Accurate penumbra behavior under multiple lantern sources is the
            signature visual feature. The pipeline implements soft shadows based
            on filterable variance shadow maps with analytic falloff.
          </p>
          <ul className={colorToken.listCompact}>
            <li>
              Penumbra radius <code>r_p = (d_o / d_s) * r_l</code> where
              <code>d_o</code> object-light distance, <code>d_s</code> screen
              distance, <code>r_l</code> lantern radius.
            </li>
            <li>
              Transmission gradient computed per pixel using Beer-Lambert law
              <code>T = exp(-σ * thickness)</code>, thickness sampled from
              puppet alpha channel.
            </li>
            <li>
              Contact hardening executed via depth-aware 9×9 PCF kernel with
              light size heuristic from EVSM moments.
            </li>
            <li>
              Light wave interference optional artistic mode: sum of two
              sinusoidal intensity modulators at 120 Hz, integrated into shader
              uniform <code>u_interference</code>.
            </li>
          </ul>
          <h3 className={colorToken.subsectionTitle}>Diagnostics</h3>
          <ol>
            <li>Shadow atlas heatmap toggle (<code>F2</code>) reveals cascade coverage.</li>
            <li>Variance clamping histogram (<code>F3</code>) prevents light leaks.</li>
            <li>Live penumbra inspector overlays radii and occluder thickness.</li>
          </ol>
        </section>

        <section className={colorToken.section}>
          <div className={colorToken.sectionHeader}>
            <h2>Skeleton Rig Control & IK/FK</h2>
            <span className={colorToken.tag}>Animation</span>
          </div>
          <div className={colorToken.gridTwoCol}>
            <div>
              <h3 className={colorToken.subsectionTitle}>Rig Specification</h3>
              <ul className={colorToken.listCompact}>
                <li>Joint schema: JSON Schema <code>RigDoc-1.3</code>.</li>
                <li>
                  Mandatory chains: spine(5), neck(2), jaw(1), arm(4 bones each),
                  leg(5), finger clusters (3 per finger) plus puppet rod bones.
                </li>
                <li>
                  Constraint definitions: quaternion limit cones with soft/hard
                  ranges, driven by <code>Quaternion.slerp</code> blending.
                </li>
              </ul>
              <h3 className={colorToken.subsectionTitle}>IK Solvers</h3>
              <ul className={colorToken.listCompact}>
                <li>
                  Arms, rods: FABRIK with damping factor 0.12, converge within 12
                  iterations.
                </li>
                <li>
                  Fingers: CCD solver with per-iteration 15° clamp to maintain
                  silhouette fidelity.
                </li>
                <li>
                  Spine: Analytical two-bone solver anchored to pelvis to avoid
                  overshoot.
                </li>
              </ul>
            </div>
            <div>
              <h3 className={colorToken.subsectionTitle}>State Flow</h3>
              <table className={colorToken.table}>
                <thead>
                  <tr>
                    <th>Stage</th>
                    <th>State Slice</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Import</td>
                    <td>rigStore.assets</td>
                    <td>glTF skeleton parsed to normalized bone listing</td>
                  </tr>
                  <tr>
                    <td>Binding</td>
                    <td>rigStore.bindings</td>
                    <td>Controller inputs mapped to bone handles via map spec</td>
                  </tr>
                  <tr>
                    <td>Evaluation</td>
                    <td>rigStore.poseFrame</td>
                    <td>IK solver output cached per tick with blend weights</td>
                  </tr>
                  <tr>
                    <td>Commit</td>
                    <td>animationBus.frame</td>
                    <td>Pose baked to SkinnedMesh skeleton, triggers render</td>
                  </tr>
                </tbody>
              </table>
              <h3 className={colorToken.subsectionTitle}>FK Layer</h3>
              <ul className={colorToken.listCompact}>
                <li>Default playback path uses glTF channels for FK keyframes.</li>
                <li>
                  IK override weights stored per joint:
                  <code>overrideWeight: number</code> in range 0-1.
                </li>
                <li>
                  Blending algorithm: <code>finalRotation = slerp(fk, ik, w)</code>,
                  <code>w</code> derived from user gesture easing curve.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className={colorToken.section}>
          <div className={colorToken.sectionHeader}>
            <h2>Asset Importing & Blender Pipeline</h2>
            <span className={colorToken.tag}>Content</span>
          </div>
          <h3 className={colorToken.subsectionTitle}>Pipeline</h3>
          <ol>
            <li>
              Blender add-on exports puppet scenes to glTF 2.0 with custom extras
              (<code>extras.puppetMetadata</code>) capturing material translucency
              and rig annotations.
            </li>
            <li>
              Validation CLI (<code>shadow-cli validate &lt;file&gt;</code>)
              checks polygon budget (≤35k per puppet), bone count, material tags,
              and animation channel naming.
            </li>
            <li>
              Assets uploaded to MinIO bucket <code>stage-assets</code> with SHA256
              fingerprint; metadata stored in Postgres table
              <code>asset_revisions</code>.
            </li>
            <li>
              CDN invalidation triggered via FastAPI webhook to Vercel Edge
              caching layer.
            </li>
          </ol>
          <h3 className={colorToken.subsectionTitle}>File Conventions</h3>
          <ul className={colorToken.listCompact}>
            <li>Material slots named <code>Mat.PuppetSkin</code>, <code>Mat.Rod</code>, <code>Mat.Silhouette</code>.</li>
            <li>
              Animation actions prefix:
              <code>ACT_&lt;Character&gt;_&lt;Emotion&gt;_v###</code>.
            </li>
            <li>
              Extras JSON includes: thickness map URI, occluder type, IK pin
              hints.
            </li>
          </ul>
          <h3 className={colorToken.subsectionTitle}>Import Failure Handling</h3>
          <ul className={colorToken.listCompact}>
            <li>
              Mismatched rig schema → Reject with actionable error returned to UI
              via mutations; provide auto-fix suggestions.
            </li>
            <li>
              Over-budget polycount → Offer decimation presets (0.7, 0.5) from
              pipeline CLI.
            </li>
            <li>
              Missing texture maps → Block deployment and flag QA workflow.
            </li>
          </ul>
        </section>

        <section className={colorToken.section}>
          <div className={colorToken.sectionHeader}>
            <h2>UI Architecture & Routing</h2>
            <span className={colorToken.tag}>Frontend</span>
          </div>
          <div className={colorToken.gridTwoCol}>
            <div>
              <h3 className={colorToken.subsectionTitle}>Routing Map</h3>
              <table className={colorToken.table}>
                <thead>
                  <tr>
                    <th>Route</th>
                    <th>Component</th>
                    <th>Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>/</td>
                    <td>LandingPage</td>
                    <td>SSR marketing, hero video, CTA</td>
                  </tr>
                  <tr>
                    <td>/studio</td>
                    <td>StudioShell</td>
                    <td>Main authoring environment (protected)</td>
                  </tr>
                  <tr>
                    <td>/studio/library</td>
                    <td>AssetLibraryPanel</td>
                    <td>List, preview, import assets</td>
                  </tr>
                  <tr>
                    <td>/studio/stage</td>
                    <td>StageWorkspace</td>
                    <td>Render canvas, timeline, controller inputs</td>
                  </tr>
                  <tr>
                    <td>/studio/playback</td>
                    <td>PlaybackDirector</td>
                    <td>Sequencing, cue editing, show playback</td>
                  </tr>
                  <tr>
                    <td>/docs/blueprints</td>
                    <td>BlueprintKnowledgeBase</td>
                    <td>Interactive system documentation viewer</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <h3 className={colorToken.subsectionTitle}>Component Responsibilities</h3>
              <ul className={colorToken.listCompact}>
                <li>
                  <code>ShadowStageCanvas</code>: encapsulates renderer lifecycle,
                  orchestrates render loop, handles resize, integrates post FX.
                </li>
                <li>
                  <code>TimelineEditor</code>: virtualization via react-window,
                  manages cue segments, supports zoom/pan, keyboard shortcuts.
                </li>
                <li>
                  <code>RigInspector</code>: displays hierarchical bones, allows IK
                  toggles, constraint tweaking with undo/redo.
                </li>
                <li>
                  <code>PerformanceHUD</code>: overlays GPU/CPU budgets, heatmaps,
                  error logs.
                </li>
                <li>
                  <code>SessionSyncProvider</code>: websockets + RxJS to sync
                  multi-operator rehearsals.
                </li>
              </ul>
              <h3 className={colorToken.subsectionTitle}>State Management</h3>
              <ul className={colorToken.listCompact}>
                <li>Zustand stores: <code>useStageStore</code>, <code>useRigStore</code>, <code>useShowStore</code>.</li>
                <li>
                  Global event bus: RxJS subjects <code>renderTick$</code>, <code>cueTrigger$</code>, <code>telemetry$</code>.
                </li>
                <li>
                  React Query handles backend API data (asset lists, shows) with
                  stale time 30s and optimistic updates.
                </li>
              </ul>
            </div>
          </div>
          <h3 className={colorToken.subsectionTitle}>UI Performance Budget</h3>
          <ul className={colorToken.listCompact}>
            <li>
              First Contentful Paint ≤ 2.0s on 2019 iPad hardware (Fast 3G
              simulated).
            </li>
            <li>App shell hydration ≤ 1.5s; static landing pre-rendered.</li>
            <li>Stage workspace CPU budget ≤ 10ms main-thread per frame.</li>
            <li>Memory ceiling 1.2 GB for stage workspace sessions.</li>
          </ul>
        </section>

        <section className={colorToken.section}>
          <div className={colorToken.sectionHeader}>
            <h2>Backend API & Storage</h2>
            <span className={colorToken.tag}>FastAPI</span>
          </div>
          <h3 className={colorToken.subsectionTitle}>Service Layout</h3>
          <ul className={colorToken.listCompact}>
            <li>
              <strong>gateway</strong>: OAuth2 auth, rate limiting, Connect
              protocol bridging.
            </li>
            <li>
              <strong>orchestrator</strong>: cue timelines, show state machines,
              WebSocket presence.
            </li>
            <li>
              <strong>asset</strong>: asset ingestion, validation, pre-signed
              URLs.
            </li>
            <li>
              <strong>telemetry</strong>: ingestion of performance metrics,
              anomaly detection.
            </li>
          </ul>
          <h3 className={colorToken.subsectionTitle}>Data Schemas (PostgreSQL)</h3>
          <table className={colorToken.table}>
            <thead>
              <tr>
                <th>Table</th>
                <th>Columns</th>
                <th>Constraints</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>assets</td>
                <td>
                  id UUID PK, slug TEXT UNIQUE, version INT, status ENUM, author
                  UUID, created_at TIMESTAMP, metadata JSONB
                </td>
                <td>status ∈ {"{"}draft, validated, published{"}"}</td>
              </tr>
              <tr>
                <td>asset_revisions</td>
                <td>
                  id UUID PK, asset_id FK, gltf_uri TEXT, thumbnail_uri TEXT,
                  checksum TEXT, polycount INT
                </td>
                <td>checksum unique</td>
              </tr>
              <tr>
                <td>shows</td>
                <td>
                  id UUID PK, title TEXT, owner UUID, timeline JSONB, duration_ms
                  INT, created_at TIMESTAMP
                </td>
                <td>duration_ms &gt; 0</td>
              </tr>
              <tr>
                <td>performances</td>
                <td>
                  id UUID PK, show_id FK, run_state ENUM, cue_log JSONB,
                  recordings JSONB, started_at TIMESTAMP
                </td>
                <td>run_state ∈ {"{"}draft, rehearsing, live, archived{"}"}</td>
              </tr>
              <tr>
                <td>users</td>
                <td>
                  id UUID PK, email CITEXT, role ENUM, hashed_password TEXT,
                  mfa_secret TEXT, created_at TIMESTAMP
                </td>
                <td>role ∈ {"{"}admin, director, puppeteer, viewer{"}"}</td>
              </tr>
            </tbody>
          </table>
          <h3 className={colorToken.subsectionTitle}>Storage</h3>
          <ul className={colorToken.listCompact}>
            <li>MinIO buckets: <code>stage-assets</code>, <code>stage-exports</code>, <code>telemetry-raw</code>.</li>
            <li>Lifecycle rules archive old revisions after 180 days to Glacier tier.</li>
            <li>
              Presigned upload windows 15 minutes; object metadata includes rig
              validation digest and lens calibration version.
            </li>
          </ul>
          <h3 className={colorToken.subsectionTitle}>Export Formats</h3>
          <ul className={colorToken.listCompact}>
            <li>
              Show package: ZIP containing glTF scenes, timeline JSON, cue audio,
              metadata manifest.
            </li>
            <li>Video export: WebM VP9 + Alpha for overlays, optional ProRes via server job.</li>
            <li>Analytics export: Parquet files for stage telemetry.</li>
          </ul>
        </section>

        <section className={colorToken.section}>
          <div className={colorToken.sectionHeader}>
            <h2>Event Flow & Algorithms</h2>
            <span className={colorToken.tag}>Runtime</span>
          </div>
          <ol>
            <li>
              <strong>Timeline Playback:</strong> Show director triggers start →
              <code>showStore.start(showId)</code> dispatch → orchestrator API
              returns deterministic timeline with hashed cue IDs → event bus
              schedules <code>CueExecution</code> jobs using requestAnimationFrame
              + Web Worker timers.
            </li>
            <li>
              <strong>Animation Tick:</strong> renderTick$ emits frame delta →
              IK solver updates rig pose (FABRIK/CCD) → FK blending → GPU skinning
              matrix palette uploaded via <code>DataTexture</code>.
            </li>
            <li>
              <strong>Shadow Update:</strong> Light manager monitors puppet-lantern
              distances, recomputes penumbra radii, writes to shader uniforms.
            </li>
            <li>
              <strong>Telemetry:</strong> PerformanceHUD collects CPU/GPU metrics,
              batches to telemetry service every 5 seconds via WebSocket.
            </li>
            <li>
              <strong>Error Recovery:</strong> On render failure, fallback to safe
              scene with silhouette-only material and display alert.
            </li>
          </ol>
          <h3 className={colorToken.subsectionTitle}>Algorithms</h3>
          <ul className={colorToken.listCompact}>
            <li>
              IK: FABRIK with adaptive step reduction; fallback to CCD if
              divergence detected (distance increase for 3 iterations).
            </li>
            <li>
              Path easing: Cubic Bezier curves with handles defined per cue
              (<code>easeInOutCubic</code> default, custom stored in timeline).
            </li>
            <li>
              Collision avoidance: 2D silhouette overlap detection via
              Separating Axis Theorem on projected polyline outlines.
            </li>
            <li>
              Auto-lighting: Genetic algorithm adjusts lantern intensities to
              match target luminance histogram.
            </li>
          </ul>
        </section>

        <section className={colorToken.section}>
          <div className={colorToken.sectionHeader}>
            <h2>Performance Budgets & Monitoring</h2>
            <span className={colorToken.tag}>Ops</span>
          </div>
          <ul className={colorToken.listCompact}>
            <li>Renderer GPU budget ≤ 12ms; CPU simulation ≤ 6ms at 60 FPS.</li>
            <li>Worst-case load: 3 puppets, 6 lanterns, volumetric fog.</li>
            <li>Budget app: scripts monitor <code>performance.measure</code> metrics.</li>
            <li>
              Grafana dashboards display Web Vitals, GPU counters (via WebGL
              timer queries), backend latency.
            </li>
          </ul>
          <h3 className={colorToken.subsectionTitle}>Fallback Scenarios</h3>
          <ul className={colorToken.listCompact}>
            <li>Disable volumetric fog if timer queries exceed 2.5ms threshold.</li>
            <li>
              Reduce shadow resolution to 1024² on low-tier GPUs; degrade to flat
              shadows with cross-fade animation.
            </li>
            <li>
              Pause performance and prompt reload if WebSocket connectivity lost
              &gt; 10 seconds during live show.
            </li>
          </ul>
        </section>

        <section className={colorToken.section}>
          <div className={colorToken.sectionHeader}>
            <h2>Accessibility & Interaction Rules</h2>
            <span className={colorToken.tag}>Inclusive Design</span>
          </div>
          <ul className={colorToken.listCompact}>
            <li>
              WCAG 2.2 AA compliance; color contrast ≥ 4.5:1, high-contrast theme
              toggle.
            </li>
            <li>
              Keyboard navigation: all controls focusable, stage operations
              accessible via command palette.
            </li>
            <li>ARIA live regions for playback status and error notifications.</li>
            <li>
              Motion reduction: respects <code>prefers-reduced-motion</code> by
              limiting camera drift and particle FX.
            </li>
            <li>
              Haptic feedback spec for StagePad: vibrate on cue completion,
              fallback audible cues.
            </li>
          </ul>
        </section>

        <section className={colorToken.section}>
          <div className={colorToken.sectionHeader}>
            <h2>Testing Strategy</h2>
            <span className={colorToken.tag}>Quality</span>
          </div>
          <ul className={colorToken.listCompact}>
            <li>
              Unit tests: Vitest + React Testing Library for UI components;
              PyTest for FastAPI services.
            </li>
            <li>
              Integration tests: Playwright E2E simulating puppet rehearsal, GPU
              mocking via WebGL stub, golden frame comparison (PNG diff).
            </li>
            <li>
              Performance tests: Puppeteer headless on CI measuring WebGL timing
              queries, threshold gating.
            </li>
            <li>
              Contract tests: Pact between frontend GraphQL layer (if used) and
              FastAPI endpoints.
            </li>
            <li>
              Security tests: OWASP ZAP nightly scan, dependency auditing via
              Snyk.
            </li>
          </ul>
          <h3 className={colorToken.subsectionTitle}>Acceptance Criteria</h3>
          <ol>
            <li>
              Render 3 puppet show at 60 FPS desktop, 30 FPS StagePad with soft
              shadows enabled.
            </li>
            <li>
              Import pipeline rejects invalid rigs with actionable errors 100% of
              time.
            </li>
            <li>
              Cue timeline edits reflect on stage within 16ms after commit.
            </li>
            <li>
              Live performance recovery within 2 seconds after network hiccup.
            </li>
          </ol>
        </section>

        <section className={colorToken.section}>
          <div className={colorToken.sectionHeader}>
            <h2>CI/CD Workflow</h2>
            <span className={colorToken.tag}>Automation</span>
          </div>
          <ul className={colorToken.listCompact}>
            <li>
              GitHub Actions pipelines: <code>ci.yml</code> (lint, test, build),
              <code>deploy.yml</code> (preview, prod).
            </li>
            <li>
              Frontend job matrix: Node 18, 20; caches via actions/setup-node.
            </li>
            <li>
              Backend job: Python 3.11, run pytest, mypy, black, uvicorn dry run.
            </li>
            <li>
              Artifact store: build outputs zipped, uploaded as release assets.
            </li>
            <li>
              Prod deploy gate requires manual approval + all tests green +
              Lighthouse score ≥ 90.
            </li>
          </ul>
          <h3 className={colorToken.subsectionTitle}>Deployment</h3>
          <ul className={colorToken.listCompact}>
            <li>
              Frontend: Vercel project <code>agentic-63b212f9</code>, default
              production branch <code>main</code>.
            </li>
            <li>
              Backend: FastAPI on Fly.io with autoscaling 2→6 instances, Postgres
              managed cluster, Redis via Upstash.
            </li>
            <li>
              Infrastructure as Code: Terraform modules for buckets, DB, queues.
            </li>
            <li>
              Observability: OpenTelemetry traces, Loki logs, Prometheus metrics.
            </li>
          </ul>
        </section>

        <section className={colorToken.section}>
          <div className={colorToken.sectionHeader}>
            <h2>Security Model</h2>
            <span className={colorToken.tag}>Zero Trust</span>
          </div>
          <ul className={colorToken.listCompact}>
            <li>
              OAuth2+PKCE with organization roles; short-lived JWTs, refresh via
              rotatable tokens, enforced MFA.
            </li>
            <li>
              Backend policy engine (Oso) evaluating show access, asset mutation
              rights, stage control privileges.
            </li>
            <li>
              S3 bucket policies: server-side encryption (AES-256), signed URLs,
              audit logs to CloudWatch.
            </li>
            <li>Content Security Policy locked to Vercel domains, CDN origins.</li>
            <li>
              Websocket authentication: signed session tokens, rotating keys,
              heartbeats every 10s, disconnect after 3 missed.
            </li>
            <li>
              Secrets management: HashiCorp Vault dynamic DB creds, Vercel
              secrets locking.
            </li>
          </ul>
        </section>

        <section className={colorToken.section}>
          <div className={colorToken.sectionHeader}>
            <h2>Failure Mode Handling</h2>
            <span className={colorToken.tag}>Resilience</span>
          </div>
          <ul className={colorToken.listCompact}>
            <li>
              Renderer crash detection: wrap render loop in error boundary,
              attempt reset once, fallback to safe overlay.
            </li>
            <li>
              Asset load failure: display placeholder silhouette, log to Sentry,
              allow retry.
            </li>
            <li>
              Backend outage: degrade to read-only rehearsal mode using cached
              timelines.
            </li>
            <li>
              Timeline desync: re-request authoritative state from orchestrator,
              apply diff, display sync indicator.
            </li>
            <li>
              Storage outage: queue uploads locally (IndexedDB) until bucket
              reachable.
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
