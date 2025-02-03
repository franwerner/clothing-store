import { useSelector } from "@/store";


const ContactHeader = () => {
    const { contact_email, contact_phone } = useSelector(({ storeConfig }) => storeConfig)
    const contact = [
        {
            type: "mail",
            icon: "mail",
            method: contact_email
        },
        {
            type: "phone",
            icon: "call",
            method: contact_phone
        },
    ]
    return (
        <div className=" border-b-1 grid sm:grid-cols-2  justify-items-center items-center   pb-3">
            {
                contact.map(({ icon, method }) =>
                    <div key={method} className="flex gap-1 items-center text-default-600">
                        <span className="material-symbols-outlined text-2xl">
                            {icon}
                        </span>
                        <p >{method}</p>
                    </div>
                )
            }
        </div>
    );
};

export default ContactHeader;