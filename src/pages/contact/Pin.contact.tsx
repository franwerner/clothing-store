import contactList from "@/constant/contactList.contant";
import { motion } from "framer-motion";

const location = contactList.find(i => i.type === "direction")
const PinLocaltionSVG = () => (
    <motion.svg
        initial={{
            y: 0
        }}
        animate={{
            y: 3,
            transition: {
                duration: 1,
                ease: "linear",
                repeat: Infinity,
                repeatType: "reverse",
            }
        }}
        className="h-[168px] sm:h-[200px] w-full md:h-[256px]"
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        fill="#f03838"
        stroke="#f03838"
        viewBox="-23.33 -23.33 513.24 513.24"
    >
        <path d="M233.292 0c-85.1 0-154.334 69.234-154.334 154.333 0 34.275 21.887 90.155 66.908 170.834 31.846 57.063 63.168 104.643 64.484 106.64l22.942 34.775 22.941-34.774c1.317-1.998 32.641-49.577 64.483-106.64 45.023-80.68 66.908-136.559 66.908-170.834C387.625 69.234 318.391 0 233.292 0zm0 233.291c-44.182 0-80-35.817-80-80s35.818-80 80-80 80 35.817 80 80-35.819 80-80 80z" />
    </motion.svg>
)

const ContactPin = () => {
    return (
        <div className="w-full grid items-center justify-center">
            <PinLocaltionSVG />
            <p className="text-center  text-default-900 font-medium p-1 text-lg ">{location?.method}</p>
        </div>
    );
};

export default ContactPin