import { useState, useEffect } from "react";
import LogoPanel from "./LogoPanel";

const BottomPanel = () => {
  const [currentPanel, setCurrentPanel] = useState(0);

  const technologyLogos = [
    { name: "Rocky Linux", url: "https://rockylinux.org/images/logo.svg" },
    { name: "Ubuntu", url: "https://assets.ubuntu.com/v1/29985a98-ubuntu-logo32.png" },
    { name: "OpenHPC", url: "https://openhpc.community/wp-content/uploads/2017/05/openhpc_logo.png" },
    { name: "SLURM", url: "https://slurm.schedmd.com/slurm_logo.png" },
    { name: "Anaconda", url: "https://www.anaconda.com/assets/images/anaconda-logo.svg" },
    { name: "FreeIPA", url: "https://www.freeipa.org/images/freeipa/freeipa-logo-small.png" },
    { name: "Prometheus", url: "https://prometheus.io/assets/prometheus_logo_grey.svg" },
    { name: "Grafana", url: "https://grafana.com/static/img/logos/grafana_logo-web_white.svg" }
  ];

  const hardwareLogos = [
    { name: "Intel", url: "https://www.intel.com/content/dam/logos/intel-header-logo-white.svg" },
    { name: "Cisco", url: "https://www.cisco.com/c/dam/en/us/td/i/200001-300000/220001-230000/229001-230000/229410.jpg" },
    { name: "Dell", url: "https://www.dell.com/images/global/brand/ui/logo-wt-bl.png" },
    { name: "NetApp", url: "https://www.netapp.com/img/netapp-logo-white.svg" },
    { name: "Veeam", url: "https://www.veeam.com/content/dam/veeam/global/veeam-graphics/veeam_logo_white.svg" },
    { name: "HPE", url: "https://www.hpe.com/etc.clientlibs/hpe/clientlibs/clientlib-hpe-static/resources/images/hpe-logo-white.svg" },
    { name: "Synology", url: "https://www.synology.com/img/company/logo_white.svg" },
    { name: "APC", url: "https://www.apc.com/us/en/assets/content/apc-logo-white.svg" }
  ];

  const collaborationLogos = [
    { name: "ACE", url: "https://example.com/ace-logo.png" },
    { name: "IDI", url: "https://example.com/idi-logo.png" },
    { name: "RENU", url: "https://example.com/renu-logo.png" },
    { name: "RDCT", url: "https://example.com/rdct-logo.png" },
    { name: "TACC", url: "https://www.tacc.utexas.edu/images/tacc-logo-white.svg" }
  ];

  const panels = [
    { title: "Technology Stack", logos: technologyLogos, label: "built with" },
    { title: "Hardware Partners", logos: hardwareLogos, label: "built on" },
    { title: "Collaborators", logos: collaborationLogos, label: "built by" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPanel((prev) => (prev + 1) % panels.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-gray-300 z-50 overflow-hidden">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center overflow-hidden">
        {panels.map((panel, index) => (
          <LogoPanel
            key={panel.title}
            logos={panel.logos}
            currentPanel={currentPanel}
            panelIndex={index}
            label={panel.label}
          />
        ))}
      </div>
    </div>
  );
};

export default BottomPanel;
