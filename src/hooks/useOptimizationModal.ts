import { useEffect } from "react";

/**
 * Nos ayuda a optimizar las animaciones los modales.
 * Quitando el root y esto ayuda a que solo se preocupe por animar el modal.
 */

const useOptimizationModal = (show: boolean) => {
    useEffect(() => {
        const root = document.querySelector("#root") as HTMLDivElement
        if (!root) return
        if (show && window.innerWidth <= 440) { 
            (root.style.display = "none")
        } else {
            (root.style.display = "")
        }

    }, [show])
};

export default useOptimizationModal