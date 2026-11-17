# GitHub Actions Workflows: Multi-Branch Deployment, Offline Build, and Automated Release

This repository uses a unified GitHub Actions workflow to automate branch preview deployments, maintain a clean GitHub Pages environment, generate cryptographically verifiable offline builds, and manage semantic versioned releases with downloadable artifacts—including a single-file Windows self-extractor EXE.

## Table of Contents

1. [Overview](#overview)
2. [Branch Preview and Cleanup](#branch-preview-and-cleanup)
   - [Branch Sync Workflow](#branch-sync-workflow)
   - [Cleanup Workflow](#cleanup-workflow)
3. [Offline Deployment, Tagging, and Automated Release](#offline-deployment-tagging-and-automated-release)
   - [Workflow Diagram](#workflow-diagram)
   - [How It Works](#how-it-works)
   - [Artifacts Produced](#artifacts-produced)
   - [User Experience](#user-experience)
   - [Auditability & Compliance](#auditability--compliance)
   - [Troubleshooting](#troubleshooting)
   - [How to Download the Latest Offline Build](#how-to-download-the-latest-offline-build)
4. [File Locations](#file-locations)
5. [Best Practices and Notes](#best-practices-and-notes)

---

## Overview

This repository is designed for robust, automated, and auditable deployment and release management. The workflows are structured as follows:

- **`gh-pages-sync.yml`**  
  Deploys any branch (except `gh-pages`) to a unique subdirectory on the `gh-pages` branch, enabling live previews for every branch.
- **`gh-pages-cleanup.yml`**  
  Periodically removes orphaned branch preview directories from `gh-pages` to keep the deployment environment clean and up-to-date.
- **`offline-deployment.yml`**  
  A single workflow that:
  - Determines the next semantic version and release notes from `main` using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
  - Tags the release on `main`
  - Builds and pushes a cryptographically verifiable, exam-proof offline build (with manifest and proof box) to the `offline-deployment` branch
  - Packages the offline build as ZIP and TAR.GZ
  - Builds a single-file, self-contained Windows EXE with the ZIP embedded
  - Publishes a GitHub Release with the correct tag, release notes, and attached artifacts

---

## Branch Preview and Cleanup

```mermaid
flowchart TD
    A[Push to any branch except gh-pages] --> B[gh-pages-sync.yml]
    B -->|main| C[Deploy to root of gh-pages]
    B -->|development| D[Deploy to /dev on gh-pages]
    B -->|other branch| E[Deploy to branch-named subdirectory on gh-pages]
    F[Hourly or manual trigger] --> G[gh-pages-cleanup.yml]
    G --> H[Check all directories in gh-pages]
    H -->|Matches active branch| I[Keep directory]
    H -->|Matches main content| J[Keep directory]
    H -->|System or special directory| K[Skip directory]
    H -->|Orphaned branch preview| L[Delete directory]
```

### Branch Sync Workflow

**File:** `.github/workflows/gh-pages-sync.yml`

- **Triggers:**  
  - On push to any branch (except `gh-pages`)
  - Manually via the Actions tab

- **Logic:**  
  - The `main` branch is deployed to the root of `gh-pages`.
  - The `development` branch is deployed to `/dev`.
  - All other branches are deployed to a subdirectory named after the branch (slashes replaced by dashes).
  - No build step is required; static content is deployed as-is.
  - Each deployment logs the branch, deployment path, and resulting URL for traceability.

- **Purpose:**  
  Enables live previews for all active branches, supporting feature development, QA, and stakeholder review.

---

### Cleanup Workflow

**File:** `.github/workflows/gh-pages-cleanup.yml`

- **Triggers:**  
  - Every hour (configurable via cron)
  - Manually via the Actions tab

- **Logic:**  
  - Checks out both `gh-pages` and `main` (as `.main-branch`).
  - Builds a list of active branch deployment directories.
  - For each directory in the root of `gh-pages`:
    - **Keeps** if present in `main` (main branch content).
    - **Keeps** if an active branch deployment directory.
    - **Skips** system/special directories (e.g., `.git`, `.github`, `.main-branch`).
    - **Deletes** if an orphaned branch deployment directory (not in `main`, not an active branch).
  - Logs every action for auditability.
  - Commits and pushes if any deletions occur.

- **Purpose:**  
  Maintains a clean and accurate preview environment, ensuring only active branches are represented on GitHub Pages.

---

## Offline Deployment, Tagging, and Automated Release

### Workflow Diagram

```mermaid
flowchart TD
    M[Push to main] --> N[offline-deployment.yml]
    N --> O[Determine next semantic version from main]
    O -->|No new user-facing commits| P[Skip release]
    O -->|New user-facing commits| Q[Tag new version on main]
    Q --> R[Generate release notes, filter infra/ci/docs]
    R --> S[Build offline artifact: manifest, proof box]
    S --> T[Force-push artifact commit to offline-deployment]
    T --> U[Checkout offline-deployment for assets]
    U --> V[Package ZIP and TAR.GZ from offline-deployment]
    V --> W[Build all-in-one Windows EXE > embedded ZIP]
    W --> X[Create GitHub Release on main]
    X --> Y[Attach ZIP, TAR.GZ, and EXE to release]
    P -.->|Manual trigger| N
```

---

### How It Works

- **Trigger:**  
  - On push to `main`
  - Manually via the Actions tab

- **Versioning & Release Notes:**  
  - Determines the next semantic version (`vX.Y.Z`) using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) since the last tag.
  - Skips release if there are no new user-facing commits.
  - Groups release notes by Features, Fixes, and Other changes, filtering out infrastructure-only changes.

- **Offline Artifact Build:**  
  - Checks out the latest `main` and creates a new artifact commit with a manifest and proof box injected for auditability.
  - Force-pushes this artifact commit to the `offline-deployment` branch.

- **Packaging:**  
  - Packages the offline build as both ZIP and TAR.GZ, named with the version tag (e.g., `elecalculate-offline-v1.2.3.zip`).
  - Copies the ZIP into the self-extractor C# project and embeds it as a resource.
  - Builds a single-file, self-contained Windows EXE (`elecalculate-offline-v1.2.3.exe`) that extracts the embedded ZIP and opens `index.html` in the default browser.

- **Release:**  
  - Publishes a GitHub Release with:
    - The semantic version tag
    - Grouped, filtered release notes
    - Downloadable ZIP, TAR.GZ, and all-in-one EXE

---

### Artifacts Produced

| Artifact                                 | Platform(s)         | Description                                              |
|-------------------------------------------|---------------------|----------------------------------------------------------|
| `elecalculate-offline-vX.Y.Z.zip`         | All                 | Universal offline build (extract and open `index.html`)  |
| `elecalculate-offline-vX.Y.Z.tar.gz`      | Linux/macOS         | Universal offline build (extract and open `index.html`)  |
| `elecalculate-offline-vX.Y.Z.exe`         | Windows             | All-in-one self-extractor (double-click to run offline)  |

---

### User Experience

- **Windows users:**  
  Download and run the EXE for a seamless offline experience (no dependencies required).
- **Linux/macOS users:**  
  Download and extract the ZIP or TAR.GZ, then open `index.html` in a browser.

---

### Auditability & Compliance

- Every build includes a manifest and proof box for cryptographic verification and exam compliance.
- Release notes and versioning are fully automated and traceable.

---

### Troubleshooting

- **No release created:**  
  Ensure there are new user-facing commits on `main` since the last tag.
- **EXE not working:**  
  Confirm the ZIP is correctly embedded and the EXE is built as a single-file, self-contained binary.
- **Artifacts missing:**  
  Check the Actions logs for archive creation and upload steps.
- **Proof box not visible:**  
  Confirm the deployment workflow ran and injected the proof box before the main content.
- **Workflow not triggering:**  
  Ensure the workflow file is present in the branch at the time of the push, and that the push is not a re-push of the same commit SHA.
- **Tag or release issues:**  
  Tags are created and pushed by the release workflow. If tags are missing or incorrect, check the versioning logic and ensure no manual tags are interfering.
- **Force-push issues:**  
  If using force-push for the artifact branch, ensure the workflow file is present in the branch after the push. If not, the workflow will not trigger.

---

### How to Download the Latest Offline Build

1. Go to the [Releases page](https://github.com/jaduruch/elecalculate/releases).
2. Download the latest `elecalculate-offline-vX.Y.Z.zip`, `elecalculate-offline-vX.Y.Z.tar.gz`, or `elecalculate-offline-vX.Y.Z.exe` from the most recent release.

---

## File Locations

- **Branch Preview Sync:**  
  `.github/workflows/gh-pages-sync.yml`
- **Branch Preview Cleanup:**  
  `.github/workflows/gh-pages-cleanup.yml`
- **Offline Deployment, Tagging, and Automated Release:**  
  `.github/workflows/offline-deployment.yml`

---

## Best Practices and Notes

- **Proof Box Placement:**  
  The proof box is injected directly before the main content for maximum visibility and auditability.
- **No Main CSS Changes:**  
  All proof box styles are inline and do not affect the rest of the site.
- **Release Artifacts:**  
  Each release includes ZIP, TAR.GZ, and EXE for easy offline distribution and archival.
- **Semantic Versioning:**  
  Releases are versioned and documented automatically based on commit messages, following the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standard.
- **Release Notes Filtering:**  
  Release notes exclude infrastructure-only changes and are grouped by type for clarity.
- **Auditability:**  
  The manifest hash and build date are always visible in the proof box and as a comment in the HTML, supporting compliance and verification requirements.
- **Clean Artifacts:**  
  All archives are created from a clean directory to avoid CI/CD temp file issues and ensure reproducibility.
- **Workflow File Presence:**  
  Ensure all workflow files are present in the relevant branches (`main`, `offline-deployment`, etc.) to guarantee correct triggering and operation.
