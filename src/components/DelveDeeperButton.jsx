import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DelveDeeperButton({ id, onScrollUp,handleScrollToSection }) {
  const router = useRouter();

  useEffect(() => {
    router.prefetch(`/products/features/${id}`);
  }, [id, router]);

  const handleNavigation = () => {
    console.log("Navigating to:", `/products/features/${id}`);
    
    if (typeof onScrollUp === "function") {
      onScrollUp();
    }

    router.push(`/products/features/${id}`);
  };

  return (
    <button 
      onClick={handleScrollToSection}
      className="p-3 border border-dehn-red rounded-full text-dehn-red hover:bg-dehn-red hover:text-white transition cursor-pointer hover:bg-gray-200 relative group"
    >
      <img src="/assets/delve-deeper.png" alt="" className="w-5 h-5" />
    </button>
  );
}
