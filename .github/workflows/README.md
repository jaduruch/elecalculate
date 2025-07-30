# GitHub Actions Workflows: Multi-Branch Deployment, Offline Build, and Automated Release

This repository leverages a suite of GitHub Actions workflows to automate branch preview deployments, maintain a clean GitHub Pages environment, generate cryptographically verifiable offline builds, and manage semantic versioned releases with downloadable artifacts.

---

## Table of Contents

1. [Overview](#overview)
2. [Branch Preview and Cleanup](#1-branch-preview-and-cleanup)
   - [Branch Sync Workflow](#branch-sync-workflow)
   - [Cleanup Workflow](#cleanup-workflow)
3. [Offline Deployment and Release](#2-offline-deployment-and-release)
   - [Offline Deployment Build Workflow](#offline-deployment-build-workflow)
   - [Offline Deployment Release Workflow](#offline-deployment-release-workflow)
4. [File Locations](#file-locations)
5. [How to Download the Latest Offline Build](#how-to-download-the-latest-offline-build)
6. [Best Practices and Notes](#best-practices-and-notes)
7. [Troubleshooting](#troubleshooting)

---

## Overview

This repository is designed for robust, automated, and auditable deployment and release management. The workflows are structured as follows:

- **`gh-pages-sync.yml`**  
  Deploys any branch (except `gh-pages`) to a unique subdirectory on the `gh-pages` branch, enabling live previews for every branch.
- **`gh-pages-cleanup.yml`**  
  Periodically removes orphaned branch preview directories from `gh-pages` to keep the deployment environment clean and up-to-date.
- **`offline-deployment-build.yml`**  
  Builds and force-updates the `offline-deployment` branch with a cryptographically verifiable, exam-proof offline build, including a manifest and proof box.
- **`offline-deployment-release.yml`**  
  Creates a semantic versioned GitHub Release from `offline-deployment`, attaching both ZIP and TAR.GZ archives for easy offline distribution.

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
  The `offline-deployment` branch always contains a reproducible, exam-proof, offline-ready build, suitable for secure environments and audit scenarios.

---

### Offline Deployment Release Workflow

**File:** `.github/workflows/offline-deployment-release.yml`

- **Triggers:**  
  - On push to `offline-deployment`

- **Logic:**  
  - Determines the next semantic version (major, minor, or patch) based on commit messages since the last tag, following [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).
  - Tags the release and generates release notes from commit messages.
  - Creates a clean `dist/` directory, copies all relevant files, and builds both a ZIP and TAR.GZ archive named with the version tag (e.g., `elecalculate-offline-v1.2.3.zip`).
  - Creates a GitHub Release, attaching both archives and including the release notes.

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

## How to Download the Latest Offline Build

1. Go to the [Releases page](https://github.com/jaduruch/elecalculate/releases).
2. Download the latest `elecalculate-offline-vX.Y.Z.zip` or `elecalculate-offline-vX.Y.Z.tar.gz` from the most recent release.

---

## Best Practices and Notes

- **Proof Box Placement:**  
  The proof box is injected directly before the main content for maximum visibility and auditability.
- **No Main CSS Changes:**  
  All proof box styles are inline and do not affect the rest of the site.
- **Release Artifacts:**  
  Each release includes both a ZIP and TAR.GZ for easy offline distribution and archival.
- **Semantic Versioning:**  
  Releases are versioned and documented automatically based on commit messages, following the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standard.
- **Auditability:**  
  The manifest hash and build date are always visible in the proof box and as a comment in the HTML, supporting compliance and verification requirements.
- **Clean Artifacts:**  
  All archives are created from a clean `dist/` directory to avoid CI/CD temp file issues and ensure reproducibility.
- **Workflow File Presence:**  
  Ensure all workflow files are present in the relevant branches (`main`, `offline-deployment`, etc.) to guarantee correct triggering and operation.

---

## Troubleshooting

- **Release not created:**  
  Ensure the release workflow file exists in the `offline-deployment` branch and that a new commit is pushed.
- **Artifacts missing:**  
  Check the Actions logs for the archive creation and upload steps. Ensure the `dist/` directory is used for clean archiving.
- **Proof box not visible:**  
  Confirm the deployment workflow ran and injected the proof box before the main content.
- **Workflow not triggering:**  
  Ensure the workflow file is present in the branch at the time of the push, and that the push is not a re-push of the same commit SHA.
- **Tag or release issues:**  
  Tags are created and pushed by the release workflow. If tags are missing or incorrect, check the versioning logic and ensure no manual tags are interfering.
- **Force-push issues:**  
  If using force-push, ensure the workflow file is present in the branch after the push. If not, the workflow will not trigger.
