import { FolderFloat } from "@/components/shared/FolderFloat";
import { SectionHeading } from "./AboutSection";

const belovedItems = ["Bu Anisa", "Bu Anisa", "Bu Anisa", "Bu Anisa"];

export function BelovedPeopleSection() {
  return (
    <section id="beloved" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Beloved People"
          title="Beloved People"
          subtitle="Orang-orang yang selalu kami sayangin"
        />
        <div className="mt-14 flex justify-center pb-40">
          <FolderFloat
            items={belovedItems}
            label="Beloved People"
            sublabel="XI RPL D"
            trigger="hover"
            physics
            drift={0.5}
            spread={180}
            folderColor="#1E293B"
            frontColor="#334155"
            paperColor="#E2E8F0"
            itemColor="#F8FAFC"
            itemTextColor="#0F172A"
            labelColor="#F8FAFC"
          />
        </div>
      </div>
    </section>
  );
}
