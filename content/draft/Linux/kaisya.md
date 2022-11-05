# デバイスについて




# udev

`udev`はデバイスの管理を行うツールであり、`/dev`にあるデバイスノードを管理します。
ホットプラグデバイスを接続した際、デバイスファイルを生成します。

設定情報ファイルは「/etc/udev/rules.d」に配置される

https://linuc.org/study/knowledge/416/

https://hogetech.info/linux/udev

https://gside.org/blog/2016/07/01/

https://documentation.suse.com/ja-jp/sles/12-SP4/html/SLES-all/cha-udev.html

# `/proc`

https://linuc.org/study/knowledge/369/

# modprobe

`blacklist`でロードしたくないカーネルモジュールを指定する

# `/dev`

メモリーの使用状況

`/proc/meminfo`

`/proc/scsi/scsi`

# USBデバイス

> USBデバイスはいくつかのデバイスクラス(種類)に分かれています。それぞれのデバイスクラスにはクラスドライバという汎用ドライバが用意されています。

`lsusb`

`/proc/bus/usb/devices`

ACM Communication Device Class

# IOデバイス

IOポートの情報

`/dev/ioports`

DMAの情報

`/dev/dma`

# PCIデバイス

`lspci`

`cat /proc/bus/pci/devices`

# D-Bus

