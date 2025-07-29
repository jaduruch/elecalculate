# How to Use Elecalculate on Your Computer

You don’t need to be a computer expert to use Elecalculate.  
Just follow the steps below for your system. If you get stuck or have questions, please feel free to [email us](mailto:contact@elecalculate.com)

---

## For Windows Users <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg" width="20" alt="Windows" />

1. **Open PowerShell**  
   - Click the Start menu, type `PowerShell`, and press Enter.

2. **Copy the command below.**  
   - Paste it into PowerShell and press Enter.

   ```powershell
   Invoke-WebRequest -Uri https://github.com/jaduruch/elecalculate/archive/refs/heads/main.zip -OutFile repo.zip; Expand-Archive -Path repo.zip -DestinationPath .; cd elecalculate-main; start index.html
   ```

3. **Wait a moment.**  
   - Your web browser should open automatically with Elecalculate ready to use.
   - After this, you can use Elecalculate even if you’re not connected to the internet.

---

## For Linux Users <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" width="20" alt="Linux" />

1. **Open your Terminal.**

2. **Copy the command below.**  
   - Paste it into the Terminal and press Enter.

   ```bash
   curl -L -o repo.zip https://github.com/jaduruch/elecalculate/archive/refs/heads/main.zip && unzip repo.zip && cd elecalculate-main && xdg-open index.html
   ```

3. **Wait a moment.**  
   - Elecalculate should open in your browser and will work offline from now on.

---

## For macOS Users <img src="https://res.cloudinary.com/dr0tcokpp/image/upload/v1753822251/Finder_Icon_macOS_Big_Sur_vg95jl.png" width="20" alt="macOS" />

1. **Open the Terminal app**  
   - You can find it in Applications > Utilities > Terminal.

2. **Copy the command below.**  
   - Paste it into Terminal and press Enter.

   ```bash
   curl -L -o repo.zip https://github.com/jaduruch/elecalculate/archive/refs/heads/main.zip && unzip repo.zip && cd elecalculate-main && open index.html
   ```

3. **Wait a moment.**  
   - Elecalculate should open in your browser and will work offline from now on.
