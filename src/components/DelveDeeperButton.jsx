import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DelveDeeperButton({ id }) {
  const router = useRouter();

  const handleNavigation = () => {
    console.log("Navigating to:", `/products/features/${id}`)
    router.push(`/products/features/${id}`);
  };

  return (
    <button 
      onClick={handleNavigation}
      className="p-3 border border-dehn-red rounded-full text-dehn-red hover:bg-dehn-red hover:text-white transition cursor-pointer"
    >
      <img src="/assets/delve-deeper.png" alt="" className="w-5 h-5" />
    </button>
  );
}
