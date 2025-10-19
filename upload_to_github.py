"""
Script otomatis untuk upload project ke GitHub
"""
import os
import subprocess
import sys

def run_command(cmd, description):
    """Jalankan command dan tampilkan hasilnya"""
    print(f"\n{'='*60}")
    print(f"📌 {description}")
    print(f"{'='*60}")
    try:
        result = subprocess.run(cmd, shell=True, check=True, capture_output=True, text=True)
        if result.stdout:
            print(result.stdout)
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Error: {e}")
        if e.stderr:
            print(f"Detail: {e.stderr}")
        return False

def check_git_installed():
    """Cek apakah git sudah terinstall"""
    # Coba dengan command biasa
    try:
        subprocess.run(['git', '--version'], capture_output=True, check=True)
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        pass
    
    # Coba dengan full path (Windows default)
    try:
        subprocess.run([r'C:\Program Files\Git\bin\git.exe', '--version'], 
                      capture_output=True, check=True)
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        return False

def main():
    print("""
╔═══════════════════════════════════════════════════════════╗
║  🚀 FURNITURE PRICE GENERATOR - GitHub Upload Tool 🚀   ║
╚═══════════════════════════════════════════════════════════╝
""")
    
    # Cek Git
    if not check_git_installed():
        print("❌ Git belum terinstall!")
        print("\n📥 Download Git dari: https://git-scm.com/download/win")
        print("   Setelah install, restart terminal dan jalankan script ini lagi.")
        input("\nTekan Enter untuk keluar...")
        sys.exit(1)
    
    print("✅ Git sudah terinstall\n")
    
    # Input dari user
    print("📝 Setup GitHub Repository\n")
    repo_name = input("Nama repository (contoh: furniture-price-generator): ").strip()
    if not repo_name:
        repo_name = "furniture-price-generator"
        print(f"   → Menggunakan nama default: {repo_name}")
    
    github_username = input("Username GitHub Anda: ").strip()
    if not github_username:
        print("❌ Username GitHub wajib diisi!")
        input("\nTekan Enter untuk keluar...")
        sys.exit(1)
    
    print(f"\n✅ Repository: {repo_name}")
    print(f"✅ Username: {github_username}")
    
    # Konfirmasi
    print("\n" + "="*60)
    print("⚠️  PENTING - Baca ini dulu!")
    print("="*60)
    print("""
1. Pastikan sudah buat repository di GitHub dengan nama:
   → {repo_name}
   
2. Buka: https://github.com/new
   - Repository name: {repo_name}
   - Public (centang)
   - JANGAN centang "Initialize with README"
   - Klik "Create repository"

3. Repository URL akan jadi:
   → https://github.com/{username}/{repo_name}
   
Sudah buat repository?
""".format(repo_name=repo_name, username=github_username))
    
    confirm = input("Ketik 'yes' untuk lanjut, atau 'no' untuk batal: ").strip().lower()
    if confirm != 'yes':
        print("\n❌ Upload dibatalkan.")
        print("   Silakan buat repository dulu, lalu jalankan script ini lagi.")
        input("\nTekan Enter untuk keluar...")
        sys.exit(0)
    
    # Repository URL
    repo_url = f"https://github.com/{github_username}/{repo_name}.git"
    
    # Jalankan git commands
    print("\n🚀 Mulai upload ke GitHub...\n")
    
    # 1. Git init
    if not run_command("git init", "Inisialisasi Git repository"):
        input("\nTekan Enter untuk keluar...")
        sys.exit(1)
    
    # 2. Git add files untuk Streamlit
    files_to_add = [
        "streamlit_app.py",
        "material_descriptions.py",
        "requirements-streamlit.txt",
        "README_STREAMLIT.md",
        "QUICKSTART_STREAMLIT.md"
    ]
    
    print("\n📦 File yang akan diupload:")
    for f in files_to_add:
        if os.path.exists(f):
            print(f"   ✅ {f}")
            run_command(f'git add "{f}"', f"Menambahkan {f}")
        else:
            print(f"   ⚠️  {f} tidak ditemukan, dilewati")
    
    # 3. Create .gitignore
    gitignore_content = """# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg

# Virtual environments
venv/
env/
ENV/

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# PyInstaller
*.spec
"""
    
    with open(".gitignore", "w") as f:
        f.write(gitignore_content)
    print("\n✅ .gitignore dibuat")
    run_command('git add .gitignore', "Menambahkan .gitignore")
    
    # 4. Git commit
    if not run_command('git commit -m "Initial commit: Furniture Price Generator Streamlit App"', 
                      "Commit files"):
        input("\nTekan Enter untuk keluar...")
        sys.exit(1)
    
    # 5. Set branch to main
    run_command("git branch -M main", "Set branch ke main")
    
    # 6. Add remote
    if not run_command(f'git remote add origin {repo_url}', 
                      f"Menambahkan remote: {repo_url}"):
        # Jika sudah ada remote, update
        run_command(f'git remote set-url origin {repo_url}', 
                   f"Update remote: {repo_url}")
    
    # 7. Push ke GitHub
    print("\n" + "="*60)
    print("🔐 LOGIN GITHUB")
    print("="*60)
    print("""
Anda akan diminta login GitHub.

Jika muncul pop-up:
→ Login dengan browser (Recommended)
→ Atau gunakan Personal Access Token

Jika gagal, buat token di:
https://github.com/settings/tokens
""")
    
    if run_command("git push -u origin main", "Upload ke GitHub"):
        print("\n" + "="*60)
        print("🎉 SUCCESS! Project berhasil diupload ke GitHub!")
        print("="*60)
        print(f"\n📍 Repository URL: https://github.com/{github_username}/{repo_name}")
        print("\n📝 Langkah selanjutnya:")
        print("="*60)
        print("1. Buka: https://streamlit.io/cloud")
        print("2. Sign in dengan GitHub")
        print("3. Klik 'New app'")
        print(f"4. Repository: {github_username}/{repo_name}")
        print("5. Main file path: streamlit_app.py")
        print("6. Klik 'Deploy'!")
        print("\n⏱️  Tunggu 2-3 menit, aplikasi akan online!")
        print(f"🌐 URL akan jadi: https://{repo_name}.streamlit.app")
        print("="*60)
    else:
        print("\n❌ Upload gagal!")
        print("\nKemungkinan masalah:")
        print("1. Repository belum dibuat di GitHub")
        print("2. Belum login GitHub")
        print("3. Username salah")
        print("\nCoba:")
        print(f"1. Buka: https://github.com/{github_username}/{repo_name}")
        print("2. Pastikan repository sudah dibuat")
        print("3. Jalankan script ini lagi")
    
    input("\n\nTekan Enter untuk keluar...")

if __name__ == "__main__":
    main()
