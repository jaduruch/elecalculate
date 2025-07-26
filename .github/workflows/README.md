# 🚀 GitHub Pages Multi-Branch Deployment & Cleanup Workflows

This repository uses two GitHub Actions workflows to automate deployment and maintenance of branch previews on GitHub Pages.

---

## Overview

- **`sync-branches-to-gh-pages.yml`**  
  Deploys any branch (except `gh-pages`) to a unique subdirectory on the `gh-pages` branch.  
  - `main` branch → deployed to the root (`/`)
  - Other branches → deployed to `/<branch-name>` (with `/` replaced by `-`)

- **`cleanup-branches-on-gh-pages.yml`**  
  Periodically removes subdirectories from `gh-pages` that no longer correspond to any active branch, keeping your GitHub Pages site tidy.

---

## How It Works

### 1. Branch Sync Workflow

**File:** `.github/workflows/sync-branches-to-gh-pages.yml`

- **Triggers:**  
  - On push to any branch (except `gh-pages`)
  - Manually via the Actions tab

- **Behavior:**  
  - Deploys the contents of the branch to a subdirectory on `gh-pages`:
    - `main` → root (`/`)
    - Other branches → `/<branch-name>` (slashes replaced by dashes)
  - Provides clear logs and a summary, including the deployed URL (e.g., `https://elecalculate.com/feature-xyz/`).

#### Example Logs

<details>
<summary>Push to <code>main</code></summary>

```
📦 Checked out repository. Current branch: main
🗺️ Deployment path set to: .
✅ Deploying main branch to root (/).
🚀 Deployed content to . in the gh-pages branch.
::notice::Deployment complete!
Branch: main
Deployed to: https://elecalculate.com/
```
</details>

<details>
<summary>Push to <code>feature/awesome</code></summary>

```
📦 Checked out repository. Current branch: feature/awesome
🗺️ Deployment path set to: feature-awesome
✅ Deploying feature/awesome branch to /feature-awesome.
🚀 Deployed content to feature-awesome in the gh-pages branch.
::notice::Deployment complete!
Branch: feature/awesome
Deployed to: https://elecalculate.com/feature-awesome/
```
</details>

---

### 2. Cleanup Workflow

**File:** `.github/workflows/cleanup-branches-on-gh-pages.yml`

- **Triggers:**  
  - On a daily schedule (configurable)
  - Manually via the Actions tab

- **Behavior:**  
  - Scans all subdirectories on the `gh-pages` branch.
  - Removes any subdirectory that does not correspond to an existing branch (with `/` replaced by `-`).
  - Skips special directories (e.g., `.git`, `assets`, `.well-known`, etc.).
  - Commits and pushes changes if any directories are removed.
  - Logs all actions for transparency.

#### Example Logs

```
::warning::Removing orphaned deployment: feature-old
::notice::No orphaned deployments to remove.
```

---

## Notes

- **GitHub Pages Source:**  
  Ensure the `gh-pages` branch is set as the source for GitHub Pages in your repository settings.
- **Static Content:**  
  No build step is required; the root of each branch is deployed as-is.
- **Branch Name Sanitization:**  
  Branch names with `/` are converted to `-` for deployment directories.
- **Safe Cleanup:**  
  The cleanup workflow only removes directories for branches that no longer exist.

---

## Extending the Workflows

- **Custom Deployment Paths:**  
  You can further customize deployment paths by editing the `Determine Deployment Path` step in the sync workflow.
- **Special Directories:**  
  To protect additional directories from cleanup, add them to the skip list in the cleanup workflow.
- **Schedule:**  
  Adjust the cleanup schedule by editing the cron expression in the workflow file.

---

## File Locations

- **Sync Workflow:**  
  `.github/workflows/sync-branches-to-gh-pages.yml`
- **Cleanup Workflow:**  
  `.github/workflows/cleanup-branches-on-gh-pages.yml`