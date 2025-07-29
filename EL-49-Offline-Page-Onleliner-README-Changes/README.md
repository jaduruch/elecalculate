# Elecalculate

<a href="https://elecalculate.com">
  <img src="https://elecalculate.com/Pictures/favicon.png" alt="Elecalculate.com" width="100" height="100">
</a>

**Elecalculate** is a website designed to help you calculate various electronics parameters.  
It works fully offline, provides step-by-step solutions, and is regularly updated.

---

## Features

- Fully functional offline
- No AI
- Generates each step to reach the solution
- Updated regularly

---

## Quick Start: Run Elecalculate Locally

Elecalculate works 100% offline after setup.  
Just run the command for your system below—no installation or internet needed after the first run.

**Windows (PowerShell)**  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg" width="20" alt="Windows" />
```powershell
$z="repo_$(Get-Date -f yyyyMMddHHmmss).zip"; Invoke-WebRequest -Uri https://github.com/jaduruch/elecalculate/archive/refs/heads/main.zip -OutFile $z; Expand-Archive $z .; cd elecalculate-main; start index.html
```

**Linux**  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" width="20" alt="Linux" />
```bash
z=repo_$(date +%Y%m%d%H%M%S).zip; curl -L -o $z https://github.com/jaduruch/elecalculate/archive/refs/heads/main.zip && unzip $z && cd elecalculate-main && xdg-open index.html
```

**macOS**  <img src="https://res.cloudinary.com/dr0tcokpp/image/upload/v1753822251/Finder_Icon_macOS_Big_Sur_vg95jl.png" width="20" alt="macOS" />
```bash
z=repo_$(date +%Y%m%d%H%M%S).zip; curl -L -o $z https://github.com/jaduruch/elecalculate/archive/refs/heads/main.zip && unzip $z && cd elecalculate-main && open index.html
```

> **Need more detailed instructions?**  
> See the [One-Liner Guide](README-Oneliner.md) for a step-by-step walkthrough.

---

## Contact

Questions, suggestions, or feedback?  
Email: [contact@elecalculate.com](mailto:contact@elecalculate.com)

---

## Follow Elecalculate

Stay updated by following Elecalculate on social media:

<a href="https://www.instagram.com/elecalculate">
  <img src="https://elecalculate.com/Pictures/instagram-logo.jpg" alt="Follow us on Instagram" width="60" height="60">
</a>

---

## License

This project is licensed under the [GNU General Public License v3.0](LICENSE).

---

**Disclaimer:**  
All product names, logos, and brands are the property of their respective owners.

- *Windows* is a registered trademark of Microsoft Corporation, Redmond, WA, USA.
- *Linux* is a registered trademark of Linus Torvalds, Helsinki, Finland.
- *Apple* and the Apple logo are registered trademarks of Apple Inc., Cupertino, CA, USA.

These trademarks are used herein for identification purposes only.  
Their use does not imply any affiliation with or endorsement by the respective trademark owners.
