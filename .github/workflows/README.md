# Sync Main and Development to GitHub Pages Workflow 🚀

This workflow automates the process of syncing the `main` and `development` branches to the `gh-pages` branch for deployment to GitHub Pages.

## Purpose

- **`main` branch**: Deployed to the root of the GitHub Pages site
- **`development` branch**: Deployed to the `/dev` folder

This ensures that the latest content from both branches is always available on GitHub Pages.

---

## How It Works

### Trigger

The workflow is triggered on:
- Pushes to the `main` or `development` branches.
- Manual runs via the Actions tab.

### Workflow Steps

1. **Checkout Repository**:
   - Fetches the repository and all branches.
   - Determines the current branch being deployed.

2. **Determine Deployment Path**:
   - Decides where the branch content should be deployed:
     - `main` → Root (`/`).
     - `development` → `/dev`.

3. **Deploy Content**:
   - Uses the `peaceiris/actions-gh-pages` action to sync the branch content to the `gh-pages` branch.

---

## Workflow File

The workflow file is located at `.github/workflows/sync-branches-to-gh-pages.yml`.

### Key Features

- **Branch-Specific Deployment**:
  - Automatically deploys `main` to the root and `development` to `/dev`.
- **Error Handling**:
  - Gracefully handles unsupported branches with clear error messages.
- **Readable Logs**:
  - Logs every step for easy debugging.

---

## Example Logs

### Push to `main`
```
📦 Checked out repository. Current branch: main
🗺️ Deployment path set to: .
✅ Deploying main branch to root (/).
🚀 Deployed content to . in the gh-pages branch.
```

### Push to `development`
```
📦 Checked out repository. Current branch: development
🗺️ Deployment path set to: dev
✅ Deploying development branch to /dev.
🚀 Deployed content to dev in the gh-pages branch.
```

### Unsupported Branch
```
📦 Checked out repository. Current branch: feature-branch
❌ Error: Unsupported branch 'feature-branch'.
```

---

## Notes

- Ensure the `gh-pages` branch is configured as the source for GitHub Pages in the repository settings.
- The workflow uses the `peaceiris/actions-gh-pages` action for deployment.
- The workflow is designed to be modular and maintainable, with clear job separation and professional naming.

---

## Extending the Workflow

### Add More Branches

To deploy additional branches, update the `Determine Deployment Path` step in the workflow:

```yaml
if [ "${{ github.ref_name }}" == "main" ]; then
  echo "path=." >> $GITHUB_ENV
elif [ "${{ github.ref_name }}" == "development" ]; then
  echo "path=dev" >> $GITHUB_ENV
elif [ "${{ github.ref_name }}" == "staging" ]; then
  echo "path=staging" >> $GITHUB_ENV
else
  echo "Error: Unsupported branch '${{ github.ref_name }}'."
  exit 1
fi
```

### Customize Deployment Paths

You can customize the deployment paths by modifying the `destination_dir` in the workflow.
