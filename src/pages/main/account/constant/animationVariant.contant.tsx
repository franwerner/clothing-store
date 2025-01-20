import { Variants } from "framer-motion"

const AccountAnimationVariant : Variants = {
    hidden: {
        opacity: 0,
        scale: 0
    },
    show: {
        scale: 1,
        opacity: 1,
    }
}

export default AccountAnimationVariant