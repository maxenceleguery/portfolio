import CommandCenter from "@/components/deck/CommandCenter";
import Helm from "@/components/stations/Helm";
import Missions from "@/components/Missions";
import Infra from "@/components/Infra";
import Workbench from "@/components/Workbench";
import Log from "@/components/Log";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <CommandCenter
      panels={{
        bridge: <Helm />,
        missions: <Missions />,
        systems: <Infra />,
        workbench: <Workbench />,
        log: <Log />,
        comms: <Contact />,
      }}
    />
  );
}
