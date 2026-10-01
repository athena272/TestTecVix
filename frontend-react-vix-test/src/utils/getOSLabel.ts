import { EOS } from "../stores/useZVMSugestion";

// Mapeia EOS para labels traduzidos
export const getOSLabel = (os: EOS | null, t: (key: string) => string): string => {
  if (!os || os === EOS.notFound) {
    return t("generic.notFound");
  }

  const osLabels: Record<EOS, string> = {
    [EOS.ubuntu2404]: "Ubuntu 24.04",
    [EOS.ubuntu2204]: "Ubuntu 22.04",
    [EOS.ubuntu2004]: "Ubuntu 20.04",
    [EOS.debian12]: "Debian 12",
    [EOS.debian11]: "Debian 11",
    [EOS.opensuse]: "openSUSE",
    [EOS.archlinux]: "Arch Linux",
    [EOS.fedora40]: "Fedora 40",
    [EOS.centos9]: "CentOS 9",
    [EOS.centos10]: "CentOS 10",
    [EOS.win10]: t("createVm.windowsTen"),
    [EOS.win2019std]: "Windows Server 2019",
    [EOS.win2022std]: "Windows Server 2022",
    [EOS.edgeprotectv1]: "EdgeProtect v1",
    [EOS.os3cx]: "3CX",
    [EOS.yeastar]: "Yeastar",
    [EOS.mikrotik]: "MikroTik",
    [EOS.pfsense]: "pfSense",
    [EOS.rockylinux10]: "Rocky Linux 10",
    [EOS.notFound]: t("generic.notFound"),
  };
  return osLabels[os] || os;
};
