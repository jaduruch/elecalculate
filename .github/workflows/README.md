# GitHub Actions Workflows: Multi-Branch Deployment, Offline Build, and Automated Release

This repository uses multiple GitHub Actions workflows to automate deployment, preview environments, offline packaging, and release management for Elecalculate.

---

## Overview

- **`gh-pages-sync.yml`**  
  Deploys any branch (except `gh-pages`) to a unique subdirectory on the `gh-pages` branch for branch previews.
- **`gh-pages-cleanup.yml`**  
  Cleans up orphaned branch preview directories from `gh-pages`.
- **`offline-deployment-build.yml`**  
  Builds and force-updates the `offline-deployment` branch with a cryptographically verifiable, exam-proof offline build.
- **`offline-deployment-release.yml`**  
  Creates a semantic versioned GitHub Release from `offline-deployment`, attaching both ZIP and TAR.GZ archives.

---

## 1. Branch Preview and Cleanup

### Branch Sync Workflow

**File:** `.github/workflows/gh-pages-sync.yml`

- **Triggers:**  
  - On push to any branch (except `gh-pages`)
  - Manually via the Actions tab

- **Logic:**  
  - The `main` branch is deployed to the root of `gh-pages`.
  - The `development` branch is deployed to `/dev`.
  - Other branches are deployed to a subdirectory named after the branch (slashes replaced by dashes).
- **No build step required:**  
  Deploys static content as-is.

### Cleanup Workflow

**File:** `.github/workflows/gh-pages-cleanup.yml`

- **Triggers:**  
  - Every hour (configurable)
  - Manually via the Actions tab

- **Logic:**  
  - Removes subdirectories from `gh-pages` that no longer correspond to any active branch.
  - Logs every action for auditability.

---

## 2. Offline Deployment and Release

### Offline Deployment Build Workflow

**File:** `.github/workflows/offline-deployment-build.yml`

- **Triggers:**  
  - On push to `main` or any feature branch (e.g., `EL-49-Offline-Page-Oneliner-README-Changes`)
  - Manually via the Actions tab

- **Logic:**  
  - Checks out the latest code from the source branch.
  - Creates or resets the `offline-deployment` branch to match the source.
  - Injects a proof box (with build date, manifest hash, and live offline/online status) directly before the main content.
  - Generates a manifest and manifest hash for cryptographic verification.
  - Commits and force-pushes the result to the `offline-deployment` branch.

- **Result:**  
  The `offline-deployment` branch always contains a reproducible, exam-proof, offline-ready build.

### Offline Deployment Release Workflow

**File:** `.github/workflows/offline-deployment-release.yml`

- **Triggers:**  
  - On push to `offline-deployment`

- **Logic:**  
  - Runs [semantic-release](https://github.com/semantic-release/semantic-release) to:
    - Analyze commit messages (from `main`, since `offline-deployment` is force-updated from `main`)
    - Determine the next semantic version (major, minor, or patch)
    - Tag the release and generate release notes
    - Create a GitHub Release
  - Builds and attaches both a ZIP and TAR.GZ archive of the offline build to the release.

- **Result:**  
  Every update to `offline-deployment` produces a new, versioned GitHub Release with:
    - Semantic version tag (e.g., `v1.2.3`)
    - Release notes (from commit messages)
    - Downloadable ZIP and TAR.GZ of the offline build

---

## File Locations

- **Branch Preview Sync:**  
  `.github/workflows/gh-pages-sync.yml`
- **Branch Preview Cleanup:**  
  `.github/workflows/gh-pages-cleanup.yml`
- **Offline Deployment Build:**  
  `.github/workflows/offline-deployment-build.yml`
- **Offline Deployment Release:**  
  `.github/workflows/offline-deployment-release.yml`

---

## Downloading the Latest Offline Build

1. Go to the [Releases page](https://github.com/jaduruch/elecalculate/releases).
2. Download the latest `elecalculate-offline-*.zip` or `elecalculate-offline-*.tar.gz` from the most recent release.

---

## Best Practices and Notes

- **Proof Box Placement:**  
  The proof box is injected directly before the main content for maximum visibility.
- **No Main CSS Changes:**  
  All proof box styles are inline and do not affect the rest of the site.
- **Release Artifacts:**  
  Each release includes both a ZIP and TAR.GZ for offline distribution.
- **Semantic Versioning:**  
  Releases are versioned and documented automatically based on commit messages.
- **Auditability:**  
  The manifest hash and build date are always visible in the proof box and as a comment in the HTML.

---

## Troubleshooting

- **Release not created:**  
  Ensure the release workflow file exists in the `offline-deployment` branch.
- **Artifacts missing:**  
  Check the Actions logs for the archive creation and upload steps.
- **Proof box not visible:**  