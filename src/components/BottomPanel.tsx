import { useState, useEffect } from "react";
import LogoPanel from "./LogoPanel";

// Collaboration logos (already imported)
import aceLogo from '../assets/ace-logo.png';
import idiLogo from '../assets/idi-logo.png';
import makLogo from '../assets/makerere-university-logo.jpg';
import renuLogo from '../assets/renu-logo.png';
import rdctLogo from '../assets/rdct-logo.jpeg';
import taccLogo from '../assets/tacc-logo.jpg';

// Technology stack logos
import anancondaLogo from '../assets/ananconda.png';
import rockyLogo from '../assets/rocky-logo.png';
import ubuntuLogo from '../assets/ubuntu-logo.png';
import openhpcLogo from '../assets/openhpc.jpg';
import slurmLogo from '../assets/Slurm_logo.svg';
import freeipaLogo from '../assets/freeIPA.png';
import prometheusLogo from '../assets/prometheus-logo.png';
import grafanaLogo from '../assets/grafana-logo.png';

// Hardware partner logos
import intelLogo from '../assets/intel-logo.png';
import ciscoLogo from '../assets/cisco-logo.png';
import dellLogo from '../assets/dell-logo.png';
import netappLogo from '../assets/netapp.png';
import veeamLogo from '../assets/veeam-logo.jpg';
import hpeLogo from '../assets/HPE.png';
import synologyLogo from '../assets/synology.png';
import apcLogo from '../assets/apc-logo.png';

const BottomPanel = () => {
  const [currentPanel, setCurrentPanel] = useState(0);

  const technologyLogos = [
    { name: "Rocky Linux", url: rockyLogo },
    { name: "Ubuntu", url: ubuntuLogo },
    { name: "OpenHPC", url: openhpcLogo },
    { name: "SLURM", url: slurmLogo },
    { name: "Anaconda", url: anancondaLogo },
    { name: "FreeIPA", url: freeipaLogo },
    { name: "Prometheus", url: prometheusLogo },
    { name: "Grafana", url: grafanaLogo }
  ];

  const hardwareLogos = [
    { name: "Intel", url: intelLogo },
    { name: "Cisco", url: ciscoLogo },
    { name: "Dell", url: dellLogo },
    { name: "NetApp", url: netappLogo },
    { name: "Veeam", url: veeamLogo },
    { name: "HPE", url: hpeLogo },
    { name: "Synology", url: synologyLogo },
    { name: "APC", url: apcLogo }
  ];

  const collaborationLogos = [
    { name: 'ACE', url: aceLogo },
    { name: "IDI", url: idiLogo },
    { name: "MAK", url: makLogo },
    { name: "RENU", url: renuLogo },
    { name: "TACC", url: taccLogo },
    { name: "RDCT", url: rdctLogo }
  ];

  const panels = [
    { title: "Technology Stack", logos: technologyLogos, label: "Built With" },
    { title: "Hardware Partners", logos: hardwareLogos, label: "Built On" },
    { title: "Collaborators", logos: collaborationLogos, label: "In Collaboration With" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPanel((prev) => (prev + 1) % panels.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-gray-200 border-t border-gray-300 z-50 overflow-hidden">
      <div className="bg-gray-200 max-w-7xl mx-auto h-full px-6 flex items-center overflow-hidden">
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