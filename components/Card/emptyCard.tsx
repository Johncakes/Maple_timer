import i18n from "@/locales/config";
export default function EmptyCard() {
  return (
    <div className="border-2 border-dashed px-2 py-8 mb-2">
      <div className=" flex w-full font-bold justify-center">
        {i18n.t("place_holder.helper")}
      </div>
    </div>
  );
}
