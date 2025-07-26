# 🚀 GitHub Pages Multi-Branch Deployment & Automated Cleanup

This repository uses two GitHub Actions workflows to automate deployment and maintenance of branch previews on GitHub Pages.

---

## Overview

- **`sync-branches-to-gh-pages.yml`**  
  Deploys any branch (except `gh-pages`) to a unique subdirectory on the `gh-pages` branch.  
  - `main` branch → deployed to the root (`/`)
  - `development` branch → deployed to `/dev`
  - Other branches → deployed to `/<branch-name>` (with `/` replaced by `-`)

- **`cleanup-branches-on-gh-pages.yml`**  
  Runs hourly to remove subdirectories from `gh-pages` that no longer correspond to any active branch, keeping your GitHub Pages site tidy and up-to-date.

---

## How It Works

### 1. Branch Sync Workflow

**File:** `.github/workflows/sync-branches-to-gh-pages.yml`

- **Triggers:**  
  - On push to any branch (except `gh-pages`)
  - Manually via the Actions tab

- **Logic:**  
  - **main** branch: deployed to the root of `gh-pages`
  - **development** branch: deployed to `/dev`
  - **Other branches:** deployed to a sanitized subdirectory (slashes replaced by dashes)
- **No build step required:**  
  The workflow deploys static content as-is.
- **Logs:**  
  Each deployment logs the branch, deployment path, and resulting URL.

#### Example Logs

<details>
<summary>Push to <code>main</code></summary>

```
Checked out repository. Current branch: main
Deployment path set to: .
Deploying main branch to root (/).
Deployed content to . in the gh-pages branch.
Deployment complete!
Branch: main
Deployed to: https://elecalculate.com/
```
</details>

<details>
<summary>Push to <code>feature/awesome</code></summary>

```
Checked out repository. Current branch: feature/awesome
Deployment path set to: feature-awesome
Deploying feature/awesome branch to /feature-awesome.
Deployed content to feature-awesome in the gh-pages branch.
Deployment complete!
Branch: feature/awesome
Deployed to: https://elecalculate.com/feature-awesome/
```
</details>

---

### 2. Cleanup Workflow

**File:** `.github/workflows/cleanup-branches-on-gh-pages.yml`

- **Triggers:**  
  - Every hour (configurable)
  - Manually via the Actions tab

- **Logic:**  
  - Checks out both `gh-pages` and `main` (as `.main-branch`)
  - Builds a list of active branch deployment directories (e.g., `dev`, `feature-xyz`)
  - For each directory in the root of `gh-pages`:
    - **Keeps** if present in `main` (main branch content)
    - **Keeps** if an active branch deployment directory
    - **Skips** system/special directories (e.g., `.git`, `.github`, `.main-branch`)
    - **Deletes** if an orphaned branch deployment directory (not in `main`, not an active branch)
  - **Logs every action** for auditability
  - **Commits and pushes** if any deletions occur

#### Example Audit Log

```
[KEEP] Allgemein : present in main branch
[KEEP] dev : active branch deployment directory
[DELETE] test2 : orphaned branch deployment directory (not in main, not an active branch preview)
[SKIP] .main-branch : system/special directory
```

---

## Best Practices & Notes

- **GitHub Pages Source:**  
  Ensure the `gh-pages` branch is set as the source for GitHub Pages in your repository settings.
- **Branch Name Sanitization:**  
  Branch names with `/` are converted to `-` for deployment directories.
- **Safe Cleanup:**  
  The cleanup workflow only removes directories for branches that no longer exist and are not part of the main branch content.
- **Audit Logging:**  
  Every action is logged with `[KEEP]`, `[DELETE]`, or `[SKIP]` and a reason.
- **Extending:**  
  - Add more system directories to the skip list as needed.
  - Adjust the schedule by editing the cron expression in the workflow file.
  - Customize deployment paths by editing the deployment workflow logic.

---

## File Locations

- **Sync Workflow:**  
  `.github/workflows/sync-branches-to-gh-pages.yml`
- **Cleanup Workflow:**  
  `.github/workflows/cleanup-branches-on-gh-pages.yml`

---

## How to Add a New Preview Branch

1. Create a new branch and push it to GitHub.
2. The workflow will automatically deploy it to a subdirectory on the next push.
3. When the branch is deleted, its preview will be cleaned up automatically.

---

## Troubleshooting

- **A directory was deleted unexpectedly:**  
  Check the audit log in the Actions run for the reason.
- **A new folder in `main` was deleted:**  
  This should never happen; if it does, check that the folder exists in the root of `main` and is not being excluded by mistake.
- **Workflow fails with submodule warning:**  
  Ensure `.main-branch` is excluded from `git add` in the cleanup workflow.