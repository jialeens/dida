# Maintainer: jialeens <jialeadmin@163.com>

pkgname=dida
pkgver=r8.2b5aee6
pkgrel=1
pkgdesc="使用electron包装的滴答客户端"
arch=('any')
url="https://github.com/jialeens/dida"
license=('Unlicense')
groups=()
depends=('electron')
makedepends=('git' 'npm' 'sed' 'gcc')
checkdepends=()
optdepends=()
provides=(${pkgname%-git})
conflicts=(${pkgname%-git})
replaces=()
backup=()
options=()
install=
changelog=
source=("$pkgname::git+$url.git")
noextract=()
sha256sums=("SKIP")

pkgver() {
	cd "$srcdir/$pkgname"
	( set -o pipefail
	git describe --long 2>/dev/null | sed 's/^v-\?//;s/\([^-]*-g\)/r\1/;s/-/./g' ||
	printf "r%s.%s" "$(git rev-list --count HEAD)" "$(git rev-parse --short HEAD)"
	)
}

build() {
	cd "$pkgname"
	ELECTRON_MIRROR=https://npm.taobao.org/mirrors/electron/ electron-packager . 'dida' --platform=linux --arch=x64 --out=./dist --asar --overwrite --app-version=1.0.0
}

package() {
	install -Dm644 "$srcdir/dida.desktop" -t "$pkgdir/usr/share/applications"
	install -Dm644 "$srcdir/dida.png" "$pkgdir/usr/share/icons/hicolor/512x512/apps/dida.png"
	mkdir -p "$pkgdir/usr/lib/$pkgname"
    cp -r --no-preserve='ownership' -- * "$pkgdir/usr/lib/$pkgname"
	install -Dm755 "$srcdir/dida.sh" "$pkgdir/usr/bin/dida"
}